// add middlewares here related to actions
const Actions = require('./actions-model')


async function checkId(req, res, next) {
    try {
        const action = await Actions.get(req.params.id)
        if(!action) {
            next({ status: 404, message: "id was not found"})
        } else {
            req.actionById = action
            next()
        }
    } catch (err) {
        next(err)
    }
}

function checkCompleted(req, res, next) {
    req.body.completed === undefined
      ? next({ status: 400, message: 'Needs to be completed' })
      : next();
  }

module.exports = {
    checkId,
    checkCompleted,
}