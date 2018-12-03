import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

export const doodles = new Mongo.Collection('doodles');

if (Meteor.isServer) {
  Meteor.publish('doodles', () => {
    return doodles.find();
  });
}

Meteor.methods({
  'doodles.insert'(title, parrafo, date, tipo) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    try {
      new SimpleSchema({
        owner: {
          type: String
        },
        title:{
          type: String
        },
        parrafo: {
          type: String
        },
        date: {
          type: String
        },
        tipo: {
          type: String
        }
      }).validate({ owner: this.userId, title, parrafo, date, tipo });
    } catch (e) {
      throw new Meteor.Error(400, e.message);
    }

    doodles.insert({
      title,
      parrafo,
      date,
      tipo,
      userId: this.userId
    });
  },
  'doodles.update'(doodleId, title, parrafo, date, tipo) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    try {
      new SimpleSchema({
        title:{
          type: String
        },
        parrafo: {
          type: String
        },
        date: {
          type: String
        },
        tipo: {
          type: String
        }
      }).validate({ title, parrafo, date, tipo });
    } catch (e) {
      throw new Meteor.Error(400, e.message);
    }

    doodles.update({_id: doodleId},{
      $set: {
        title,
        parrafo,
        date,
        tipo,
      }
    });
  },
  'doodles.remove'(doodleId) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    try {
      new SimpleSchema({
        doodleId:{
          type: String
        }
      }).validate({ doodleId });
    } catch (e) {
      throw new Meteor.Error(400, e.message);
    }

    doodles.remove({_id: doodleId});
  }
});
