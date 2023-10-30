const mysql2 = require('mysql2')

const configDB = {
    host: "localhost",
    user: "root",
    password: "mt2109",
    database: "courses"
}

class CoursesController {
    async getListCourses(req, res, next) {
        try {
            var con = mysql2.createConnection(configDB);

            const listCourses = await new Promise((resolve, reject) => {
                con.query(`SELECT * FROM courses`, (err, row) => {
                    if (err) reject(err);
                    resolve(row);
                })
            })
            res.status(200).send(listCourses);
        } catch (err) {
            res.status(500).send(err);
        }
    }
    async addCourse(req, res, next) {
        try {
            var data = req.body
            var con = mysql2.createConnection(configDB);
            const listCourses = await new Promise((resolve, reject) => {
                con.query(`INSERT INTO courses(name,description,coin) VALUES ('${data.name}','${data.description}','${data.coin}') `, (err, row) => {
                    if (err) reject(err);
                    resolve(row);
                })
            })
            res.status(200).send(listCourses);
        } catch (err) {
            res.status(500).send(err);
            console.log(err);
        }
    }
    async editCourse(req, res, next) {
        try {
            var data = req.body
            var con = mysql2.createConnection(configDB);
            const listCourses = await new Promise((resolve, reject) => {
                con.query(`UPDATE courses SET name = '${data.name}', description = '${data.description}',coin='${data.coin}' WHERE id = '${data.id}' `, (err, row) => {
                    if (err) reject(err);
                    resolve(row);
                })
            })
            res.status(200).send(listCourses);
        } catch (err) {
            res.status(500).send(err);
            console.log(err);
        }
    }
    async deleteCourse(req, res, next) {
        try {
            var id = req.params.id
            console.log(id);
            var con = mysql2.createConnection(configDB);
            const listCourses = await new Promise((resolve, reject) => {
                con.query(`DELETE FROM courses WHERE id = ${id} `, (err, row) => {
                    if (err) reject(err);
                    resolve(row);
                })
            })
            res.status(200).send(listCourses);
        } catch (err) {
            res.status(500).send(err);
            console.log(err);
        }
    }
}
module.exports = new CoursesController();