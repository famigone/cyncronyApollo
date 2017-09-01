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
if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('projects', function projectsPublication() {
    return Projects.find();
  });
}
