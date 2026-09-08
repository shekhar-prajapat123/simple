import React from 'react';

interface ErrorMessageProps {
    message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
    return (
        <div className="error-message-container">
            <h3 className="error-message-header">Error</h3>
            <p className="error-text">{message}</p>
        </div>
    );
};

export default ErrorMessage;
