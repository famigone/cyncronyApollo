import { Meteor } from 'meteor/meteor'

import { _ } from 'meteor/underscore';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { Tasks } from '../../imports/api/tasks.js'
import { LastProject } from '../../imports/api/lastProject.js'


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


Meteor.publish('tasks', function() {
  console.log("Resul: ")
  return Tasks.find({activo:true});
  
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




export const insertTask = new ValidatedMethod({
  name: 'tasks.insert',
  validate: new SimpleSchema({
  text: { type: String },
  start_date: { type: Date },
  duration: { type: Number },
  progress: { type: Number
            , decimal: true
            , defaultValue: 0
            , optional: true},
  projectId: { type: String
             , regEx: SimpleSchema.RegEx.Id
            // , autoValue: function(){ return Session.get("projectActual") } 
           },  
  parent: { type: Number
            , optional: true }, //padre
  activo: { type: Boolean
          , defaultValue: true }, //borrado lógico
  id: { type: Number }, //id interno del componente
  createdBy: {
        type: String,
        optional: true,
        autoValue: function(){ return this.userId }
    },
  createdAt: {
        type: Date,
        optional: true,
        autoValue: function(){ return new Date() }
    },
  }).validator()
,  run(oneTask) {      
    //console.log(oneTask)
    oneTask.activo = true
    Tasks.insert(oneTask);
  },
});



export const updateTask = new ValidatedMethod({
  name: 'tasks.update',
  validate: new SimpleSchema({
  text: { type: String },
  start_date: { type: Date },
  duration: { type: Number },
  progress: { type: Number
            , decimal: true
            , defaultValue: 0
            , optional: true},
  projectId: { type: String
             , regEx: SimpleSchema.RegEx.Id
            // , autoValue: function(){ return Session.get("projectActual") } 
           },  
  parent: { type: Number
            , optional: true }, //padre
  activo: { type: Boolean
          , defaultValue: true }, //borrado lógico
  id: { type: Number }, //id interno del componente
  //orden: { type: Number }, //id interno del componente
  createdBy: {
        type: String,
        optional: true,
        autoValue: function(){ return this.userId }
    },
  createdAt: {
        type: Date,
        optional: true,
        autoValue: function(){ return new Date() }
    },
  }).validator(),
  run(oneTask) {  
    //const oneTaskDb = Tasks.findOne({projectId:oneTask.projectId, orden:oneTasks.orden})
    //console.log("la tarea _id es:"+ oneTask._id)
    //console.log("la tarea id es:"+ oneTask.id)
    //console.log("la tarea pid es:"+ oneTask.projectId)
    Tasks.update({projectId:oneTask.projectId, id:oneTask.id}, {
      $set: { text: oneTask.text,
              start_date: oneTask.start_date,
              duration: oneTask.duration,
              progress: oneTask.progress
      },
    });
  },
});



export const deleteTask = new ValidatedMethod({
  name: 'tasks.delete',
  validate: new SimpleSchema({
  projectId: { type: String
             , regEx: SimpleSchema.RegEx.Id
            // , autoValue: function(){ return Session.get("projectActual") } 
           },  
  id: { type: Number }, //id interno del componente
  //orden: { type: Number }, //id interno del componente
  }).validator(),
  run(oneTask) {  
    //const oneTaskDb = Tasks.findOne({projectId:oneTask.projectId, orden:oneTasks.orden})
    //console.log("la tarea _id es:"+ oneTask._id)
    //console.log("la tarea id es:"+ oneTask.id)
    //console.log("la tarea pid es:"+ oneTask.projectId)
    Tasks.update({projectId:oneTask.projectId, id:oneTask.id}, {
      $set: { activo: false},
    });
  },
});


// Get list of all method names on Todos
const TODOS_METHODS = _.pluck([
  
  updateLast,
  insert,
  insertTask,
  updateTask,
  deleteTask,
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
