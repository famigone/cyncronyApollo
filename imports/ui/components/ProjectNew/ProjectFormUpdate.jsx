import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import { Projects } from '/imports/api/projects.js';
import PropTypes from 'prop-types'; // ES6


// Task component - represents a single todo item
export default class ProjectFormUpdate extends Component {
  handleUpdate(event) {
     event.preventDefault();

     // Find the text field via the React ref
     /*const codigo = ReactDOM.findDOMNode(this.refs.codigoInput).value.trim();
     const nombre = ReactDOM.findDOMNode(this.refs.nombreInput).value.trim();

     Projects.insert({
       codigo,
       nombre,
       createdAt: new Date(), // current time
     });
     */
     // Clear form
     /*ReactDOM.findDOMNode(this.refs.codigoInput).value = '';
     ReactDOM.findDOMNode(this.refs.nombreInput).value = '';
     */
     console.log("modificaaaaaaaaaaaaa")
     this.setState({
      codigo: ReactDOM.findDOMNode(this.refs.codigoInput).value.trim(),
      nombre: ReactDOM.findDOMNode(this.refs.nombreInput).value.trim()
    });

   }
  
  handleSubmit(event){
    console.log("submitióooooooooooo")
     this.setState({
      codigo: ReactDOM.findDOMNode(this.refs.codigoInput).value.trim(),
      nombre: ReactDOM.findDOMNode(this.refs.nombreInput).value.trim()
    });

  }


    constructor(props) {
    super(props);
    /*console.log("entro a constructor")
    
    unProj: subscription.findOne({codigo: this.props.key1})*/  
/*    var subscription = Meteor.subscribe("projects");
    unProj: Projects.find({"codigo":this.props.key1}),  */
    this.state = {      
      codigo: this.props.key1,
      nombre: "unNombre" ,
    
    };
  }

  render() {
    
    return (
      <div className="col-xs-11">
       <div className="box box-solid">
         <form className="form" onSubmit={this.handleSubmit.bind(this)} >
         <div className="box-body">
                  <div className="row">
                          <div className="col-xs-2">
                              <input
                                className = "form-control input-sm"
                                type="text"
                                ref="codigoInput"
                                placeholder="Código del Proyecto"
                                value = {this.state.codigo}
                                onChange = {this.handleUpdate.bind(this)}
                              />
                          </div>
                          <div className="col-xs-6">
                              <input
                                className = "form-control input-sm"
                                type="text"
                                ref="nombreInput"
                                placeholder="Título"
                                value = {this.state.nombre}
                                onChange = {this.handleUpdate.bind(this)}
                              />
                           </div>
                </div>


        </div>
        <div className="box-footer">
        <button type="submit" className="btn btn-sm btn-primary btn-flat">Guardar</button>
        </div>
        </form>
     </div>
   </div>

    );
  }
}

ProjectFormUpdate.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  key1: PropTypes.string.isRequired, 
};

/*export default createContainer(({resumeId}) => {
  Meteor.subscribe('updateResume', resumeId)  
  const resume = Resumes.findOne(resumeId)
  return { resume, isLoading }
}, Update)
 */