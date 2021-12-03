// add middlewares here related to projects
const Projects = require('../projects/projects-model')




async function checkId (req, res, next) {
    try{
        const action = await Projects.get(req.params.id || req.body.project_id)
        if(!action) {
            next ({
                status: 404,
                message: "Project not found",
            })
        } else {
            next()
        }
    } catch (err){
        next(err)
    }
}

function checkCompletion(req, res, next){
    req.body.completed === undefined ?
    next({ status: 400, message: 'completion status required'}) :
    next()
}

module.exports = {
    checkCompletion,
    checkId,
}