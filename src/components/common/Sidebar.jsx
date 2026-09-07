import {
    NavLink
} from "react-router-dom";

import {
    LayoutDashboard,
    User,
    Briefcase,
    ClipboardCheck,
    Brain,
    BookOpen,
    FileText,
    Search,
    Settings
} from "lucide-react";


const Sidebar = () => {

    const links = [

        {
            path: "/dashboard",
            label: "Dashboard",
            icon: LayoutDashboard
        },

        {
            path: "/profile",
            label: "My Profile",
            icon: User
        },

        {
            path: "/careers",
            label: "Career Recommendations",
            icon: Briefcase
        },

        {
            path: "/assessments",
            label: "Assessments",
            icon: ClipboardCheck
        },

        {
            path: "/skills",
            label: "Skill Gap",
            icon: Brain
        },

        {
            path: "/roadmap",
            label: "Learning Roadmap",
            icon: BookOpen
        },

        {
            path: "/resume",
            label: "Resume",
            icon: FileText
        },

        {
            path: "/jobs",
            label: "Jobs",
            icon: Search
        },

        {
            path: "/settings",
            label: "Settings",
            icon: Settings
        }

    ];


    return (

        <aside className="sidebar">

            <div className="sidebar-title">
                CareerAI
            </div>


            <div className="sidebar-links">

                {links.map((link) => {

                    const Icon =
                        link.icon;

                    return (

                        <NavLink
                            key={link.path}
                            to={link.path}
                            className={({
                                isActive
                            }) =>
                                isActive
                                    ? "sidebar-link active"
                                    : "sidebar-link"
                            }
                        >

                            <Icon
                                size={19}
                            />

                            <span>
                                {link.label}
                            </span>

                        </NavLink>

                    );

                })}

            </div>

        </aside>

    );

};


export default Sidebar;