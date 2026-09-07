import {
    Link,
    useNavigate
} from "react-router-dom";

import useAuth
    from "../../hooks/useAuth";


const Navbar = () => {

    const {
        user,
        isAuthenticated,
        logout
    } = useAuth();

    const navigate =
        useNavigate();


    const handleLogout = () => {

        logout();

        navigate("/login");

    };


    return (

        <nav className="navbar">

            <div className="navbar-container">

                <Link
                    to="/"
                    className="logo"
                >
                    CareerAI
                </Link>


                <div className="nav-links">

                    <Link to="/">
                        Home
                    </Link>


                    {isAuthenticated ? (

                        <>

                            <Link to="/dashboard">
                                Dashboard
                            </Link>

                            <Link to="/careers">
                                Careers
                            </Link>

                            <Link to="/profile">
                                Profile
                            </Link>


                            <span className="user-name">
                                {user?.name}
                            </span>


                            <button
                                className="logout-btn"
                                onClick={
                                    handleLogout
                                }
                            >
                                Logout
                            </button>

                        </>

                    ) : (

                        <>

                            <Link to="/login">
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="nav-register"
                            >
                                Register
                            </Link>

                        </>

                    )}

                </div>

            </div>

        </nav>

    );

};


export default Navbar;