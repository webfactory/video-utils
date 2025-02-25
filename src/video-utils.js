class VideoUtils extends HTMLElement {
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

        // support manual controls if present
        this.playButton = this.querySelector('[data-video-utils-play]');
        this.pauseButton = this.querySelector('[data-video-utils-pause]');
        this.hasControls = this.playButton && this.pauseButton;

        if (this.hasControls) {
            this.playButton.addEventListener('click', this.handlePausePlay.bind(this));
            this.pauseButton.addEventListener('click', this.handlePausePlay.bind(this));
        }

        if (this.video.autoplay) {
            this.pauseButton.setAttribute('hidden', true);
        }

        // adhere to users' motion preferences
        this.motionQuery = matchMedia('(prefers-reduced-motion: reduce)');
        this.handleReducedMotion();
        this.motionQuery.addEventListener('change', this.handleReducedMotion.bind(this));

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

        if (this.hasControls) {
            this.playButton.setAttribute('hidden', true);
            this.pauseButton.removeAttribute('hidden');
            this.pauseButton.focus();
        }
    }
    _pause() {
        this.video.pause();

        if (this.hasControls) {
            this.pauseButton.setAttribute('hidden', true);
            this.playButton.removeAttribute('hidden');
            this.playButton.focus();
        }
    }
}

VideoUtils.register();
