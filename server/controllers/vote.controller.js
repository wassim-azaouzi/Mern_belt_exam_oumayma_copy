const Vote = require('../models/vote.model');    


module.exports.createVote = (request, response) => {
    Vote.create(request.body) 
        .then(Vote => response.json(Vote))
        .catch(err => response.status(400).json(err))
}

module.exports.getAllVotes = (request, response) => {
    Vote.find({})
        .then(votes => {
            console.log(votes); 
            response.json(votes);
        })
        .catch(err => {
            console.log(err)
            response.json(err)
        })
}
module.exports.findVote = (request, response) => {
    Vote.findOne({_id: request.params.id})
        .then(vote => response.json(vote))
        .catch(err => response.status(400).json(err))}

module.exports.updateVote = (request, response) => {
    Vote.findOneAndUpdate({_id: request.params.id}, request.body, {new:true})
        .then(updatedVote => response.json(updatedVote))
        .catch(err => response.status(400).json(err))}


module.exports.deleteVote = (request, response) => {
    Vote.deleteOne({ _id: request.params.id }) 
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err))
}