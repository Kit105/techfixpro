import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faFileCirclePlus,
    faFilePen,
    faUserGear,
    faUserPlus,
    faRightFromBracket
} from "@fortawesome/free-solid-svg-icons"
import { useNavigate, useLocation } from 'react-router-dom'
import { useSendLogoutMutation } from '../features/auth/authApiSlice'
import useAuth from '../hooks/useAuth'
import PulseLoader from 'react-spinners/PulseLoader'
import { LiaSearchengin } from "react-icons/lia";
import { FaUser } from "react-icons/fa";

// const DASH_REGEX = /^\/dash(\/)?$/
const NOTES_REGEX = /^\/dash\/notes(\/)?$/
const USERS_REGEX = /^\/dash\/users(\/)?$/

const DashHeader = () => {
    const { username, isManager, isAdmin } = useAuth()

    const navigate = useNavigate()
    const { pathname } = useLocation()
    const onGoHomeClicked = () => navigate('/dash')

    const [sendLogout, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation()

    useEffect(() => {
        if (isSuccess) navigate('/')
    }, [isSuccess, navigate])

    const onNewNoteClicked = () => navigate('/dash/notes/new')
    const onNewUserClicked = () => navigate('/dash/users/new')
    const onNotesClicked = () => navigate('/dash/notes')
    const onUsersClicked = () => navigate('/dash/users')


    let newNoteButton = null
    if (NOTES_REGEX.test(pathname)) {
        newNoteButton = (
            <div className="tooltip tooltip-bottom" data-tip="New Note">

                <button
                    className="btn btn-circle text-4xl mx-2"
                    title="New Note"
                    onClick={onNewNoteClicked}
                >
                    <FontAwesomeIcon icon={faFileCirclePlus} />
                </button>
            </div>
        )
    }

    let newUserButton = null
    if (USERS_REGEX.test(pathname)) {
        newUserButton = (
            <div className="tooltip tooltip-bottom" data-tip="New User">

                <button
                    className="btn btn-circle text-4xl mx-2"
                    title="New User"
                    onClick={onNewUserClicked}
                >
                    <FontAwesomeIcon icon={faUserPlus} />
                </button>
            </div>
        )
    }

    let userButton = null
    if (isManager || isAdmin) {
        if (!USERS_REGEX.test(pathname) && pathname.includes('/dash')) {
            userButton = (
                <div className="tooltip tooltip-bottom" data-tip="Users">

                    <button
                        className="btn btn-circle text-4xl mx-2"
                        title="Users"
                        onClick={onUsersClicked}
                    >
                        <FontAwesomeIcon icon={faUserGear} />
                    </button>
                </div>
            )
        }
    }

    let notesButton = null
    if (!NOTES_REGEX.test(pathname) && pathname.includes('/dash')) {
        notesButton = (
            <div className="tooltip tooltip-bottom" data-tip="Notes">

                <button
                    className="btn btn-circle text-4xl mx-2"
                    title="Notes"
                    onClick={onNotesClicked}
                >
                    <FontAwesomeIcon icon={faFilePen} />
                </button>
            </div>
        )
    }

    const logoutButton = (
        <div className="tooltip tooltip-bottom" data-tip="logout">

            <button
                className="btn btn-circle text-4xl mx-2"
                title="Logout"
                onClick={sendLogout}
            >
                <FontAwesomeIcon icon={faRightFromBracket} />
            </button>
        </div>
    )

    const errClass = isError ? "errmsg" : "offscreen"

    let buttonContent
    if (isLoading) {
        buttonContent = <PulseLoader color={"#FFF"} />
    } else {
        buttonContent = (
            <>
                {newNoteButton}
                {newUserButton}
                {notesButton}
                {userButton}
                {logoutButton}
            </>
        )
    }

    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <header className="dash-header">
                <div className="navbar bg-base-100">
                    <div className="navbar-start">
                        <div className="avatar placeholder">
                            <div className="bg-neutral text-neutral-content rounded-full w-10">
                                <FaUser />
                            </div>
                        </div>
                        <span className="text-2xl mx-2">{username}</span>
                    </div>
                    <div className="navbar-center">
                        <button className="btn btn-ghost text-3xl" onClick={onGoHomeClicked} ><LiaSearchengin /> techFix Pro</button>
                    </div>
                    <div className="navbar-end">

                        <label className="swap swap-rotate mx-3">

                            {/* this hidden checkbox controls the state */}
                            <input type="checkbox" className="mx-5 theme-controller" value="emerald" />

                            {/* sun icon */}
                            <svg className="swap-on fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>

                            {/* moon icon */}
                            <svg className="swap-off fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>

                        </label>
                        {buttonContent}


                    </div>
                </div>
            </header>
        </>
    )

    return content
}
export default DashHeader