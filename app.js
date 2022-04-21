// console.log(player1.array);

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
            const o = document.createElement('img');
            o.src = 'images/O.png';
            const x = document.createElement('img');
            x.src = 'images/X.png';
            return {squares, gameBoardContainer, o, x};
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


let gameFlow = (function() {

    const gameFlow = {
        init: function init() {
            let squares = gameBoard.squares
            this.bindEvents(squares)
        },
        bindEvents: function bindEvents(squares) {
            squares.forEach(square => {
                square.addEventListener('click', this.addMarker())
            });
        },
        addMarker: function addMarker(e) {
            e.target.appendChild(gameBoard.o);
        },
    }


    return gameFlow.init()

})();


