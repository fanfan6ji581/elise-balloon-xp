import { Outlet } from "react-router-dom";
import { Link } from 'react-router-dom';

const TrialLayout = () => {
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="trial">Trial</Link>
                    </li>
                    <li>
                        <Link to="config">Config</Link>
                    </li>
                </ul>
            </nav>
            <Outlet/>
        </>
    )
}

export default TrialLayout
