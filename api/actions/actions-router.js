// Write your "actions" router here!
const express = require('express')
const Actions = require('./actions-model')
const { checkId, checkCompleted } = require('./actions-middlware')
const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
        const actions = await Actions.get()
        res.status(200).json(actions)
    } catch (err) {
        next(err)
    }
})

router.get('/:id', checkId, (req, res) => {
    res.status(200).json(req.actionById)
})

router.post('/', checkCompleted, checkId, async (req, res, next) => {
    try {
        const newAction = await Actions.insert(req.body)
        res.status(201).json(newAction)
    } catch (err) {
        next(err)
    }
})

router.put("/:id", checkCompleted, checkId, async (req, res, next) => {
    try {
        const updatedAction = await Actions.update(req.params.id, req.body)
        res.status(200).json(updatedAction)
    } catch (err) {
        next(err)
    }
})

router.delete("/:id", checkId, async (req, res, next) => {
    try {
        await Actions.remove(req.params.id)
        res.status(200).send("deleted actions")
    } catch (err) {
        next(err)
    }
})



module.exports = router