import { Meteor } from 'meteor/meteor'
import { Tasks } from '../../imports/api/tasks.js'


/**
 * Methods are used to run code on the server and optionally, send a response
 * to the client (ex: APIs, do computations, work with the DB, etc).
 * In Meteor, methods are functions defined as values of a simple
 * object that is in turn, passed to the Meteor.methods function
 */


Meteor.methods({
  'tasks.insert':function ({ nombre, inicio, duracion, avance, parentId, orden}) {
  return Tasks.insert({
      nombre, 
      inicio, 
      duracion, 
      avance, 
      parentId, 
      orden, 
     });
  }

 
  


});