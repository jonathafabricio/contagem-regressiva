function startConfetti() {
  const confettiContainer = document.getElementById('confetti-container');
  confettiContainer.style.display = 'block';
  fetch('assets/config/confetti.json')
    .then(response => response.json())
    .then(data => {
      tsParticles.load('confetti-container', data).then(() => {
        console.log('Confetti particles loaded!');

        setTimeout(() => {
          tsParticles.domItem(0).pause();

          confettiContainer.style.display = 'none';
          console.log("Confetti effect stopped.");
      }, 8000);
  });
    })
    .catch(error => console.error('Error loading confetti configuration:', error));
}

window.startConfetti = startConfetti;