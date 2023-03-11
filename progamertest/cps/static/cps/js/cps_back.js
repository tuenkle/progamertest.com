function roundUpToFirst(number) {
    return Math.round(number * 10) / 10
}
function clickedAndTimeToString(clicked, time) {
    if (time === 0){
        return "0";
    } else {
        let cps = Math.round(clicked/time * 10) / 10;
        return `${cps.toFixed(1)}`;
    }
}
function microTimeToSecondString(time) {
    time *= 10
    time = time.toFixed(1);
    if (time < 10) {
        return `00:${time.substring(0, 1)}0`
    } else {
        return `0${time.substring(0, 1)}:${time.substring(1, 2)}0`
    }
}
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
            if (self.backend.getTime() >= 4.99){
                clearInterval(self.timerID);
                self.canvas.section.removeEventListener("mousedown", self.listener);
                let cpsResult = roundUpToFirst(self.backend.getClicked()/self.backend.getTime())
                self.canvas.drawEndGameCSS(cpsResult);
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
    cpsRetry(e) {
        let form = document.getElementById("cps_form")
        form.cps_result.value = this.cps_result;
        form.action = "retry/";
        form.submit();
    }
    cpsNext(e) {
        let form = document.getElementById("cps_form")
        form.cps_result.value = this.cps_result;
        form.action = "next/";
        form.submit();
    }
    drawEndGameCSS(cpsResult) {
        this.cps_result = cpsResult
        this.retry.style.display = "inline-block";
        this.next.style.display = "inline-block";
        this.title.textContent = cpsResult;
        this.retry.onclick = this.cpsRetry.bind(this);
        this.next.onclick = this.cpsNext.bind(this);
    }
    drawTime(time) {
        this.subtitle.textContent = `${microTimeToSecondString(time)}/05:00`;
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

}
