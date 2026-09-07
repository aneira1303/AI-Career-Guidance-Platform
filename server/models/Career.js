const db = require("../config/database");

const getAll = async () => {
    const [rows] = await db.query(`
        SELECT
            id,
            title,
            description,
            category,
            salary_min,
            salary_max,
            demand_level,
            education_required,
            responsibilities,
            career_path,
            created_at
        FROM careers
        ORDER BY title ASC, id ASC
    `);

    return rows;
};

const findById = async (id) => {
    const [rows] = await db.query(`
        SELECT
            id,
            title,
            description,
            category,
            salary_min,
            salary_max,
            demand_level,
            education_required,
            responsibilities,
            career_path,
            created_at
        FROM careers
        WHERE id = ?
        LIMIT 1
    `, [id]);

    return rows[0] || null;
};

const create = async (career) => {
    const [result] = await db.query(`
        INSERT INTO careers (
            title,
            description,
            category,
            salary_min,
            salary_max,
            demand_level,
            education_required,
            responsibilities,
            career_path
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
        career.title,
        career.description,
        career.category,
        career.salary_min,
        career.salary_max,
        career.demand_level,
        career.education_required,
        career.responsibilities,
        career.career_path
    ]);

    return result.insertId;
};

const update = async (id, career) => {
    const [result] = await db.query(`
        UPDATE careers
        SET
            title = ?,
            description = ?,
            category = ?,
            salary_min = ?,
            salary_max = ?,
            demand_level = ?,
            education_required = ?,
            responsibilities = ?,
            career_path = ?
        WHERE id = ?
    `, [
        career.title,
        career.description,
        career.category,
        career.salary_min,
        career.salary_max,
        career.demand_level,
        career.education_required,
        career.responsibilities,
        career.career_path,
        id
    ]);

    return result.affectedRows > 0;
};

const getUsage = async (id) => {
    const [rows] = await db.query(`
        SELECT
            (SELECT COUNT(*) FROM learning_roadmaps WHERE career_id = ?) AS learning_roadmaps,
            (SELECT COUNT(*) FROM career_comparisons WHERE career_1_id = ? OR career_2_id = ?) AS career_comparisons,
            (SELECT COUNT(*) FROM career_skills WHERE career_id = ?) AS career_skills,
            (SELECT COUNT(*) FROM career_recommendations WHERE career_id = ?) AS career_recommendations,
            (SELECT COUNT(*) FROM skill_gaps WHERE career_id = ?) AS skill_gaps
    `, [id, id, id, id, id, id]);

    return rows[0];
};

const remove = async (id) => {
    const [result] = await db.query(
        "DELETE FROM careers WHERE id = ?",
        [id]
    );

    return result.affectedRows > 0;
};

module.exports = {
    getAll,
    findById,
    create,
    update,
    getUsage,
    remove
};
