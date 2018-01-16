import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';


export const CardTags = new Mongo.Collection('cardTags');

// Deny all client-side updates since we will be using methods to manage this collection
CardTags.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});


CardTags.schema = new SimpleSchema({
  //id: { type: String },  quiero usar el orden en vez del id
  boardCardId: { type: String
             , regEx: SimpleSchema.RegEx.Id
            // , autoValue: function(){ return Session.get("projectActual") } 
           },
  tag: { type: String },
            
  projectId: { type: String
             , regEx: SimpleSchema.RegEx.Id
            // , autoValue: function(){ return Session.get("projectActual") } 
           },  
  activo: { type: Boolean
          , optional: true
          , autoValue: function(){ return true }}, //borrado lógico
  taskId: { type: Number
          , regEx: SimpleSchema.RegEx.Id
            // , autoValue: function(){ return Session.get("projectActual") } 
           }, 

});





CardTags.attachSchema(CardTags.schema);


