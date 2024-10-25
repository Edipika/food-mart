import React from 'react';

const Login = () => {
  
    return (
        <div className="h-screen w-full bg-gray-950 flex justify-center items-center">
            <div className="h-1/3 w-1/4 bg-slate-300 flex flex-col justify-center items-center p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-gray-950">Login</h2>
                <form action="" className="w-full">
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-950 mb-1">Enter Email:</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
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
                </form>
            </div>
        </div>


    );
};

export default Login;