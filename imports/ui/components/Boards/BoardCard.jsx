import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Projects } from '/imports/api/projects';
import { Tasks } from '/imports/api/tasks';
import { LastProject } from '/imports/api/lastProject';
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
        )
  }

renderCard(){
  return(
  <div className="col-md-4 col-sm-6 col-xs-12" onClick={this.open}>
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

            <div className="box-body">
             {/*  <img className="img-responsive pad" src="../dist/img/photo2.png" alt="Photo"/> */}

              <p>{this.props.card.description}</p>
              <button type="button" className="btn btn-default btn-xs"><i className="fa fa-share"></i> Share</button>
              <button type="button" className="btn btn-default btn-xs"><i className="fa fa-thumbs-o-up"></i> Like</button>
              <span className="pull-right text-muted">lalalal - 3 comments</span>
            </div>

            <div className="box-footer box-comments">
              {this.renderComments()}
              

              

            </div>

            <div className="box-footer">
              <form action="#" method="post">
                <img className="img-responsive img-circle img-sm" src="/img/user2-160x160.jpg" alt="Alt Text"/>

                <div className="img-push">
                  <input type="text" className="form-control input-sm" placeholder="Press enter to post comment"/>
                </div>
              </form>
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

    var isLoading = !(subb.ready());
   
    //if (!isLoading) {console.log("EL ID ESSSSSSSSSSSS:")   }
    return {    
      isLoading,            
      card: card,
      comments: comments,
      usuario:  Meteor.users.findOne({_id:card.createdBy})
    };
  })(BoardCard);
