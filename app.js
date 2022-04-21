const playerFactory = (name) => {
    let array = [];
    return {name, array}
};

const player1 = playerFactory('Player 1');

// console.log(player1.array);

(function() {

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

    return gameBoard.init()

})();

(function() {

    const gameFlow = {
        init: function init() {
            let squares = gameBoard.init().cache.squares
            console.log('squares')
            this.bindEvents(squares)
        },
        bindEvents: function bindEvents(squares) {

        }
    }


    return gameFlow.init()

})();


