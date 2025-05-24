import { useRef, useState, useEffect } from 'react';
import { useRegisterMutation } from './authApiSlice.js';
import { useNavigate } from 'react-router-dom'

function Register() {
    const [registerUser, { isLoading, error }] = useRegisterMutation();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const role = 3;//role_id 3 is for users and 1 and 2 for superadmin and admin
    const errRef = useRef();
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate()

    useEffect(() => {
        setErrMsg('');
    }, [name, pwd, email])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await registerUser({ name, email, pwd, role }).unwrap();
            // console.log(JSON.stringify(response?.data));
            setSuccess(true);
            //clear state and controlled inputs
            setName('');
            setEmail('');
            setPwd('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            {success ? navigate('/login')
                : (
                    <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4">
                        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 space-y-6">

                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <div className="text-xl font-bold">
                                        <span className="text-gray-800">FOOD</span>
                                        <span className="text-yellow-500">MART</span>
                                        <div className="text-xs text-gray-500">GROCERY STORE</div>
                                    </div>
                                </div>
                                <div className="text-sm font-medium text-gray-700">Delivery in 7 Mins</div>
                            </div>


                            <h2 className="text-3xl font-bold text-center text-gray-800">Log In</h2>


                            <form onSubmit={handleSubmit} className="w-full">
                                <div className="mb-4">
                                    <label htmlFor="username" className="block text-gray-950 mb-1">Enter Username:</label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="username"
                                        onChange={(e) => setName(e.target.value)}
                                        value={name}
                                        required
                                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                        placeholder="example@example.com"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-gray-950 mb-1">Enter Email:</label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        onChange={(e) => setEmail(e.target.value)}
                                        value={email}
                                        required
                                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                        placeholder="example@example.com"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="password" className="block text-gray-950 mb-1">Enter Password:</label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        onChange={(e) => setPwd(e.target.value)}
                                        value={pwd}
                                        required
                                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                        placeholder="********"
                                    />
                                </div>
                                <p ref={errRef} className={errMsg ? "text-red-600 text-sm font-medium" : "hidden"} aria-live="assertive">{errMsg}</p>
                                <button
                                    type="submit"
                                     className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-3 rounded-lg transition duration-300"
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>

                )}

        </>

    );
}

export default Register;