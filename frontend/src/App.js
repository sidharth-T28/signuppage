import React, { useState } from "react";
import { Login } from "./Login";
import { Register } from "./Register";
import { Welcome } from "./Welcome";
import './App.css';

function App() {
    const [currentForm, setCurrentForm] = useState('login');
    const [loggedInUser, setLoggedInUser] = useState(null);

    const handleLogin = (username) => {
        console.log("Logged in as:", username);
        setLoggedInUser(username);
        setCurrentForm('welcome'); // Update currentForm state to 'welcome' after successful login
    };

    const handleLogout = () => {
        setLoggedInUser(null);
        setCurrentForm('login');
    };

    const toggleForm = (formName) => {
        setCurrentForm(formName);
    };

    return (
        <div className="App">
            {
                loggedInUser ? (
                    <Welcome username={loggedInUser} /> // Render Welcome component if user is logged in
                ) : (
                    currentForm === "login" ? 
                        <Login onFormSwitch={toggleForm} onLogin={handleLogin} /> : 
                        <Register onFormSwitch={toggleForm} onLogin={handleLogin} />
                )
            }
            {loggedInUser && <button onClick={handleLogout}>Logout</button>}
        </div>
    );
}

export default App;
