        const toggleMode = document.getElementById('toggleMode');
        const timerDisplay = document.getElementById('timerDisplay');
        const targetTimeInput = document.getElementById('targetTime');
        const startButton = document.getElementById('startButton');
        
        let countdownInterval;
        toggleMode.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            toggleMode.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
        });
        startButton.addEventListener('click', () => {
            const targetTime = new Date(targetTimeInput.value).getTime();
            if (isNaN(targetTime)) {
                alert('Please set a valid date and time.');
                return;
            }

            clearInterval(countdownInterval);
            countdownInterval = setInterval(() => {
                const currentTime = new Date().getTime();
                const remainingTime = targetTime - currentTime;

                if (remainingTime <= 0) {
                    clearInterval(countdownInterval);
                    timerDisplay.textContent = 'Time is up!';
                    return;
                }

                const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
                const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

                timerDisplay.textContent = `${days}:${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            }, 1000);
        });