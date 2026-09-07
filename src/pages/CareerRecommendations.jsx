import { Link } from "react-router-dom";

function CareerRecommendations() {
    return (
        <div>
            <h1>Career Recommendations</h1>

            <p>
                AI Career & Skill-Gap Intelligence
            </p>

            <Link to="/dashboard">
                Back to Dashboard
            </Link>
        </div>
    );
}

export default CareerRecommendations;