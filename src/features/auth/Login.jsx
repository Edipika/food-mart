import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'

function Login() {

    const userRef = useRef()
    const errRef = useRef()
    const role = 3;
    const [email, setEmail] = useState('')
    const [pwd, setPwd] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const navigate = useNavigate()
    const token = useSelector(state => state.auth.token);


    const dispatch = useDispatch()
    //doudt on is loading
    const [login, { isLoading }] = useLoginMutation();

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [email, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const userData = await login({ email, pwd, role }).unwrap()
            console.log("user data after logging in ", userData);
            console.log("userData", userData)
            dispatch(setCredentials({ ...userData }))
            setEmail('')
            setPwd('')
            console.log('Token from Redux State:', token);
            if (userData.role == 1 || userData.role == 2) {
                navigate('/product')
            } else {
                navigate('/')
            }

        } catch (err) {
            console.error("ERROR occoured during login", err);
            if (!err?.status) {
                // isLoading: true until timeout occurs
                setErrMsg('No Server Response');
            } else if (err.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.status === 401) {
                setErrMsg('Incorrect password');
            } else {
                setErrMsg('Login Failed');
            }
            if (errRef.current) {
                errRef.current.focus();
            }
        }
    }
    return (
        <div className="h-screen w-full  flex justify-center items-center">
            <div className="w-1/4 bg-orange-100 flex flex-col justify-center items-center p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-gray-950">Login</h2>
                <form onSubmit={handleSubmit} className="w-full">
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-950 mb-1">Enter Email:</label>
                        {/* <input
                            type="text"
                            id="username"
                            ref={userRef}
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                            // autoComplete="off"
                            className="w-full p-2 rounded-md bg-gray-200 text-gray-950 border border-gray-400 focus:border-slate-500 focus:ring focus:ring-slate-300 focus:ring-opacity-50"
                            placeholder="example@example.com"
                            required
                        /> */}
                        <input
                            type="email"
                            id="email"
                            ref={userRef}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 rounded-md bg-gray-200 text-gray-950 border border-gray-400 focus:border-slate-500 focus:ring focus:ring-slate-300 focus:ring-opacity-50"
                            placeholder="example@example.com"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-950 mb-1" >Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={pwd}
                            onChange={(e) => setPwd(e.target.value)}
                            className="w-full p-2 rounded-md bg-gray-200 text-gray-950 border border-gray-400 focus:border-slate-500 focus:ring focus:ring-slate-300 focus:ring-opacity-50"
                            placeholder="********"
                            required
                        />

                    </div>
                    <p ref={errRef} className={errMsg ? "text-red-600 text-sm font-medium" : "hidden"} aria-live="assertive">{errMsg}</p>
                    <button
                        type="submit"
                        className="w-full p-2 bg-gray-950 text-slate-300 rounded-md hover:bg-gray-800 transition duration-200"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login