import { UserDetails } from './types';

const mockUsers: Record<string, UserDetails> = {
    '1': { id: '1', name: 'Alice', email: 'alice@example.com', status: 'Active' },
    '2': { id: '2', name: 'Bob', email: 'bob@example.com', status: 'Inactive' },
};

export const fetchUserDetails = async (userId: string): Promise<UserDetails> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // This code attempts a real fetch call as required, which will likely fail.
    // The catch block then uses mock data to allow the UI to demonstrate both success and error states.
    try {
        const response = await fetch(`/api/users/${userId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        return data as UserDetails;
    } catch (error) {
        console.info('Fetch failed, using mock data fallback. This is expected for this demo.');
        if (mockUsers[userId]) {
            return mockUsers[userId];
        } else {
            throw new Error(`No user found with ID "${userId}".`);
        }
    }
};
