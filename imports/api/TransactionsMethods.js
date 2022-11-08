import {TransactionsCollection} from "./TransactionsCollection";
import { Meteor } from "meteor/meteor";
import {check} from "meteor/check";

Meteor.methods({
    'transactions.insert'({ isTransferring, sourceWalletId, destinationWalletId, amount }) {
        check(isTransferring,Boolean)
        check(sourceWalletId,String)
        check(destinationWalletId,String)
        check(amount,Number)
        if(!sourceWalletId) throw new Meteor.Error('Source wallet is required.')
        if(isTransferring && !destinationWalletId) throw new Meteor.Error('Destination wallet is required.')
        if(!amount || amount <= 0) throw new Meteor.Error('Amount must be greater than 0.')
        return TransactionsCollection.insert({
            type: isTransferring ? 'TRANSFER' : 'ADD',
            destinationWalletId: isTransferring ? destinationWalletId : null,
            sourceWalletId,
            amount,
            createdAt: new Date() });
    },

})
