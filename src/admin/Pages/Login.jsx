
import React, { useState } from 'react';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission

        try {
            const response = await fetch('http://localhost:5000/auth/login', { // Adjust the URL to your server
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: email, password }), // Sending username as email
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Login successful', data.token);
                localStorage.setItem('authToken', data.token);
            } else {
              
                setErrorMessage(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Error during login:', error);
            setErrorMessage('An error occurred. Please try again later.');
        }
    };
  
    return (
        <div className="h-screen w-full bg-gray-950 flex justify-center items-center">
            <div className="w-1/4 bg-slate-300 flex flex-col justify-center items-center p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-gray-950">Login</h2>
                <form onSubmit={handleSubmit} className="w-full">
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-950 mb-1">Enter Email:</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} // Update email state
                            className="w-full p-2 rounded-md bg-gray-200 text-gray-950 border border-gray-400 focus:border-slate-500 focus:ring focus:ring-slate-300 focus:ring-opacity-50"
                            placeholder="example@example.com"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-950 mb-1">Enter Password:</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} // Update password state
                            className="w-full p-2 rounded-md bg-gray-200 text-gray-950 border border-gray-400 focus:border-slate-500 focus:ring focus:ring-slate-300 focus:ring-opacity-50"
                            placeholder="********"
                        />
                    </div>
                    {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>} {/* Error message */}
                    <button
                        type="submit"
                        className="w-full p-2 bg-gray-950 text-slate-300 rounded-md hover:bg-gray-800 transition duration-200"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;