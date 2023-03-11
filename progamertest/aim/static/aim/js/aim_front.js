import {AimBackend, AimCanvas, AimCore} from "./aim_back.js";

const aim_section_canvas = document.getElementById("aim_section_canvas")
const aim_h1_canvasTitle = document.getElementById("aim_h1_canvasTitle")
const aim_h2_canvasSubtitle = document.getElementById("aim_h2_canvasSubtitle")
const aim_p_canvasParagraph = document.getElementById("aim_p_canvasParagraph")
const aim_button_canvasButtonRetry = document.getElementById("aim_button_canvasButtonRetry")
const aim_button_canvasButtonNext = document.getElementById("aim_button_canvasButtonNext")
const aim_p_canvasUnderTitle = document.getElementById("aim_p_canvasUnderTitle")
const aim_canvas_canvas = document.createElement("canvas");
const aim_p_canvasParagraph2 = document.createElement("p")
const aim_p_canvasParagraph3 = document.createElement("p")
const aim_form = document.getElementById("aim_form");
aim_canvas_canvas.setAttribute("id","aim_canvas_canvas");
aim_p_canvasParagraph2.setAttribute("id","aim_p_canvasParagraph2");
aim_p_canvasParagraph3.setAttribute("id","aim_p_canvasParagraph3");

const canvas = new AimCanvas(
    aim_section_canvas,
    aim_canvas_canvas,
    aim_h1_canvasTitle,
    aim_h2_canvasSubtitle,
    aim_p_canvasParagraph,
    aim_p_canvasParagraph2,
    aim_p_canvasParagraph3,
    aim_button_canvasButtonRetry,
    aim_button_canvasButtonNext,
    aim_p_canvasUnderTitle,
    aim_form);
const backend = new AimBackend(30, 20, 1500);
const main = new AimCore(canvas, backend);

aim_section_canvas.addEventListener("click", function() {
    main.run()
}, {once:true});