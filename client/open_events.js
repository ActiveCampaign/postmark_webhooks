// route for displaying opens
Router.route('/opens', {
    template: 'open_events',
    title: 'Opens',
    subscriptions: function() {
      return Meteor.subscribe('opens');
    }
});

OpensList = new Mongo.Collection('opens');

// index for Easy Search
OpensListIndex = new EasySearch.Index({
  collection: OpensList,
  fields: ['MessageID', 'Recipient', 'ReceivedAt', 'Tag'],
  engine: new EasySearch.Minimongo({
    sort: function() {
      return {created_at: -1};
    }
  })
});

Template.opens_search.helpers({
  opensIndex: function () { return OpensListIndex; },
  inputAttributes: () => {
    return {
      placeholder: ' Recipient Email Address, MessageID, or Tag',
      type: 'text'
    }
  }
});
