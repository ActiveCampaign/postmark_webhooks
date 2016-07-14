import { Meteor } from 'meteor/meteor';
import { Postmark } from 'postmark';
import settings from './settings.js'
import bounces from './bounces.js';
import opens from './opens.js'
import inbound_messages from './inbound_messages.js'

// Uses Postmark Node.js to send emails.
// Replace <server key> with your Server API Token.
// You can retrieve this by logging into Postmark,
// accessing your server, and clicking Credentials. See
// https://www.npmjs.com/package/postmark for more information

let postmark = require("postmark");
let client = new postmark.Client(settings.ServerAPIToken);

// Receive POST w/ Bounce Information to /webhook/bounces.
// See http://developer.postmarkapp.com/developer-bounce-webhook.html
// for more Information

Router.route('/webhooks/bounces', function() {

  let stored_json = this.request.body;
  let headers = this.request.headers;
  let clientIP = headers["x-forwarded-for"];
  stored_json.created_at = new Date();
  console.log("Bounce Received (Postmark Bounce ID): " + stored_json.ID);
  console.log("Headers: " + JSON.stringify(headers));

  // verify POST is coming from Postmark
  if (clientIP == "50.31.156.104" || clientIP == "50.31.156.105" || clientIP == "50.31.156.106" || clientIP == "50.31.156.107" || clientIP == "50.31.156.108" || clientIP == "50.31.156.6") {

    // return 200 repsonse
    this.response.writeHead(200);
    this.response.end("OK");

    // add new bounce to collection of bounces
    BouncesList.insert(stored_json);

    // send email w/ Postmark when bounce received
    if (settings.SendBouncesNotifications) {
      client.sendEmail({
        "From": settings.BouncesFromEmailAddress,
        "To": settings.BouncesToEmailAddress,
        "Subject": "Bounce Occurred for Email Sent to " + stored_json.Email,
        "HTMLBody": "<pre>\nJSON: " + JSON.stringify(stored_json, null, 2) + "</pre>"
      });
    }

  } else {
    // log unauthorized POST and where it came from
    console.log("Unauthorized POST received from " + clientIP + " and rejected.");
    // send email w/ Postmark when unauthorized POST received at URL
    if (settings.SendViolationsNotifications) {
      client.sendEmail({
        "From": settings.ViolationsFromEmailAddress,
        "To": settings.ViolationsToEmailAddress,
        "Subject": "Unauthorized POST received from IP " + clientIP,
        "HTMLBody": "<pre>\nReceived: " + JSON.stringify(stored_json, null, 2) + "</pre>"
      });
    }

    this.response.writeHead(403);
    this.response.end();
  }
}, {where: 'server'});

// Receive POST w/ inbound message information to /webhook/inbound.
// See http://developer.postmarkapp.com/developer-inbound-webhook.html
// for more Information

Router.route('/webhooks/inbound', function() {

  let stored_json = this.request.body;
  let headers = this.request.headers;
  let clientIP = headers["x-forwarded-for"];
  stored_json.created_at = new Date();

  console.log("Inbound Message Received: " + stored_json.Subject);
  console.log("Headers: " + JSON.stringify(headers));
  if (headers["x-forwarded-for"]) {
    console.log("located IP as: " + headers["x-forwarded-for"]);
  }

  // verify POST is coming from Postmark
  if (clientIP == "50.31.156.104" || clientIP == "50.31.156.105" || clientIP == "50.31.156.106" || clientIP == "50.31.156.107" || clientIP == "50.31.156.108" || clientIP == "50.31.156.6") {
    // return 200 repsonse
    this.response.writeHead(200);
    this.response.end("OK");

    // add new inbound message to collection of messages
    InboundList.insert(stored_json);

    // send email w/ Postmark When inbound message received
    if (settings.SendInboundNotifications) {
      client.sendEmail({
        "From": settings.InboundFromEmailAddress,
        "To": settings.InboundToEmailAddress,
        "Subject": "Inbound Message Received!",
        "HTMLBody": "<pre>\nJSON: " + JSON.stringify(stored_json, null, 2) + "</pre>"
      });
    }

  } else {
    // log unauthorized POST and where it came from
    console.log("Unauthorized POST received from " + clientIP + " and rejected.");

    if (settings.SendViolationsNotifications) {
      client.sendEmail({
        "From": settings.ViolationsFromEmailAddress,
        "To": settings.ViolationsToEmailAddress,
        "Subject": "Unauthorized POST received from IP " + clientIP,
        "HTMLBody": "<pre>\nReceived: " + JSON.stringify(stored_json, null, 2) + "</pre>"
      });
    }

    this.response.writeHead(403);
    this.response.end();
  }
}, {where: 'server'});

