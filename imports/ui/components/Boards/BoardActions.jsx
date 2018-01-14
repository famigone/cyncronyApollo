import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Alert from 'react-s-alert';
import { BoardCards } from '/imports/api/boardCards';
import { Button, Modal, Popover, Tooltip, OverlayTrigger, FormControl } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import IndividualFile from './FileIndividualFile.jsx';
import { _ } from 'meteor/underscore';
import Filetes  from '/imports/api/images';
import CallOutMessage from '../warnings/callout_message';


export class BoardActions extends Component {
   constructor() {
    super();
    this.state = { showModal: false,       
                   uploading: [],
                   progress: 0,
                   inProgress: false,
                   subio:false,
                   fileteId:null,
                     suggestions: [
        
      ]
                    };
    this.open = this.open.bind(this)
    this.close = this.close.bind(this)


  }


  handleDelete (i) {
    const tags = this.state.tags.slice(0)
    tags.splice(i, 1)
    this.setState({ tags })
  }

  handleAddition (tag) {
    const tags = [].concat(this.state.tags, tag)
    this.setState({ tags })
  }


  /////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////
 uploadIt(e){
    "use strict";
    e.preventDefault();

    let self = this;
    
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      // We upload only one file, in case
      // there was multiple files selected
      var file = e.currentTarget.files[0];

      if (file) {
        let uploadInstance = Filetes.insert({
          file: file,
          meta: {
            locator: this.props.fileLocator,
            userId: Meteor.userId() // Optional, used to check on server for file tampering
          },
          streams: 'dynamic',
          chunkSize: 'dynamic',
          allowWebWorkers: true // If you see issues with uploads, change this to false
        }, false);

        self.setState({
          uploading: uploadInstance, // Keep track of this instance to use below
          inProgress: true // Show the progress bar now
        });

        // These are the event functions, don't need most of them, it shows where we are in the process
        uploadInstance.on('start', function () {
          //console.log('Starting');
        });

        uploadInstance.on('end', function (error, fileObj) {
          //console.log('On end File Object: ', fileObj);

        });

        uploadInstance.on('uploaded', function (error, fileObj) {
          //console.log('TERMINOOOOO uploaded: ', fileObj._id);
          self.setState({subio:true,
                          fileteId:fileObj._id
          })  

          // Remove the filename from the upload box
          self.refs['fileinput'].value = '';

          // Reset our state for the next file
          self.setState({
            uploading: [],
            progress: 0,
            inProgress: false,
           // subio:false
          });
        });

        uploadInstance.on('error', function (error, fileObj) {
          console.log('Error during upload: ' + error);
        });

        uploadInstance.on('progress', function (progress, fileObj) {
         // console.log('Upload Percentage: ' + progress);
          // Update our progress bar
          self.setState({
            progress: progress
          })
        });

        uploadInstance.start(); // Must manually start the upload
      }
    }
  }

  // This is our progress bar, bootstrap styled
  // Remove this function if not needed
  showUploads() {
    //console.log('**********************************', this.state.uploading);

    if (!_.isEmpty(this.state.uploading)) {
      return <div>
        {this.state.uploading.file.name}

        <div className="progress progress-bar-default">
          <div style={{width: this.state.progress + '%'}} aria-valuemax="100"
             aria-valuemin="0"
             aria-valuenow={this.state.progress || 0} role="progressbar"
             className="progress-bar">
            <span className="sr-only">{this.state.progress}% Complete (success)</span>
            <span>{this.state.progress}%</span>
          </div>
        </div>
      </div>
    }
  }
  /////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////

  close() {
    this.setState({ showModal: false, subio:false });    
  }

  open() {
    this.setState({ showModal: true });
  }

   handleSubmit(event) {
     event.preventDefault();
    // console.log(this.props.tid)

     const title = ReactDOM.findDOMNode(this.refs.title).value.trim();
     const description = ReactDOM.findDOMNode(this.refs.description).value.trim();
     const doctitle = ReactDOM.findDOMNode(this.refs.doctitle).value.trim();
     const docdescription = ReactDOM.findDOMNode(this.refs.docdescription).value.trim();

     const jecto = {title : title
            , description : description
            , projectId   : this.props.pid
            , taskId      : Number(this.props.tid)
            , fileteId    : this.state.fileteId
            , doctitle    : doctitle
            , docdescription : docdescription
          }
     // console.log("putaaaaaaa "+this.state.fileteId)
      Meteor.call('boardCards.insert', jecto, (error, response) => {
      if (error) {   
        console.log(error)   
        this.setState({errorMsg : error.reason, errorHay:true, okHay:false})        
      }
      else {
        this.setState({okHay:true, errorHay:false})
      }
    })
     // Clear form     

     ReactDOM.findDOMNode(this.refs.title).value = '';
     ReactDOM.findDOMNode(this.refs.description).value = '';

     ReactDOM.findDOMNode(this.refs.doctitle).value = '';
     ReactDOM.findDOMNode(this.refs.docdescription).value = '';
     this.close()
   }

