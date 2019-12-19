const db = require('./../data/dbConfig.js');


function getAccounts(){
    return db('accounts')
}

function getAccountsAt(id) {
    return db('accounts').where({id: id});
}

function postAccount({name, budget}){
    return db('accounts').insert({name, budget});
}

function deleteAccount(id) {
    return db('accounts').where({id: id}).del();
}
function updateAccount(id, {name, budget}){
    return db('accounts').where({id: id}).update({name, budget})
}
module.exports = {
    getAccounts,
    getAccountsAt,
    postAccount,
    deleteAccount,
    updateAccount
}

