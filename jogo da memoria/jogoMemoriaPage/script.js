document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('gameBoard');
    const restartButton = document.getElementById('restartButton');
    const celebration = document.getElementById('celebration');

    // Lista de todas as imagens disponíveis
    const allImages = [
        'img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg', 
        'img5.jpg', 'img6.jpg', 'img7.jpg', 'img8.jpg',
        'img9.jpg', 'img10.jpg', 'img11.jpg', 'img12.jpg'
    ];

    function startGame() {
        gameBoard.innerHTML = '';
        celebration.style.display = 'none';

        const selectedImages = allImages.sort(() => 0.5 - Math.random()).slice(0, 8);
        const cardsArray = [...selectedImages, ...selectedImages];
        cardsArray.sort(() => 0.5 - Math.random());

        cardsArray.forEach(image => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <div class="card-inner">
                    <div class="card-front"></div>
                    <div class="card-back">
                        <img src="${image}" alt="Imagem">
                    </div>
                </div>
            `;
            gameBoard.appendChild(card);
        });

        let hasFlippedCard = false;
        let firstCard, secondCard;
        let lockBoard = false;
        let matchedPairs = 0;

        function flipCard() {
            if (lockBoard) return;
            if (this === firstCard) return;

            this.classList.add('flip');

            if (!hasFlippedCard) {
                // Primeiro clique
                hasFlippedCard = true;
                firstCard = this;
                return;
            }

            // Segundo clique
            secondCard = this;
            checkForMatch();
        }

        function checkForMatch() {
            let isMatch = firstCard.querySelector('.card-back img').src === secondCard.querySelector('.card-back img').src;

            if (isMatch) {
                disableCards();
                matchedPairs++;

                if (matchedPairs === 8) {
                    setTimeout(showCelebration, 500);
                }
            } else {
                unflipCards();
            }
        }

        function disableCards() {
            firstCard.removeEventListener('click', flipCard);
            secondCard.removeEventListener('click', flipCard);

            resetBoard();
        }

        function unflipCards() {
            lockBoard = true;

            setTimeout(() => {
                firstCard.classList.remove('flip');
                secondCard.classList.remove('flip');

                resetBoard();
            }, 1500);
        }

        function resetBoard() {
            [hasFlippedCard, lockBoard] = [false, false];
            [firstCard, secondCard] = [null, null];
        }

        function showCelebration() {
            celebration.style.display = 'flex';
        }

        document.querySelectorAll('.card').forEach(card => card.addEventListener('click', flipCard));

        // Mostrar todos os cartões virados para cima por 3 segundos
        setTimeout(() => {
            document.querySelectorAll('.card').forEach(card => card.classList.add('flip'));
            setTimeout(() => {
                document.querySelectorAll('.card').forEach(card => card.classList.remove('flip'));
            }, 3000);
        }, 100);
    }

    restartButton.addEventListener('click', startGame);

    // Iniciar o jogo ao carregar a página
    startGame();
});
