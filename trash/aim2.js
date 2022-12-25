import {getRandomInt, reduceDelay} from "../js/utils.js";

const aim_section_canvas = document.getElementById("aim_section_canvas")
const aim_h1_canvasTitle = document.getElementById("aim_h1_canvasTitle")
const aim_h2_canvasSubtitle = document.getElementById("aim_h2_canvasSubtitle")
const aim_p_canvasParagraph = document.getElementById("aim_p_canvasParagraph")
const aim_canvas_canvas = document.createElement("canvas");
const aim_p_canvasParagraph2 = document.createElement("p")
const aim_p_canvasParagraph3 = document.createElement("p")
aim_canvas_canvas.setAttribute("id","aim_canvas_canvas");
aim_p_canvasParagraph2.setAttribute("id","aim_p_canvasParagraph2");
aim_p_canvasParagraph3.setAttribute("id","aim_p_canvasParagraph3");

//draw, set, get, minus, plus



function startAim(aim_section_canvas, aim_canvas_canvas, aim_h1_canvasTitle, aim_h2_canvasSubtitle, aim_p_canvasParagraph, aim_p_canvasParagraph2, aim_p_canvasParagraph3) {
    const canvas = new AimCanvas(aim_section_canvas, aim_canvas_canvas, aim_h1_canvasTitle, aim_h2_canvasSubtitle, aim_p_canvasParagraph, aim_p_canvasParagraph2, aim_p_canvasParagraph3);
    const core = new AimCore(3);
    function drawLife(life) {
        canvas.paragraph1.textContent = `목숨: ${life}`;
    }
    function drawTime(time) {
        canvas.paragraph2.textContent = `시간: ${time}`
    }
    function drawAccuracy() {
        canvas.paragraph2.textContent = `시간: ${time}`
    }
    function startGame() {
        canvas.section.removeEventListener("click", startGame);
        canvas.drawDefaultCss();
        canvas.drawLife(core.life);
        canvas.drawTime(core.time);
        canvas.drawAccuracy(core.getHit(), core.getMissed());
        core.startTimer();
        aim_section_canvas.style.cursor = "default";
        aim_canvas_canvas.style.cursor = "crosshair";
        let delay = 1000;
        drawingRepeatTimoutId = setTimeout(function drawingRepeat(){
            if (life > 0){
                drawing();
                delay = reduceDelay(delay);
                drawingRepeatTimoutId = setTimeout(drawingRepeat, delay)
            }
        }, delay)
        aim_canvas_canvas.addEventListener("mousedown", aimListener);

    }
    aim_section_canvas.addEventListener("click", startGame);
}
class AimCanvas {
    constructor(aim_section_canvas,
                aim_canvas_canvas,
                aim_h1_canvasTitle,
                aim_h2_canvasSubtitle,
                aim_p_canvasParagraph,
                aim_p_canvasParagraph2,
                aim_p_canvasParagraph3,
                ) {
        this.section = aim_section_canvas;
        this.canvas = aim_canvas_canvas;
        this.title = aim_h1_canvasTitle;
        this.subtitle = aim_h2_canvasSubtitle;
        this.paragraph1 = aim_p_canvasParagraph;
        this.paragraph2 = aim_p_canvasParagraph2;
        this.paragraph3 = aim_p_canvasParagraph3;
    }
    drawDefaultCss() {
        this.canvas.width = aim_section_canvas.offsetWidth/2;
        this.canvas.height = aim_section_canvas.offsetHeight*0.8;
        this.canvas.style.margin = "1rem auto 0 auto";
        this.canvas.style.backgroundColor = "grey";
        this.canvas.style.border = "0.1rem solid black";
        this.canvas.style.display = "block";
        this.canvas.section.appendChild(aim_p_canvasParagraph2);
        this.canvas.section.appendChild(aim_p_canvasParagraph3);
        this.canvas.section.appendChild(aim_canvas_canvas);
        this.canvas.paragraph1.style.padding = "1rem 3rem 0 0";
        this.canvas.title.style.display = "none";
        this.canvas.subtitle.style.display = "none";
    }
    drawLife(life) {
        this.canvas.paragraph2.textContent = `목숨: ${life}`;
    }
    drawTime(time) {
        if (time < 10) {
            this.paragraph1.textContent = `시간: 0:0${time}`
        } else if (time < 60) {
            this.paragraph1.textContent = `시간: 0:${time}`
        } else {
            let minute = Math.floor(time / 60);
            let second = time % 60;
            if (second < 10) {
                this.paragraph1.textContent = `시간: ${minute}:0${second}`
            } else {
                this.paragraph1.textContent = `시간: ${minute}:${second}`
            }
        }
        this.canvas.paragraph1.textContent = `목숨: ${time}`;
    }
    drawAccuracy(hit, missed) {
        if (hit === 0 && missed === 0){
            this.canvas.paragraph3.textContent = `정확도: --%`;
        } else {
            this.canvas.paragraph3.textContent = `정확도: ${life}`;
        }
    }
}
class AimCore {
    constructor(defaultLife) {
        this.life = defaultLife;
        this.time = 0;
        this.hit = 0;
        this.missed = 0;
    }
    getLife() {
        return this.life;
    }
    minusLife() {
        this.life -= 1;
    }
    getHit() {
        return this.hit;
    }
    plusHit() {
        this.hit += 1;
    }
    getMissed() {
        return this.missed;
    }
    plusMissed() {

    }
    startTimer() {
        setInterval(function() {
            time += 1
            if (time < 10) {
                aim_p_canvasParagraph.textContent = `시간: 0:0${time}`
            } else if (time < 60) {
                aim_p_canvasParagraph.textContent = `시간: 0:${time}`
            } else {
                let minute = Math.floor(time / 60);
                let second = time % 60;
                if (second < 10) {
                    aim_p_canvasParagraph.textContent = `시간: ${minute}:0${second}`
                } else {
                    aim_p_canvasParagraph.textContent = `시간: ${minute}:${second}`
                }
            }
        }, 1000)
    }
}
class AimCircle {
    constructor(x ,y, radius){
        this.x = x;
        this.y = y;
        this.radius = radius;
    }
}

