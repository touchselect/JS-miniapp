'use strict';

{
    const $timer = $('#timer');
    const $start = $('#start');
    const $stop = $('#stop');
    const $reset = $('#reset');
    const $lap = $('#lap');
    const $countdown = $('#countdown-start');
    const $downResume = $('#down-resume');
    const $downStop = $('#down-stop');
    const $downReset = $('#down-reset');

    let startTime;
    let timeoutId;
    let elepsedTime = 0;
    let remainingTime = 0;

    setButtonStateInitial();

    $start.click(function() {
        if ($(this).hasClass('inactive')) {
            return;
        }
        setButtonStateRunning();
        startTime = Date.now();
        countUp();
    });

    $stop.click(function() {
        if ($(this).hasClass('inactive')) {
            return;
        }
        setButtonStateStopped();
        clearTimeout(timeoutId);
        elepsedTime += Date.now() - startTime;
        addTimeLog();
    });

    $reset.click(function() {
        if ($(this).hasClass('inactive')) {
            return;
        }
        setButtonStateInitial();
        $timer.text('00:00.000');
        elepsedTime = 0;
        $('#laps').empty();
    });

    $lap.click(function() {
        if($(this).hasClass('inactive')){
            return;
        }
        const currentTime = $timer.text();
        const $lapTime = $('<div class="lap-time"></div>').text(currentTime);
        $('#laps').append($lapTime);
    });

    $countdown.click(function() {
        const timeInput = $('#countdown-time').val();
        setButtonStateCountdown();
        startCountdown(timeInput);
    });

    $downResume.click(function() {
        if($(this).hasClass('inactive')){
            return;
        }
        setButtonStateCountdown();
        startTime = Date.now();
        countDown(remainingTime);
    });

    $downStop.click(function() {
        if($(this).hasClass('inactive')){
            return;
        }
        clearTimeout(timeoutId);
        remainingTime -= (Date.now() - startTime);
        setButtonStateCountdownStopped();
    });

    $downReset.click(function() {
        if($(this).hasClass('inactive')){
            return;
        }
        clearTimeout(timeoutId);
        remainingTime = 0;
        setButtonStateInitial();
        $timer.text('00:00.000');
        $('#countdown-time').val('');
    });

    $('#theme-selector').change(function(){
        const selectedTheme = $(this).val();
        changeTheme(selectedTheme);
    });



    function countUp(){
        const d = new Date(Date.now() - startTime + elepsedTime);
        const m = String(d.getMinutes()).padStart(2, '0');
        const s = String(d.getSeconds()).padStart(2, '0');
        const ms = String(d.getMilliseconds()).padStart(3, '0');
        $timer.text(`${m}:${s}.${ms}`);


        timeoutId = setTimeout(() => {
            countUp();
        }, 10);
    }

    function setButtonStateInitial() {
        $start.removeClass('inactive');
        $stop.addClass('inactive');
        $reset.addClass('inactive');
        $lap.addClass('inactive');
        $countdown.removeClass('inactive');
        $downResume.addClass('inactive');
        $downStop.addClass('inactive');
        $downReset.addClass('inactive');
    }

    function setButtonStateRunning() {
        $start.addClass('inactive');
        $stop.removeClass('inactive');
        $reset.addClass('inactive');
        $lap.removeClass('inactive');
        $countdown.addClass('inactive');
        $downResume.addClass('inactive');
        $downStop.addClass('inactive');
        $downReset.addClass('inactive');
    }

    function setButtonStateStopped() {
        $start.removeClass('inactive');
        $stop.addClass('inactive');
        $reset.removeClass('inactive');
        $lap.addClass('inactive');
        $countdown.addClass('inactive');
        $downResume.addClass('inactive');
        $downStop.addClass('inactive');
        $downReset.addClass('inactive');
    }

    function setButtonStateCountdown() {
        $start.addClass('inactive');
        $stop.addClass('inactive');
        $reset.addClass('inactive');
        $lap.addClass('inactive');
        $countdown.addClass('inactive');
        $downResume.addClass('inactive');
        $downStop.removeClass('inactive');
        $downReset.addClass('inactive');
    }

    function setButtonStateCountdownStopped() {
        $start.addClass('inactive');
        $stop.addClass('inactive');
        $reset.addClass('inactive');
        $lap.addClass('inactive');
        $countdown.addClass('inactive');
        $downResume.removeClass('inactive');
        $downStop.addClass('inactive');
        $downReset.removeClass('inactive');
    }

    function addTimeLog() {
        const currentTime = $timer.text();
        const $timeLog = $('<div class="time-log"></div>').text(currentTime);
        $('#logs').append($timeLog);
    }

    function startCountdown(timeInput) {
        if (!timeInput.match(/^\d{1,2}:\d{2}$/)) {
            alert('Invalid time format. Please enter mm:ss.');
            return;
        }
        const parts = timeInput.split(':');
        const m = parseInt(parts[0], 10);
        const s = parseInt(parts[1], 10);
        const totalTime = (m * 60 + s) * 1000;

        setButtonStateCountdown();
        startTime = Date.now();
        countDown(totalTime);
    }

    function countDown(totalTime) {
        remainingTime = totalTime - (Date.now() - startTime);
        if(remainingTime <= 0){
            setButtonStateInitial();
            $timer.text('00:00.000');
            alert('Time is up!!!');
            return;
        }

        const m = String(Math.floor(remainingTime / 60000)).padStart(2, '0');
        const s = String(Math.floor((remainingTime % 60000) / 1000)).padStart(2, '0');
        const ms = String(Math.floor((remainingTime % 1000) / 10)).padStart(2, '0');
        $timer.text(`${m}:${s}.${ms}`);

        timeoutId = setTimeout(() => {
            countDown(totalTime);
        }, 10);
    }

    function changeTheme(theme){
        $('body').removeClass().addClass(theme);
    }
}