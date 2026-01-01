import { useState } from 'react';
import type { KeyboardEvent } from 'react';

interface SearchBoxProps {
    onSearch: (domain: string) => void;
    isLoading: boolean;
    responseTime?: number;
    currentDomain?: string;
    provider?: string;
}

export function SearchBox({ onSearch, isLoading, responseTime, currentDomain, provider }: SearchBoxProps) {
    const [domain, setDomain] = useState('');

    const handleSearch = () => {
        const trimmed = domain.trim();
        if (trimmed && !isLoading) {
            onSearch(trimmed);
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-6">
            <div className="glass-card p-6 glow-purple animate-pulse-glow">
                {/* Domain display header */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                            </svg>
                        </div>
                        <span className="text-white font-semibold text-lg">
                            {currentDomain || 'Enter a domain'}
                        </span>
                    </div>
                    {provider && (
                        <span className="text-gray-400 text-sm">
                            Powered by {provider}
                        </span>
                    )}
                </div>

                {/* Input field */}
                <div className="relative mb-4">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-accent-purple animate-pulse"></div>
                    <input
                        type="text"
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type a domain name (e.g. google.com)"
                        className="w-full bg-dark-800 border border-dark-600 rounded-xl py-4 px-8 text-white placeholder-gray-500 focus:outline-none focus:border-accent-purple transition-colors"
                        disabled={isLoading}
                    />
                </div>

                {/* Bottom row */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white transition-colors text-sm">
                            <span>Styles</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        <button className="p-2 text-gray-400 hover:text-white transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </button>
                        <span className="text-gray-500 text-sm">1:1</span>
                    </div>

                    <div className="flex items-center gap-4">
                        {responseTime !== undefined && (
                            <span className="text-accent-purple text-sm font-medium">
                                Response Time: {responseTime}ms
                            </span>
                        )}
                        <button
                            onClick={handleSearch}
                            disabled={isLoading || !domain.trim()}
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent-purple to-accent-pink text-white font-medium rounded-full hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Searching...</span>
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                    <span>Search DNS</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
