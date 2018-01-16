import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';


export const Links = new Mongo.Collection('links');

// Deny all client-side updates since we will be using methods to manage this collection
Links.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});


Links.schema = new SimpleSchema({ 
  id: { type: Number },
  source: { type: String },
  target: { type: String },              
  type: { type: String},  
  activo: { type: Boolean
          , defaultValue: true }, //borrado lógico
  projectId: {type: String}
  
  
});

Links.attachSchema(Links.schema);


