import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
import './bounces.html';
import './inbound_message.html';
import './inbound_messages.html';
import './delivered_events.html';
import './click.html';
import './clicks.html';
import './open_events.html';
import '../imports/api/bounces.js';
import '../imports/api/inbound.js';
import '../imports/api/opens.js';
import '../imports/api/clicks.js';

Meteor.startup(function() {

});

Router.route('/', function () {
  this.redirect('/bounces');
});

// use Moment.js to format the iso dates
Template.registerHelper('formatDate', function(date) {
  return moment(date).format('MMMM Do YYYY');
});

Template.registerHelper('getTime', function(date) {
  return moment(date).format('h:mm:ss A');
});

// don't show spinner for progress bar (NProgress)
NProgress.configure({ showSpinner: false });
