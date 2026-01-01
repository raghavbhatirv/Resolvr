export type DNSRecordType =
    | 'A'
    | 'AAAA'
    | 'AFSDB'
    | 'CAA'
    | 'CNAME'
    | 'MX'
    | 'NAPTR'
    | 'NS'
    | 'PTR'
    | 'SOA'
    | 'SRV'
    | 'TXT';

export interface MXRecord {
    priority: number;
    exchange: string;
}

export interface SOARecord {
    nsname: string;
    hostmaster: string;
    serial: number;
    refresh: number;
    retry: number;
    expire: number;
    minttl: number;
}

export interface SRVRecord {
    priority: number;
    weight: number;
    port: number;
    name: string;
}

export interface CAARecord {
    critical: number;
    issue?: string;
    issuewild?: string;
    iodef?: string;
}

export interface DNSResults {
    A: string[];
    AAAA: string[];
    AFSDB: string[];
    CAA: CAARecord[];
    CNAME: string[];
    MX: MXRecord[];
    NAPTR: string[];
    NS: string[];
    PTR: string[];
    SOA: SOARecord[];
    SRV: SRVRecord[];
    TXT: string[][];
}

export interface DNSResponse {
    domain: string;
    results: DNSResults;
    providers: string[];
}

export interface DNSLookupResult {
    data: DNSResponse | null;
    error: string | null;
    responseTime: number;
}
