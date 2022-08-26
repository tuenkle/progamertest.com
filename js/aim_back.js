import {
    getRandomInt,
    timeToString,
    hitandshotToString,
    redirectToAim,
    redirectToCps, setCookie
} from "./tools.js";

export class AimCore {
    constructor(AimCanvas, AimBackend) {
        this.canvas = AimCanvas;
        this.backend = AimBackend;
    }
    run() {
        this.canvas.drawDefaultCss();
        this.canvas.drawTime(this.backend.getTime());
        this.canvas.drawLife(this.backend.getLife());
        this.canvas.drawAccuracy(this.backend.getHit(), this.backend.getShot());
        this.listener = this.listener.bind(this)
        this.canvas.canvas.addEventListener("mousedown", this.listener);
        this.timer();
        this.drawer();
    }
    timer() {
        let self = this;
        this.timerID = setInterval(function() {
            self.backend.plusTime();
            self.canvas.drawTime(self.backend.getTime());
        }, 1000)
    }
    drawer() {
        let self = this;
        this.drawingRepeatTimoutId = setTimeout(function drawingRepeat(){
            if (self.backend.getLife() > 0){
                self.completeTarget();
                self.backend.reduceDelay();
                this.drawingRepeatTimoutId = setTimeout(drawingRepeat, self.backend.getDelay())
            }
        }, self.backend.getDelay())
    }
    listener(event) {
        let self = this;
        let rect = event.target.getBoundingClientRect();
        let clientX = event.clientX - rect.left; //x position within the element.
        let clientY = event.clientY - rect.top;  //y position within the element.
        let isHit = false
        for (const [id, value] of Object.entries(this.backend.getTargets())) {
            if (value.expired) {
                continue
            }
            if (Math.pow(value.x - clientX,2) + Math.pow(value.y - clientY, 2) <= Math.pow(this.backend.getRadius(), 2)){
                this.backend.setTargetHit(id);
                this.backend.plusHit();
                this.backend.setTargetExpired(id);
                let targetX = this.backend.getTarget(id).x;
                let targetY = this.backend.getTarget(id).y;
                this.canvas.drawHitTarget(targetX, targetY, self.backend.getRadius());
                setTimeout(function () {
                    self.canvas.eraseTarget(targetX, targetY, self.backend.getRadius());
                    // self.backend.deleteTarget(id);
                }, 500);
                isHit = true;
                break;
            }
        }
        if (isHit){
            this.canvas.drawHitShot(clientX, clientY);
        } else {
            this.canvas.drawMissedShot(clientX, clientY);
            setTimeout(function() {
                let isErased = false;
                for (const value of Object.values(self.backend.getTargets())) {
                    if (Math.pow(value.x - clientX,2) + Math.pow(value.y - clientY, 2) <= Math.pow(self.backend.getRadius(), 2)){
                        isErased = true;
                        break;
                    }
                }
                if (isErased) {
                } else {
                    self.canvas.eraseShot(clientX, clientY);
                }
                //erase if clientX and clientY is not in targets
            }, 500)
        }
        this.backend.plusShot();
        this.canvas.drawAccuracy(this.backend.getHit(), this.backend.getShot());
        event.preventDefault();
    }
    //draw + make => complete
    completeTarget() {
        let [x, y] = this.makeTarget();
        this.canvas.drawTarget(x, y, this.backend.getRadius())
    }

    makeTarget() {
        if (this.backend.getLife() > 0) {
            let x;
            let y;
            while (true) {
                let tempx = getRandomInt(this.backend.getRadius(), this.canvas.canvas.width - this.backend.getRadius());
                let tempy = getRandomInt(this.backend.getRadius(), this.canvas.canvas.height - this.backend.getRadius());
                let isOverlapped = false;
                let targetsList = Object.values(this.backend.getTargets());
                for (let i = 0; i < targetsList.length; i++) {
                    if (Math.pow(tempx - targetsList[i].x, 2) + Math.pow(tempy - targetsList[i].y, 2) <= Math.pow(this.backend.getRadius() * 2, 2)) {
                        isOverlapped = true;
                        break;
                    }
                }
                if (!isOverlapped) {
                    x = tempx;
                    y = tempy;
                    break;
                }
            }
            this.backend.plusLastId();
            let timeoutId = setTimeout(this.expireTarget.bind(this), 1000, this.backend.getLastId());
            this.backend.insertTarget(this.backend.getLastId(), timeoutId, x, y);
            return [x, y];
        }
    }
    expireTarget(targetId) {
        let self = this;
        if (!this.backend.getTarget(targetId).expired){
            this.backend.setTargetExpired(targetId);
        }
        let x = this.backend.getTarget(targetId).x;
        let y = this.backend.getTarget(targetId).y;
        if (this.backend.getTarget(targetId).hit) {
            setTimeout(function () {
                self.backend.deleteTarget(targetId);
            }, 500);
        } else {
            this.backend.minusLife();
            this.canvas.canvas.removeEventListener("mousedown", this.listener);
            if (this.backend.getLife() === 0){
                clearTimeout(this.drawingRepeatTimoutId);
                clearInterval(this.timerID

                );
                this.backend.setCookieInFinish(this.backend.getTime());
                this.canvas.drawEndGameCSS(this.backend.getTime(), this.backend.getHit(), this.backend.getShot());
                // todo: 끝난 직후 배경 지우고 게임 오버 띄우고 1초뒤에 메인화면으로 넘어가기
            }
            this.canvas.drawLife(this.backend.getLife());
            this.canvas.drawMissedTarget(x, y, this.backend.getRadius());
            setTimeout(function () {
                self.canvas.eraseTarget(x, y, self.backend.getRadius());
                self.backend.deleteTarget(targetId);
            }, 500);
        }
    }
}

