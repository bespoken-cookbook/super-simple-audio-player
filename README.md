<p align="center" >
    <a href="https://github.com/bespoken/super-simple-audio-player/blob/Part1/README.md">Part 1</a> 
    | <a href="https://github.com/bespoken/super-simple-audio-player/blob/Part2/README.md">Part 2</a>
    | </strong>Part 3</strong>
</p>

# Part 3 - Automated Unit Tests
In this step, we show you how to:
1) Setup your project for unit testing
2) Leverage the [Silent Echo SDK](https://github.com/bespoken/silent-echo-sdk) to test

Unit tests are important for testing your skill as you develop it, as well for ensuring nothing gets broken as you add new features.

They are an essential part of building industrial-strength Alexa Skills.

## Getting Setup For Unit Tests
We use the [Mocha](https://mochajs.org/) and [Chai](http://chaijs.com/) frameworks for unit tests.

They are easy to work with, and use a Behavior-Driven-Development syntax.

To make it easy to configure everything, we added a [package.json](https://github.com/bespoken/super-simple-audio-player/blob/Part3/package.json) file to the root directory.

This captures all the new dependencies. To install them, just run:
```sh
npm install
```

## Enabling Silent Echo
To use Silent Echo, you will first need to get a token.

The token is associated with your Amazon Developer account, and allows Silent Echo to access your in-development skill.

To get your token, click here:
[https://silentecho.bespoken.io/register?token=true](https://silentecho.bespoken.io/register?token=true)

You will login to Amazon to grant Silent Echo access to your account.
Once you do that, save off the token shown on the screen.

## Writing the Unit Tests
Here is a really simple automated test with Silent Echo:
```javascript
    it("Opens the Skill", function(done) {
        const silentEcho = new sdk.SilentEcho(process.env.TEST_TOKEN);
        silentEcho.baseURL = BASE_URL;
        silentEcho.message("open simple player").then((result) => {
            assert.isDefined(result.transcript);
            assert.isTrue(result.transcript.startsWith("welcome to the simple audio player"));
            return silentEcho.message("quit");
        }).then((result) => {
            console.log("JSON: " + JSON.stringify(result));
            done();
        }).catch((e) => {
            assert.fail(e, "This should not have happened");
        });
    });
 ```

What it does is initializes the Silent Echo, then tells it to "open simple player".
This is just like if you said to your Echo - "Alexa, open simple player".

The neat thing is the result of what echo says in reply is available in the result.transcript object.

Keep in mind - this is using Speech-To-Text on what Alexa replies with, so it is not 100% accurate.
But it is generally repeatable, so it will come back with the same results consistently.

There's lots that comes back in the payload - the full docs are at the Silent Echo SDK, but here is a summary:
```javascript
export interface ISilentResult {
    card: ICard | null;
    debug?: {
        rawJSON: any;
    };
    sessionTimeout: number;
    streamURL: string | null;
    transcript: string;
    transcriptAudioURL: string;
}
```

Take a look at the full [unit-test code here](https://github.com/bespoken/super-simple-audio-player/blob/Part3/test/index-test.js).

## What Is Next?
Our next edition will show how to integrate new display cards into our rapidly becoming awesome skill!