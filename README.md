[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/pgraham3/postmark_webhooks/tree/master)

# Postmark Hooks

This project is a quick start app you can use to host your own URLs to receive, store, process, and view webhooks sent from Postmark. It is written in Meteor.js. Be sure to read the [Postmark webhooks documentation](http://developer.postmarkapp.com/developer-webhooks-overview.html). This README includes all the instructions you need to host the app on Heroku (you can host it somewhere else if you want, like [Galaxy](https://www.meteor.com/hosting)) and begin taking advantage of Postmark's [Open tracking webhook](http://developer.postmarkapp.com/developer-open-webhook.html), [Bounce webhook](http://developer.postmarkapp.com/developer-bounce-webhook.html), and [Inbound webhook](http://developer.postmarkapp.com/developer-inbound-webhook.html). Head [here](https://nameless-forest-14615.herokuapp.com/bounces) to play with a demo instance of the app.

## Features

- Receive webhook POSTs (well formatted JSON) for Bounces, Opens, and Inbound messages with minimal development/configuration effort
- Automatically send emails (using Postmark) to yourself and/or others when you receive a new bounce, open, or inbound message
- Searchable so you can easily find and view details of a specific bounce, open event, or inbound message

## Prerequisites

- Postmark account - sign up at https://account.postmarkapp.com/sign_up. Postmark provides you with 25,000 free credits and you do not need to add a card to sign up.

- [Meteor.js](https://www.meteor.com)

Mac OS X:

`curl https://install.meteor.com/ | sh`

Windows:

Download the installer from https://www.meteor.com/install

## Getting Started

- TODO

## Example Deployment w/ Heroku

- TODO

## Built With

* [Atom](https://atom.io)
* Meteor.js
* Postmark.js

## Security

- Only [Postmark's listed IPs](http://support.postmarkapp.com/article/800-ips-for-firewalls) for webhooks can POST to URLs built by this app. Any other received request is ignored and no document is added to the collections in the database.
- Received data is also validated against a schema to ensure appropriate data received and stored as a document in its associated collection.
- Insecure removed so the database cannot be accessed from the client (browser dev tools)
- Option to receive emails if an unauthorized source attempts to post to your URL

## Customize Notification Settings

This app allows for you to send emails using Postmark when you receive a bounce, open event, or inbound message. Open up server/settings.js to view and modify the settings. Use the Server API Token for the Server you wish to send notifications from in Postmark (found in Credentials when viewing the server in Postmark). You can send emails based on the following events:

* Bounce received
* Inbound Message received
* Open Event received
* Unauthorized (not from Postmark's IP addresses) POST received to one of your webhook URLs

By default, notifications will be sent for all events unless you disable them by changing their value to ``false``. Sending notifications for events can be turned on/off for each of these event types by changing these fields to true/false:

* ``SendBouncesNotifications`` (for bounces)
* ``SendOpensNotifications`` (for open events)
* ``SendInboundNotifications`` (for inbound messages)
* ``SendViolationsNotifications`` (for unauthorized POSTs to your URLs)
```javascript
{
  "ServerAPIToken": "YourServerAPIToken",
  "SendBouncesNotifications": false,
  "SendOpensNotifications": false,
  "SendInboundNotifications": false,
  "SendViolationsNotifications": false,
  "BouncesFromEmailAddress": "yourbouncesnotificationemail@yourdomain.com",
  "OpensFromEmailAddress": "youropensnotificationemail@yourdomain.com",
  "InboundFromEmailAddress": "yourinboundnotificationsemail@yourdomain",
  "BouncesToEmailAddress": "pmnotifications+bounces@yourdomain.com",
  "OpensToEmailAddress": "pmnotifications+opens@yourdomain.com",
  "InboundToEmailAddress": "pmnotifications+inbound@yourdomain.com",
  "ViolationsFromEmailAddress": "pmhooksviolations@yourdomain.com",
  "ViolationsToEmailAddress": "pmnotifications+violations@yourdomain.com"
}
```

Set the From email addresses for your notifications to email addresses that you have added as Sender Signatures in Postmark to be sure you are able to send notification emails. These notification emails can be sent to any recipient.

## Authors

* **Patrick Graham**


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Meteor community
* Mark Otto | Bootstrap
* Tom Coleman | Iron Router & Atmosphere
* Matteo De Micheli | Easy Search
* Charlie DeTar | Meteor.js buildpack for Heroku
* Rico Sta. Cruz | NProgress