export class AimCanvas {
    constructor(aim_section_canvas,
                aim_canvas_canvas,
                aim_h1_canvasTitle,
                aim_h2_canvasSubtitle,
                aim_p_canvasParagraph,
                aim_p_canvasParagraph2,
                aim_p_canvasParagraph3,
                aim_button_retry,
                aim_button_next,
                aim_p_canvasUnderTitle,
    ) {
        this.section = aim_section_canvas;
        this.canvas = aim_canvas_canvas;
        this.title = aim_h1_canvasTitle;
        this.undertitle = aim_p_canvasUnderTitle;
        this.subtitle = aim_h2_canvasSubtitle;
        this.paragraph1 = aim_p_canvasParagraph;
        this.paragraph2 = aim_p_canvasParagraph2;
        this.paragraph3 = aim_p_canvasParagraph3;
        this.retry = aim_button_retry;
        this.next = aim_button_next;
        this.ctx = aim_canvas_canvas.getContext("2d");
    }
    drawDefaultCss() {
        this.canvas.width = this.section.offsetWidth/2;
        this.canvas.height = this.section.offsetHeight*0.8;
        this.canvas.style.margin = "1rem auto 0 auto";
        this.canvas.style.backgroundColor = "grey";
        this.canvas.style.border = "0.1rem solid black";
        this.canvas.style.display = "block";
        this.section.appendChild(this.paragraph2);
        this.section.appendChild(this.paragraph3);
        this.section.appendChild(this.canvas);
        this.paragraph1.style.padding = "1rem 3rem 0 0";
        this.title.style.display = "none";
        this.subtitle.style.display = "none";
        this.section.style.cursor = "default";
        this.canvas.style.cursor = "crosshair";
    }
    drawEndGameCSS(time, hit, shot) {
        this.canvas.style.display = "none";
        this.paragraph1.style.display = "none";
        this.paragraph2.style.display = "none";
        this.paragraph3.style.display = "none";
        this.title.style.display = "block";
        this.subtitle.style.display = "block";
        this.undertitle.style.display = "block";
        this.retry.style.display = "inline-block";
        this.next.style.display = "inline-block";
        this.title.textContent = `${timeToString(time)}`;
        this.undertitle.textContent = `(정확도: ${hitandshotToString(hit, shot)})`
        this.subtitle.textContent = `상위 0%`
        this.retry.onclick = redirectToAim;
        this.next.onclick = redirectToCps;
    }
    drawLife(life) {
        this.paragraph2.textContent = `목숨: ${life}`;
    }
    drawTime(time) {
        this.paragraph1.textContent = `시간: ${timeToString(time)}`;
    }
    drawAccuracy(hit, shot) {
        this.paragraph3.textContent = `정확도: ${hitandshotToString(hit, shot)}`
    }
    drawTarget(x, y, radius) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI * 2);
        this.ctx.fillStyle = "white";
        this.ctx.fill();
        this.ctx.closePath();
    }
    drawMissedTarget(x, y, radius) {
        this.ctx.beginPath();
        this.ctx.fillStyle = "grey";
        this.ctx.strokeStyle = "red";
        this.ctx.arc(x, y, radius, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();
    }
    drawHitTarget(x, y, radius) {
        this.ctx.beginPath();
        this.ctx.fillStyle = "grey";
        this.ctx.strokeStyle = "green";
        this.ctx.arc(x, y, radius, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();
    }
    drawHitShot(x, y) {
        this.ctx.beginPath();
        this.ctx.fillStyle = "green";
        this.ctx.strokeStyle = "green";
        this.ctx.arc(x, y, 1, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();
    }
    drawMissedShot(x, y) {
        this.ctx.beginPath();
        this.ctx.fillStyle = "red";
        this.ctx.strokeStyle = "red";
        this.ctx.arc(x, y, 1, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();
    }
    eraseTarget(x, y, radius) {
        this.ctx.beginPath();
        this.ctx.fillStyle = "grey";
        this.ctx.arc(x, y, radius + 1, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath();
    }
    eraseShot(x, y) {
        this.ctx.beginPath();
        this.ctx.fillStyle = "grey";
        this.ctx.arc(x, y, 2, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath();
    }
}

export class AimBackend {
    constructor(defaultLife, defaultRadius) {
        this.life = defaultLife;
        this.time = 0;
        this.hit = 0;
        this.shot = 0;
        this.radius = defaultRadius;
        this.targets = {};
        this.lastid = 0;
        this.delay = 1000;
    }
    insertTarget(id, timeoutId, x, y) {
        this.targets[id] = {
            timeoutId : timeoutId,
            x: x,
            y: y,
            hit: false,
            expired :false
        }
    }
    reduceDelay() {
        this.delay *= 0.999;
    }
    getTargets() {
        return this.targets;
    }
    getTarget(targetId) {
        return this.targets[targetId];
    }
    setTargetExpired(targetId) {
        this.targets[targetId].expired = true;
    }
    setTargetHit(targetId) {
        this.targets[targetId].hit = true;
    }
    getDelay() {
        return this.delay;
    }
    getRadius() {
        return this.radius;
    }
    getTime() {
        return this.time;
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
    getShot() {
        return this.shot;
    }
    plusShot() {
        this.shot += 1;
    }
    plusTime() {
        this.time += 1;
    }
    getLastId() {
        return this.lastid
    }
    plusLastId() {
        this.lastid += 1;
    }
    deleteTarget(targetId) {
        delete this.targets[targetId];
    }
    setCookieInFinish(aimResult){
        setCookie("aimResult", aimResult);
    }
}