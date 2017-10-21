import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Task component - represents a single todo item
export default class LoadingSpinner extends Component {
  render() {
    return (
  <div className="col-xs-11">
      <div className="box box-solid">
            <div className="box-header">
              <h3 className="box-title"></h3>
            </div>
            <div className="box-body">
            <div className="text-center">
                    <i className="fa fa-spinner fa-pulse fa-3x fa-spin loading-spinner" />
                    </div>              
            </div>

            
      </div>
      </div>

    );
  }
}

