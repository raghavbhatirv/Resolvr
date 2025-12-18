import { Request, Response, Router } from "express";
import dnsPromises from 'node:dns/promises';
import { DNS_RECORD_TYPES } from "../constant/dns.constant.js";

// Map of DNS IPs to provider names
const DNS_PROVIDER_MAP: Record<string, string> = {
  // Google
  "8.8.8.8": "Google",
  "8.8.4.4": "Google",
  "2001:4860:4860::8888": "Google",
  "2001:4860:4860::8844": "Google",
  
  // Cloudflare
  "1.1.1.1": "Cloudflare",
  "1.0.0.1": "Cloudflare",
  "2606:4700:4700::1111": "Cloudflare",
  "2606:4700:4700::1001": "Cloudflare",
  
  // Quad9
  "9.9.9.9": "Quad9",
  "149.112.112.112": "Quad9",
  "2620:fe::fe": "Quad9",
  "2620:fe::9": "Quad9",
  
  // OpenDNS
  "208.67.222.222": "OpenDNS",
  "208.67.220.220": "OpenDNS",
  
  // Verisign
  "64.6.64.6": "Verisign",
  "64.6.65.6": "Verisign",
};

function getDNSProviderName(ip: string): string {
  return DNS_PROVIDER_MAP[ip] || "Unknown / ISP DNS";
}

function getProviderFromNameServers(nameServers: string[]): string[] {
  const providers = new Set<string>();
  
  for (const ns of nameServers) {
    const lowerNs = ns.toLowerCase();
    
    if (lowerNs.includes("cloudflare")) {
      providers.add("Cloudflare");
    } else if (lowerNs.includes("google")) {
      providers.add("Google Cloud DNS");
    } else if (lowerNs.includes("amazon") || lowerNs.includes("awsdns")) {
      providers.add("AWS Route 53");
    } else if (lowerNs.includes("azure") || lowerNs.includes("azuredns")) {
      providers.add("Azure DNS");
    } else if (lowerNs.includes("akamai") || lowerNs.includes("akam")) {
      providers.add("Akamai");
    } else if (lowerNs.includes("verisign")) {
      providers.add("Verisign");
    } else if (lowerNs.includes("quad9")) {
      providers.add("Quad9");
    } else if (lowerNs.includes("ns.")) {
      // Generic nameserver, extract the domain part
      const regex = /ns\d*\.(.+)/i;
      const domainMatch = regex.exec(ns);
      if (domainMatch && domainMatch[1]) {
        providers.add(domainMatch[1].toUpperCase());
      }
    }
  }
  
  return Array.from(providers).length > 0 ? Array.from(providers) : ["Unknown"];
}

export const dnsRouter = Router();

dnsRouter.get("/", async (req: Request, res: Response) => {
  try {
    const domain = req.query.endpoint as string;
    if (!domain) {
      return res.status(400).json({ error: "Missing 'endpoint' query parameter." });
    }

    const results: Record<string, any> = {};

    for (const type of DNS_RECORD_TYPES) {
      try {
        let dnsResult = await dnsPromises.resolve(domain, type);
        results[type] = dnsResult;
      } catch (e) {
        console.log(`No records found for type ${type} on domain ${domain}`);
        results[type] = [];
      }
    }
    
    // Get DNS provider from NS (Name Server) records
    const nameServers = Array.isArray(results.NS) ? (results.NS as string[]) : [];
    const providers = getProviderFromNameServers(nameServers);
    
    res.json({ domain, results, providers });
  } catch (error) {
    console.error("Error resolving DNS records:", error);
    return res.status(500).json({ error: "Failed to resolve DNS records" });
  }
});