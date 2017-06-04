# Your notes

The project contents full CRUD functionality, notifications and validation.

###### Technologies:

- Node.js and NPM
- Express framework
- MongoDB database
- Mongoose ORM
- Pug template engine
- Bower package manager
- Twitter bootstrap
- jQuery and AJAX

###### MongoDB:

..\mongodb\bin>mongo
>> show dbs
admin   0.000GB
local   0.000GB

**/* Create notedb */**
>> use notedb
switched to db notedb
>> db.createCollection('notes');
{ "ok" : 1 }

**/* Show data in notedb */**
>> show dbs
admin   0.000GB
local   0.000GB
notedb  0.000GB
>> use notedb
switched to db notedb
>> db.notes.find().pretty();
{
        "_id" : ObjectId("592cdae0dd9b690094598496"),
        "title" : "The first note",
        "author" : "Roman",
        "body" : "this is note one"
}
{
        "_id" : ObjectId("592cdb26dd9b690094598497"),
        "title" : "The second note",
        "author" : "Roman",
        "body" : "this is note two"
}
{
        "_id" : ObjectId("592cdb33dd9b690094598498"),
        "title" : "The three note",
        "author" : "Roman",
        "body" : "this is note three"
}

###### To start the project

npm start