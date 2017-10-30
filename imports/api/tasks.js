import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
//import { Factory } from 'meteor/factory';
//import i18n from 'meteor/universe:i18n';
//import { Todos } from '../todos/todos.js';


export const Tasks = new Mongo.Collection('tasks');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('tasks', function tasksPublication() {
    return Tasks.find();
  });
}




// Deny all client-side updates since we will be using methods to manage this collection
Tasks.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});


/*Tasks.allow({
    insert: function (userId, doc) {
           return true;
        },

    update: function (userId, doc) {
           return true;
        }
    ,
    remove: function (userId, doc) {
           return true;
        }

    });*/

Tasks.schema = new SimpleSchema({
  nombre: { type: String },
  inicio: { type: Date },
  duracion: { type: Number },
  //projectId: { type: String, regEx: SimpleSchema.RegEx.Id },
  avance: { type: Number, defaultValue: 0 },
  parentId: { type: String, regEx: SimpleSchema.RegEx.Id, optional: true }, //padre
  activo: { type: Boolean, defaultValue: true }, //borrado lógico
  orden: { type: Number }, //id interno del componente
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


/******************************************************************/
//Factory.define('list', Lists, {});

//Tasks.helpers({
  // A list is considered to be private if it has a userId set
  
//});