renderSubio(){
  if (this.state.subio)   {
                return  <CallOutMessage description="Archivo enviado exitosamente!" color="callout callout-info"/>;  
            }
}
 
 onChange = (value) => {
    console.log('Value received from onChange: ' + value)
  }

  render() {
    const popover = (
      <Popover id="modal-popover" title="popover">
        very popover. such engagement
      </Popover>
    );
    const tooltip = (
      <Tooltip id="modal-tooltip">
        wow.
      </Tooltip>
    );

    return (
      <div style={{margin: 5}}>

        <button onClick={this.open} className="btn  bg-navy btn-flat"><i className="fa fa-plus-circle" aria-hidden="true"></i></button>

        
      
        <Modal show={this.state.showModal} onHide={this.close}>

        
        <form className="form" onSubmit={this.handleSubmit.bind(this)} >
          <Modal.Header closeButton>
            <Modal.Title>Nueva Tarjeta</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            
         <div className="box-body">
         <h4>Info de la Tarjeta</h4>
                                       <input
                                className = "form-control input-sm"
                                type="text"
                                  ref="title"  
                                placeholder="Título de la Tarjeta"
                              />
                              <br/>
                              <FormControl 
                              ref="description"
                              componentClass="textarea" 
                              placeholder="Descripción" />

                  <div>
                 
        <div className="row">
          <div className="col-md-12">

<h4>Adjunto de la Tarjeta</h4>

            <input 
                type="file" 
                id="fi leinput" 
                disabled={this.state.inProgress} 
                ref="fileinput"
                onChange={this.uploadIt.bind(this)}
                placeholder="XXX"/>                
                 <p className="help-block">Adjunta un documento a la Tarjeta</p>  

                 <input
                                className = "form-control input-sm"
                                type="text"
                                  ref="doctitle"  
                                placeholder="Título del documento adjunto"
                              />
                              <br/>
                              <FormControl 
                              ref="docdescription"
                              componentClass="textarea" 
                              placeholder="Descripción del documento" />
  
          </div>

        </div>

        <div className="row m-t-sm m-b-sm">
          <div className="col-md-6">

            {this.showUploads()}

          </div>
          <div className="col-md-6">
          </div>
        </div>

       

      </div>


        </div>
        <div className="box-footer">
        {
            this.renderSubio()
        }
        </div>        
          </Modal.Body>
          <Modal.Footer>
            <button type="submit" className="btn btn-sm btn-primary btn-flat"><i className="fa fa-check" aria-hidden="true"></i></button>
            
            <Button onClick={this.close} className="btn btn-sm btn-primary btn-flat"><i className="fa fa-times" aria-hidden="true"></i></Button>
          </Modal.Footer>
        </form>  
        </Modal>

      </div>
    );
  }
}


export default BoardActionsContainer = withTracker(({} ) => {            
      var handle = Meteor.subscribe('files.all');
      var isLoading = !(handle.ready())
    

    
    //if (!isLoading) {console.log("EL ID ESSSSSSSSSSSS:")   }
    return {    
      isLoading,            
      docs: Filetes.find().fetch(),
      
    };
  })(BoardActions);