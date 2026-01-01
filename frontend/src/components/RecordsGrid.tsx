import type { DNSResults } from '../types/dns.types';
import { RecordCard } from './RecordCard';

interface RecordsGridProps {
    results: DNSResults;
    responseTime?: number;
}

// Icons for different record types
const icons = {
    server: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
        </svg>
    ),
    mail: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
    ),
    document: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
    ),
    globe: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
    ),
    shield: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
    ),
    link: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
    ),
    info: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
};

const recordTypeConfig = {
    A: { title: 'A Records', icon: icons.server, subtitle: 'DNS Records' },
    AAAA: { title: 'AAAA Records', icon: icons.server, subtitle: 'IPv6 Addresses' },
    MX: { title: 'MX Records', icon: icons.mail, subtitle: 'Mail Exchange' },
    TXT: { title: 'TXT Records', icon: icons.document, subtitle: 'Text Records' },
    NS: { title: 'NS Records', icon: icons.globe, subtitle: 'Name Servers' },
    CNAME: { title: 'CNAME Records', icon: icons.link, subtitle: 'Canonical Names' },
    CAA: { title: 'CAA Records', icon: icons.shield, subtitle: 'Certificate Authority' },
    SOA: { title: 'SOA Records', icon: icons.info, subtitle: 'Start of Authority' },
    SRV: { title: 'SRV Records', icon: icons.server, subtitle: 'Service Records' },
    PTR: { title: 'PTR Records', icon: icons.link, subtitle: 'Pointer Records' },
    AFSDB: { title: 'AFSDB Records', icon: icons.server, subtitle: 'AFS Database' },
    NAPTR: { title: 'NAPTR Records', icon: icons.link, subtitle: 'Naming Authority' },
};

export function RecordsGrid({ results, responseTime }: RecordsGridProps) {
    // Priority order for displaying records
    const priorityOrder = ['A', 'MX', 'TXT', 'NS', 'AAAA', 'CNAME', 'CAA', 'SOA', 'SRV', 'PTR', 'AFSDB', 'NAPTR'];

    const hasResults = Object.values(results).some(arr => arr.length > 0);

    if (!hasResults) {
        return (
            <div className="max-w-6xl mx-auto px-6 mt-10">
                <div className="glass-card p-8 text-center">
                    <svg className="w-16 h-16 mx-auto text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-xl font-semibold text-white mb-2">No DNS Records Found</h3>
                    <p className="text-gray-500">This domain doesn't have any DNS records or may not exist.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-6 mt-10 pb-20">
            {responseTime && (
                <div className="text-right mb-4">
                    <span className="text-accent-purple text-sm">
                        Response Time: {responseTime}ms
                    </span>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {priorityOrder.map((type) => {
                    const records = results[type as keyof DNSResults];
                    if (!records || records.length === 0) return null;

                    const config = recordTypeConfig[type as keyof typeof recordTypeConfig];

                    return (
                        <RecordCard
                            key={type}
                            title={config?.title || `${type} Records`}
                            records={records}
                            icon={config?.icon || icons.info}
                            subtitle={config?.subtitle}
                        />
                    );
                })}
            </div>
        </div>
    );
}
