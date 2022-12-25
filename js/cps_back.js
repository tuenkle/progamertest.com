import {
    clickedAndTimeToString,
    microTimeToSecondString,
    redirectToDashboard,
    redirectToCps,
    setCookie
} from "./utils.js";
export class CpsCore {
    constructor(CpsCanvas, CpsBackend) {
        this.canvas = CpsCanvas;
        this.backend = CpsBackend;
    }
    run() {
        this.canvas.drawDefaultCSS();
        this.canvas.drawTime(this.backend.getTime());
        this.canvas.drawCps(this.backend.getClicked(), this.backend.getTime());
        this.timer();
        this.listener = this.listener.bind(this)
        this.canvas.section.addEventListener("mousedown", this.listener);
    }
    listener(event) {
        this.backend.plusClicked();
        this.canvas.drawCps(this.backend.getClicked(), this.backend.getTime());
        event.preventDefault();
    }
    timer() {
        let self = this;
        this.timerID = setInterval(function() {
            self.backend.plusTime();
            self.canvas.drawTime(self.backend.getTime());
            self.canvas.drawCps(self.backend.getClicked(), self.backend.getTime());
            if (self.backend.getTime() >= 5){
                clearInterval(self.timerID);
                self.canvas.section.removeEventListener("mousedown", self.listener);
                self.backend.setCookieInFinish(self.backend.getClicked());
                self.canvas.drawEndGameCSS(self.backend.getClicked(), self.backend.getTime());
            }
        }, 100)
    }
}

export class CpsCanvas {
    constructor(
        cps_section_canvas,
        cps_h1_canvasTitle,
        cps_h2_canvasSubtitle,
        cps_p_canvasParagraph,
        cps_button_canvasButtonRetry,
        cps_button_canvasButtonNext,
    ) {
        this.section = cps_section_canvas;
        this.title = cps_h1_canvasTitle;
        this.subtitle = cps_h2_canvasSubtitle;
        this.paragraph = cps_p_canvasParagraph;
        this.retry = cps_button_canvasButtonRetry;
        this.next = cps_button_canvasButtonNext;
    }
    drawDefaultCSS() {
        this.paragraph.style.display = "none";
    }
    drawEndGameCSS(clicked, time) {
        this.retry.style.display = "inline-block";
        this.next.style.display = "inline-block";
        this.title.textContent = `${clickedAndTimeToString(clicked, time)}`;
        this.subtitle.textContent = `상위 0%`;
        this.retry.onclick = redirectToCps;
        this.next.onclick = redirectToDashboard;
    }
    drawTime(time) {
        this.subtitle.textContent = `${microTimeToSecondString(time)}/5:0`;
    }
    drawCps(clicked, time) {
        this.title.textContent = `CPS: ${clickedAndTimeToString(clicked, time)}`;
    }

}

export class CpsBackend {
    constructor() {
        this.time = 0;
        this.clicked = 0;
    }
    plusClicked() {
        this.clicked += 1;
    }
    plusTime() {
        this.time += 0.1;
    }
    getClicked() {
        return this.clicked;
    }
    getTime() {
        return this.time;
    }
    setCookieInFinish(cpsResult){
        setCookie("cpsResult", cpsResult);
    }
}
