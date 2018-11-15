import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

export const flickr = new Mongo.Collection('flickr');

if (Meteor.isServer) {
  Meteor.publish('flickr', () => {
    return flickr.find();
  });
}

var Flickr = require("flickrapi"),
    flickrOptions = {
      api_key: "540b4a46090e7025dadb7711131ed23f",
      secret: "fede8a53c6c18411",
      requestOptions: {
        timeout: 20000,
      }
    };
