import { Meteor } from 'meteor/meteor'
import { Projects } from '../../imports/api/projects.js'


/**
 * Methods are used to run code on the server and optionally, send a response
 * to the client (ex: APIs, do computations, work with the DB, etc).
 * In Meteor, methods are functions defined as values of a simple
 * object that is in turn, passed to the Meteor.methods function
 */


Meteor.methods({
  'projects.insert':function ({ codigo, nombre }) {
  	





return Projects.insert({
       codigo,
       nombre,       
     });


  }
});