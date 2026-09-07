import {
    useParams
} from "react-router-dom";

import Navbar
    from "../components/common/Navbar";

import Sidebar
    from "../components/common/Sidebar";


const CareerDetails = () => {

    const {
        id
    } = useParams();


    return (

        <div className="dashboard-layout">

            <Navbar />

            <div className="dashboard-body">

                <Sidebar />


                <main className="dashboard-content">

                    <div className="page-header">

                        <h1>
                            Career Details
                        </h1>

                        <p>
                            Career ID: {id}
                        </p>

                    </div>


                    <div className="dashboard-card">

                        <h2>
                            Career information
                        </h2>

                        <p>
                            Detailed career information
                            will be loaded from the
                            backend API.
                        </p>

                    </div>

                </main>

            </div>

        </div>

    );

};


export default CareerDetails;