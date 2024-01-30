function setDailyAlarm() {
    var time = document.getElementById('time').value;
    var activity = document.getElementById('activity').value;

    var alarmTime = new Date();
    var [hours, minutes] = time.split(':');
    alarmTime.setHours(hours);
    alarmTime.setMinutes(minutes);
    alarmTime.setSeconds(0);

    var currentDateTime = new Date();

    if (alarmTime > currentDateTime) {
        var timeDifference = alarmTime - currentDateTime;

        setInterval(function () {
            playAlarmSound();
            alert(`It's time for ${activity}`);
        }, timeDifference);

        alert(`Daily reminder set for ${activity} @ ${format12HourTime(alarmTime)}`);
    } else {
        alert('Please select a future time.');
    }
}

function playAlarmSound() {
    var audioContext = new (window.AudioContext || window.webkitAudioContext)();
    var oscillator = audioContext.createOscillator();
    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
    oscillator.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 8);
}

function format12HourTime(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; 
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${minutes} ${ampm}`;
}
