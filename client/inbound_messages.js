// route for displaying inbound messages
Router.route('/inbound', {
    template: 'inbound_messages',
    title: 'Inbound Messages',
    subscriptions: function() {
      return Meteor.subscribe('inbound');
    }
});

InboundList = new Mongo.Collection('inbound');

// index for Easy Search
InboundListIndex = new EasySearch.Index({
  collection: InboundList,
  fields: ['MessageID', 'From', 'To', 'Date', 'FromName', 'Subject'],
  engine: new EasySearch.Minimongo({
    sort: function() {
      return {created_at: -1};
    }
  })
});

// Easy Search requires returning function for index
Template.inbound_search.helpers({
  inboundIndex: function () { return InboundListIndex; },
  inputAttributes: () => {
    return {
      placeholder: 'Email Address, MessageID, Name, or Subject',
      type: 'text'
    };
  }
});
