<p align="center" >
    <a href="https://github.com/bespoken/super-simple-audio-player/blob/Part1/README.md">Part 1</a> 
    | <a href="https://github.com/bespoken/super-simple-audio-player/blob/Part2/README.md">Part 2</a>
    | </strong>Part 3</strong>
</p>

# Part 3 - Automated Unit Tests
In this step, we show you how to:
1) Setup your project for unit testing
2) Leverage the [Virtual Alexa](https://github.com/bespoken/virtual-alexa) emulator to test

Unit tests are important for testing your skill as you develop it, as well for ensuring nothing gets broken as you add new features.

They are an essential part of building industrial-strength Alexa skills.

## Getting Setup For Unit Tests
We use the [Mocha](https://mochajs.org/) and [Chai](http://chaijs.com/) frameworks for unit tests.

They are easy to work with, and use a Behavior-Driven-Development syntax.

To make it easy to configure everything, we added a [package.json](https://github.com/bespoken/super-simple-audio-player/blob/Part3/package.json) file to the root directory.

This captures all the new dependencies. To install them, just run:
```sh
npm install
```

## Writing the Unit Tests
Here is a really simple automated test with Silent Echo:
```javascript
    it("Opens the Skill", function(done) {
        alexa.launch().then((result) => {
            assert.isDefined(result.response.outputSpeech.ssml);
            assert.include(result.response.outputSpeech.ssml, "Welcome to the Simple Audio Player");
            done();
        });
    });
```

This simply launches the skills and checks to see that a proper response comes back.

Here is an example that works through a full interaction with playback:
```javascript
    it("Opens the Skill, Play, Next and Finish", function(done) {
        alexa.launch().then((result) => {
            assert.isDefined(result.response.outputSpeech.ssml);
            assert.include(result.response.outputSpeech.ssml, "Welcome to the Simple Audio Player");
            return alexa.utter("play");

        }).then((result) => {
            assert.include(result.response.directives[0].audioItem.stream.url, "episode-013");
            return alexa.utter("next");

        }).then((result) => {
            assert.include(result.response.directives[0].audioItem.stream.url, "episode-012");
            return alexa.audioPlayer().playbackNearlyFinished();

        }).then((result) => {
            // When playback nearly finished is called, the next track is queued
            assert.include(result.response.directives[0].playBehavior, "ENQUEUE");
            assert.include(result.response.directives[0].audioItem.stream.url, "episode-011");

            // The previous track is still playing though until playback finished is called
            assert.include(alexa.audioPlayer().playing().stream.url, "episode-012");
            alexa.audioPlayer().playbackFinished();

        }).then((result) => {
            assert.include(alexa.audioPlayer().playing().stream.url, "episode-011");
            done();
        })
    });
```

Take a look at the full [unit-test code here](https://github.com/bespoken/super-simple-audio-player/blob/Part3/test/index-test.js).

## What Is Next?
Our next edition will show how to integrate new display cards into our rapidly becoming awesome skill!