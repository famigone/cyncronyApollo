import { Meteor } from 'meteor/meteor'
import { _ } from 'meteor/underscore';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { Tasks } from '../../imports/api/tasks.js'
import { TaskUser } from '../../imports/api/taskUser.js'
import { BoardCards } from '../../imports/api/boardCards.js'
import { BoardCardComments } from '../../imports/api/boardCardComments.js'
import { Links } from '../../imports/api/links.js'
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

/***********************************************************************************/
/*****************************PUBLISH********************************************/
/***********************************************************************************/
Meteor.publish('tasks', function() {
  return Tasks.find({activo:true});
  
});

Meteor.publish('taskUser', function(tid) {
  return TaskUser.find({activo:true, taskId:tid});
  
});

Meteor.publish('links', function() {
  return Links.find({activo:true});
  
});

Meteor.publish('boardCards', function() {
  return BoardCards.find({activo:true});
  
});

Meteor.publish('boardCardComments', function() {
  return BoardCardComments.find({activo:true});
  
});

/***********************************************************************************/
/***********************************************************************************/
/***********************************************************************************/

export const insertBoardCardComments = new ValidatedMethod({
  name: 'boardCardComments.insert',
  validate: new SimpleSchema({
  
  text: { type: String },  
  boardCardId: { type: String
             , regEx: SimpleSchema.RegEx.Id
            // , autoValue: function(){ return Session.get("projectActual") } 
           },  
  taskId: { type: Number
          , regEx: SimpleSchema.RegEx.Id
            // , autoValue: function(){ return Session.get("projectActual") } 
           }, 
                       
            
  activo: { type: Boolean
          , optional: true
          , autoValue: function(){ return true }}, //borrado lógico
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
,  run(oneCard) {      
    //console.log(oneTask)
    oneCard.activo = true
    BoardCardComments.insert(oneCard);
  },
});

export const insertBoardCard = new ValidatedMethod({
  name: 'boardCards.insert',
  validate: new SimpleSchema({
  title: { type: String },
  description: { type: String },

  doctitle: { type: String , optional: true},
  docdescription: { type: String , optional: true},
  limite_date: {
        type: Date,
        optional: true,
        autoValue: function(){ return null }
    },
  solved: { type: Boolean
           ,optional: true
        ,autoValue: function(){ return false } },            
  projectId: { type: String
             , regEx: SimpleSchema.RegEx.Id
            // , autoValue: function(){ return Session.get("projectActual") } 
           },  
  taskId: { type: Number
             , regEx: SimpleSchema.RegEx.Id
            // , autoValue: function(){ return Session.get("projectActual") } 
           },  
  fileteId: { type: String,
        regEx: SimpleSchema.RegEx.Id,
        optional: true,
       // autoValue: function(){ return null }
        },            
  activo: { type: Boolean
          , optional: true
          , autoValue: function(){ return true }}, //borrado lógico
  createdBy: {
        type: String,
        optional: true,
        autoValue: function(){ return this.userId }
    },
  createdAt: {
        type: Date,
        optional: true,
        autoValue: function(){ return new Date() }
    }
  }).validator()
,  run(oneCard) {      
    //console.log(oneTask)
    oneCard.activo = true
    BoardCards.insert(oneCard);
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


export const insertTaskUser = new ValidatedMethod({
  name: 'taskUser.insert',
  validate: new SimpleSchema({
    projectId: { type: String
             , regEx: SimpleSchema.RegEx.Id
            // , autoValue: function(){ return Session.get("projectActual") } 
           },  
  taskId: { type: String
             , regEx: SimpleSchema.RegEx.Id
            // , autoValue: function(){ return Session.get("projectActual") } 
           },
  userId: { type: String
             , regEx: SimpleSchema.RegEx.Id
            // , autoValue: function(){ return Session.get("projectActual") } 
           },           
  activo: { type: Boolean
          , defaultValue: true }, //borrado lógico
  }).validator()
,  run(oneTaskUser) {      
    //console.log(oneTask)
    TaskUser.activo = true
    TaskUser.insert(oneTaskUser);
  },
});



export const insertLink = new ValidatedMethod({
  name: 'links.insert',
  validate: new SimpleSchema({
    id: { type: Number },
  source: { type: String },
  target: { type: String },              
  type: { type: String}, 
  projectId: {type: String} ,
  activo: { type: Boolean
          , defaultValue: true }, //borrado lógico
  }).validator()
,  run(oneLink) {      
    //console.log(oneTask)
    oneLink.activo = true
    Links.insert(oneLink);
  },
});

export const updateLink = new ValidatedMethod({
   name: 'links.update',
  validate: new SimpleSchema({
    id: { type: Number },
  source: { type: String },
  projectId: {type: String},
  target: { type: String },              
  type: { type: String},  
  activo: { type: Boolean
          , defaultValue: true }, //borrado lógico
  }).validator(),
  run(oneLink) {  

    Links.update({projectId:oneLink.projectId, id:oneLink.id}, {
      $set: { source: oneLink.source,
              target: oneLink.target,                          
      },
    });
  },
});



export const deleteLink = new ValidatedMethod({
  name: 'links.delete',
  validate: new SimpleSchema({
  projectId: { type: String
             , regEx: SimpleSchema.RegEx.Id
            // , autoValue: function(){ return Session.get("projectActual") } 
           },  
  id: { type: Number }, //id interno del componente
  //orden: { type: Number }, //id interno del componente
  }).validator(),
  run(oneLink) {  
    
    Links.update({projectId:oneLink.projectId, id:oneLink.id}, {
      $set: { activo: false},
    });
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

    Tasks.update({projectId:oneTask.projectId, id:oneTask.id}, {
      $set: { text: oneTask.text,
              start_date: oneTask.start_date,
              duration: oneTask.duration,
              progress: oneTask.progress
      },
    });
  },
});

export const deleteTaskUser = new ValidatedMethod({
  name: 'taskUser.delete',
  validate: new SimpleSchema({
  
  taskUserId: { type: String
             , regEx: SimpleSchema.RegEx.Id
            // , autoValue: function(){ return Session.get("projectActual") } 
           },

  }).validator(),
  run(oneTaskUser) {  
    
    TaskUser.update({_id: oneTaskUser.taskUserId}, {
      $set: { activo: false},
    });
   // console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
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
  deleteTaskUser,
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
