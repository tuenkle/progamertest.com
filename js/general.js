import {redirectToIndex, redirectToReaction, redirectToAim, redirectToCps, redirectToDashboard} from "./tools.js";

const general_a_title = document.getElementById("general_a_title");
const general_a_reactionBox = document.getElementById("general_a_reactionBox");
const general_a_aimBox = document.getElementById("general_a_aimBox");
const general_a_cpsBox = document.getElementById("general_a_cpsBox");
const general_a_dashboard = document.getElementById("general_a_dashboard");

general_a_title.onclick = redirectToIndex;
general_a_reactionBox.onclick = redirectToReaction;
general_a_aimBox.onclick = redirectToAim;
general_a_cpsBox.onclick = redirectToCps;
general_a_dashboard.onclick = redirectToDashboard;