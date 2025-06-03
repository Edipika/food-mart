import { useRef, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { setCredentials } from './authSlice';
import { useLoginMutation } from './authApiSlice';


function Login() {

    const userRef = useRef()
    const errRef = useRef()
    // const role = 3;
    const [email, setEmail] = useState('')
    const [pwd, setPwd] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const navigate = useNavigate()
    const token = useSelector(state => state.auth.token);
    //console.log("user role ", role); 

    const dispatch = useDispatch()
    //doudt on is loading
    const [login, { isLoading }] = useLoginMutation();

    // useEffect(() => {
    //     userRef.current.focus()
    // }, [])

    useEffect(() => {
        setErrMsg('')
    }, [email, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {

            const userData = await login({ email, pwd, }).unwrap()
            console.log("user data after logging in ", userData);
            // console.log("userData", userData)
            dispatch(setCredentials({ ...userData }))
            setEmail('')
            setPwd('')
            // console.log('Token from Redux State:', token);
            if (userData.role == 1 || userData.role == 2) {  //1 and 2 are for admin and superadmin
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
        
        <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 space-y-6">
                {/* Logo and header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">

                        <div className="text-xl font-bold">
                            <span className="text-gray-800">FOOD</span>
                            <span className="text-yellow-500">MART</span>
                            <div className="text-xs text-gray-500">GROCERY STORE</div>
                        </div>
                    </div>
                    <div className="text-sm font-medium text-gray-700">Delivery in 20 Mins</div>
                </div>

                {/* Form title */}
                <h2 className="text-3xl font-bold text-center text-gray-800">Log In</h2>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4" >
                    <input
                        type="email"
                        id="email"
                        ref={userRef}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        placeholder="example@example.com"
                        required
                    />
                    <input
                        type="password"
                        id="password"
                        value={pwd}
                        onChange={(e) => setPwd(e.target.value)}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400" placeholder="********"
                        required
                    />
                    <p ref={errRef} className={errMsg ? "text-red-600 text-sm font-medium" : "hidden"} aria-live="assertive">{errMsg}</p>
                    <button
                        type="submit"
                        className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-3 rounded-lg transition duration-300"                    >
                        LOG IN
                    </button>
                </form>

                {/* Signup link */}
                <Link
                    to="/register"
                    className="text-blue-700 font-semibold hover:underline"
                >
                    Register
                </Link>
            </div>
        </div>
    );
}

export default Login