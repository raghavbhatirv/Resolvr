import { useState } from 'react';

interface RecordCardProps {
    title: string;
    records: unknown[];
    icon: React.ReactNode;
    subtitle?: string;
    formatRecord?: (record: unknown) => string;
}

export function RecordCard({ title, records, icon, subtitle, formatRecord }: RecordCardProps) {
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const handleCopy = async (text: string, index: number) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedIndex(index);
            setTimeout(() => setCopiedIndex(null), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const defaultFormat = (record: unknown): string => {
        if (typeof record === 'string') return record;
        if (Array.isArray(record)) return record.join('');
        if (typeof record === 'object' && record !== null) {
            // Handle MX records
            if ('exchange' in record && 'priority' in record) {
                const mx = record as { exchange: string; priority: number };
                return `Priority: ${mx.priority}, ${mx.exchange}`;
            }
            // Handle SOA records
            if ('nsname' in record) {
                const soa = record as { nsname: string; hostmaster: string };
                return `${soa.nsname} (${soa.hostmaster})`;
            }
            // Handle CAA records
            if ('issue' in record || 'issuewild' in record) {
                const caa = record as { issue?: string; issuewild?: string };
                return caa.issue || caa.issuewild || JSON.stringify(record);
            }
            return JSON.stringify(record);
        }
        return String(record);
    };

    const format = formatRecord || defaultFormat;

    if (records.length === 0) {
        return null;
    }

    return (
        <div className="glass-card p-5 animate-fadeIn">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <h3 className="text-white font-semibold">{title}</h3>
                    <span className="px-2 py-0.5 bg-accent-purple/20 text-accent-purple text-xs font-medium rounded-full">
                        {records.length}
                    </span>
                </div>
                <div className="text-gray-500">
                    {icon}
                </div>
            </div>

            {/* Subtitle */}
            {subtitle && (
                <p className="text-gray-500 text-sm mb-4">{subtitle}</p>
            )}

            {/* Records list */}
            <div className="space-y-2">
                {records.map((record, index) => {
                    const displayText = format(record);
                    return (
                        <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-dark-800 rounded-lg group hover:bg-dark-700 transition-colors"
                        >
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                                <div className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0"></div>
                                <span className="text-gray-300 text-sm font-mono truncate">
                                    {displayText}
                                </span>
                            </div>
                            <button
                                onClick={() => handleCopy(displayText, index)}
                                className="ml-2 p-1.5 text-gray-500 hover:text-white opacity-0 group-hover:opacity-100 transition-all"
                                title="Copy to clipboard"
                            >
                                {copiedIndex === index ? (
                                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                ) : (
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
