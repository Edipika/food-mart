import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {login} from '../../slice/authSlice'



function Login() {
    const dispatch = useDispatch();
    const [login, setLogin] = useState({
        email: '',
        password: '',
    });

    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const handleClick = (e) => {
        const { name, value } = e.target;
        setLogin((prevLogin) => ({
            ...prevLogin,
            [name]: value
        }));
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/adminLogin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(login),
            });

            const data = await response.json();
            // ok = (status in the range 200-299)
            if (!response.ok) {
                setIsError(true); // Set error state
                setMessage(data.message || 'Something went wrong.'); // Display error message
                return;
            }

            const { token } = data; // Destructure the token from the response
            localStorage.setItem('token', token);

            dispatch

            // console.log('Category added:', data);
            setIsError(false); // Reset error state
            setMessage(data.message);

            // Reset the form after successful submission
            setLogin({
                email: '',
                password: ''
            });
        } catch (error) {
            console.error('Error adding user :', error);
        }

    }

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
                            onChange={handleClick}
                            value={login.email}
                            required
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
                            onChange={handleClick}
                            value={login.password}
                            required
                            className="w-full p-2 rounded-md bg-gray-200 text-gray-950 border border-gray-400 focus:border-slate-500 focus:ring focus:ring-slate-300 focus:ring-opacity-50"
                            placeholder="********"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full p-2 bg-gray-950 text-slate-300 rounded-md hover:bg-gray-800 transition duration-200"
                    >
                        Submit
                    </button>
                    {message && (
                    <div className={`mt-4 text-center p-2 rounded-md ${isError ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
                        {message}
                    </div>
                )}
                </form>
            </div>
            {/* Displaying the message */}
            {/* {message && (
                <div className=''>
                    {message}
                </div>
            )} */}
        </div>
    );
}

export default Login;