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

// pull open events from collection for populating accordian/index
Template.open_events.helpers({
    opens: function() {
      return OpensList.find().fetch();
    },
});
