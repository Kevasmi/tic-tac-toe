let isXTurn = true;

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
            return {squares, gameBoardContainer};
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
            let squares = gameBoard.squares
            this.bindEvents(squares)
        },
        bindEvents: function bindEvents(squares) {
            squares.forEach(square => {
                square.addEventListener('click', e => {
                    if (!(e.target.id === 'check')) {
                        if (isXTurn) {
                            const x = document.createElement('img');
                            x.src = 'images/X.png';
                            x.setAttribute('id', 'check')
                            square.insertBefore(x, square.children[e.target])
                            square.classList.add('transparent')
                            player1.array.push(e.target.textContent)
                            console.log(player1.array)
                            if (this.checkForWin()) {
                                console.log('Player 1 wins!')
                            } else if ((player1.array.length === 5) && (player2.array.length === 4)) {
                                console.log(`It\'s a draw!`)
                            }
                        } else {
                            const o = document.createElement('img');
                            o.src = 'images/O.png';
                            o.setAttribute('id', 'check')
                            square.insertBefore(o, square.children[e.target])
                            square.classList.add('transparent')
                            player2.array.push(e.target.textContent)
                            console.log(player2.array)
                            if (this.checkForWin()) {
                                console.log('Player 2 wins!')
                            } else if ((player1.array.length === 5) && (player2.array.length === 4)) {
                                console.log(`It\'s a draw!`)
                            }
                        }
                        isXTurn = !isXTurn;
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
    }

    return gameFlow.init()

})();