let ctx = aim_canvas_canvas.getContext("2d");

let lastid = 0;
let objects = {};
let life = 10000;
let correctedShot = 0;
let missedShot = 0;
let time = 0;
function timer() {
    setInterval(function(){
        time += 1
        if (time < 10){
            aim_p_canvasParagraph.textContent = `시간: 0:0${time}`
        } else if (time < 60){
            aim_p_canvasParagraph.textContent = `시간: 0:${time}`
        } else {
            let minute = Math.floor(time / 60);
            let second = time % 60;
            if (second < 10){
                aim_p_canvasParagraph.textContent = `시간: ${minute}:0${second}`
            } else {
                aim_p_canvasParagraph.textContent = `시간: ${minute}:${second}`
            }
        }
    }, 1000)
}
function accuracy() {
    let accuracy = Math.round(correctedShot * 100 / missedShot);
    aim_p_canvasParagraph2.textContent = `정확도: ${accuracy}%`;
}
function reduceLife() {
    life -= 1
    if (life <= 0) {
        life = 0;
        aim_p_canvasParagraph3.textContent = `목숨: ${life}`
        endGame();
    }
    aim_p_canvasParagraph3.textContent = `목숨: ${life}`
}
function endGame() {
    aim_canvas_canvas.removeEventListener("mousedown", aimListener)
    clearTimeout(drawingRepeatTimoutId);
    setTimeout(function (){
        aim_canvas_canvas.style.display = "none";
        aim_p_canvasParagraph.style.display = "none";
        aim_p_canvasParagraph2.style.display = "none";
        aim_p_canvasParagraph3.style.display = "none";
        aim_h1_canvasTitle.style.display = "block";
        aim_h2_canvasSubtitle.style.display = "block";
    }, 1000)
}
let drawingRepeatTimoutId;
function startGame() {
    aim_section_canvas.removeEventListener("click", startGame);
    aim_section_canvas.appendChild(aim_p_canvasParagraph2);
    aim_section_canvas.appendChild(aim_p_canvasParagraph3);
    aim_section_canvas.appendChild(aim_canvas_canvas);
    aim_p_canvasParagraph.style.padding = "1rem 3rem 0 0";

    aim_h1_canvasTitle.style.display = "none";
    aim_h2_canvasSubtitle.style.display = "none";
    setTime(0);
    setAccuracy(100);
    setLife(life);
    timer();
    aim_section_canvas.style.cursor = "default";
    aim_canvas_canvas.style.cursor = "crosshair";
    let delay = 1000;
    drawingRepeatTimoutId = setTimeout(function drawingRepeat(){
        if (life > 0){
            drawing();
            delay = reduceDelay(delay);
            drawingRepeatTimoutId = setTimeout(drawingRepeat, delay)
        }
    }, delay)
    aim_canvas_canvas.addEventListener("mousedown", aimListener);
}
function setTime(time) {
    aim_p_canvasParagraph.textContent = `시간: 0:0${time}`;
}
function setAccuracy(accuracy) {
    aim_p_canvasParagraph2.textContent = `정확도: ${accuracy}%`;
}
function setLife(life) {
    aim_p_canvasParagraph3.textContent = `목숨: ${life}`;
}

