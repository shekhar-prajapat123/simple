import React, { useState } from 'react';
import './UserSearchForm.css';

interface UserSearchFormProps {
  onSearch: (userId: string) => void;
}

const UserSearchForm: React.FC<UserSearchFormProps> = ({ onSearch }) => {
  const [userId, setUserId] = useState<string>('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!userId.trim()) {
      alert('Please enter a User ID.');
      return;
    }
    onSearch(userId.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="user-search-form">
      <div className="form-group">
        <label htmlFor="userIdInput">User ID</label>
        <input
          id="userIdInput"
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Enter user ID"
          required
        />
      </div>
      <button type="submit">Search</button>
    </form>
  );
};

export default UserSearchForm;
