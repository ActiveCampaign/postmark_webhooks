// route for displaying delivery events
Router.route('/delivered', {
    template: 'delivered_events',
    title: 'Delivery',
    subscriptions: function() {
      return Meteor.subscribe('deliveries');
    }
});

DeliveredList = new Mongo.Collection('deliveries');

// index for Easy Search
DeliveredListIndex = new EasySearch.Index({
  collection: DeliveredList,
  fields: ['MessageID', 'Recipient', 'DeliveredAt', 'Tag', 'ServerID'],
  engine: new EasySearch.Minimongo({
    sort: function() {
      return {created_at: -1};
    }
  })
});

Template.deliveries_search.helpers({
  deliveredIndex: function () { return DeliveredListIndex; },
  inputAttributes: () => {
    return {
      placeholder: 'Recipient Email Address, MessageID, ServerID, or Tag',
      type: 'text'
    }
  }
});
