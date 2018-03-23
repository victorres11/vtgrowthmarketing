---
title: 'NPS Surveys with Segment, Zapier, and Customer.IO'
date: 2018-03-22 21:34:52
tags: growth, nps, segment, zapier, customer.io, surveys
---

 Surveys with Segment, Zapier, and Customer.IO

Many interesting Net Promoter Score tools have been introduced over the last year or two. The challenge with all of them is that they re-create the wheel in terms of how they work alongside your other marketing efforts. For example, they send emails but they do not integrate with your other marketing email efforts.

This leads to great unpleasantness for example being asked to give an NPS rating when you’ve unsubscribed from all emails, or at an awkward time in the customer lifecycle.

The flipside however, is to not use these tools, and simply ask the customer for NPS via your existing marketing tools with a Wufoo form but if you do this, you do not get all the nifty reporting that these tools offer:

![NPS Surveys](/blog/images/nps.png)

Fortunately, I have found a solution that I think is a great compromise. Unfortunately, I sound like a raving lunatic when explaining this to friends on Twitter or via email, so I wanted to canonically document it here.

The general premise is to use the tools that you already have, and leverage an NPS provider for their reporting. For example:

* Emails sent via Customer.IO
* In application survey sent via Satismeter or Appcues
* Reporting via Satismeter
* Customer data via Segment

If you are not already using vendors, I highly recommend using the tools listed above. These are the ones that we’ll use for the rest of this guide.

(I’ll assume you’ve already signed up for these tools.)

# Customer.IO
Customer.IO serves not only as the email marketing tool but also the orchestration tool for this campaign.

In Customer.IO create an “NPS Eligible” segment. This is where you define who to ask for a Net Promoter Score. This is an area where you can leverage Segment to do amazing things.

For example, whereas if you were only using an NPS vendor, you’re typically tied to “days since signup” if you’re using Customer.IO with Segment, you can create a sophisiticated trigger based on when the customer actually started spending with you.

To keep it simple, I’ll create a Customer.IO segment of:

* everyone that has a first day spend after 40 days ago. Meaning, they’ve been spending with us for 40 days.
* everyone that has a last day spend of today. Meaning they’re still a spending customer. (it is for you to decide if you should ask churned customers for NPS)
* Satismeter also writes back the NPS score back into Segment. So, we also include “NPS_rating” does not exist, to ensure you only ask each customer once.

![Customer IO Conditions](/blog/images/customer_io_conditions.png)

I then create a Customer.IO campaign targeting people from that segment. I can even create a conversion segment so that I know who is responding to NPS:


And then I can define a specific list of triggers. And here is where it gets really cool. Here are the steps I defined:

1. When they enter the campaign, show the NPS modal via Webhook
2. 5 days later, if no NPS, send the user an email
3. 7 days later, if no NPS, send the user another email

![Gave NPS](/blog/images/gave_nps.png)

I’ll detail these steps:

# Step 1: Showing NPS modal via Webhook
If you wish to use the stock Satismeter modal, you simply send this Webhook:

```
POST https://app.satismeter.com/api/users
{
 “userId”: “{{customer.id}}”,
 “traits”: {
 “nps”: true
 },
 “writeKey”: “yourKey”
}
```

What this’ll do is tell Satismeter to trigger the NPS modal to that specific user (via UserId) when they next log in.

# Step 2 & 3: Sending an NPS email via Customer.IO
I worked with Satismeter to develop these parameter based email links that can be used within Customer.IO (or any other marketing platform).

```
<a href="https://app.satismeter.com/survey?token=yourKey&amp;userId={{customer.id}}&amp;email={{customer.email}};rating=n">n</a>
```

It’s boringly straight forward once you have these links, you simply change the rating=n to reflect the rating you wish to send to Satismeter, and then ensure you’re passing back the userId/Email, which is all tied to Segment.

You enter these links with the relevant rating, into a Customer.IO layout and et voila, you’re good to go:

![My Corp](/blog/images/my_corp.png)

# Reviewing the data in Satismeter
After this has ran a few days, you should start seeing your NPS details within the Satismeter dashboard.

Of course this data is also written to Segment, so you can view the data in Heap Analytics or any other data vendor that uses Segment, but I have always found it important to also use an NPS dashboard as well, since there is fairly sophisticated logic in terms of answering the “What is my actual Net Promoter Score?” question

# Key Benefits of this Setup
Whew, this seems like a lot of work you might be thinking. These are the two key reasons why doing it this way is vastly superior:

1. Allows precise NPS targeting off your business data (via Segment)
2. Ensures your NPS emails do not collide with other emails (via Customer.IO)

# Optional: Step Further with Zapier
You can push your NPS data around to other tools (eg: Slack) via Zapier. The key thing to setup is a Catch Hook within Zapier that ingests your Satismeter scores.

Once that is setup, I recommend that you write this data to a Google Sheet, and then you can create additional Zapier Zaps off that data. So the Zapier Zap would be:

1. Zapier Catch Hook (from Satismeter)
2. Write Satismeter to a Google Sheet (and map the relevant data from Satismeter to various Google Sheet columns, eg NPS Rating, Comment and Email)

and then you create subsequent independent Zaps such as:

1. Zapier Trigger (when new Google Sheet Row)
2. Optional Filter step (eg: only find rows with comments)
3. … Post in Slack

# Optional Optional: Step Further with Appcues
Hopefully you love Appcues as much as I do, in which case it’s a good idea to actually serve your NPS modal via Appcues, not Satismeter. It’s fairly self explanatory how to do this given the parameter links listed in Step 2 & 3.

