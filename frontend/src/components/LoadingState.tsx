export function LoadingState() {
    return (
        <div className="max-w-6xl mx-auto px-6 mt-10 pb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="glass-card p-5 animate-fadeIn">
                        {/* Header skeleton */}
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="skeleton w-24 h-5 rounded"></div>
                                <div className="skeleton w-8 h-5 rounded-full"></div>
                            </div>
                            <div className="skeleton w-5 h-5 rounded"></div>
                        </div>

                        {/* Subtitle skeleton */}
                        <div className="skeleton w-32 h-4 rounded mb-4"></div>

                        {/* Records skeleton */}
                        <div className="space-y-2">
                            {[1, 2, 3].map((j) => (
                                <div key={j} className="flex items-center p-3 bg-dark-800 rounded-lg">
                                    <div className="w-2 h-2 rounded-full bg-dark-600 flex-shrink-0"></div>
                                    <div className="skeleton flex-1 h-4 rounded ml-3"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
