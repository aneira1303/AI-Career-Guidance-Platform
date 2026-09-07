import React from "react";
import "../styles/StatCard.css";

function StatCard({ title, value, change, icon }) {
    return (
        <div className="stat-card">

            <div className="stat-card-top">

                <div className="stat-card-icon">
                    {icon}
                </div>

                <span className="stat-card-change">
                    {change}
                </span>

            </div>

            <p className="stat-card-title">
                {title}
            </p>

            <h2 className="stat-card-value">
                {value}
            </h2>

        </div>
    );
}

export default StatCard;