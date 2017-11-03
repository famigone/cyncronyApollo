import React, { Component} from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Projects } from '/imports/api/projects.js';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'; // ES6
import Insert from './Insert.jsx';
import { withTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../controls/LoadingSpinner';
import { ReactiveVar } from 'meteor/reactive-var'

const DEFAULT_LIMIT = 5
const LIMIT_INCREMENT = 5
const limit = new ReactiveVar(DEFAULT_LIMIT)
const searchQuery = new ReactiveVar('')


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


   handleClick = (e) => {
    if (e) e.preventDefault()
    limit.set(limit.get() + LIMIT_INCREMENT)
  }

   handleSearch = (e) => {
    if (e) e.preventDefault()    
    searchQuery.set(ReactDOM.findDOMNode(this.refs.projectName).value)
  }

  render(){
   const { isLoading } = this.props;

  if (isLoading) {    
    return (
      <LoadingSpinner/>
    )
  }  
  return(
    <div className="col-md-11">
	<div className="box box-solid">
        <div className="box-header">
          <h3 className="box-title">Proyectos</h3>
            <div className="box-tools">                
               <form className="form" onSubmit = {this.handleSearch} >                  
                     <input 
                        type="text" 
                        ref="projectName"
                        className="form-control pull-right" 
                        placeholder="Nombre"
                      />                                       
                </form>                 
            </div>   
        </div>        
      

            <div className="box-body table-responsive">
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
 <div className="box-footer">
               <div className="text-right">
               <button onClick={this.handleClick} className="btn btn-sm btn-info btn-flat">
<i className="fa fa-plus-square" aria-hidden="true"></i></button>
             </div>
</div>
</div>

</div>

  )
}
}

 TableProject.propTypes = {
      
  isLoading: React.PropTypes.bool, 
   
 };

  export default ProjectFormUpdateContainer = withTracker(() => {      
   const suba = Meteor.subscribe('projects');
   var isLoading = !suba.ready();
   return {
     projects: Projects.find({}, { 
            limit: limit.get()
          , searchQuery:searchQuery.get()  
          , sort: { createdAt: 1 } }).fetch(),
     isLoading,
   };
  })(TableProject);