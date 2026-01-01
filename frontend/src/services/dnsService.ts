import type { DNSResponse, DNSLookupResult } from '../types/dns.types';

export async function lookupDNS(domain: string): Promise<DNSLookupResult> {
    const startTime = performance.now();

    try {
        const response = await fetch(`/api/dns?endpoint=${encodeURIComponent(domain)}`);
        const endTime = performance.now();
        const responseTime = Math.round(endTime - startTime);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            return {
                data: null,
                error: errorData.error || `HTTP ${response.status}: Failed to resolve DNS records`,
                responseTime,
            };
        }

        const data: DNSResponse = await response.json();

        return {
            data,
            error: null,
            responseTime,
        };
    } catch (err) {
        const endTime = performance.now();
        const responseTime = Math.round(endTime - startTime);

        return {
            data: null,
            error: err instanceof Error ? err.message : 'Network error occurred',
            responseTime,
        };
    }
}
