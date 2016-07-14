// seed data for inbound messages collection

export default [{
  "From": "jon.snow@wintermail.com",
  "FromName": "Jon Snow",
  "FromFull": {
    "Email": "jon.snow@wintermail.com",
    "Name": "John Snow",
    "MailboxHash": ""
  },
  "To": "451d9b70cf9364d23ff6f9d51d870251569e+ahoy@inbound.postmarkapp.com",
  "ToFull": [
    {
      "Email": "451d9b70cf9364d23ff6f9d51d870251569e+ahoy@inbound.postmarkapp.com",
      "Name": "",
      "MailboxHash": "ahoy"
    }
  ],
  "Cc": "\"Sansa Stark\" <sansa.stark@wintermail.com>, \"Petyr Baelish\" <petyr.baelish@thevale.com>",
  "CcFull": [
    {
      "Email": "sansa.stark@wintermail.com",
      "Name": "Sansa Stark",
      "MailboxHash": ""
    },
    {
      "Email": "petyr.baelish@thevale.com",
      "Name": "Petyr Baelish",
      "MailboxHash": ""
    }
  ],
  "Bcc": "\"Full name\" <451d9b70cf9364d23ff6f9d51d870251569e+ahoy@inbound.postmarkapp.com>",
  "BccFull": [
    {
      "Email": "451d9b70cf9364d23ff6f9d51d870251569e+ahoy@inbound.postmarkapp.com",
      "Name": "Full name",
      "MailboxHash": "ahoy"
    }
  ],
  "OriginalRecipient": "451d9b70cf9364d23ff6f9d51d870251569e+ahoy@inbound.postmarkapp.com",
  "ReplyTo": "jon.snow@wintermail.com",
  "Subject": "RE: Can I borrow Ghost?",
  "MessageID": "22c74902-a0c1-4511-804f2-341342852c90",
  "Date": "Sun, 19 Jun 2016 22:00:00 -0400",
  "MailboxHash": "ahoy",
  "TextBody": "We maxed out our budget for the season so Ghost won't be around for a while :(",
  "HtmlBody": "<b>We maxed out our budget for the season so Ghost won't be around for a while :(</b>",
  "StrippedTextReply": "We maxed out our budget for the season so Ghost won't be around for a while :(",
  "Tag": "",
  "Headers": [
    {
      "Name": "X-Spam-Checker-Version",
      "Value": "SpamAssassin 3.3.1 (2010-03-16) onrs-ord-pm-inbound1.wildbit.com"
    },
    {
      "Name": "X-Spam-Status",
      "Value": "No"
    },
    {
      "Name": "X-Spam-Score",
      "Value": "-0.1"
    },
    {
      "Name": "X-Spam-Tests",
      "Value": "DKIM_SIGNED,DKIM_VALID,DKIM_VALID_AU,SPF_PASS"
    },
    {
      "Name": "Received-SPF",
      "Value": "Pass (sender SPF authorized) identity=mailfrom; client-ip=209.85.160.180; helo=mail-gy0-f180.google.com; envelope-from=myUser@theirDomain.com; receiver=451d9b70cf9364d23ff6f9d51d870251569e+ahoy@inbound.postmarkapp.com"
    },
    {
      "Name": "DKIM-Signature",
      "Value": "v=1; a=rsa-sha256; c=relaxed/relaxed;        d=wildbit.com; s=google;        h=mime-version:reply-to:date:message-id:subject:from:to:cc         :content-type;        bh=cYr/+oQiklaYbBJOQU3CdAnyhCTuvemrU36WT7cPNt0=;        b=QsegXXbTbC4CMirl7A3VjDHyXbEsbCUTPL5vEHa7hNkkUTxXOK+dQA0JwgBHq5C+1u         iuAJMz+SNBoTqEDqte2ckDvG2SeFR+Edip10p80TFGLp5RucaYvkwJTyuwsA7xd78NKT         Q9ou6L1hgy/MbKChnp2kxHOtYNOrrszY3JfQM="
    },
    {
      "Name": "MIME-Version",
      "Value": "1.0"
    },
    {
      "Name": "Message-ID",
      "Value": "<CAGXpo2WKfxHWZ5UFYCR3H_J9SNMG+5AXUovfEFL6DjWBJSyZaA@mail.gmail.com>"
    }
  ],
  "Attachments": [
    {
      "Name": "myimage.png",
      "Content": "[BASE64-ENCODED CONTENT]",
      "ContentType": "image/png",
      "ContentLength": 4096,
      "ContentID": "myimage.png@01CE7342.75E71F80"
    },
    {
      "Name": "mypaper.doc",
      "Content": "[BASE64-ENCODED CONTENT]",
      "ContentType": "application/msword",
      "ContentLength": 16384,
      "ContentID": ""
    }
  ]
}];
