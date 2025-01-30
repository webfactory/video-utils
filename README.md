# <video-utils>

Web Component with progressive enhancements for the HTML &lt;video> element

## Installation

```
npm install @webfactoryde/video-utils
```

## Usage

The `<video-utils>` Web Component is meant to be a lightweight wrapper and progressive accessibility enhancement for `<video>` elements that autoplay muted background video.

It implements a media query for `prefers-reduced-motion: reduced` and prevents autoplay if the media query matches.

### Steps to implement:

1. The JS file "video-utils.js" must be loaded. Depending on browser support requirements, transpilation for older browsers is recommended.
2. Wrap your  `<video>` with `<video-utils>`.
