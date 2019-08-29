# OurSocks.io Canvas Fingerprint Defender

## What is Canvas Fingerprinting?

Canvas fingerprinting is one of a number of browser fingerprinting techniques for tracking online users that allow websites to identify and track visitors using the HTML5 canvas element instead of browser cookies or other similar means.

Basically, a website embeds a javascript snippet that draws some shapes and writes some text on an html canvas element, and then takes a screenshot of the result, hashes it, and sends it back to their servers. This identifies you by the hardware/software you have on your computer.

## How does this extension work?

A random value will be set at browser startup, but you can then overwrite that by making a GET request to the popup/options page with a fingerprint_seed URL argument, which will set the seed to use a custom canvas fingerprint or resume using an old one:

chrome-extension://bningnmfogcgkgmnjoicajjnkbogecoo/data/options/options.html?fingerprint_seed=0.399

Remember:

- The string 'bningnmfogcgkgmnjoicajjnkbogecoo' above may be different on your machine. Open the extension's popup page and then copy the URL into your script.
- Choose any float value between zero and one instead of 0.399. To reuse an old 'identity', use the same value that you used last time.

## How to test that it's working

1. Open a browser window. Load the folder which contains manifest.json as an unpacked extension.
2. Go to https://browserleaks.com/canvas and note the 'Signature' line's value.
3. Go to chrome-extension://bningnmfogcgkgmnjoicajjnkbogecoo/data/options/options.html?fingerprint_seed=0.123
4. Go to https://browserleaks.com/canvas and note the 'Signature' line's value. It should be different.
5. Go to chrome-extension://bningnmfogcgkgmnjoicajjnkbogecoo/data/options/options.html?fingerprint_seed=0.987
6. Go to https://browserleaks.com/canvas and note the 'Signature' line's value. It should be different.
7. Reload https://browserleaks.com/canvas and note the 'Signature' line's value. It should not have changed.
8. Congrats! Everything is working reliably.

## Why yet another plugin?

No existing plugin is made to be used with automation/selenium/webdriver or at scale. If you're doing heavy scraping, setting the seed value using a simple GET request will be very useful.

## Support

Support is only offered for paying customers of OurSocks.io