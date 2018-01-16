import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';


export const Tasks = new Mongo.Collection('tasks');

// Deny all client-side updates since we will be using methods to manage this collection
Tasks.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});


Tasks.schema = new SimpleSchema({
  //id: { type: String },  quiero usar el orden en vez del id
  text: { type: String },
  start_date: { type: Date },
  duration: { type: Number },
  progress: { type: Number
            , decimal: true
            , defaultValue: 0
            , optional: true}
            ,
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
});





Tasks.attachSchema(Tasks.schema);


