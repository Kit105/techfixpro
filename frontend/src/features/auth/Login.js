import { useRef, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'
import usePersist from '../../hooks/usePersist'
import useTitle from '../../hooks/useTitle'
import PulseLoader from 'react-spinners/PulseLoader'
import { LiaSearchengin } from "react-icons/lia";
import { GoHomeFill } from "react-icons/go";

const Login = () => {
    useTitle('Employee Login')

    const userRef = useRef()
    const errRef = useRef()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [persist, setPersist] = usePersist()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login, { isLoading }] = useLoginMutation()

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [username, password])


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { accessToken } = await login({ username, password }).unwrap()
            dispatch(setCredentials({ accessToken }))
            setUsername('')
            setPassword('')
            navigate('/dash')
        } catch (err) {
            if (!err.status) {
                setErrMsg('No Server Response');
            } else if (err.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg(err.data?.message);
            }
            errRef.current.focus();
        }
    }

    const handleUserInput = (e) => setUsername(e.target.value)
    const handlePwdInput = (e) => setPassword(e.target.value)
    const handleToggle = () => setPersist(prev => !prev)

    const errClass = errMsg ? "errmsg" : "offscreen"

    if (isLoading) return <PulseLoader color={"#FFF"} />

    const content = (
        <section className="public">
            <header>
                <div className="navbar bg-base-100">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                <li><a href="#why-us">Why Choose Us?</a></li>
                                <li><a href="#services">Our Services</a></li>
                                <li><a href="#contact">Contact Us</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="navbar-center">
                        <a className="btn btn-ghost text-3xl"><LiaSearchengin /> techFix Pro</a>
                    </div>
                    <div className="navbar-end">

                        <Link to="/" className='btn btn-outline btn-secondary btn-md mx-5'><GoHomeFill /> Back to Home</Link>

                    </div>
                </div>
            </header>
            <main className="container w-full justify-center m-auto grid grid-flow-col grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1">
                {/* <p ref={errRef} className={errClass} aria-live="assertive">{errMsg}</p> */}

                <form className="w-96 max-w-xs justify-center m-auto p-auto grid grid-flow-row grid-rows-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1" onSubmit={handleSubmit}>
                    <div className="label">
                        <span className="label-text" htmlFor="username">Username:</span>
                    </div>
                    {/* <label htmlFor="username">Username:</label> */}
                    <input
                        className="input input-bordered w-full"
                        type="text"
                        id="username"
                        ref={userRef}
                        value={username}
                        onChange={handleUserInput}
                        autoComplete="off"
                        required
                    />
                    <div className="label">
                        <span className="label-text" htmlFor="password">Password:</span>
                    </div>
                    {/* <label htmlFor="password">Password:</label> */}
                    <input
                        className="input input-bordered w-full"
                        type="password"
                        id="password"
                        onChange={handlePwdInput}
                        value={password}
                        required
                    />
                    {/* <label htmlFor="persist" className="form__persist">
                        <input
                            type="checkbox"
                            className="form__checkbox"
                            id="persist"
                            onChange={handleToggle}
                            checked={persist}
                        />
                        Trust This Device
                    </label> */}
                    <div className="form-control mt-2">
                        <label htmlFor="persist" className="cursor-pointer label flex flex-row justify-start">
                            <span className="label-text">Trust This Device</span>
                            <input type="checkbox" defaultChecked className="checkbox checkbox-accent ml-5" id="persist" onChange={handleToggle}
                                checked={persist} />
                        </label>
                    </div>
                    <div className="divider"></div>

                    <button className="btn btn-primary w-full">Sign In</button>



                </form>
            </main>
            <footer>
            </footer>
        </section>
    )

    return content
}
export default Login