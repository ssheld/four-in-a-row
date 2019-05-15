class Game {
    constructor() {
        this.board = new Board();
        this.players = this.createPlayers();
        this.ready = false;

    }


    /**
     * Gets game ready to play
     */
    startGame() {
        this.board.drawHTMLBoard();
        this.activePlayer.activeToken.drawHTMLToken();
        this.ready = true;
    }

    /**
     * Create two new player objects for the game.
     * @return {Array}  Return an array of the player objects
     */
    createPlayers() {
        const players = [];
        players.push(new Player('Player 1', 1, '#e15258', true));
        players.push(new Player('Player 2', 2, '#e59a13'));

        return players;
    }

    /**
     * Returns active player
     * @return {object} Active player
     */
    get activePlayer() {
        return this.players.find(player => player.active);
    }
}