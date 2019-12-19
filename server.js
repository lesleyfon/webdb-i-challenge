const express = require('express');

const db = require('./helper/accounts');
const server = express();

server.use(express.json());

server.get('/accounts', async (req, res, next) => {
    res.status(200).json(await db.getAccounts());
});


server.get('/accounts/:id', async (req, res, next) => {
    const id = req.params.id;
    if(!id){
        return res.status(500).json({
            message: 'Please make sure you are providing the correct id'
        });
    }

    try {
        const account = await db.getAccountsAt(id).first();
        !account ? 
        res.status(500).json({
            message: `Couldn't find account data at Id = ${id}`
        }) 
        :
        res.status(200).json(account) 
    } catch (error) {
        next(error)
    }

});


server.post('/accounts', async (req, res, next) => {
    const { name, budget } = req.body;
    if(!name || !budget){
        return res.status(500).json({
            message: 'Please make sure you are providing Account name and Account Budget'
        });
    }
    try {
        const account = await db.postAccount({name, budget})
        res.status(200).json({
            message: 'Post Successful',
            id: account[0]
        }) 
    } catch (error) {
        next(error);
    }
});

server.delete('/accounts/:id', async (req, res, next) => {
    const id = req.params.id;
    if(!id){
        return res.status(500).json({
            message: 'Please make sure you are providing the correct id'
        });
    }

    try {
        const account = await db.deleteAccount(id);

        !account 
            ? 
        res.status(500).json({
            message: `Couldn't find account data at Id = ${id} to delete`
        }) 
            :
        res.status(200).json(account); 
    } catch (error) {
        next(error);
    }

});



server.put('/accounts/:id', async (req, res, next) => {
    const { name, budget } = req.body;
    const id = req.params.id;
    if(!id){
        return res.status(500).json({
            message: 'Please make sure you are providing the correct id'
        });
    }
    if(!name || !budget){
        return res.status(500).json({
            message: 'Please make sure you are providing Account name and Account Budget'
        });
    }
    try {
        const account = await db.updateAccount(id, {name, budget});

        res.status(200).json({
            message: 'Update Successful',
            rowsAffected: account
        });
        
    } catch (error) {
        next(error);
    }
});
module.exports = server;