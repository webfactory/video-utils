class VideoUtils extends HTMLElement {
    static get observedAttributes() {
        return ["label-play", "label-pause", "play-pause-button-id"];
    }

    static register(tagName) {
        if ("customElements" in window) {
            customElements.define(tagName || "video-utils", VideoUtils);
        }
    }

    constructor() {
        super();
    }

    connectedCallback() {
        this._connect();
    }

    _connect() {
        if (this.children.length) {
            this._init();
            return;
        }

        // not yet available, watch it for init
        this._observer = new MutationObserver(this._init.bind(this));
        this._observer.observe(this, { childList: true });
    }

    _init() {
        if (this.initialized) {
            return;
        }

        this.video = this.querySelector('video');

        this.motionQuery = matchMedia('(prefers-reduced-motion: reduce)');
        this.handleReducedMotion();
        this.motionQuery.addEventListener('change', this.handleReducedMotion.bind(this));

        let playPauseButtonId = this.getAttribute('play-pause-button-id');
        this.playPauseButton = playPauseButtonId ? this.querySelector(`#${playPauseButtonId}`) : null;
        this.labelPlay = this.getAttribute('label-play') || 'Play';
        this.labelPause = this.getAttribute('label-pause') || 'Pause';

        if (this.playPauseButton) {
            this.playPauseButton.addEventListener('click', this.handlePausePlay.bind(this));
        }



        this.initialized = true;
    }

    handleReducedMotion() {
        if (this.motionQuery.matches) {
            this._pause();
        } else {
            this._play();
        }
    }

    handlePausePlay() {
        if (this.video.paused) {
            this._play();
        } else {
            this._pause();
        }
    }

    _play() {
        this.video.play();

        if (this.playPauseButton) {
            this.playPauseButton.innerText = this.labelPause;
        }
    }
    _pause() {
        this.video.pause();

        if (this.playPauseButton) {
            this.playPauseButton.innerText = this.labelPlay;
        }
    }
}

VideoUtils.register();
