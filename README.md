[Previous Step](https://github.com/bespoken/super-simple-audio-player/blob/master/README.md) | Next Step - Coming Soon!

# Part 2 - Next/Previous and the AudioPlayer Queue
In this step, we show you how to use the builtin AMAZON.NextIntent and AMAZON.PreviousIntent.

To use them, we refactor our code in one essential way - we change our `play` function to `queue`:
```
SimplePlayer.prototype.queue = function (audioURL, offsetInMilliseconds, playBehavior, token) {
    var response = {
        version: "1.0",
        response: {
            shouldEndSession: true,
            directives: [
                {
                    type: "AudioPlayer.Play",
                    playBehavior: playBehavior,
                    audioItem: {
                        stream: {
                            url: audioURL,
                            token: token, // Unique token for the track - needed when queueing multiple tracks
                            expectedPreviousToken: null, // The expected previous token - when using queues, ensures safety
                            offsetInMilliseconds: offsetInMilliseconds
                        }
                    }
                }
            ]
        }
    }

    this.context.succeed(response);
};
```
We added a two parameters - `playBehavior` and `token`.

