# AR without markers or GPS

## Journey:

1.  I started with following [this tutorial](https://urish.medium.com/web-powered-augmented-reality-a-hands-on-tutorial-9e6a882e323e) on creating a markerless AR animation with automatic plane detection. In principle this looks promising, but as it turned out, the used libraries are already deprecated. Trying to recreate this with newer versions went wrong, as it also turned out, that the technology it's using to detect planes is yet experimental in Chrome. Bummer.

2.  Then I figured I should be able to do it myself, I mean: how hard can it be. This began a long and frustrating spree of browsing through [AFRAME documentation](https://aframe.io/) (very informative) and [AR.js documentation](https://ar-js-org.github.io/AR.js-Docs/) (less informative).

This resulted in stable 3D scene with live camera feed in the background.

3.  Browsing through other resources (StackOverflow mostly) I figured it should be possible to use device gyroscope to use device tilting and movement using `DeviceOrientation` and `DeviceMovement` events. [This is a very helpful article](https://medium.com/chip-monks/whats-a-gyroscope-and-accelerometer-doing-in-my-mobile-device-eb7acbdfa4e0) on how does gyroscope work.

4.  I figured I have zero space orientation (which is weird because I am quite a good driver), so I asked ChatGPT to help me out with tweaking the position and orientation. Turns out as an AI model is not great with that either and frankly does quite a few solid mistakes and inconsitencies for a machine, so our jobs are safe. It was super helpful though to put the pieces together in a semi-coherent way. The object still moves - to say the least - weirdly, but at least it moves.

## What IS working:

1. I can render a 3D model with camera feed in the background in my phone Chrome browser (Samsung Galaxy M21, not the most powerful there is)
2. The quality of render seems fine, no visible issues.
3. The code is Vanilla JS based on libraries, nothing fancy here.
4. When I tilt the phone, the model tilts.
5. When I move the phone around me, the model titls accordingly.

## What IS NOT working:

1. The object movement in AR space are not "natural" to the eye, so it does not really feel like a augmented **reality** experience.
2. In some phone positions, the object "flickers" - this is probably to narrow view of camera or some other rendering issues.
3. The device "looses" the object sometimes, as the object does not spin in a "natural" direction.

## Future steps:

1. I still don't know if what I want to do is possible without use of markers. There must be a reason why other tools use this approach (ex. LEGO store Leicester Square).
2. There must be some way to detect moving with the phone, ex. taking steps. Steps counter do it and I am sure they don't use GPS for that. I want to explore this.
3. The object still doesn't seem to be locked in virtual world, it appears to follow the user. I want it to "stay" within virtual space, hence the distance detection by steps measure is crucial.
4. There must be a way to have some visual cues as helpers in A-Frame. So far I tried [this one](https://github.com/fcor/arjs-gestures) and [this one](https://github.com/c-frame/aframe-extras/tree/master/src/controls). Maybe I will use native to Three.js in the future.
