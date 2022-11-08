import { Mongo } from 'meteor/mongo';
import SimpleSchema from "simpl-schema";
import {ContactsCollection} from "./ContactsCollection";
import {WalletsCollection} from "./WalletsCollection";



class TransactionsMongoCollection extends Mongo.Collection {
  insert(transactionDocument, callback) {
    if (transactionDocument.type === TRANSFER_TYPE) {
      // we can also check if the destination wallet exists
      const sourceWallet = WalletsCollection.findOne(transactionDocument.sourceWalletId)
      if(!sourceWallet) {
        throw new Meteor.Error("Source wallet is not found.")
      }
      if(sourceWallet.balance < transactionDocument.amount) {
        throw new Meteor.Error("Insufficient funds.")
      }
      WalletsCollection.update(transactionDocument.sourceWalletId, {
        $inc: {balance: -transactionDocument.amount}
      })
      WalletsCollection.update(transactionDocument.destinationWalletId, {
        $inc: {balance: transactionDocument.amount}
      })
    }
    if(transactionDocument.type === ADD_TYPE) {
      const sourceWallet = WalletsCollection.findOne(transactionDocument.sourceWalletId)
      if(!sourceWallet) {
        throw new Meteor.Error("Source wallet is not found.")
      }

      WalletsCollection.update(transactionDocument.sourceWalletId, {
        $inc: {balance: transactionDocument.amount}
      })
    }
    return super.insert(transactionDocument, callback)
  }
}

export const TransactionsCollection = new TransactionsMongoCollection()
export const TRANSFER_TYPE = 'TRANSFER'
export const ADD_TYPE = 'ADD'
const TransactionsSchema = new SimpleSchema({
  type: {
    type:String,
    allowedValues: [TRANSFER_TYPE,ADD_TYPE]

  },
  sourceWalletId: {
    type: String
  },
  destinationWalletId: {
    type: String,
    optional: true,
    // regEx: SimpleSchema.RegEx.Email
  },
  amount: {
    type: Number,
    min: 0.01
  },
  createdAt: {
    type: Date
  }
});

TransactionsCollection.attachSchema(TransactionsSchema)