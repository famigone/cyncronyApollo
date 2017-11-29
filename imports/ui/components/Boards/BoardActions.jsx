import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Alert from 'react-s-alert';
import { BoardCards } from '/imports/api/boardCards';
import { Button, Modal, Popover, Tooltip, OverlayTrigger, FormControl } from 'react-bootstrap';
import ReactDOM from 'react-dom';


export class BoardActions extends Component {
   constructor() {
    super();
    
    this.state = { showModal: false };
    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
  }

  close() {
    this.setState({ showModal: false });    
  }

  open() {
    this.setState({ showModal: true });
  }

   handleSubmit(event) {
     event.preventDefault();
    // console.log(this.props.tid)

     const title = ReactDOM.findDOMNode(this.refs.title).value.trim();
     const description = ReactDOM.findDOMNode(this.refs.description).value.trim();

     const jecto = {title : title
            , description : description
            , projectId   : this.props.pid
            , taskId      : Number(this.props.tid)
          }
 
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
     this.close()
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
                                       <input
                                className = "form-control input-sm"
                                type="text"
                                  ref="title"  
                                placeholder="Título"
                              />
                              <br/>
                              <FormControl 
                              ref="description"
                              componentClass="textarea" 
                              placeholder="Descripción" />

                  <div className="row">

                          <div className="col-xs-6">
                         </div>     
                         <div className="col-xs-6">
                           </div>
                </div>


        </div>
        <div className="box-footer">
        
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


/*Board.propTypes = {
      
  id: React.PropTypes.number, 
  isLoading: React.PropTypes.bool
   
 };*/
