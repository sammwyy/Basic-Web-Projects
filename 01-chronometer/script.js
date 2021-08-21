var active = false;

const time = {
    h: 0,
    m: 0,
    s: 0,
    cs: 0
}

const timeContainers = {
    h: document.getElementById("time-hours"),
    m: document.getElementById("time-minutes"),
    s: document.getElementById("time-seconds"),
    cs: document.getElementById("time-centiseconds")
}

function fixTime () {
    if (time.cs > 99) {
        time.cs = 0;
        time.s++;
    }

    if (time.s > 59) {
        time.s = 0;
        time.m++;
    }

    if (time.m > 59) {
        time.m = 0;
        time.h++;
    }
}

function timeToString (time) {
    if (time.toString().length == 1) {
        return "0" + time.toString();
    } else {
        return time.toString();
    }
}

function updateTime () {
    const hoursString = `${time.h}`;
    const minutesString = timeToString(time.m);
    const secondsString = timeToString(time.s);
    const centisecondsString = timeToString(time.cs);

    timeContainers.h.innerText = hoursString;
    timeContainers.m.innerText = minutesString;
    timeContainers.s.innerText = secondsString;
    timeContainers.cs.innerText = centisecondsString;
}

function togglePause () {
    active = !active;
}

function reset () {
    active = false;
    time.h = 0;
    time.m = 0;
    time.s = 0;
    time.cs = 0;
    updateTime();
}

setInterval(() => {
    if (active) {
        time.cs++;
        fixTime();
        updateTime();
    }
}, 10);