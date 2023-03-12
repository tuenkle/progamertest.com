import {CpsCanvas, CpsBackend, CpsCore} from "./cps_back.js";

const cps_section_canvas = document.getElementById("cps_section_canvas");
const cps_h1_canvasTitle = document.getElementById("cps_h1_canvasTitle");
const cps_h2_canvasSubtitle = document.getElementById("cps_h2_canvasSubtitle");
const cps_p_canvasParagraph = document.getElementById("cps_p_canvasParagraph");
const cps_button_canvasButtonRetry = document.getElementById("cps_button_canvasButtonRetry");
const cps_button_canvasButtonNext = document.getElementById("cps_button_canvasButtonNext");

const canvas = new CpsCanvas(
    cps_section_canvas,
    cps_h1_canvasTitle,
    cps_h2_canvasSubtitle,
    cps_p_canvasParagraph,
    cps_button_canvasButtonRetry,
    cps_button_canvasButtonNext,
);
const backend = new CpsBackend();
const main = new CpsCore(canvas, backend);

cps_section_canvas.addEventListener("click", function() {
    main.run()
}, {once:true});