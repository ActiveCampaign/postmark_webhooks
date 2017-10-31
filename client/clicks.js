// route for displaying clicks
Router.route('/clicks', {
    template: 'clicks_list',
    title: 'Clicks',
    subscriptions: function() {
      return Meteor.subscribe('clicks');
    }
});

ClicksList = new Mongo.Collection('clicks');

// index for Easy Search
ClicksListIndex = new EasySearch.Index({
  collection: ClicksList,
  fields: ['MessageID', 'Recipient', 'ReceivedAt', 'Tag'],
  engine: new EasySearch.Minimongo({
    sort: function() {
      return {created_at: -1};
    }
  })
});

Template.clicks_search.helpers({
  clicksIndex: function () { return ClicksListIndex; },
  inputAttributes: () => {
    return {
      placeholder: ' Recipient Email Address, MessageID, or Tag',
      type: 'text'
    }
  }
});
