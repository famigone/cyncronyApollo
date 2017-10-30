import React, { Component } from 'react';
import Gantt from './Gantt';
import Toolbar from './Toolbar';
import MessageArea from './MessageArea';
import './App1.css';



let data = {
  data: [
    {id: 1, text: 'Task #1', start_date: '15-04-2017', duration: 3, progress: 0.6},
    {id: 2, text: 'Task #2', start_date: '18-04-2017', duration: 4, progress: 0.4},
    {id: 3, text: 'Task #1', start_date: '19-04-2017', duration: 6, progress: 0.6},
    {id: 4, text: 'Task #2', start_date: '21-04-2017', duration: 7, progress: 0.4},
    {id: 5, text: 'Task #1', start_date: '25-04-2017', duration: 2, progress: 0.6},
    {id: 6, text: 'Task #2', start_date: '28-04-2017', duration: 9, progress: 0.4},
    {id: 7, text: 'Task #1', start_date: '31-04-2017', duration: 3, progress: 0.6},
    {id: 8, text: 'Task #2', start_date: '01-05-2017', duration: 5, progress: 0.4},
  ],
  links: [
    {id: 1, source: 1, target: 2, type: '0'}
  ]
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentZoom: 'Days',
      messages: []
    };

    this.handleZoomChange = this.handleZoomChange.bind(this);
    this.logTaskUpdate = this.logTaskUpdate.bind(this);
    this.logLinkUpdate = this.logLinkUpdate.bind(this);
  }
  
  addMessage(message) {
    var messages = this.state.messages.slice();
    var prevKey = messages.length ? messages[0].key: 0;

    messages.unshift({key: prevKey + 1, message});
    if(messages.length > 40){
      messages.pop();
    }
    this.setState({messages});
  }

  logTaskUpdate(id, mode, task) {
    let text = task && task.text ? ` (${task.text})`: '';
    let message = `Task ${mode}: ${id} ${text}`;
    this.addMessage(message);
  }

  logLinkUpdate(id, mode, link) {
    let message = `Link ${mode}: ${id}`;
    if (link) {
      message += ` ( source: ${link.source}, target: ${link.target} )`;
    }
    this.addMessage(message)
  }

  handleZoomChange(zoom) {
    this.setState({
      currentZoom: zoom
    });
  }  
  
  render() {
    return (
      <div>
        <Toolbar
            zoom={this.state.currentZoom}
            onZoomChange={this.handleZoomChange}
        />
        <div className="gantt-container">
          <Gantt
            tasks={data}
            zoom={this.state.currentZoom}
            onTaskUpdated={this.logTaskUpdate}
            onLinkUpdated={this.logLinkUpdate}
          />
        </div>
        <MessageArea
            messages={this.state.messages}
        />
      </div>
    );
  }
}
export default App;
