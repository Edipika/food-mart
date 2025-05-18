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
                    <div className="h-screen w-full  flex justify-center items-center">
                        <div className="w-1/4 bg-orange-100 flex flex-col justify-center items-center p-6 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-bold mb-4 text-gray-950">Admin Register</h2>
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
                                        className="w-full p-2 rounded-md bg-gray-200 text-gray-950 border border-gray-400 focus:border-slate-500 focus:ring focus:ring-slate-300 focus:ring-opacity-50"
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
                                        onChange={(e) => setPwd(e.target.value)}
                                        value={pwd}
                                        required
                                        className="w-full p-2 rounded-md bg-gray-200 text-gray-950 border border-gray-400 focus:border-slate-500 focus:ring focus:ring-slate-300 focus:ring-opacity-50"
                                        placeholder="********"
                                    />
                                </div>
                                <p ref={errRef} className={errMsg ? "text-red-600 text-sm font-medium" : "hidden"} aria-live="assertive">{errMsg}</p>
                                <button
                                    type="submit"
                                    className="w-full p-2 bg-gray-950 text-slate-300 rounded-md hover:bg-gray-800 transition duration-200"
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