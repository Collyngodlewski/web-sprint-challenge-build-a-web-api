// Write your "projects" router here!
const express = require('express')
const Projects = require('./projects-model')
const { checkCompletion, checkId} = require('./projects-middleware')
const router = express.Router()

router.get("/", async(req, res, next) => {
    try {
        const projects = await Projects.get();
        res.status(200).json(projects);
    }
    catch (err) {
        next(err);
    }
})

router.get("/:id", async (req, res, next) => {
    const { id } = req.params
    try {
        const project = await Projects.get(id)
        if(!project) {
            res.status(404).json({
                message: "Project not found"
            })
        } else {
            res.status(200).json(project)
        }
    } catch (err) {
        next(err)
    }
})

router.post("/",  async (req, res, next) => {
    try{
        const newProject = await Projects.insert(req.body)
        res.status(201).json(newProject)
    } catch (err) {
        next(err);
    }
})

router.put("/:id", checkCompletion, checkId, async (req, res, next) => {
    if (req.body.completed === undefined) {
        next({ status: 400, message: "missing fields"})
    } else {
        try {
            const updatedAction = await Projects.update(req.params.id, req.body)
            res.status(200).json(updatedAction)
        } catch (err) {
            next(err)
        }
    }
})

router.delete("/:id", checkId, async (req, res, next) => {
    try {
        await Projects.remove(req.params.id)
        res.status(200).send("Deleted project")
    } catch (err) {
        next(err)
    }
})

router.get('/:id/actions', checkId, async (req, res, next) => {
    try {
        const projects = await Projects.getProjectActions(req.params.id)
        res.status(200).json(projects)
    } catch (err) {
        next(err)
    }
})



module.exports = router