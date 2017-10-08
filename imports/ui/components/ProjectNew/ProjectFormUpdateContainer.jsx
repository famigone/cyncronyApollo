import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Projects } from '/imports/api/projects.js';
import ProjectFormUpdate from './ProjectFormUpdate.jsx';

export default ProjectFormUpdateContainer = withTracker(({ key1 }) => {
  const todosHandle = Meteor.subscribe('projects');
  /*console.log("y la clave es...")
  console.log(key1)
  const yecto = Projects.find(codigo:"003").fetch();
  console.log(yecto.nombre)*/
  const elProject = "asdfasdf" //Projects.findOne(key1);    
  return {
    elProject,
  };
})(ProjectFormUpdate);
