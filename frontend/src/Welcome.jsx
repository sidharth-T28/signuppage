import React from "react";

export const Welcome = ({ username }) => {
    return (
        <div className="welcome-container">
            <h2>Welcome, {username}!</h2>
            <p>You are now logged in.</p>
        </div>
    );
};