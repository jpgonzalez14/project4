import { Meteor } from 'meteor/meteor';
import './../imports/api/roles';
import './../imports/api/doodles';
import './../imports/api/flickr';
require('dotenv').config();

Meteor.startup(() => {
  // code to run on server at startup

});
