<p align="center" >
    <strong>Part 1</strong> 
    | <a href="https://github.com/bespoken/super-simple-audio-player/blob/Part2/README.md">Part 2</a> 
    | Part 3 - Coming Soon!
</p>

# The Super Simple AudioPlayer - Getting Started
This project is meant to make it as easy as possible to get started using the [Amazon Alexa AudioPlayer](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/custom-audioplayer-interface-reference).

It is an AWS Lambda project with no code dependencies and no frameworks. It is meant to illustrate the core behavior of the AudioPlayer in the simplest manner possible.

This is the first iteration - we will be expanding on this as a tutorial that guides users through adding behavior to their AudioPlayer skill.

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

## What It Does
This skill is very simple. It is meant to be a starting point for understanding how the AudioPlayer works. What does it do?

* Launches and prompts the user to say "Play"
* Starts playing a podcast when the user says "Play"
* Pauses and Resumes, at the user's request

We will expand on the behavior in future postings, but this is meant to get someone started as easily as possible.

These instructions assume you are using the `bst proxy` for testing locally on your laptop. Alternatively, this can be run directly from the AWS Lambda environment.

## Testing With The Service Simulator
To ensure everything is working correctly, make sure that your bst proxy is running:
```
bst proxy lambda index.js --verbose
```
(Again, this should be run from the directory where you cloned the project, such as /Users/jpk/dev/super-simple-audio-player)

Then on the "Test" section, go to the **Service Simulator** section at the bottom and type `Play`. Then click the `Ask Super Simple Player` button. It should return output like below:

![Service Simulator](https://raw.githubusercontent.com/bespoken/super-simple-audio-player/master/misc/SkillServiceSimulator.png)

## Testing With An Echo Device
Again, make sure that your bst proxy is running:
```
bst proxy lambda index.js --verbose
```

Then just talk to your Echo device - say something like:
```
Alexa, tell Simple Player to Play
```

You should also be able to interact with it saying "Alexa Pause" and "Alexa Resume".
