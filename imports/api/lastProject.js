import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';


export const LastProject = new Mongo.Collection('lastProject');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('lastProject', function lastProjectPublication() {
    return LastProject.find();
  });
}




// Deny all client-side updates since we will be using methods to manage this collection
LastProject.deny({
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

LastProject.schema = new SimpleSchema({
  projectId: { type: String },
  inicio: { type: Date },
  duracion: { type: Number },
  //projectId: { type: String, regEx: SimpleSchema.RegEx.Id },
  avance: { type: Number, decimal: true, defaultValue: 0, optional: true},
  parentId: { type: Number, optional: true }, //padre
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

LastProject.attachSchema(LastProject.schema);

