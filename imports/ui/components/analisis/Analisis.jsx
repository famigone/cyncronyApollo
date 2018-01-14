import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../controls/LoadingSpinner';
import Alert from 'react-s-alert';
import { Button, Modal, Popover, Tooltip, OverlayTrigger, FormControl } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import {Doughnut} from 'react-chartjs-2';

export default class Analisis extends Component {

vencida(){

}

render(){

	let data = {
    datasets: [{
              label: "Completitud",
             backgroundColor: [
                'rgba(0, 255, 230, 1)',
                'rgba(85, 0, 255, 1)',

            ],
            //borderColor: 'rgb(255, 99, 132)',
            data: [60,40],

    }],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: [
        'Completas',
        'Incompletas',
        
    ]
};
	return(

		
		<Doughnut
	data={data}
	width={100}
	height={50}
	options={{
		maintainAspectRatio: true
	}}
/>
		)
}

}
