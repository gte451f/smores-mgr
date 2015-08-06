import Ember from 'ember';
import ErrorHandler from 'smores-mgr/mixins/crud/error';

export default Ember.Route.extend(ErrorHandler, {

    //reset the model in case you return to add another record
    model: function (params) {
        return {};
    },

    actions: {
        save: function (model) {
            var self = this;

            // ask for first object this the model function itself returns an array of 1 record
            var account = this.modelFor('accounts.cards').get('firstObject');
            model.account = account;
            var newCard = this.store.createRecord('card', model);
            newCard.save().then(function (post) {
                //var cardList = self.get('controllers.accounts.cards');
                //var cards = cardList.get('model.cards');
                //debugger;
                //cards.pushObjects(post);
                //cardModel.content.addRecord(post);

                self.notify.success('Success saving card!');
                self.transitionTo('accounts.cards');
            }, function (reason) {
                self.handleXHR(reason);
            });
        }
    }
});
