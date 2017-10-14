import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Projects } from '/imports/api/projects.js';
import ProjectFormUpdate from './ProjectFormUpdate.jsx';

export default ProjectFormUpdateContainer = withTracker(({ key1 }) => {      
    const sub = Meteor.subscribe('projects');        
    var oneProject = Projects.findOne(key1);
    var isLoading = !sub.ready();    
    return {
        oneProject,
        isLoading,
    };      
})(ProjectFormUpdate);
