const alarmSound = new Audio('assets/sounds/alarm.mp3');
let interval;
let playCount = 0;

function askNotificationPermission() {
  if (!("Notification" in window)) {
    alert("Este navegador não suporta notificações de desktop");
  } else if (Notification.permission !== "granted" && Notification.permission !== "denied") {
    Notification.requestPermission().then(permission => {
    });
  }
}


document.getElementById('start-countdown').addEventListener('click', function() {
    askNotificationPermission();
    initiateCountdown();

    const targetDateInput = document.getElementById('target-date-input');
    const targetDate = new Date(targetDateInput.value);
    const now = new Date();

    if (targetDate <= now) {
        alert('A data selecionada já passou. Por favor, selecione uma data futura.');
        return;
    }

    document.getElementById('email-reminder-container').style.display = 'block';
    document.getElementById('enter-email-container').style.display = 'none';
  
    if(interval) clearInterval(interval);
    playCount = 0;

    if (!isNaN(targetDate.getTime())) {
        document.getElementById("timer").innerHTML = `<span id="days"></span>
    <span class="timer-unit">Days</span>
    <span id="hours"></span>
    <span class="timer-unit">Hours</span>
    <span id="minutes"></span>
    <span class="timer-unit">Minutes</span>
    <span id="seconds"></span>
    <span class="timer-unit">Seconds</span>`;

        updateCountdown(targetDate);
        interval = setInterval(function() {
            updateCountdown(targetDate);
        }, 1000);
    } else {
        alert("Por favor, insira uma data válida.");
    }
});

document.getElementById('yes-reminder').addEventListener('click', function() {
    document.getElementById('enter-email-container').style.display = 'block';
    document.getElementById('email-reminder-container').style.display = 'none';
});

document.getElementById('no-reminder').addEventListener('click', function() {
    document.getElementById('email-reminder-container').style.display = 'none';
    
});

document.getElementById('submit-email').addEventListener('click', function() {
    const email = document.getElementById('reminder-email-input').value;
    if(email) { 
        window.userEmail = email;

    } else {
        alert('Por favor, insira um endereço de e-mail válido.');
    }
});

function startCountdown() {
    const inputDate = document.getElementById('target-date-input').value;
    const targetDate = new Date(inputDate);

    if (!isNaN(targetDate.getTime())) {
        document.getElementById('enter-email-container').style.display = 'none';

        updateCountdown(targetDate);
        interval = setInterval(function() {
            updateCountdown(targetDate);
        }, 1000);
    } else {
        alert("Por favor, insira uma data válida.");
    }
}

function initiateCountdown() {
    const targetDateInput = document.getElementById('target-date-input');
    const targetDate = new Date(targetDateInput.value);
    const now = new Date();

    if (targetDate <= now) {
        alert('A data selecionada já passou. Por favor, selecione uma data futura.');
        return;
    }

    document.getElementById('email-reminder-container').style.display = 'block';

    if(interval) clearInterval(interval);
    playCount = 0;

    if (!isNaN(targetDate.getTime())) {
        updateCountdown(targetDate);
        interval = setInterval(function() {
            updateCountdown(targetDate);
        }, 1000);
    } else {
        alert("Por favor, insira uma data válida.");
    }
}

function updateCountdown(targetDate) {
    const currentTime = new Date();
    const difference = targetDate - currentTime;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;

    if (difference < 0) {
        clearInterval(interval);
        document.getElementById("timer").innerText = "O evento começou!";
        sendNotification();
        playAlarm();
        startConfetti(); 

        if(window.userEmail) {
            sendEmailNotification(window.userEmail);
        }
        
    }
}

function playAlarm() {
    if (playCount < 2) { 
        alarmSound.play();
        playCount++; 
        alarmSound.onended = function() { 
            if (playCount < 2) {
                playAlarm();
            }
        };
    }
}

function sendNotification() {
  if (Notification.permission === "granted") {
      new Notification("Contagem Regressiva Finalizada!", {
          body: "O evento começou!",
      });
  }
}

function sendEmailNotification(email) {
    fetch('/api/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            recipient: email, 
            subject: 'Contagem Regressiva Finalizada!',
            message: 'O evento começou!'
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Email sent successfully:', data);
    })
    .catch((error) => {
        console.error('Error sending email:', error);
    });
}

document.getElementById('linkPerfil').addEventListener('mouseenter', function() {
    this.textContent = 'LinkedIn';
});

document.getElementById('linkPerfil').addEventListener('mouseleave', function() {
    this.textContent = 'Jonatha Fabricio';
});