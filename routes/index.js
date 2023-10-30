const coursesRoute = require('./courses')

function route(app){
    app.use('/courses',coursesRoute)
}

module.exports = route;