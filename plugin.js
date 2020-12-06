//array of total time per day in the past week
let week = [0, 0, 0, 0, 0, 0, 0]
let dayIdx = 0
let candyWeek = [0, 0, 0, 0, 0, 0, 0]

const getWeek = () => {
    return week
}

const getCandy = () => {
    return candyWeek
}


var chart = new CanvasJS.Chart("chartContainer", {
    week: getWeek(),
    candyWeek: getCandy(),
  
    animationEnabled: true,
    backgroundColor: null,
    theme: "light2",
    title: {
      text: "Time Spent Over the Last Week"
    },
    axisY: {
      includeZero: true
    },
    legend: {
      verticalAlign: "bottom",
      horizontalAlign: "left",
      dockInsidePlotArea: true
    },
    data: [{
        type: "line",
        lineThickness: 4,
        showInLegend: true,
        name: "Daily Time",
        markerType: "square",
        color: "#f72585",
        dataPoints: [
            {x: 0, y: week[0]},
            {x: 1, y: week[1]},
            {x: 2, y: week[2]},
            {x: 3, y: week[3]},
            {x: 4, y: week[4]},
            {x: 5, y: week[5]},
            {x: 6, y: week[6]}
        ]
      },
      {
        type: "line",
        lineThickness: 4,
        showInLegend: true,
        name: "Candies Accumulated",
        markerType: "triangle",
        color: "#480ca8",
        dataPoints: [
            {x: 0, y: candyWeek[0]},
            {x: 1, y: candyWeek[1]},
            {x: 2, y: candyWeek[2]},
            {x: 3, y: candyWeek[3]},
            {x: 4, y: candyWeek[4]},
            {x: 5, y: candyWeek[5]},
            {x: 6, y: candyWeek[6]}
        ]
      },
      {
        type: "line",
        lineThickness: 4,
        showInLegend: true,
        name: "Goal Daily Time",
        lineDashType: "dash",
        color: "#4895ef",
        dataPoints: [
            {x: 0, y: 5},
            {x: 1, y: 5},
            {x: 2, y: 5},
            {x: 3, y: 5},
            {x: 4, y: 5},
            {x: 5, y: 5},
            {x: 6, y: 5}
        ]
      }
    ]
  });
chart.render()

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
    candyWeek[dayIdx] = currentCandies
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
            candyWeek: getCandy(),
          
            animationEnabled: true,
            backgroundColor: null,
            theme: "light2",
            title: {
              text: "Time Spent Over the Last Week"
            },
            axisY: {
              includeZero: true
            },
            legend: {
              verticalAlign: "bottom",
              horizontalAlign: "left",
              dockInsidePlotArea: true
            },
            data: [{
                type: "line",
                lineThickness: 4,
                showInLegend: true,
                name: "Daily Time",
                markerType: "square",
                color: "#f72585",
                dataPoints: [
                    {x: 0, y: week[0]},
                    {x: 1, y: week[1]},
                    {x: 2, y: week[2]},
                    {x: 3, y: week[3]},
                    {x: 4, y: week[4]},
                    {x: 5, y: week[5]},
                    {x: 6, y: week[6]}
                ]
              },
              {
                type: "line",
                lineThickness: 4,
                showInLegend: true,
                name: "Candies Accumulated",
                markerType: "triangle",
                color: "#480ca8",
                dataPoints: [
                    {x: 0, y: candyWeek[0]},
                    {x: 1, y: candyWeek[1]},
                    {x: 2, y: candyWeek[2]},
                    {x: 3, y: candyWeek[3]},
                    {x: 4, y: candyWeek[4]},
                    {x: 5, y: candyWeek[5]},
                    {x: 6, y: candyWeek[6]}
                ]
              },
              {
                type: "line",
                lineThickness: 4,
                showInLegend: true,
                name: "Goal Daily Time",
                lineDashType: "dash",
                color: "#4895ef",
                dataPoints: [
                    {x: 0, y: 5},
                    {x: 1, y: 5},
                    {x: 2, y: 5},
                    {x: 3, y: 5},
                    {x: 4, y: 5},
                    {x: 5, y: 5},
                    {x: 6, y: 5}
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


//array of total time per day in the past week
let week = [0, 0, 0, 0, 0, 0, 0]
let dayIdx = 0

//label the entry box
let currentTaskLabel = document.querySelector('#pomodoro-clock-task')

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

    /* if (currentCandies === 2) {
    let cand = ''
    for (let j = 0; j < currentCandies; j++){
    cand += "🍬";
    } */
    var myWindow = window.open("", "MsgWindow", "width=200,height=100");
    myWindow.document.write(`<p>You've earned ${currentCandies}!</p>`);
    showCandies()
    alert("You have enough candies for a break! Spend them!");
    var x = document.createElement("BUTTON");
    var t = document.createTextNode("Click me to spend 5 candies!");
    var foo = document.getElementById("pomo-buttons");
    x.appendChild(t);
    foo.appendChild(x);
    x.setAttribute("onClick", "button1()");

}
if (currentCandies === 4) {
    alert("You have enough candies for a break! Spend them!");
    var x = document.createElement("BUTTON");
    var t = document.createTextNode("Click me to spend 10 candies!");
    var foo = document.getElementById("pomo-buttons");
    x.appendChild(t);
    foo.appendChild(x);
    x.setAttribute("onClick", "button2()");

}
if (currentCandies === 6) {
    alert("You have enough candies for a break! Spend them!");
    var x = document.createElement("BUTTON");
    var t = document.createTextNode("Click me to spend 15 candies!");
    var foo = document.getElementById("pomo-buttons");
    x.appendChild(t);
    foo.appendChild(x);
    x.setAttribute("onClick", "button3()");

}

}

const showCandies = () => {
    let cand = ''
    for (let j = 0; j < currentCandies; j++) {
        cand += "🍬"
    }
    var myWindow = window.open("", "MsgWindow", "width=200,height=100");
    myWindow.document.write(`<p>You've earned ${currentCandies + cand}!</p>`);
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
    const earn = secondsLeft % 5
        // add leading zeroes if it's less than 10
    if (earn === 0) {
        show_image('data:image/png;base64,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', 100, 100, 'pic')

    }


}

const button1 = () => {
    if (currentCandies >= 5) {

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
        currentCandies = currentCandies - 5;
    } else {
        alert("Not enough candies yet!");
    }
}
const button2 = () => {
    if (currentCandies >= 10) {

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
        currentCandies = currentCandies - 10;
    } else {
        alert("Not enough candies yet!");
    }
}
const button3 = () => {
    if (currentCandies >= 15) {

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
        currentCandies = currentCandies - 15;
    } else {
        alert("Not enough candies yet!");
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