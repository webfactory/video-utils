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

        this.motionQuery = matchMedia('(prefers-reduced-motion: reduce)');
        this.video = this.querySelector('video');

        this.handleReducedMotion();

        this.motionQuery.addEventListener('change', this.handleReducedMotion.bind(this));

        this.initialized = true;
    }

    handleReducedMotion() {
        if (this.motionQuery.matches) {
            this.video.pause();
        } else {
            this.video.play();
        }
    }
}

VideoUtils.register();
