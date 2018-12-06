import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { doodles } from './doodles';

require('dotenv').load();
export const imagesFlickr = new Mongo.Collection('imagesFlickr');

let flickrapi = require('flickrapi');
const api_key = 'e48acf92fa2c3431fdbf560717c13dad';
const secret = 'eae67b846d473a23';


Meteor.methods({
  'flickr.getUserPhotos'(username, doodle) {

    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    let flickrOptions = {
      api_key,
      secret
    }

    flickrOptions.username = username;

    flickrapi.tokenOnly(flickrOptions, (error, flickr) => {
      // we can now use "flickr" as our API object,
      // but we can only call public methods and access public data
      if (error) throw new Meteor.Error('api-error');

      flickr.people.findByUsername(flickrOptions, (err, res) => {
        if (err) throw new Meteor.Error('api-error');
        const nsid = res.user.nsid;
        const id = res.user.id;
        flickrOptions.user_id = nsid;
        console.log('username', res);
        flickr.people.getPublicPhotos(flickrOptions, (err, result) => {
          /*
            This will now give all public and private results,
            because we explicitly ran this as an authenticated call
          */
          if (err) throw new Meteor.Error('api-error');
          console.log(result);
          let photos = result.photos.photo;
          userPhotos = photos.map(p => {
            return {doodle_id: doodle, farm: p.farm, server: p.server, secret: p.secret, photo_id: p.id}
          });
          return userPhotos;
        });
      });
    });
  },

  'flickr.insertDoodleImg'(photos) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    photos.forEach(e => {
      imagesFlickr.insert(e);
    });
  }
});


