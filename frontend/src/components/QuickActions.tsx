interface QuickActionsProps {
    onRefresh: () => void;
    isLoading: boolean;
}

export function QuickActions({ onRefresh, isLoading }: QuickActionsProps) {
    return (
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8 px-6">
            <button className="flex items-center gap-2 px-6 py-3 bg-dark-700 border border-dark-500 text-white rounded-full hover:bg-dark-600 transition-colors text-sm font-medium">
                What's my IP?
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-dark-700 border border-dark-500 text-white rounded-full hover:bg-dark-600 transition-colors text-sm font-medium">
                Check website status
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-dark-700 border border-dark-500 text-white rounded-full hover:bg-dark-600 transition-colors text-sm font-medium">
                View popular DNS records
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
            </button>
            <button
                onClick={onRefresh}
                disabled={isLoading}
                className="p-3 bg-dark-700 border border-dark-500 text-gray-400 rounded-full hover:bg-dark-600 hover:text-white transition-colors disabled:opacity-50"
            >
                <svg className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
            </button>
        </div>
    );
}
