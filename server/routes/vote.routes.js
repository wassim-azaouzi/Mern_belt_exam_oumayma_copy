const VoteController = require('../controllers/vote.controller');

module.exports = (app) => {
    app.post('/api/vote', VoteController.createVote);     
    app.get('/api/vote', VoteController.getAllVotes); 
    app.get('/api/vote/:id', VoteController.findVote); 
    app.put('/api/vote/:id', VoteController.updateVote);
    app.delete('/api/vote/:id', VoteController.deleteVote);
}