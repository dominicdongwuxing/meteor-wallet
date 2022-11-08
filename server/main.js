import { Meteor } from 'meteor/meteor';
import "../imports/api/methods/ContactsMethods";
import "../imports/api/methods/TransactionsMethods";
import '../imports/api/publications/ContactsPublications'
import '../imports/api/collections/ContactsCollection'
import '../imports/api/collections/WalletsCollection'
import '../imports/api/collections/TransactionsCollection'
import '../imports/api/publications/WalletsPublications'
import SimpleSchema from "simpl-schema";
import '../info/CustomError'
import {WalletsCollection} from "../imports/api/collections/WalletsCollection";

Meteor.startup(() => {
  if (!WalletsCollection.find().count()) {
    WalletsCollection.insert({
      createdAt: new Date(),
    });
  }
});
