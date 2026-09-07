import Navbar
    from "../components/common/Navbar";

import Sidebar
    from "../components/common/Sidebar";


const Settings = () => {

    return (

        <div className="dashboard-layout">

            <Navbar />

            <div className="dashboard-body">

                <Sidebar />

                <main className="dashboard-content">

                    <div className="page-header">

                        <h1>
                            Settings
                        </h1>

                        <p>
                            Manage your account settings.
                        </p>

                    </div>


                    <div className="dashboard-card">

                        <h2>
                            Account Settings
                        </h2>

                        <p>
                            Settings functionality
                            will be implemented here.
                        </p>

                    </div>

                </main>

            </div>

        </div>

    );

};


export default Settings;