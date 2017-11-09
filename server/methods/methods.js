import { Meteor } from 'meteor/meteor'
import { Tasks } from '../../imports/api/tasks.js'
import { LastProject } from '../../imports/api/lastProject.js'

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
},


  'lastProject.insert':function ({ projectId, taskId}) {  
  return LastProject.insert({
      projectId,       
      taskId
     });
  }, 
  
  'lastProject.update':function ({ userId, projectId, taskId}) {  
  return LastProject.update(userId, {
      $set: { projectId: projectId}
              //taskId: taskId },
    });

  } 





});