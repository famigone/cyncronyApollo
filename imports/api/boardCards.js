import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';


export const BoardCards = new Mongo.Collection('boardCards');

// Deny all client-side updates since we will be using methods to manage this collection
BoardCards.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});


BoardCards.schema = new SimpleSchema({
  //id: { type: String },  quiero usar el orden en vez del id
  title: { type: String },
  description: { type: String },
  doctitle: { type: String , optional: true},
  docdescription: { type: String , optional: true},
  limite_date: {        type: Date,
        optional: true,
        autoValue: function(){ return null }
   },
  solved: { type: Boolean
           ,optional: true
           ,defaultValue: false                                  
         },  
  progress: { type: Number
            , decimal: true
            , defaultValue: 0
            , optional: true}
            ,
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
    },
});





BoardCards.attachSchema(BoardCards.schema);


