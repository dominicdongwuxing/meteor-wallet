import {ContactsCollection} from "./ContactsCollection";
import {Meteor} from 'meteor/meteor'

Meteor.publish('allContacts',function publishAllContacts(){
    return ContactsCollection.find() // it is a cursor that does Live Query, make sure data is always updated in minimongo
})