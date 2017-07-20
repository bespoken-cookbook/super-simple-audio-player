const assert = require("chai").assert;
const bst = require("bespoken-tools/lib/client/bst-proxy");
const dotenv = require("dotenv");
const sdk = require("silent-echo-sdk");

describe("SimpleAudioPlayerTest", function() {
    this.timeout(20000);
    const BASE_URL = "https://silentecho-dev.bespoken.io/process";

    before(() => {
        dotenv.config();
    });

    // it("Opens the Skill", function(done) {
    //     const silentEcho = new sdk.SilentEcho(process.env.TEST_TOKEN);
    //     silentEcho.baseURL = BASE_URL;
    //     silentEcho.message("open simple player").then((result) => {
    //         assert.isDefined(result.transcript);
    //         assert.isTrue(result.transcript.startsWith("welcome to the simple audio player"));
    //         done();
    //     }).catch((e) => {
    //         assert.fail(e, "This should not have happened");
    //     });
    //
    // });

    // it("Opens the Skill and Plays", function(done) {
    //     this.timeout(60000);
    //
    //     const silentEcho = new sdk.SilentEcho(process.env.TEST_TOKEN);
    //     silentEcho.baseURL = BASE_URL;
    //     silentEcho.message("open simple player").then((result) => {
    //         assert.isDefined(result.transcript);
    //         assert.isTrue(result.transcript.startsWith("welcome to the simple audio player"));
    //         return silentEcho.message("play");
    //     }).then((result) => {
    //         assert.isDefined(result.streamURL);
    //         assert.equal(result.streamURL, "https://feeds.soundcloud.com/stream/323049941-user-652822799-episode-013-creating-alexa-skills-using-bespoken-tools-with-john-kelvie.mp3");
    //         done();
    //     }).catch((e) => {
    //         assert.fail(e, "This should not have happened");
    //     });
    // });

    it("Opens the Skill and Plays and Goes to Next", function(done) {
        this.timeout(60000);

        const silentEcho = new sdk.SilentEcho(process.env.TEST_TOKEN);
        silentEcho.baseURL = BASE_URL;
        silentEcho.message("open simple player").then((result) => {
            console.log("JSON: " + JSON.stringify(result));
            assert.isDefined(result.transcript);
            assert.isTrue(result.transcript.startsWith("welcome to the simple audio player"));
            return silentEcho.message("play");
        }).then((result) => {
            console.log("JSON: " + JSON.stringify(result));
            assert.isDefined(result.streamURL);
            assert.equal(result.streamURL, "https://feeds.soundcloud.com/stream/323049941-user-652822799-episode-013-creating-alexa-skills-using-bespoken-tools-with-john-kelvie.mp3");
            return silentEcho.message("play next");
        }).then((result) => {
            console.log("JSON: " + JSON.stringify(result));
            assert.isDefined(result.streamURL);
            assert.equal(result.streamURL, "https://feeds.soundcloud.com/stream/318108640-user-652822799-episode-012-alexa-skill-certification-with-sameer-lalwanilexa-dev-chat-final-mix.mp3");
            done();
        }).catch((e) => {
            assert.fail(e, "This should not have happened");
        });
    });


});
