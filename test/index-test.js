const assert = require("chai").assert;
const va = require("virtual-alexa");
const dotenv = require("dotenv");

describe("SimpleAudioPlayerTest", function() {
    before(() => {
        dotenv.config();
    });

    let alexa;
    beforeEach(function() {
        alexa = va.VirtualAlexa.Builder()
            .handler("index.handler") // Lambda function file and name
            .intentSchemaFile("./speechAssets/IntentSchema.json")
            .sampleUtterancesFile("./speechAssets/SampleUtterances.txt")
            .create();
    });

    it("Opens the Skill", function(done) {
        alexa.launch().then((result) => {
            assert.isDefined(result.response.outputSpeech.ssml);
            assert.include(result.response.outputSpeech.ssml, "Welcome to the Simple Audio Player");
            done();
        });
    });

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
        });
    });

    it("Opens the Skill and Plays, Next, Then Previous", function(done) {
        alexa.launch().then((result) => {
            assert.include(result.response.outputSpeech.ssml, "Welcome to the Simple Audio Player");
            return alexa.utter("play");

        }).then((result) => {
            assert.include(result.response.directives[0].audioItem.stream.url, "episode-013");
            return alexa.utter("next");

        }).then((result) => {
            assert.include(result.response.directives[0].audioItem.stream.url, "episode-012");
            return alexa.utter("previous")

        }).then((result) => {
            assert.include(result.response.directives[0].audioItem.stream.url, "episode-013");
            done();

        }).catch((e) => {
            assert.fail(e, "This should not have happened");
        });
    });


});
