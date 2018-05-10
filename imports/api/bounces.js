// index for Easy Search
BouncesListIndex = new EasySearch.Index({
  collection: BouncesList,
  fields: ['MessageID', 'Email', 'ID', 'BouncedAt', 'Tag', 'Subject'],
  engine: new EasySearch.Minimongo({
    sort: function() {
      return {created_at: -1};
    }
  })
});

// pull bounces from collection for populating accordian/index
Template.bouncesAccordion.helpers({
    bounces: function() {
      return BouncesList.find().fetch();
    }
});
