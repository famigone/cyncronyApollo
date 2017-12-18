import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';


export const TaskUser = new Mongo.Collection('taskUser');

// Deny all client-side updates since we will be using methods to manage this collection
TaskUser.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});


TaskUser.schema = new SimpleSchema({
  //id: { type: String },  quiero usar el orden en vez del id

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

});





TaskUser.attachSchema(TaskUser.schema);


