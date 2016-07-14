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

// pull inbound from collection for populating accordian/index
Template.inbound_messages.helpers({
    inbound: function() {
      return InboundList.find().fetch();
    },
});

// helper for rendering JSON of inbound message in panel tab
Template.registerHelper('json', function(a) {
    try{
        return JSON.stringify(a, null, 2);
    }catch(e){return a;}
});
