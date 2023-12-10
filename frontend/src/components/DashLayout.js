import { Outlet } from 'react-router-dom'
import DashHeader from './DashHeader'
import DashFooter from './DashFooter'

const DashLayout = () => {
    return (
        // React.Fragment is a built-in component that allows us to return multiple elements without creating an additional DOM element
        // https://reactjs.org/docs/fragments.html
        <>  
            <DashHeader />
            <div className="dash-container">
                <Outlet />
            </div>
            <DashFooter />
        </>
    )
}
export default DashLayout