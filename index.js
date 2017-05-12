// This is only initialized when the Lambda is, so it is preserved across calls
// It is NOT a real database, but can be used for testing, as JavaScript Lambdas tend to live for a few hours
// Stay tuned for a more sophisticated example that uses DynamoDB
var stateByUser = {};

var podcastFeed = [
    "https://feeds.soundcloud.com/stream/318108640-user-652822799-episode-012-alexa-skill-certification-with-sameer-lalwanilexa-dev-chat-final-mix.mp3",
    "https://feeds.soundcloud.com/stream/314247951-user-652822799-episode-011-alexa-smart-home-partner-network-with-zach-parker.mp3",
    "https://feeds.soundcloud.com/stream/309340878-user-652822799-episode-010-building-an-alexa-skill-with-flask-ask-with-john-wheeler.mp3"
];

// Entry-point for the Lambda
exports.handler = function(event, context) {
    var player = new SimplePlayer(event, context);
    player.handle();
};

// The SimplePlayer has helpful routines for interacting with Alexa, within minimal overhead
var SimplePlayer = function (event, context) {
    this.event = event;
    this.context = context;
};

// Handles an incoming Alexa request
SimplePlayer.prototype.handle = function () {
    var requestType = this.event.request.type;
    var userId = this.event.context ? this.event.context.System.user.userId : this.event.session.user.userId;
    var response = null;
    var lastPlayed = this.load(userId);

    // On launch, we tell the user what they can do (Play audio :-))
    if (requestType === "LaunchRequest") {
        this.say("Welcome to the Simple Audio Player. Say Play to play some audio!", "You can say Play");

    // Handle Intents here - Play, Pause and Resume is all for now
    } else if (requestType === "IntentRequest") {
        var intent = this.event.request.intent;

        // We assume we start with the first podcast, but check the lastPlayed
        var podcastIndex = 0;
        if (lastPlayed) {
            podcastIndex = parseInt(lastPlayed.request.token);
        }

        if (intent.name === "Play") {
            this.queue(podcastFeed[podcastIndex], 0, "REPLACE_ALL", podcastIndex);

        } else if (intent.name === "AMAZON.NextIntent") {
            // If we have reach the end of the feed, start back at the beginning
            podcastIndex >= podcastFeed.length - 1 ? podcastIndex = 0 : podcastIndex++;

            this.queue(podcastFeed[podcastIndex], 0, "REPLACE_ALL", podcastIndex);

        } else if (intent.name === "AMAZON.PreviousIntent") {
            // If we have reached the start of the feed, go back to the end
            podcastIndex == 0 ? podcastIndex = podcastFeed.length - 1 : podcastIndex--;

            this.queue(podcastFeed[podcastIndex], 0, "REPLACE_ALL", podcastIndex);

        } else if (intent.name === "AMAZON.PauseIntent") {
            // When we receive a Pause Intent, we need to issue a stop directive
            //  Otherwise, it will resume playing - essentially, we are confirming the user's action
            this.stop();

        } else if (intent.name === "AMAZON.ResumeIntent") {
            var offsetInMilliseconds = 0;
            if (lastPlayed !== null) {
                offsetInMilliseconds = lastPlayed.request.offsetInMilliseconds;
            }

            this.queue(podcastFeed[podcastIndex], offsetInMilliseconds, "REPLACE_ALL", podcastIndex);
        }
    } else if (requestType === "AudioPlayer.PlaybackNearlyFinished") {
        // If we have reach the end of the feed, start back at the beginning
        podcastIndex >= podcastFeed.length - 1 ? podcastIndex = 0 : podcastIndex++;

        // We save off the PlaybackStopped Intent, so we know what was last playing
        this.queue(podcastFeed[podcastIndex], 0, "ENQUEUE", podcastIndex);

    } else if (requestType === "AudioPlayer.PlaybackStarted") {
        // We simply respond with true to acknowledge the request
        this.context.succeed(true);

    } else if (requestType === "AudioPlayer.PlaybackStopped") {
        // We save off the PlaybackStopped Intent, so we know what was last playing
        this.save(userId, this.event);

        // We respond with just true to acknowledge the request
        this.context.succeed(true);
    }
};

/**
 * Creates a proper Alexa response using Text-To-Speech
 * @param message
 * @param repromptMessage
 */
SimplePlayer.prototype.say = function (message, repromptMessage) {
    var response = {
        version: "1.0",
        response: {
            shouldEndSession: false,
            outputSpeech: {
                type: "SSML",
                ssml: "<speak> " + message + " </speak>"
            },
            reprompt: {
                outputSpeech: {
                    type: "SSML",
                    ssml: "<speak> " + message + " </speak>"
                }
            }
        }
    };
    this.context.succeed(response);
};

/**
 * Plays a particular track, from specific offset
 * @param audioURL The URL to play
 * @param offsetInMilliseconds The point from which to play - we set this to something other than zero when resuming
 */
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

// Stops the playback of Audio
SimplePlayer.prototype.stop = function () {
    var response = {
        version: "1.0",
        response: {
            shouldEndSession: true,
            directives: [
                {
                    type: "AudioPlayer.Stop"
                }
            ]
        }
    };

    this.context.succeed(response);
};

// Saves information into our super simple, not-production-grade cache
SimplePlayer.prototype.save = function (userId, state) {
    console.log("Save: " + userId);
    stateByUser[userId] = state;
};

// Load information from our super simple, not-production-grade cache
SimplePlayer.prototype.load = function (userId) {
    console.log("Load: " + userId);
    var state = null;
    if (userId in stateByUser) {
        state = stateByUser[userId];
        console.log("Loaded " + userId + " State: " + state);
    }
    return state;
};



