import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Projects } from '/imports/api/projects';
import { Tasks } from '/imports/api/tasks';
import { LastProject } from '/imports/api/lastProject';
import  Filetes  from '/imports/api/images';
import { BoardCardComments } from '/imports/api/boardCardComments';
import { withTracker } from 'meteor/react-meteor-data';
import  BoardCardComment  from './BoardCardComment';
import LoadingSpinner from '../controls/LoadingSpinner';
import Alert from 'react-s-alert';
import { Button, Modal, Popover, Tooltip, OverlayTrigger, FormControl } from 'react-bootstrap';
import ReactDOM from 'react-dom';

export class BoardCard extends Component {
   constructor() {
    super();
    console.log(this.props)    
    this.state = { showModal: false };
    this.open = this.open.bind(this)
    this.close = this.close.bind(this)

  }

renderComments(){
  //console.log("Comentarios: "+this.props.comments)
  if (this.props.comments){
      return this.props.comments.map((comment) => (
      <div key={comment._id}>    
         <BoardCardCommentContainer
            comment={comment}
          />
      </div>  
     ));
   }   
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

     const comment = ReactDOM.findDOMNode(this.refs.comment).value.trim();
     

     const jecto = {text : comment
            , boardCardId   : this.props.card._id
            , taskId      : Number(this.props.card.taskId)
          }
 
      Meteor.call('boardCardComments.insert', jecto, (error, response) => {
      if (error) {   
        console.log(error)   
        this.setState({errorMsg : error.reason, errorHay:true, okHay:false})        
      }
      else {
        this.setState({okHay:true, errorHay:false})
      }
    })
     // Clear form     

     ReactDOM.findDOMNode(this.refs.comment).value = '';     
     this.close()
   }

  renderModal(){
    return(
    <Modal show={this.state.showModal} onHide={this.close}>
        <form className="form" onSubmit={this.handleSubmit.bind(this)} >
          <Modal.Header closeButton>
            <Modal.Title>{this.props.card.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            
         <div className="box-body">                              
                              <FormControl 
                              ref="comment"
                              componentClass="textarea" 
                              placeholder="Haz un Comentario!" />


            

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
        )
  }

renderAdjunto(){
  if (this.props.tieneFilete)
  return (

<div className="attachment-block clearfix">
               <center><h1><i className="fa fa-paperclip attachment-img"></i></h1></center> 
                <div className="attachment-pushed">
                  <h4 className="attachment-heading"><a href={this.props.unFilete.link() }  target="_blank">{this.props.card.doctitle}</a></h4>

                  <div className="attachment-text">
                    {this.props.card.docdescription} 
                  </div>
        
                </div>
     
              </div>
    )
}
renderCard(){
  //instanciamos el filete

  return(
  <div className="col-md-4 col-sm-6 col-xs-12">
          <div className="box box-widget">
            <div className="box-header with-border">
              <div className="user-block">
                <img className="img-circle" src="/img/user2-160x160.jpg" alt="User Image"/>
                <span className="username"><a href="#">{this.props.card.title}</a></span>
                <span className="description">{this.props.usuario.username}{this.props.user} - {moment(this.props.card.createdAt).format("DD/MM/YY")}</span>
              </div>

              <div className="box-tools">
                <button type="button" className="btn btn-box-tool" data-toggle="tooltip" title="Mark as read">
                  <i className="fa fa-circle-o"></i></button>
                <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-minus"></i>
                </button>
                <button type="button" className="btn btn-box-tool" data-widget="remove"><i className="fa fa-times"></i></button>
              </div>

            </div>

            <div className="box-body" >
             {/*  <img className="img-responsive pad" src="../dist/img/photo2.png" alt="Photo"/> */}

              <p>{this.props.card.description}</p>
              {this.renderAdjunto()}

              <button type="button" className="btn btn-default btn-xs"><i className="fa fa-share"></i> Share</button>
              <button type="button" className="btn btn-default btn-xs"><i className="fa fa-thumbs-o-up"></i> Like</button>
              <span className="pull-right text-muted">lalalal - 3 comments</span>

            </div>

            <div className="box-footer box-comments"  onClick={this.open}>
              {this.renderComments()}
              

              

            </div>

            

          </div>

        </div>
)
}

  render() {
  console.log(this.props.cha)  
  const { isLoading } = this.props;
      if (isLoading) {    
        return (
          <LoadingSpinner/>
        )
      }   

   return (
 <div>        

      {this.renderModal()}
      {this.renderCard()}


         
        

</div>
  
     
      

    );
  }
}

/*BoardCard.propTypes = {
      
  card: React.PropTypes.object, 
   
 };
*/
export default BoardCardContainer = withTracker(({ card  } ) => {            
    const subb  = Meteor.subscribe('boardCardComments') 
    const comments = BoardCardComments.find({boardCardId:card._id}).fetch()         
    const filete = Filetes.findOne(card.fileteId)
    const tieneFilete = !(card.fileteId==null)
    var isLoading = !(subb.ready());
   
    //if (!isLoading) {console.log("EL ID ESSSSSSSSSSSS:")   }
    return {    
      isLoading,            
      card: card,
      comments: comments,
      usuario:  Meteor.users.findOne({_id:card.createdBy}),
      unFilete: filete,
      tieneFilete: tieneFilete
    };
  })(BoardCard);
