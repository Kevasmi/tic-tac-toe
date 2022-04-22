let isXTurn = true;
let isGameStarted = false;
let gameBoard = (function() {

    const gameBoard = {
        gameBoardArr: [1,2,3,4,5,6,7,8,9],
        init: function init() {
            let cache = this.cacheDom();
            this.render(this.gameBoardArr, cache);
        },
        cacheDom: function cacheDom() {
            const gameBoardContainer = document.querySelector('.gameboard');
            const squares = document.querySelectorAll('.square');
            const startGame = document.querySelector('.start-game');
            const resetGame = document.querySelector('.reset-game');
            const winTextBox = document.querySelector('.win-text-box');
            const buttonBox = document.querySelector('.button-box')
            return {squares, gameBoardContainer, startGame, resetGame, winTextBox, buttonBox};
        },
        render: function render(gameBoardArr, cache) {
            gameBoardArr.forEach(number => {
                const square = document.createElement('div');
                square.classList.add('square');
                square.textContent = number;
                cache.gameBoardContainer.appendChild(square);
            });
        },
    };

    return gameBoard.init(), gameBoard.cacheDom()

})();

const playerFactory = (name, marker) => {
    let array = [];
    return {name, array, marker}
};

const player1 = playerFactory('Player 1', gameBoard.x);

const player2 = playerFactory('Player 2', gameBoard.o);

let gameFlow = (function() {

    const gameFlow = {
        init: function init() {
            const startButton = gameBoard.startGame;
            const resetButton = gameBoard.resetGame;
            const winTextBox = gameBoard.winTextBox
            const squares = gameBoard.squares;
            const buttonBox = gameBoard.buttonBox;
            this.bindEvents(squares, winTextBox, startButton, resetButton, buttonBox)
        },
        bindEvents: function bindEvents(squares, winTextBox, startButton, resetButton, buttonBox) {
            startButton.addEventListener('click', () => {
                const circle = document.createElement('div');
                circle.classList.add('circle');
                buttonBox.appendChild(circle);
                isGameStarted = true;
                isXTurn = true;
                player1.array = [];
                player2.array = [];
            });
            resetButton.addEventListener('click', () => {
                isXTurn = true;
                isGameStarted = true;
                player1.array = []
                player2.array = []
                this.removeChildren(winTextBox)
                const markers = document.querySelectorAll('#check')
                markers.forEach(mark => {
                    mark.remove();
                })
                squares.forEach(square => {
                    square.classList.remove('transparent')
                })
            })
            squares.forEach(square => {
                square.addEventListener('click', e => {
                    if (isGameStarted) {
                        if (!(e.target.id === 'check')) {
                            if (isXTurn) {
                                const x = document.createElement('img');
                                x.src = 'images/X.png';
                                x.setAttribute('id', 'check')
                                square.insertBefore(x, square.children[e.target])
                                square.classList.add('transparent')
                                player1.array.push(e.target.textContent)
                                if (this.checkForWin()) {
                                    const winText = document.createElement('p');
                                    winText.textContent = 'Player 1 wins!'
                                    winText.classList.add('win-text')
                                    winTextBox.appendChild(winText)
                                    isGameStarted = false;
                                } else if ((player1.array.length === 5) && (player2.array.length === 4)) {
                                    const winText = document.createElement('p');
                                    winText.textContent = `It\s a draw!`
                                    winText.classList.add('win-text')
                                    winTextBox.appendChild(winText)
                                    isGameStarted = false;

                                }
                            } else {
                                const o = document.createElement('img');
                                o.src = 'images/O.png';
                                o.setAttribute('id', 'check')
                                square.insertBefore(o, square.children[e.target])
                                square.classList.add('transparent')
                                player2.array.push(e.target.textContent)
                                if (this.checkForWin()) {
                                    const winText = document.createElement('p');
                                    winText.textContent = 'Player 2 wins!'
                                    winText.classList.add('win-text')
                                    winTextBox.appendChild(winText)
                                    isGameStarted = false;

                                } else if ((player1.array.length === 5) && (player2.array.length === 4)) {
                                    const winText = document.createElement('p');
                                    winText.textContent = `It\s a draw!`
                                    winText.classList.add('win-text')
                                    winTextBox.appendChild(winText)
                                    isGameStarted = false;

                                }
                            }
                        isXTurn = !isXTurn;
                    }
                }
                })
            });
        },
        checkForWin: function checkForWin() {
            if (((player1.array.includes('1')) && (player1.array.includes('2')) && (player1.array.includes('3'))) || ((player2.array.includes('1')) && (player2.array.includes('2')) && (player2.array.includes('3')))) {
                return true
            } else if (((player1.array.includes('4')) && (player1.array.includes('5')) && (player1.array.includes('6'))) || ((player2.array.includes('4')) && (player2.array.includes('5')) && (player2.array.includes('6')))) {
                return true
            } else if (((player1.array.includes('7')) && (player1.array.includes('8')) && (player1.array.includes('9'))) || ((player2.array.includes('7')) && (player2.array.includes('8')) && (player2.array.includes('9')))) {
                return true
            } else if (((player1.array.includes('1')) && (player1.array.includes('4')) && (player1.array.includes('7'))) || ((player2.array.includes('1')) && (player2.array.includes('4')) && (player2.array.includes('7')))) {
                return true
            } else if (((player1.array.includes('2')) && (player1.array.includes('5')) && (player1.array.includes('8'))) || ((player2.array.includes('2')) && (player2.array.includes('5')) && (player2.array.includes('8')))) {
                return true
            } else if (((player1.array.includes('3')) && (player1.array.includes('6')) && (player1.array.includes('9'))) || ((player2.array.includes('3')) && (player2.array.includes('6')) && (player2.array.includes('9')))) {
                return true
            } else if (((player1.array.includes('1')) && (player1.array.includes('5')) && (player1.array.includes('9'))) || ((player2.array.includes('1')) && (player2.array.includes('5')) && (player2.array.includes('9')))) {
                return true
            } else if (((player1.array.includes('3')) && (player1.array.includes('5')) && (player1.array.includes('7'))) || ((player2.array.includes('3')) && (player2.array.includes('5')) && (player2.array.includes('7')))) {
                return true
            }
        },
        removeChildren: function removeChildren (element) {
            while (element.firstChild) {
                element.removeChild(element.firstChild);
            }
        }
    }

    return gameFlow.init()

})();
