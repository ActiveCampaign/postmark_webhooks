// route for displaying bounces
Router.route('/bounces', {
    template: 'bouncesAccordian',
    title: 'Bounces',
    subscriptions: function() {
      return Meteor.subscribe('bounces');
    }
});

BouncesList = new Mongo.Collection('bounces');

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

// Easy Search requires returning function for index
Template.search.helpers({
  bouncesIndex: function () { return BouncesListIndex; },
  inputAttributes: () => {
    return {
      placeholder: 'Recipient Email Address, Tag, Subject, or MessageID',
      type: 'text'
    };
  }
});
