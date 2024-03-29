export function addEventListenerToReactionCanvas(reaction_section_canvas,
                                          reaction_h1_canvasTitle,
                                          reaction_h2_canvasSubTitle,
                                          reaction_p_canvasParagraph,
                                          reaction_p_canvasUnderTitle,
                                          reaction_form,
                                          reaction_button_canvasButtonRetry,
                                          reaction_button_canvasButtonNext) {
    reaction_section_canvas.addEventListener("mousedown", reactionListener);
    let count = 0;
    let condition = 0; // 0=ready(blue) 1=ongoing(red) 2=finished(green)
    let reactionTimeout;
    let startTime;
    let reactionTimeList = [];
    let reaction_result = -1;
    function reactionListener(event){
        if (condition === 0){
            changeStyleToProgress();
            condition = 1;
            let randomTime = 1500 + Math.random() * 2000;
            reactionTimeout = setTimeout(temp, randomTime);
        } else if (condition === 1){
            clearTimeout(reactionTimeout);
            changeStyleToEarly();
            condition = 0;
        } else if (condition === 2){
            let resultTime = Date.now() - startTime;
            reactionTimeList.push(resultTime);
            if (count === 2) {
                reaction_section_canvas.removeEventListener("mousedown", reactionListener)
                // setCookieInFinish(reactionTimeList);
                changeStyleToFinish(reactionTimeList);
            } else {
                count += 1;
                changeStyleToReady(resultTime);
                condition = 0;
            }
        }
        event.preventDefault();
    }
    // function setCookieInFinish(reactionTimeList){
    //     setCookie("reactionResult", Math.round(reactionTimeList.reduce((sum, current) => sum + current, 0) / reactionTimeList.length));
    // }
    function reactionRetry(e) {
        reaction_form.reaction_result.value = reaction_result;
        reaction_form.action = "retry/"
        reaction_form.submit();
    }
    function reactionNext(e) {
        reaction_form.reaction_result.value = reaction_result;
        reaction_form.action = "next/"
        reaction_form.submit();
    }
    function changeStyleToFinish(reactionTimeList){
        reaction_result = Math.round(reactionTimeList.reduce((sum, current) => sum + current, 0) / reactionTimeList.length);
        reaction_section_canvas.style.backgroundColor = "#121212";
        reaction_h1_canvasTitle.style.visibility = "visible";
        reaction_h1_canvasTitle.textContent = "평균: " + reaction_result + "ms";
        // reaction_h2_canvasSubTitle.textContent = `상위 ${reactionResultToPercentage(reaction_result)}%`;
        reaction_p_canvasParagraph.style.display = "none";
        reaction_h2_canvasSubTitle.style.display = "none";
        reaction_section_canvas.style.cursor = "default";
        reaction_button_canvasButtonRetry.style.display = "inline-block";
        reaction_button_canvasButtonNext.style.display = "inline-block";
        reaction_button_canvasButtonRetry.onclick = reactionRetry;
        reaction_button_canvasButtonNext.onclick = reactionNext;
        let reactionResult = "(";
        for (let i = 0; i < reactionTimeList.length; i++){
            reactionResult += `${i + 1}: ${reactionTimeList[i]}`
            if (i === reactionTimeList.length - 1){
                reactionResult += ")"
            }
        }
        reaction_p_canvasUnderTitle.textContent = `(1: ${reactionTimeList[0]}ms, 2: ${reactionTimeList[1]}ms, 3: ${reactionTimeList[2]}ms)`
    }
    function changeStyleToProgress(){
        reaction_section_canvas.style.backgroundColor = "#ce2637";
        reaction_h1_canvasTitle.style.visibility = "hidden";
        reaction_h2_canvasSubTitle.textContent = "초록색으로 변하면 클릭하세요";
        reaction_p_canvasParagraph.style.visibility = "hidden";
    }
    function changeStyleToGreen(){
        reaction_section_canvas.style.backgroundColor = "#4bdb6b";
        reaction_h1_canvasTitle.style.visibility = "hidden";
        reaction_h2_canvasSubTitle.textContent = "클릭!";
        reaction_p_canvasParagraph.style.visibility = "hidden";
    }
    function changeStyleToReady(reactionTime){
        reaction_section_canvas.style.backgroundColor = "#121212";
        reaction_h1_canvasTitle.style.visibility = "visible";
        reaction_h1_canvasTitle.textContent = reactionTime + "ms";
        reaction_h2_canvasSubTitle.textContent = "재개하려면 배경을 클릭하세요";
        reaction_p_canvasParagraph.style.visibility = "hidden";
    }
    function changeStyleToEarly(){
        reaction_section_canvas.style.backgroundColor = "#121212";
        reaction_h1_canvasTitle.style.visibility = "hidden";
        reaction_h2_canvasSubTitle.textContent = "너무 빨리 클릭하셨습니다";
        reaction_p_canvasParagraph.style.visibility = "hidden";
    }
    function temp(){
        condition = 2;
        clearTimeout(reactionTimeout)
        changeStyleToGreen();
        startTime = Date.now();
    }
}