import Emitter from "../utils/emitter";
import {CONTROL_HEIGHT} from "../constant";

export default class CommonLoader extends Emitter {
    constructor() {
        super();
    }

    resize() {
        this.player.debug.log('canvasVideo', 'resize');
        const option = this.player._opt;
        const width = this.player.width;
        let height = this.player.height;
        if (option.hasControl) {
            height -= CONTROL_HEIGHT;
        }
        let resizeWidth = this.$videoElement.width;
        let resizeHeight = this.$videoElement.height;
        const rotate = option.rotate;
        let left = ((width - resizeWidth) / 2)
        let top = ((height - resizeHeight) / 2)
        if (rotate === 270 || rotate === 90) {
            resizeWidth = this.$videoElement.height;
            resizeHeight = this.$videoElement.width;
        }

        const wScale = width / resizeWidth;
        const hScale = height / resizeHeight;

        let scale = wScale > hScale ? hScale : wScale;
        //
        if (!option.isResize) {
            if (wScale !== hScale) {
                scale = wScale + ',' + hScale;
            }
        }
        //
        if (option.isFullResize) {
            scale = wScale > hScale ? wScale : hScale;
        }
        let transform = "scale(" + scale + ")";

        if (rotate) {
            transform += ' rotate(' + rotate + 'deg)'
        }

        this.$videoElement.style.transform = transform;
        this.$videoElement.style.left = left + "px"
        this.$videoElement.style.top = top + "px"
    }
}