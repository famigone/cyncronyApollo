import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { ReactiveVar } from 'meteor/reactive-var';
import { composeWithTracker } from 'react-komposer';
import { Projects } from '/imports/api/projects.js';
import { TableProject } from '/imports/ui/components/ProjectNew/TableProject.jsx';
import { Loading } from '/imports/ui/components/controls/Loading.js'

const composer = (props, onData) => {
	
  const searchTerms = props.query;
  const vendorsSub = Meteor.subscribe('projects.search', searchTerms);
  if (vendorsSub.ready()) {
  	if ( searchTerms ) {
	  		let regex = new RegExp( searchTerms, 'i' );
	  		query = { nombre: regex };
	  		projection =   { };
	  		const vendors = Vendors.find(query, projection).fetch();
    		onData(null, { vendors });
    		return;
	}
    	const vendors = [];

    	onData(null, { vendors, searchTerms });
  }
};

export default composeWithTracker(composer, Loading)(Results);