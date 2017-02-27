# The Super Simple AudioPlayer Project
This project is meant to be the easiest way to get started using the AudioPlayer.

## Setting Up Locally
To begin, just clone this repository:
```
git clone https://github.com/bespoken/super-simple-audioplayer.git
```

To follow along, also install the BST (Bespoken Tools) CLI:
```
npm install bespoken-tools -g
```

## Setting Up The Alexa Skill
Go to the Alexa Skills List on Amazon Developer console:
https://developer.amazon.com/edw/home.html#/skills/list

Select "Add A New Skill" on the top-right.

Provide the Skill Information:
Skill Type is Custom Interaction Model
Name is Simple Audio Player
Invocation Name is simple player

It should look like this:

![Skill Information](https://octodex.github.com/images/yaktocat.png)

Select "Next". Now we setup the Interaction Model. To do this,
cut and paste the contents of speechAssets/IntentSchema.json into the top dialog:

Then cut and paste the contents of speechAssets/SampleUtterances.txt into the bottom dialog:
