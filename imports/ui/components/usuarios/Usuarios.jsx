import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Projects } from '/imports/api/projects';
import { Tasks } from '/imports/api/tasks';
import { LastProject } from '/imports/api/lastProject';
import { withTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../controls/LoadingSpinner';
import Alert from 'react-s-alert';
import UsuariosForm from './UsuariosForm'

export class Usuarios extends Component {
  

renderUsers(){
  return this.props.users.map((user) => (
    <tr key= {user._id}>
        <td>{user.username}</td>
        
    </tr>
     ));}


renderTabla(){
  return(
 <div>   
 <div>   
 {/* <UsuariosForm*/} 
 </div>  
<div>   
<div className="col-md-11">
  <div className="box box-solid">
        <div className="box-header">
          <h3 className="box-title">Usuarios</h3>
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
             <table className="table table-hover table-striped">
               <tbody>
                 <tr>
                   <th>Nombre</th>
                  
                 </tr>

                    {this.renderUsers()}

               </tbody>
               </table>
              
             </div>
 <div className="box-footer">
               <div className="text-right">
             
             </div>
</div>
</div>

</div>
</div>
</div>
    )
}

  render() {   
      const { isLoading, cards } = this.props;
      if (isLoading) {    
        return (
          <LoadingSpinner/>
        )
      }     
    return (
     <div className="container">
          <div className="row">
            <section className="content-header">
              <h3>
                USUARIOS
                <small> Desde aqui puedes crear nuevos Usuarios </small>
              </h3>
            </section>  
     {this.renderTabla()}
     
    </div>   
    </div>
    );
  }
}

/*Board.propTypes = {
      
  id: React.PropTypes.number, 
  isLoading: React.PropTypes.bool
   
 };*/
export default UsuariosContainer = withTracker(( { comment } ) => {      
            
    //const subb = Meteor.subscribe('boardCards')             
    const suba = Meteor.subscribe('users');
    var isLoading = !(suba.ready());     
    return {      
      users: Meteor.users.find().fetch(),
      isLoading: isLoading,
  };
  })(Usuarios);