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

    const changeIdx = (dayIdx) => {
        if (dayIdx === 7) {
            dayIdx = 0 
        }
    }
    changeIdx(dayIdx)
    toggleClock(true)

    chart.render()
})

let type = 'Work'
let isClockRunning = false

// in seconds = 25 mins
let workSessionDuration = 1500
let currentTimeLeftInSession = 1500

// in seconds = 5 mins;
let breakSessionDuration = 300

//keep track of seconds spent
let timeSpentInCurrentSession = 0

//keep track of total time spend
let timeTotalDay = 0

//array of total time per day in the past week
let week = [0, 0, 0, 0, 0, 0, 0]
let dayIdx = 0

//label the entry box
let currentTaskLabel = document.querySelector('#pomodoro-clock-task')


let currentCandies = 0;

const getWeek = () => {
    return week
}

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

const changeIdx = (dayIdx) => {
    if (dayIdx === 7) {
        dayIdx = 0
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

window.onload = function() {

    var chart = new CanvasJS.Chart("chartContainer", {
        week: getWeek(),

        animationEnabled: true,
        theme: "light2",
        title: { text: "Time Spent Over the Last Week" },
        //axisX:{valueFormatString: "DDD"},
        axisY: { includeZero: true },
        legend: { verticalAlign: "bottom", horizontalAlign: "left", dockInsidePlotArea: true },
        data: [{
                type: "line",
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
                showInLegend: true,
                name: "Goal Daily Time",
                lineDashType: "dash",
                color: "#46B7FF",
                dataPoints: [
                    { x: 0, y: 125 },
                    { x: 1, y: 125 },
                    { x: 2, y: 125 },
                    { x: 3, y: 125 },
                    { x: 4, y: 125 },
                    { x: 5, y: 125 },
                    { x: 6, y: 125 }
                ]
            }
        ]
    });
    chart.render();
}
