const express = require('express');
const router = express.Router();

// Bring in note model
let Note = require('../models/note');

// Add route
router.get('/add', function(req, res){
    res.render('add_note', {
        title: 'Add new note'
    });
});

// Add submit POST route 
router.post('/add', function(req, res){
    req.checkBody('title', 'Title is required').notEmpty();
    req.checkBody('author', 'Author is required').notEmpty();
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
        note.author = req.body.author;
        note.body = req.body.body;

        note.save(function(err){
            if (err){
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
router.get('/edit/:id', function(req, res){
    Note.findById(req.params.id, function(err, note){
        res.render('edit_note', {
            title: 'Edit note',
            note: note
        });
    });
});

// Update submit POST route 
router.post('/edit/:id', function(req, res){
    let note = {};
    note.title = req.body.title;
    note.author = req.body.author;
    note.body = req.body.body;

    let query = {_id:req.params.id};

    Note.update(query, note, function(err){
        if (err){
            console.log(err);
            return;
        } else {
            req.flash('success', 'The note updated');
            res.redirect('/');
        }
    });
});

// Delete note 
router.delete('/:id', function(req, res){
    let query = {_id:req.params.id};

    Note.remove(query, function(err){
        if (err) {
            console.log(err);
        }
        req.flash('success', 'The note deleted');
        res.send('Success!');
    });
});

// Add single note
router.get('/:id', function(req, res){
    Note.findById(req.params.id, function(err, note){
        res.render('note', {
            note: note
        });
    });
});

module.exports = router;