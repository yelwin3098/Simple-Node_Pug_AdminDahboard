const express = require('express');
const User = require('../models/user');
const { compile } = require('pug');
const router = express.Router();

router.get('/', (req, res) => {
    User.find({}, (err, users) => {
        if (err) {
            res.render(err)
        }
        res.render('admin', { users: users });
    })
});

router.get('/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id, (err, resulr) => {
        if (err) throw console.log(err)
        else {
            console.log('User Deleted');
            res.redirect('/');
        }
    })
})

router.post('/', (req, res) => {
    const newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password
    })
    newUser.save()
        .then(() => {
            console.log('User Created');
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
            res.redirect('/');
        })
})

module.exports = router;