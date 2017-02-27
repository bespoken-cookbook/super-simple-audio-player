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
There are a number of steps to this.

For a detailed walk-through, just [follow this guide](https://github.com/bespoken/super-simple-audio-player/blob/master/docs/skill_setup.md).

## Testing With The Service Simulator
To ensure everything is working correctly, make sure that your bst proxy is running:
```
bst proxy lambda index.js
```
(Again, this should be run from the directory where you cloned the project, such as /Users/jpk/dev/super-simple-audio-player)

Then on the "Test" section, go to the **Service Simulator** section at the bottom and type `Play`. Then click the `Ask Super Simple Player` button. It should return output like below:

![Service Simulator](https://raw.githubusercontent.com/bespoken/super-simple-audio-player/master/misc/SkillServiceSimulator.png)

## Testing With An Echo Device
Again, make sure that your bst proxy is running:
```
bst proxy lambda index.js
```

Then just talk to your Echo device - say something like:
```
Alexa, tell Simple Player to Play
```

You should also be able to interact with it saying "Alexa Pause" and "Alexa Resume".

