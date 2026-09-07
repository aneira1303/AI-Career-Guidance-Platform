import React, { useEffect, useState } from "react";

import StatCard from "../components/StatCard";

const colors = {
    blue: "#2a5caa",
    blueLight: "#eaf1fb",
    red: "#c0463a",
    brown: "#7a5230",
    brownLight: "#f3ece2",
    bg: "#faf6f0",
    surface: "#ffffff",
    text: "#2b2117",
    textMuted: "#7d6e5d",
    textFaint: "#a89a89",
    border: "#e7dccb"
};

const styles = {
    page: {
        maxWidth: "1300px",
        margin: "0 auto",
        padding: "40px 30px 80px",
        fontFamily: "Inter, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        color: colors.text
    },
    pageHeader: {
        marginBottom: "32px"
    },
    heading: {
        fontSize: "32px",
        letterSpacing: "-0.6px",
        color: colors.text,
        margin: 0
    },
    subheading: {
        marginTop: "6px",
        color: colors.textMuted,
        fontSize: "14px",
        maxWidth: "560px"
    },
    statsGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "20px",
        marginBottom: "32px"
    },
    dashboardGrid: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "20px"
    },
    panel: {
        background: colors.surface,
        border: `1px solid ${colors.border}`,
        borderRadius: "18px",
        padding: "26px",
        boxShadow: "0 5px 20px rgba(74, 50, 32, 0.04)"
    },
    panelHeader: {
        paddingBottom: "18px",
        marginBottom: "18px",
        borderBottom: `1px solid ${colors.border}`
    },
    panelTitle: {
        fontSize: "17px",
        color: colors.text,
        margin: 0
    },
    panelSubtitle: {
        marginTop: "4px",
        fontSize: "13px",
        color: colors.textMuted
    },
    activityList: {
        display: "flex",
        flexDirection: "column",
        gap: "14px"
    },
    activityItem: {
        display: "flex",
        alignItems: "center",
        gap: "14px",
        padding: "12px 0",
        borderBottom: `1px solid ${colors.border}`
    },
    activityItemLast: {
        borderBottom: "none",
        paddingBottom: 0
    },
    activityIcon: {
        width: "38px",
        height: "38px",
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: colors.blueLight,
        borderRadius: "10px",
        fontSize: "16px"
    },
    activityText: {
        display: "block",
        fontSize: "14px",
        color: colors.text
    },
    activityTime: {
        color: colors.textFaint,
        fontSize: "12px"
    },
    rankingList: {
        display: "flex",
        flexDirection: "column",
        gap: "12px"
    },
    rankingRow: {
        display: "flex",
        alignItems: "center",
        gap: "14px",
        padding: "10px 0",
        borderBottom: `1px solid ${colors.border}`
    },
    rankingRowLast: {
        borderBottom: "none",
        paddingBottom: 0
    },
    rankingNumber: {
        width: "26px",
        fontSize: "12px",
        fontWeight: 800,
        color: colors.brown
    },
    rankingName: {
        flex: 1,
        fontSize: "14px",
        fontWeight: 600,
        color: colors.text
    },
    rankingScore: {
        fontSize: "13px",
        fontWeight: 800,
        color: colors.red
    }
};

const activityFeed = [
    { icon: "👤", text: "New student registered", time: "5 minutes ago" },
    { icon: "🤖", text: "AI recommendation generated", time: "15 minutes ago" },
    { icon: "📄", text: "Resume analyzed", time: "30 minutes ago" },
    { icon: "🎯", text: "Skill-gap assessment completed", time: "1 hour ago" }
];

const popularCareers = [
    { rank: "01", name: "Software Engineer", score: "94%" },
    { rank: "02", name: "Data Scientist", score: "89%" },
    { rank: "03", name: "AI Engineer", score: "87%" },
    { rank: "04", name: "Cloud Engineer", score: "81%" },
    { rank: "05", name: "Cybersecurity Analyst", score: "78%" }
];

const AdminDashboard = () => {

    const [stats, setStats] = useState({
        users: 0,
        activeUsers: 0,
        assessments: 0,
        recommendations: 0
    });


    useEffect(() => {

        const loadDashboard = async () => {

            try {

                const token =
                    localStorage.getItem("token");

                const response =
                    await fetch(
                        "http://localhost:5000/api/admin/dashboard",
                        {
                            headers: {
                                Authorization:
                                    `Bearer ${token}`
                            }
                        }
                    );

                const data =
                    await response.json();

                if (data.success) {

                    setStats({
                        users:
                            data.totalUsers || 0,

                        activeUsers:
                            data.activeUsers || 0,

                        assessments:
                            data.assessments || 0,

                        recommendations:
                            data.recommendations || 0
                    });
                }

            } catch (error) {

                console.error(
                    "Dashboard error:",
                    error
                );
            }
        };


        loadDashboard();

    }, []);


    return (
        <div style={styles.page}>

            <div style={styles.pageHeader}>
                <h1 style={styles.heading}>Dashboard</h1>
                <p style={styles.subheading}>
                    Monitor your AI Career Intelligence Platform.
                </p>
            </div>

            <div style={styles.statsGrid}>

                <StatCard
                    title="Total Users"
                    value={stats.users}
                    change="+12%"
                    icon="👥"
                />

                <StatCard
                    title="Active Users"
                    value={stats.activeUsers}
                    change="+8%"
                    icon="🟢"
                />

                <StatCard
                    title="Assessments"
                    value={stats.assessments}
                    change="+18%"
                    icon="📝"
                />

                <StatCard
                    title="AI Recommendations"
                    value={stats.recommendations}
                    change="+24%"
                    icon="🤖"
                />

            </div>

            <div style={styles.dashboardGrid}>

                <div style={styles.panel}>

                    <div style={styles.panelHeader}>
                        <h3 style={styles.panelTitle}>Platform Activity</h3>
                        <p style={styles.panelSubtitle}>Recent system activity</p>
                    </div>

                    <div style={styles.activityList}>
                        {activityFeed.map((item, index) => (
                            <div
                                key={item.text}
                                style={{
                                    ...styles.activityItem,
                                    ...(index === activityFeed.length - 1
                                        ? styles.activityItemLast
                                        : {})
                                }}
                            >
                                <span style={styles.activityIcon}>{item.icon}</span>
                                <div>
                                    <strong style={styles.activityText}>{item.text}</strong>
                                    <br />
                                    <small style={styles.activityTime}>{item.time}</small>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>

                <div style={styles.panel}>

                    <div style={styles.panelHeader}>
                        <h3 style={styles.panelTitle}>Popular Careers</h3>
                        <p style={styles.panelSubtitle}>Most recommended careers</p>
                    </div>

                    <div style={styles.rankingList}>
                        {popularCareers.map((career, index) => (
                            <div
                                key={career.rank}
                                style={{
                                    ...styles.rankingRow,
                                    ...(index === popularCareers.length - 1
                                        ? styles.rankingRowLast
                                        : {})
                                }}
                            >
                                <span style={styles.rankingNumber}>{career.rank}</span>
                                <strong style={styles.rankingName}>{career.name}</strong>
                                <b style={styles.rankingScore}>{career.score}</b>
                            </div>
                        ))}
                    </div>

                </div>

            </div>

        </div>
    );
};

export default AdminDashboard;
