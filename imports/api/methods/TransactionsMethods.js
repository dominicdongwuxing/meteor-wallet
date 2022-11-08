import {ADD_TYPE, TransactionsCollection, TRANSFER_TYPE} from "../collections/TransactionsCollection";
import { Meteor } from "meteor/meteor";
import {check} from "meteor/check";
import SimpleSchema from "simpl-schema";

Meteor.methods({
    'transactions.insert'(args) {
        const schema = new SimpleSchema({
            isTransferring: {
                type: Boolean,
            },
            sourceWalletId: {
                type: String
            },
            destinationWalletId: {
                type: String,
                optional: !args.isTransferring,
            },
            amount: {
                type: Number,
                min: 0.01
            }
        })

        const cleanArgs = schema.clean(args)
        schema.validate(cleanArgs)
        const {isTransferring, sourceWalletId, destinationWalletId, amount} = args
        return TransactionsCollection.insert({
            type: isTransferring ? TRANSFER_TYPE : ADD_TYPE,
            destinationWalletId: isTransferring ? destinationWalletId : null,
            sourceWalletId,
            amount,
            createdAt: new Date() });
    },

})
