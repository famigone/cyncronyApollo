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


LastProject.schema = new SimpleSchema({
  projectId: { type: String, 
              regEx: SimpleSchema.RegEx.Id },
  userId: {
        type: String,
        optional: true,
        autoValue: function(){ return this.userId }
    },
  taskId: { 
     type: String, 
     regEx: SimpleSchema.RegEx.Id ,
     optional: true }   
});

LastProject.attachSchema(LastProject.schema);

