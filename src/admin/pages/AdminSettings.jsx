import React, { useState } from "react";

function AdminSettings() {

    const [settings, setSettings] = useState({
        maintenanceMode: false,
        allowRegistration: true,
        enableAI: true,
        emailNotifications: true
    });


    const handleChange = (event) => {

        const {
            name,
            checked
        } = event.target;

        setSettings({
            ...settings,
            [name]: checked
        });
    };


    return (

        <div className="admin-page">

            <div className="page-header">

                <div>

                    <h1>
                        Settings
                    </h1>

                    <p>
                        Manage CareerAI platform settings.
                    </p>

                </div>

            </div>


            <div className="admin-panel">

                <div className="panel-header">

                    <div>

                        <h3>
                            Platform Settings
                        </h3>

                        <p>
                            Configure system behaviour.
                        </p>

                    </div>

                </div>


                <div className="settings-list">


                    {/* MAINTENANCE */}

                    <div className="setting-item">

                        <div>

                            <strong>
                                Maintenance Mode
                            </strong>

                            <p>
                                Temporarily disable access
                                to the platform.
                            </p>

                        </div>

                        <input
                            type="checkbox"
                            name="maintenanceMode"
                            checked={
                                settings.maintenanceMode
                            }
                            onChange={
                                handleChange
                            }
                        />

                    </div>


                    {/* REGISTRATION */}

                    <div className="setting-item">

                        <div>

                            <strong>
                                Allow Registration
                            </strong>

                            <p>
                                Allow new students to
                                create accounts.
                            </p>

                        </div>

                        <input
                            type="checkbox"
                            name="allowRegistration"
                            checked={
                                settings.allowRegistration
                            }
                            onChange={
                                handleChange
                            }
                        />

                    </div>


                    {/* AI */}

                    <div className="setting-item">

                        <div>

                            <strong>
                                AI Recommendations
                            </strong>

                            <p>
                                Enable AI-powered career
                                recommendations.
                            </p>

                        </div>

                        <input
                            type="checkbox"
                            name="enableAI"
                            checked={
                                settings.enableAI
                            }
                            onChange={
                                handleChange
                            }
                        />

                    </div>


                    {/* EMAIL */}

                    <div className="setting-item">

                        <div>

                            <strong>
                                Email Notifications
                            </strong>

                            <p>
                                Enable system email
                                notifications.
                            </p>

                        </div>

                        <input
                            type="checkbox"
                            name="emailNotifications"
                            checked={
                                settings.emailNotifications
                            }
                            onChange={
                                handleChange
                            }
                        />

                    </div>

                </div>

            </div>

        </div>

    );
}


// ⭐ IMPORTANT
export default AdminSettings;