function makeObject(id, timeoutId, x, y) {
    objects[id] = {
        timeoutId : timeoutId,
        x: x,
        y: y,
        clicked: false,
        expired :false
    }
}
let r = 20;

function drawing() {
    if (life <= 0){
        //exception
    } else {
        let x;
        let y;
        while (true) {
            let tempx = getRandomInt(r, aim_canvas_canvas.width - r);
            let tempy = getRandomInt(r, aim_canvas_canvas.height - r);
            let isOverlapped = false;
            let objectsList = Object.values(objects);
            for (let i = 0; i < objectsList.length; i++){
                if (Math.pow(tempx - objectsList[i].x, 2) + Math.pow(tempy - objectsList[i].y, 2) <= Math.pow(r * 2, 2)){
                    isOverlapped = true;
                    break;
                }
            }
            console.log(isOverlapped);
            if (!isOverlapped) {
                x = tempx;
                y = tempy;
                break;
            }
        }
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();
        let timeoutId = setTimeout(expireObject, 1000, lastid + 1);
        makeObject(lastid + 1, timeoutId, x, y);
        lastid += 1;
    }
}
function timeoutObject(targetId) {
    // eraseObject(targetId, false);
    // deleteObject(targetId);

}
function clickObject(targetId) {
    objects[targetId].expired = true;
    let x = objects[targetId].x;
    let y = objects[targetId].y;
    ctx.beginPath();
    ctx.fillStyle = "grey";
    ctx.strokeStyle = "green";
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    setTimeout(function(){
        ctx.beginPath();
        ctx.fillStyle = "grey";
        ctx.arc(x, y, r + 1, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }, 500);
}
function expireObject(targetId) {
    objects[targetId].expired = true;
    let x = objects[targetId].x;
    let y = objects[targetId].y;
    if (objects[targetId].clicked) {
        setTimeout(function () {
            delete objects[targetId];
        }, 500);
    } else {
        reduceLife();
        ctx.beginPath();
        ctx.fillStyle = "grey";
        ctx.strokeStyle = "red";
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        setTimeout(function () {
            ctx.beginPath();
            ctx.fillStyle = "grey";
            ctx.arc(x, y, r + 1, 0, Math.PI * 2);
            ctx.fill();
            ctx.closePath();
            delete objects[targetId];
        }, 500);
    }
}

function eraseObject(targetId, clicked) {
    let x = objects[targetId].x;
    let y = objects[targetId].y;
    ctx.beginPath();
    ctx.fillStyle = "grey";
    if (clicked) {
        ctx.strokeStyle = "green";
    } else {
        if (!objects[targetId].clicked){
            ctx.strokeStyle = "red";
        }
    }
    ctx.arc(x, y, r+1, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    setTimeout(function(){
        // if (objects[targetId].clicked === )
    }, 500);
    ctx.closePath();

}
function deleteObject(targetId) {
    if (objects[targetId].clicked === false){
        life -= 1;
    }
    delete objects[targetId];
}
function aimListener(event) {
    console.log(event)
    let rect = event.target.getBoundingClientRect();
    let x = event.clientX - rect.left; //x position within the element.
    let y = event.clientY - rect.top;  //y position within the element.
    console.log(x, y)
    for (const [key, value] of Object.entries(objects)) {
        if (value.expired) {
            continue
        }
        if (Math.pow(value.x - x,2) + Math.pow(value.y - y, 2) <= Math.pow(r, 2)){
            console.log(value.timeoutId);
            objects[key].clicked = true;
            correctedShot += 1;
            accuracy();
            clickObject(key);
            break;
        }
    }
    missedShot += 1;
    accuracy();
    event.preventDefault();

}

aim_section_canvas.addEventListener("click", startGame, {once:true})
