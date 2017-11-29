import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';


export const BoardCardComments = new Mongo.Collection('BoardCardComments');

// Deny all client-side updates since we will be using methods to manage this collection
BoardCardComments.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});


BoardCardComments.schema = new SimpleSchema({
  //id: { type: String },  quiero usar el orden en vez del id
  
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
});





BoardCardComments.attachSchema(BoardCardComments.schema);


