(function() {

    const gameBoard = {
        init: function init() {
            let squares = this.cacheDom();
            // this.cacheDom();
            this.bindEvents(squares);
        },
        cacheDom: function cacheDom() {
            const squares = document.querySelectorAll('.square')
            return squares
        },
        bindEvents: function bindEvents(squares) {
            squares.forEach(square => {
                square.addEventListener('click', () => {this.clickFunc()})  
            });
        },
        clickFunc: ()  => {console.log('hello world')}
    };

    return gameBoard.init()

})();

