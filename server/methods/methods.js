import { Meteor } from 'meteor/meteor'

import { _ } from 'meteor/underscore';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { Tasks } from '../../imports/api/tasks.js'
import { LastProject } from '../../imports/api/lastProject.js'

/**
 * Methods are used to run code on the server and optionally, send a response
 * to the client (ex: APIs, do computations, work with the DB, etc).
 * In Meteor, methods are functions defined as values of a simple
 * object that is in turn, passed to the Meteor.methods function
 */

/*
Meteor.methods({
  'tasks.insert':function ({ nombre, inicio, duracion, avance, parentId, orden}) {
  return Tasks.insert({
      nombre, 
      inicio, 
      duracion, 
      avance, 
      parentId, 
      orden, 
     });
},


  'lastProject.insert':function ({ projectId, taskId}) {  
  return LastProject.insert({
      projectId,       
      taskId
     });
  }, 
  
  'lastProject.update':function ({ userId, projectId, taskId}) {  
  //console.log('en update: '+projectId)  
  return LastProject.update(userId, {
      $set: { projectId: projectId}
              //taskId: taskId },
    });

  },  

   export const upsertDocument = new ValidatedMethod({
  name: 'documents.upsert',
  validate: new SimpleSchema({
    _id: { type: String, optional: true },
    title: { type: String, optional: true },
    body: { type: String, optional: true },
  }).validator(),
  run(document) {
    return Documents.upsert({ _id: document._id }, { $set: document });
  },
});



});*/

export const updateLast = new ValidatedMethod({
  name: 'lastProject.updateLast',
  validate: new SimpleSchema({    
    newProjectId: { type: String, regEx: SimpleSchema.RegEx.Id }    
  }).validator(),
  run({newProjectId}) {
    LastProject.update({userId: Meteor.userId}, {
      $set: { projectId: newProjectId },
    });
  },
});




export const insert = new ValidatedMethod({
  name: 'lastProject.insert',
  validate: new SimpleSchema({
    projectId: { type: String, 
                regEx: SimpleSchema.RegEx.Id },
    taskId: { type: String, 
             regEx: SimpleSchema.RegEx.Id ,
          optional: true },
  }).validator(),
  run({ projectId, taskId }) {
    
    const lastp = {
      projectId,
      taskId,
      userId: Meteor.userId,
      createdAt: new Date(),
    };

    LastProject.insert(lastp);
  },
});




// Get list of all method names on Todos
const TODOS_METHODS = _.pluck([
  
  updateLast,
  insert,
], 'name');

if (Meteor.isServer) {
  // Only allow 5 todos operations per connection per second
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(TODOS_METHODS, name);
    },

    // Rate limit per connection ID
    connectionId() { return true; },
  }, 5, 1000);
}
