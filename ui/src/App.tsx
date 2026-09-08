import React, { useState, useCallback } from 'react';
import { UserDetails as UserDetailsType } from './types';
import { fetchUserDetails } from './api';
import UserDetails from './components/UserDetails';
import ErrorMessage from './components/ErrorMessage';
import './App.css';

function App() {
    const [searchId, setSearchId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<UserDetailsType | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = useCallback(async (event: React.FormEvent) => {
        event.preventDefault();
        if (!searchId.trim()) {
            return;
        }

        // AC1 & AC4: Clear previous results/errors before a new search to prevent stale data.
        setIsLoading(true);
        setResult(null);
        setError(null);

        try {
            const userDetails = await fetchUserDetails(searchId);
            setResult(userDetails);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred.');
            }
        } finally {
            setIsLoading(false);
        }
    }, [searchId]);

    return (
        <main>
            <h1>Manage Display of Search Results</h1>
            <form className="search-form" onSubmit={handleSearch}>
                <input
                    type="text"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    placeholder="Enter user ID (e.g., 1, 2, or 3 for error)"
                    aria-label="User ID"
                />
                <button type="submit" disabled={isLoading || !searchId.trim()}>
                    {isLoading ? 'Searching...' : 'Search'}
                </button>
            </form>

            <div className="results-section">
                {isLoading && <p className="loading-message">Searching for user...</p>}
                
                {/* AC2 & AC3: Display only one outcome (success or error) with distinct styling. */}
                {error && <ErrorMessage message={error} />}
                {result && <UserDetails user={result} />}

                {!isLoading && !error && !result && <p>Please initiate a search.</p>}
            </div>
        </main>
    );
}

export default App;