// Receive POST w/ open tracking information to /webhook/inbound.
// See http://developer.postmarkapp.com/developer-open-webhook.html
// for more Information

Router.route('/webhooks/opens', function() {

  let stored_json = this.request.body;
  let headers = this.request.headers;
  let clientIP = headers["x-forwarded-for"];
  stored_json.created_at = new Date();

  // log request headers
  console.log("Open Event Received For: " + stored_json.Recipient);
  console.log("Headers: " + JSON.stringify(headers));
  console.log("located client's IP as: " + headers["x-forwarded-for"]);

  // verify POST is coming from Postmark
  if (clientIP == "50.31.156.104" || clientIP == "50.31.156.105" || clientIP == "50.31.156.106" || clientIP == "50.31.156.107" || clientIP == "50.31.156.108" || clientIP == "50.31.156.6") {
    // return 200 repsonse
    this.response.writeHead(200);
    this.response.end("OK");

    // add new open event to collection of open events
    OpensList.insert(stored_json);

    // send email w/ Postmark when open event received
    if (settings.SendOpensNotifications) {
      client.sendEmail({
        "From": settings.OpensFromEmailAddress,
        "To": settings.OpensToEmailAddress,
        "Subject": "Open Event Received!",
        "HTMLBody": "<pre>\nJSON: " + JSON.stringify(stored_json, null, 2) + "</pre>"
      });
    }

  } else {
    // log unauthorized POST and where it came from
    console.log("Unauthorized POST received from " + clientIP + " and rejected.");

    if (settings.SendViolationsNotifications) {
      client.sendEmail({
        "From": settings.ViolationsFromEmailAddress,
        "To": settings.ViolationsToEmailAddress,
        "Subject": "Unauthorized POST received from IP " + clientIP,
        "HTMLBody": "<pre>\nRejected: " + JSON.stringify(stored_json, null, 2) + "</pre>"
      });
    }
    this.response.writeHead(403);
    this.response.end();
  }
}, {where: 'server'});

Meteor.startup(() => {
  /*---------Bounces---------*/

  BouncesList = new Mongo.Collection('bounces');

  // ensure bounce document in collection has a Bounce ID and MessageID
  BouncesList.schema = new SimpleSchema({
    ID: {type: Number},
    MessageID: {type: String}
  });

  // Seed some data if nothing is present already
  if (BouncesList.find().count() === 0) {
        console.log("Seeding some bounces since none were found to be present.")

        bounces.forEach(function (bounce) {
          BouncesList.insert(bounce);
        });
  }

  /*---------Inbound Messages---------*/

  InboundList = new Mongo.Collection('inbound');

  // ensure inbound message document in collection has MessageID, Subject, To, and From fields
  InboundList.schema = new SimpleSchema({
    MessageID: {type: String},
    Subject: {type: String},
    To: {type: String},
    From: {type: String}
  });

  // Seed some data if nothing is present already
  if (InboundList.find().count() === 0) {
        console.log("Seeding some inbound messages since none were found to be present.")

        inbound_messages.forEach(function (inbound_message) {
          InboundList.insert(inbound_message);
        });
  }

  /*---------Opens---------*/

  OpensList = new Mongo.Collection('opens');

  // ensure open tracking event document in collection has MessageID, Recipient, and FirstOpen fields
  OpensList.schema = new SimpleSchema({
    MessageID: {type: String},
    Recipient: {type: String},
    FirstOpen: {type: Boolean}
  });

  // Seed some data if nothing is present already
  if (OpensList.find().count() === 0) {
        console.log("Seeding some open events since none were found to be present.")

        opens.forEach(function (open) {
          OpensList.insert(open);
        });
  }
});
