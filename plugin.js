//array of total time per day in the past week
let week = [0, 0, 0, 0, 0, 0, 0]
let dayIdx = 0

const getWeek = () => {
    return week
}

var chart = new CanvasJS.Chart("chartContainer", {
    week: getWeek(),

    animationEnabled: true,
    backgroundColor: null,
    theme: "light2",
    title: { text: "Time Spent Over the Last Week" },
    axisY: { includeZero: true },
    legend: { verticalAlign: "bottom", horizontalAlign: "left", dockInsidePlotArea: true },
    data: [{
            type: "line",
            lineThickness: 4,
            showInLegend: true,
            name: "Daily Time",
            markerType: "square",
            color: "#F08080",
            dataPoints: [
                { x: 0, y: week[0] },
                { x: 1, y: week[1] },
                { x: 2, y: week[2] },
                { x: 3, y: week[3] },
                { x: 4, y: week[4] },
                { x: 5, y: week[5] },
                { x: 6, y: week[6] }
            ]
        },
        {
            type: "line",
            lineThickness: 4,
            showInLegend: true,
            name: "Goal Daily Time",
            lineDashType: "dash",
            color: "#46B7FF",
            dataPoints: [
                { x: 0, y: 5 },
                { x: 1, y: 5 },
                { x: 2, y: 5 },
                { x: 3, y: 5 },
                { x: 4, y: 5 },
                { x: 5, y: 5 },
                { x: 6, y: 5 }
            ]
        }
    ]
});
chart.render();

const pomodoroTimer = document.querySelector('#pomodoro-timer')
const startButton = document.querySelector('#pomodoro-start')
const pauseButton = document.querySelector('#pomodoro-pause')
const stopButton = document.querySelector('#pomodoro-stop')
const dayButton = document.querySelector('#pomodoro-day')

// START
startButton.addEventListener('click', () => {
    toggleClock()
})

// PAUSE
pauseButton.addEventListener('click', () => {
    toggleClock()
})

// STOP
stopButton.addEventListener('click', () => {
    toggleClock(true)
})

dayButton.addEventListener('click', () => {
    week[dayIdx] = timeTotalDay
    dayIdx += 1
    timeTotalDay = 0

    const changeIdx = (dayIdx) => {
        if (dayIdx === 7) {
            dayIdx = 0
        }
    }

    changeIdx(dayIdx)
        //toggleClock(true)

    var chart = new CanvasJS.Chart("chartContainer", {
        week: getWeek(),

        animationEnabled: true,
        backgroundColor: null,
        theme: "light2",
        title: { text: "Time Spent Over the Last Week" },
        axisY: { includeZero: true },
        legend: { verticalAlign: "bottom", horizontalAlign: "left", dockInsidePlotArea: true },
        data: [{
                type: "line",
                lineThickness: 4,
                showInLegend: true,
                name: "Daily Time",
                markerType: "square",
                color: "#F08080",
                dataPoints: [
                    { x: 0, y: week[0] },
                    { x: 1, y: week[1] },
                    { x: 2, y: week[2] },
                    { x: 3, y: week[3] },
                    { x: 4, y: week[4] },
                    { x: 5, y: week[5] },
                    { x: 6, y: week[6] }
                ]
            },
            {
                type: "line",
                lineThickness: 4,
                showInLegend: true,
                name: "Goal Daily Time",
                lineDashType: "dash",
                color: "#46B7FF",
                dataPoints: [
                    { x: 0, y: 5 },
                    { x: 1, y: 5 },
                    { x: 2, y: 5 },
                    { x: 3, y: 5 },
                    { x: 4, y: 5 },
                    { x: 5, y: 5 },
                    { x: 6, y: 5 }
                ]
            }
        ]
    });
    chart.render()
})

//label the entry box
let currentTaskLabel = document.querySelector('#pomodoro-clock-task')

let currentCandies = 0;

let type = 'Work'
let isClockRunning = false

// in seconds = 25 mins
let workSessionDuration = 1500
let currentTimeLeftInSession = 1500

// in seconds = 5 mins;
let breakSessionDuration = 300

//keep track of seconds spent
let timeSpentInCurrentSession = 0

//keep track of total time spent
let timeTotalDay = 0


const toggleClock = reset => {
    if (reset) {
        // STOP THE TIMER
        stopClock()
    } else {
        if (isClockRunning === true) {
            clearInterval(clockTimer)
                // PAUSE THE TIMER
            isClockRunning = false
        } else {
            // START THE TIMER
            isClockRunning = true
            clockTimer = setInterval(() => {
                // decrease time left / increase time spent
                stepDown()
                displayCurrentTimeLeftInSession()
            }, 1000)
        }
    }
}

