import React, { Component} from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Projects } from '/imports/api/projects.js';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'; // ES6
import Insert from './Insert.jsx';
import { withTracker } from 'meteor/react-meteor-data';

class TableProject extends Component {

 constructor(props) {
    super(props);
    
  }


renderProjects(){
	     return this.props.projects.map((project) => (
       <Insert 
           key={project._id} 
          project={project} 
          callbackParent={ this.props.callbackParent }
      />
     ));
}

  render(){
  return(
    <div className="col-md-11">
	<div className="box box-solid">
        <div className="box-header">

      

            <div className="box-body table-responsive no-padding">
             <table className="table table-hover">
               <tbody>
                 <tr>
                   <th>Código</th>
                   <th>Proyecto</th>
                 </tr>

                    {this.renderProjects()}

               </tbody>
               </table>
             </div>
</div>
</div>

</div>

  )
}
}

 TableProject.propTypes = {
      
  // callbackParent: React.PropTypes.object, 
   
 };

  export default ProjectFormUpdateContainer = withTracker(() => {      
   Meteor.subscribe('projects');
   return {
     projects: Projects.find({}, { limit: 10, sort: { createdAt: -1 } }).fetch(),
   };
  })(TableProject);