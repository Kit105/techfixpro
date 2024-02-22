import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import useTitle from '../../hooks/useTitle'
import { FaNoteSticky } from "react-icons/fa6";
import { FaNotesMedical } from "react-icons/fa6";
import { FaUserGroup } from "react-icons/fa6";
import { FaUserPlus } from "react-icons/fa6";

const Welcome = () => {

    const { username, isManager, isAdmin } = useAuth()

    useTitle(`techFix Pro : ${username}`)

    const date = new Date()
    const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date)

    const content = (
        <section className="welcome">

            <div className="hero min-h-screen" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)'}}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">Welcome {username}!</h1>
                        <p className="mb-5">{today}</p>
                        <p><Link to="/dash/notes" className='btn btn-secondary btn-wide my-3'><FaNoteSticky /> View Notes </Link></p>

                        <p><Link to="/dash/notes/new" className='btn btn-secondary btn-wide my-3'><FaNotesMedical /> Add New Note</Link></p>

                        {(isManager || isAdmin) && <p><Link to="/dash/users" className='btn btn-secondary btn-wide my-3'><FaUserGroup /> View User Settings</Link></p>}

                        {(isManager || isAdmin) && <p><Link to="/dash/users/new" className='btn btn-secondary btn-wide my-3'><FaUserPlus /> Add New User</Link></p>}
                    </div>
                </div>
            </div>

        </section>
    )

    return content
}
export default Welcome