# Configuring The Skill With Amazon
This tutorial walks you through configuring your Alexa Skill on the Amazon Developer Console.

If you have done this before, these steps will be fairly painless.

And if it is your first time, no worries. We will guide you through it.

## Signing In
Go to the Alexa Skills List on Amazon Developer console:
https://developer.amazon.com/edw/home.html#/skills/list

If you have not already signed up for Amazon Developer account, do so now. We'll wait here for you :-)

Once you are set, select the "Skills" tab and then "Add A New Skill" on the top-right.

### Skill Information

Provide the Skill Information:  
**Skill Type** is `Custom Interaction Model`  
**Name** is `Super Simple Player`  
**Invocation Name** is `simple player`  
**Audio Player** under Global Fields is set  to `Yes`  

It should look like this when all filled out:

![Skill Information](https://raw.githubusercontent.com/bespoken/super-simple-audio-player/master/misc/SkillInformation.png)

Once everything is entered, select "Next". Now we setup the Interaction Model.

### Skill Interaction Model
For the skill interaction model,
cut and paste the contents of [speechAssets/IntentSchema.json](https://raw.githubusercontent.com/bespoken/super-simple-audio-player/master/speechAssets/IntentSchema.json) into the Intent Schema section:

![Intent Schema](https://raw.githubusercontent.com/bespoken/super-simple-audio-player/master/misc/SkillIntentSchema.png)

Then cut and paste the contents of [speechAssets/SampleUtterances.txt](https://raw.githubusercontent.com/bespoken/super-simple-audio-player/master/speechAssets/SampleUtterances.txt) into the Sample Utterances field:

![Intent Schema](https://raw.githubusercontent.com/bespoken/super-simple-audio-player/master/misc/SkillSampleUtterances.png)

The click "Next" again. It may take a minute to save as it parses the intents and utterances.

### Skill Configuration
First, set **Service Endpoint Type** to `HTTPS`.

Then, set **Geographical Region** to `North America`.

Finally, enter your bst proxy URL in the field for `North America`. Don't know your bst proxy URL? It's easy to get.

If you have not already installed Bespoken Tools, you can do it now:
```
npm install bespoken-tools -g
```

If you get an error, you may need to run instead:
```
sudo npm install bespoken-tools -g
```

Once bespoken-tools are installed, go to a terminal window and enter the directory where you cloned this project. Type there:
```
bst proxy lambda index.js
```

It should print out something like this:

![Proxy Output](https://raw.githubusercontent.com/bespoken/super-simple-audio-player/master/misc/bst-proxy-output.png)

Copy and paste the highlighted part into the configuration window. It should look like this:
![Skill Configuration](https://raw.githubusercontent.com/bespoken/super-simple-audio-player/master/misc/SkillConfiguration.png)

Then hit "Next" again.

### Skill Certificate
For the Skill Certificate screen, simply select:  
`My development endpoint is a sub-domain of a domain that has a wildcard certificate from a certificate authority`

The page should look like this:
![Skill Certificate](https://raw.githubusercontent.com/bespoken/super-simple-audio-player/master/misc/SkillCertificate.png)

Then click "Next" one more time.

### Skill Testing
On the Skill Testing page, make sure to toggle the button at the top to `Enabled`. This allows you to test your skill with real Alexa devices, such as Echo, Dot or Tap.

## Quick Confirmation
To ensure everything is working correctly, make sure that your bst proxy is running:
```
bst proxy lambda index.js
```
(Again, this should be run from the directory where you cloned the project, such as /Users/jpk/dev/super-simple-audio-player)

Then on the testing field, in the **Service Simulator** section at the bottom, type `Play`. The click the `Ask Super Simple Player` button. It should return output like below:

![Service Simulator](https://raw.githubusercontent.com/bespoken/super-simple-audio-player/master/misc/SkillServiceSimulator.png)

Now you are ready to do awesome stuff with the AudioPlayer!
