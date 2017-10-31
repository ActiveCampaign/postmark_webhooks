// index for Easy Search
ClicksListIndex = new EasySearch.Index({
  collection: ClicksList,
  fields: ['MessageID', 'Email', 'Tag', 'Subject'],
  engine: new EasySearch.Minimongo({
    sort: function() {
      return {created_at: -1};
    }
  })
});

// pull clicks from collection for populating accordian/index
Template.clicks_list.helpers({
    clicks: function() {
      return ClicksList.find().fetch();
    }
});
