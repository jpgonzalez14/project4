import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { doodles } from './doodles';

require('dotenv').load();
var cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'hitosuniandes',
    api_key: '355544572555295',
    api_secret: 'BaVwVrYvk-ycf9Od2OxIsGhvk1E'
});
export const cloud = new Mongo.Collection('cloud');

Meteor.methods({
    'cloudinary.upload'(photos, doodle_id) {
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        photos.forEach(e => {
            cloudinary.v2.uploader.upload(e, {public_id: doodle_id}, (err, res) => {
                if (err) throw new Meteor.Error('No se pudo subir la imagen');
                cloud.insert({
                    doodle_id,
                    url: res.url,
                    secure_url: res.secure_url
                });
            });
        });
    }
});