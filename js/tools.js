export function redirectToIndex(e) {
    location.href = "index.html";
}
export function redirectToReaction(e) {
    location.href = "reaction.html";
}
export function redirectToAim(e) {
    location.href = "aim.html";
}
export function redirectToCps(e) {
    location.href = "cps.html";
}
export function redirectToDashboard(e) {
    location.href = "dashboard.html"
}
export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}
export function reduceDelay(delay) {
    return delay * 0.9999
}
export function timeToString(time) {
    if (time < 10) {
        return `0:0${time}`
    } else if (time < 60) {
        return `0:${time}`
    } else {
        let minute = Math.floor(time / 60);
        let second = time % 60;
        if (second < 10) {
            return `${minute}:0${second}`
        } else {
            return `${minute}:${second}`
        }
    }
}
export function microTimeToSecondString(time) {
    time *= 10
    time = time.toFixed(1);
    if (time < 10) {
        return `0.${time.substring(0, 1)}`

    } else {
        return `${time.substring(0, 1)}:${time.substring(1, 2)}`
    }
    // if (time < 1) {
    //     return `0:${time.toFixed(0)}`
    // } else {
    //     return `${Math.floor(time/10)}:${Math.round(time % 10)}`
    // }
    // if (time < 10) {
    //     return `0:0${time}`
    // } else if (time < 60) {
    //     return `0:${time}`
    // } else {
    //     let minute = Math.floor(time / 60);
    //     let second = time % 60;
    //     if (second < 10) {
    //         return `${minute}:0${second}`
    //     } else {
    //         return `${minute}:${second}`
    //     }
    // }
}
export function hitandshotToString(hit, shot) {
    if (hit === 0 && shot === 0){
        return`NaN%`;
    } else {
        let accuracy = Math.round(hit * 100 / shot);
        return`${accuracy}%`;
    }
}
export function clickedAndTimeToString(clicked, time) {
    if (time === 0){
        return "0";
    } else {
        let cps = Math.round(clicked/time * 10) / 10;
        return `${cps.toFixed(1)}`;
    }
}