function show_image(src, width, height, alt) {
    var img = document.createElement("img");
    img.src = src;
    img.width = width;
    img.height = height;
    img.alt = alt;
    currentCandies++;
    document.getElementById("p1").innerHTML = `Current Candies:  ${currentCandies} `
        // This next line will just add it to the <body> tag
    document.body.appendChild(img);
    if (currentCandies === 5) {
        stopClock()
        'use strict';

        function r(f) { /in/.test(document.readyState) ? setTimeout('r(' + f + ')', 9) : f() }
        r(function() {
            if (!document.getElementsByClassName) {
                // IE8 support
                var getElementsByClassName = function(node, classname) {
                    var a = [];
                    var re = new RegExp('(^| )' + classname + '( |$)');
                    var els = node.getElementsByTagName("*");
                    for (var i = 0, j = els.length; i < j; i++)
                        if (re.test(els[i].className)) a.push(els[i]);
                    return a;
                }
                var videos = getElementsByClassName(document.body, "youtube");
            } else {
                var videos = document.getElementsByClassName("youtube");
            }

            var nb_videos = videos.length;
            for (var i = 0; i < nb_videos; i++) {
                // Based on the YouTube ID, we can easily find the thumbnail image
                videos[i].style.backgroundImage = 'url(http://i.ytimg.com/vi/' + videos[i].id + '/sddefault.jpg)';

                // Overlay the Play icon to make it look like a video player
                var play = document.createElement("div");
                play.setAttribute("class", "play");
                videos[i].appendChild(play);

                videos[i].onclick = function() {
                    // Create an iFrame with autoplay set to true
                    var iframe = document.createElement("iframe");
                    var iframe_url = "https://www.youtube.com/embed/" + this.id + "?autoplay=1&autohide=1";
                    if (this.getAttribute("data-params")) iframe_url += '&' + this.getAttribute("data-params");
                    iframe.setAttribute("src", iframe_url);
                    iframe.setAttribute("frameborder", '0');

                    // The height and width of the iFrame should be the same as parent
                    iframe.style.width = this.style.width;
                    iframe.style.height = this.style.height;

                    // Replace the YouTube thumbnail with YouTube Player
                    this.parentNode.replaceChild(iframe, this);
                }
            }
        });
    }
}


const stepDown = () => {
    if (currentTimeLeftInSession > 0) {
        // decrease time left / increase time spent
        currentTimeLeftInSession--
        timeSpentInCurrentSession++
    } else if (currentTimeLeftInSession === 0) {
        timeSpentInCurrentSession = 0
            // Timer is over -> if work switch to break, viceversa
        if (type === 'Work') {
            currentTimeLeftInSession = breakSessionDuration
            displaySessionLog('Work')
            type = 'Break';
            currentTaskLabel.value = 'Break';
            currentTaskLabel.disabled = true;
        } else {
            currentTimeLeftInSession = workSessionDuration
            type = 'Work'
            if (currentTaskLabel.value === 'Break') {
                currentTaskLabel.value = workSessionLabel;
            }
            currentTaskLabel.disabled = false;
            displaySessionLog('Break')
        }
    }

    displayCurrentTimeLeftInSession()
    candyQualification()
}


const displaySessionLog = type => {
    const sessionsList = document.querySelector('#pomodoro-sessions')
        // append li to it
    const li = document.createElement('li')
    if (type === 'Work') {
        sessionLabel = currentTaskLabel.value ? currentTaskLabel.value : 'Work'
        workSessionLabel = sessionLabel
    } else {
        sessionLabel = 'Break'
    }
    let elapsedTime = parseInt(timeSpentInCurrentSession / 60)
    timeTotalDay += elapsedTime
    elapsedTime = elapsedTime > 0 ? elapsedTime : '< 1'

    const text = document.createTextNode(`${sessionLabel} : ${elapsedTime} min`)
    li.appendChild(text)
    sessionsList.appendChild(li)
}



const displayCurrentTimeLeftInSession = () => {
    const secondsLeft = currentTimeLeftInSession
    let result = ''
    const seconds = secondsLeft % 60
    const minutes = parseInt(secondsLeft / 60) % 60
    let hours = parseInt(secondsLeft / 3600)
        // add leading zeroes if it's less than 10
    function addLeadingZeroes(time) {
        return time < 10 ? `0${time}` : time
    }
    if (hours > 0) result += `${hours}:`
    result += `${addLeadingZeroes(minutes)}:${addLeadingZeroes(seconds)}`
    pomodoroTimer.innerText = result.toString()
}
const candyQualification = () => {
    const secondsLeft = currentTimeLeftInSession
    let result = ''
    const earn = secondsLeft % 10
        // add leading zeroes if it's less than 10
    if (earn === 0) {
        show_image('https://ae01.alicdn.com/kf/HTB1LU9nQpXXXXaLXVXXq6xXFXXXh/12CM-7CM-Cartoon-Candy-car-stickers-decals-accessories-cover-decorate-automobiles-motorcycle-exterior.jpg', 100, 100, 'pic')
    }
}

const stopClock = () => {
    // new
    displaySessionLog(type)
    clearInterval(clockTimer)
    isClockRunning = false
    currentTimeLeftInSession = workSessionDuration
    displayCurrentTimeLeftInSession()
        // new
    type = 'Work'
}


pomodoroTimer.innerText = result

