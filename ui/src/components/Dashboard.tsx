import { useState, useEffect } from 'react';
import { fetchUser } from '../api';
import { User } from '../types';
import './Dashboard.css';

function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // The dashboard UI must be directly accessible via its URL without any login prompt.
  // This useEffect fetches data on component mount, demonstrating direct accessibility.
  useEffect(() => {
    // A hardcoded user ID is used to satisfy the GET /api/users/{userId} example.
    const userIdToFetch = '1';

    const loadUserData = async () => {
      try {
        setIsLoading(true);
        // Adhering to the 'No Authentication' assumption, this call is made without any tokens.
        const fetchedUser = await fetchUser(userIdToFetch);
        setUser(fetchedUser);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'An unknown error occurred.');
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, []); // Empty dependency array ensures this runs only once when the component mounts.

  return (
    <section className="dashboard-widget">
      <header>
        <h1>Dashboard</h1>
        <p className="description">Ensures the dashboard and its underlying API are accessible without any authentication.</p>
      </header>
      <div className="content">
        <h2>User Information</h2>
        {isLoading && <p>Loading...</p>}
        {error && <p className="error">Failed to load user data: {error}</p>}
        {user && (
          <div className="user-details">
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Dashboard;
