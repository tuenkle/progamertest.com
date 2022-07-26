import {redirectToAim, redirectToReaction} from "./tools.js";
import {addEventListenerToReactionCanvas} from "./reaction_back.js";

const reaction_section_canvas = document.getElementById("reaction_section_canvas");
const reaction_h1_canvasTitle = document.getElementById("reaction_h1_canvasTitle");
const reaction_h2_canvasSubTitle = document.getElementById("reaction_h2_canvasSubtitle");
const reaction_p_canvasParagraph = document.getElementById("reaction_p_canvasParagraph");
const reaction_p_canvasUnderTitle = document.getElementById("reaction_p_canvasUnderTitle");
const reaction_button_canvasButtonRetry = document.getElementById("reaction_button_canvasButtonRetry");
const reaction_button_canvasButtonNext = document.getElementById("reaction_button_canvasButtonNext");

reaction_button_canvasButtonRetry.onclick = redirectToReaction;
reaction_button_canvasButtonNext.onclick = redirectToAim;

addEventListenerToReactionCanvas(reaction_section_canvas,
                                 reaction_h1_canvasTitle,
                                 reaction_h2_canvasSubTitle,
                                 reaction_p_canvasParagraph,
                                 reaction_p_canvasUnderTitle);