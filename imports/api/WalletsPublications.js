import {WalletsCollection} from "./WalletsCollection";
import {Meteor} from 'meteor/meteor'

Meteor.publish('wallets',function publishAllContacts(){
    return WalletsCollection.find() // it is a cursor that does Live Query, make sure data is always updated in minimongo
})