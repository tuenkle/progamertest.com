import {aimResultToPercentage, cpsResultToPercentage, getCookie, reactionResultToPercentage} from "./tools.js";

const dashboard_td_reactionResult = document.getElementById("dashboard_td_reactionResult");
const dashboard_td_reactionPercentile = document.getElementById("dashboard_td_reactionPercentile");
const dashboard_td_aimResult = document.getElementById("dashboard_td_aimResult");
const dashboard_td_aimPercentile = document.getElementById("dashboard_td_aimPercentile");
const dashboard_td_cpsResult = document.getElementById("dashboard_td_cpsResult");
const dashboard_td_cpsPercentile = document.getElementById("dashboard_td_cpsPercentile");
const dashboard_td_overallPercentile = document.getElementById("dashboard_td_overallPercentile");

const reaction_result = getCookie("reactionResult")
const aim_result = getCookie("aimResult")
const cps_result = getCookie("cpsResult")
const reaction_percentile = reactionResultToPercentage(reaction_result);
const aim_percentile = aimResultToPercentage(aim_result);
const cps_percentile = cpsResultToPercentage(cps_result)
dashboard_td_reactionResult.textContent = reaction_result + "ms"
dashboard_td_reactionPercentile.textContent = reaction_percentile + "%"
dashboard_td_aimResult.textContent = aim_result + "초"
dashboard_td_aimPercentile.textContent = aim_percentile + "%"
dashboard_td_cpsResult.textContent = cps_result + "CPS"
dashboard_td_cpsPercentile.textContent = cps_percentile + "%"
dashboard_td_overallPercentile.textContent = Math.round((reaction_percentile + aim_percentile + cps_percentile) / 3) + "%"