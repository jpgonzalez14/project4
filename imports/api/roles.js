import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Mongo } from 'meteor/mongo';


export const roles = new Mongo.Collection('roles');

if (Meteor.isServer) {
  Meteor.publish('roles', () => {
    return roles.find();
  });
}

// Roles: ['User','Admin']
Meteor.methods({
  'roles.insert'(role) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    try {
      new SimpleSchema({
        role: {
          type: String
        }
      }).validate({ role });
    } catch (e) {
      throw new Meteor.Error(400, e.message);
    }

    roles.insert({
      user: this.userId,
      role
    });
  }
});