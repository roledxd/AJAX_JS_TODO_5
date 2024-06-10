const express = require('express');
const router = express.Router();
const db = require('../models/index');
const paginate = require('../pagination');
const bcrypt = require('bcrypt');
router.get('/login', async (req, res) => {
    res.render('auth/login.njk');
});
router.post('/login', async (req, res) => {
    
});
router.get('/register', async (req, res) => {
    res.render('auth/register.njk');
});
router.post('/register', async (req, res) => {
    if(!req.body.name){
       return res.redirect('/register');
    }
    if(!req.body.email){
        return res.redirect('/register');
    }
    if(!req.body.password){
        return res.redirect('/register');
    }
    let user = await db.User.count({
        where: {
            email: req.body.email
        }
    });

    if(user>0){
        return res.redirect('/register');
    }
    await db.User.create({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 12)
    });
    return res.redirect('/');
});
module.exports = router;