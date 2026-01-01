import { useState } from 'react';
import './App.css';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SearchBox } from './components/SearchBox';
import { QuickActions } from './components/QuickActions';
import { RecordsGrid } from './components/RecordsGrid';
import { LoadingState } from './components/LoadingState';
import { lookupDNS } from './services/dnsService';
import type { DNSResponse } from './types/dns.types';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<DNSResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [responseTime, setResponseTime] = useState<number | undefined>();
  const [currentDomain, setCurrentDomain] = useState<string>('');

  const handleSearch = async (domain: string) => {
    setIsLoading(true);
    setError(null);
    setCurrentDomain(domain);

    const result = await lookupDNS(domain);

    setIsLoading(false);
    setResponseTime(result.responseTime);

    if (result.error) {
      setError(result.error);
      setResults(null);
    } else {
      setResults(result.data);
    }
  };

  const handleRefresh = () => {
    if (currentDomain) {
      handleSearch(currentDomain);
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Animated star background */}
      <div className="stars-bg"></div>

      {/* Gradient overlay */}
      <div className="fixed inset-0 hero-gradient pointer-events-none"></div>

      {/* Main content */}
      <div className="relative z-10">
        <Header />
        <Hero />

        <SearchBox
          onSearch={handleSearch}
          isLoading={isLoading}
          responseTime={responseTime}
          currentDomain={currentDomain}
          provider={results?.providers?.[0]}
        />

        <QuickActions
          onRefresh={handleRefresh}
          isLoading={isLoading}
        />

        {/* Error state */}
        {error && (
          <div className="max-w-4xl mx-auto px-6 mt-8">
            <div className="glass-card p-6 border-red-500/50 animate-fadeIn">
              <div className="flex items-center gap-3 text-red-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">{error}</span>
              </div>
            </div>
          </div>
        )}

        {/* Loading state */}
        {isLoading && <LoadingState />}

        {/* Results */}
        {!isLoading && results && (
          <RecordsGrid
            results={results.results}
            responseTime={responseTime}
          />
        )}
      </div>
    </div>
  );
}

export default App;
