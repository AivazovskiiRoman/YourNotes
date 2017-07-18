const express = require('express');
const router = express.Router();

// Note model
let Note = require('../models/note');

// User model
let User = require('../models/user');

// Add route
router.get('/add', isAuthenticated, function (req, res) {
    res.render('add_note', {
        title: 'Add new note'
    });
});

// Add submit POST route 
router.post('/add', function (req, res) {
    req.checkBody('title', 'Title is required').notEmpty();
    req.checkBody('body', 'Body is required').notEmpty();

    // Get error
    let errors = req.validationErrors();

    if (errors) {
        res.render('add_note', {
            title: 'Add note',
            errors: errors
        });
    } else {
        let note = new Note();
        note.title = req.body.title;
        note.author = req.user._id;
        note.body = req.body.body;

        note.save(function (err) {
            if (err) {
                console.log(err);
                return;
            } else {
                req.flash('success', 'New note added');
                res.redirect('/');
            }
        });
    }
});

// Load edit form
router.get('/edit/:id', isAuthenticated, function (req, res) {
    Note.findById(req.params.id, function (err, note) {
        if (note.author != req.user._id) {
            req.flash('danger', 'Not Autorized');
            res.redirect('/');
        }
        res.render('edit_note', {
            title: 'Edit note',
            note: note
        });
    });
});

// Update submit POST route 
router.post('/edit/:id', function (req, res) {
    let note = {};
    note.title = req.body.title;
    note.author = req.user._id;
    note.body = req.body.body;

    let query = { _id: req.params.id };

    Note.update(query, note, function (err) {
        if (err) {
            console.log(err);
            return;
        } else {
            req.flash('success', 'The note updated');
            res.redirect('/');
        }
    });
});

// Delete note 
router.delete('/:id', function (req, res) {

    if (!req.user._id) {
        res.status(500).send();
    }

    let query = { _id: req.params.id };

    Note.findById(req.params.id, function (err, note) {
        if (note.author != req.user._id) {
            res.status(500).send();
        } else {
            Note.remove(query, function (err) {
                if (err) {
                    console.log(err);
                }
                req.flash('success', 'The note deleted');
                res.send('Success!');
            });
        }
    });
});

// Get single note
router.get('/:id', function (req, res) {
    Note.findById(req.params.id, function (err, note) {
        User.findById(note.author, function (err, user) {
            res.render('note', {
                note: note,
                author: user.name
            });
        });
    });
});

// Access control
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.flash('danger', 'Please login');
        res.redirect('/users/login');
    }
};

module.exports = router;