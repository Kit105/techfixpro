import { useNavigate, useLocation } from 'react-router-dom'
import useAuth from "../hooks/useAuth"
import { FaArrowCircleLeft } from "react-icons/fa";

const DashFooter = () => {

    const { status } = useAuth()

    const navigate = useNavigate()
    const { pathname } = useLocation()

    const onGoHomeClicked = () => navigate('/dash')

    let goHomeButton = null
    if (pathname !== '/dash') {
        goHomeButton = (
            <button
                className="btn text-2xl mx-2"
                title="Home"
                onClick={onGoHomeClicked}
            >
                <FaArrowCircleLeft />Home  
            </button>
        )
    }

    const content = (
        <footer className="footer w-full items-center p-4 bg-neutral text-neutral-content flex align-middle justify-between">
            <div>
                {goHomeButton}
            </div>
            <div>
                <p className='badge badge-secondary'>Status: {status}</p>
            </div>
        </footer>
    )
    return content
}
export default DashFooter