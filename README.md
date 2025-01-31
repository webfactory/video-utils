# <video-utils>

Web Component with progressive enhancements for the HTML &lt;video> element

## Installation

```
npm install @webfactoryde/video-utils
```

## Usage

The `<video-utils>` Web Component is meant to be a lightweight wrapper and progressive accessibility enhancement for `<video>` elements that autoplay muted background video.

It supports manual controls (pause and play buttons) so the video can meet [WCAG 2.1 SC 2.2.2: Pause, Stop, Hide](https://www.w3.org/TR/WCAG21/#pause-stop-hide). 

It also implements a media query for `prefers-reduced-motion: reduced`, an OS level user preference option that signals that automatic movement should be limited, and prevents autoplay if the media query (and user preference) matches. 

### Steps to implement:

1. The JS file "video-utils.js" must be loaded. Depending on browser support requirements, transpilation for older browsers is recommended.
2. Wrap your  `<video>` with `<video-utils>`.
3. Add both a pause and a play `<button>` with your desired markup (e.g. nested icon, attributes, translated text, etc.). The buttons need to be made identifiable with `data-video-utils-play` and `data-video-utils-pause` respectively. The Web Component leaves positioning and aesthetics of the buttons to the outside context.

### Example

```
<video-utils>
    <video autoplay="" muted="" loop="" playsinline="">
        <source src="https://download.blender.org/peach/bigbuckbunny_movies/big_buck_bunny_480p_h264.mov">
    </video>
    <button data-video-utils-play>Play</button>
    <button data-video-utils-pause>Pause</button>
</video-utils>
```
