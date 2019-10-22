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
     * Branches code, depending on what key player presses
     * @param {Object}  e - Keydown event object
     */
    handleKeydown(e) {
        if (this.ready) {
            if (e.key === "ArrowLeft") {
                this.activePlayer.activeToken.moveLeft();
            } else if (e.key === "ArrowRight") {
                this.activePlayer.activeToken.moveRight(this.board.columns);
            } else if (e.key === "ArrowDown") {
                // Play token
                this.playToken();
            }
        }
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

    /**
     * Finds space object to drop token into, drops token
     */
    playToken() {
        let spaces = this.board.spaces;
        let activeToken = this.activePlayer.activeToken;
        let targetColumn = spaces[activeToken.columnLocation];
        let targetSpace = null;

        for (let space of targetColumn) {
            if (space.token === null) {
                targetSpace = space;
            }
        }

        if (targetSpace !== null) {
            game.ready = false;
            activeToken.drop(targetSpace);
        }
    }
}