import { Mongo } from 'meteor/mongo';

export const Projects = new Mongo.Collection('projects');

Projects.allow({
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

    });

/*
Projects.attachSchema({
  nombre: {
    type: String,    
  },
  codigo: {
    type: String,    
  },
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
})
*/

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('projects', function projectsPublication() {
    return Projects.find({}, { sort: { createdAt: -1 } });
  });
}
