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

    /**
     * Switches active player.
     */
    switchPlayers() {

        for (let player in this.players) {
            // Toggle boolean value
            player.active = !player.active;
        }
    }

    /**
     * Checks if there is a winner on the board after each token drop.
     * @param {object} Space - Targeted space for dropped token.
     * @return {boolean} Boolean value indicating whether the game has been won (true) or not (false)
     */
    checkForWin(space) {
        const owner = space.token.owner;
        let win = false;

        // Vertical
        for (let x = 0; x < this.board.columns; x++) {
            for (let y = 0; y < this.board.rows - 3; y++) {
                if (this.board.spaces[x][y].owner === owner &&
                    this.board.space[x][y+1] === owner &&
                    this.board.spaces[x][y+2] === owner &&
                    this.board.spaces[x][y+3] === owner) {
                        win = true;
                }
            }
        }

        // Horizontal
        for (let x = 0; x < this.board.columns; x++) {
            for (let y = 0; y < this.board.rows; y++) {
                if (this.board.spaces[x][y].owner === owner &&
                    this.board.spaces[x+1][y].owner === owner &&
                    this.board.spaces[x+2][y].owner === owner &&
                    this.board.spaces[x+3][y].owner === owner) {
                        win = true;
                }
            }
        }

        // diagonal
        for (let x = 3; x < this.board.columns; x++ ){
            for (let y = 0; y < this.board.rows - 3; y++){
                if (this.board.spaces[x][y].owner === owner && 
                    this.board.spaces[x-1][y+1].owner === owner && 
                    this.board.spaces[x-2][y+2].owner === owner && 
                    this.board.spaces[x-3][y+3].owner === owner) {
                        win = true;
                }           
            }
        }

        // diagonal
        for (let x = 3; x < this.board.columns; x++ ){
            for (let y = 3; y < this.board.rows; y++){
                if (this.board.spaces[x][y].owner === owner && 
                    this.board.spaces[x-1][y-1].owner === owner && 
                    this.board.spaces[x-2][y-2].owner === owner && 
                    this.board.spaces[x-3][y-3].owner === owner) {
                        win = true;
                }           
            }
        }
        return win;
    }

    /**
     * Displays game over message.
     * @param {string} message - Game over message.
     */
    gameOver(message) {
        document.getElementById('game-over').style.display = 'block';
        document.getElementById('game-over').textContent = message;
    }
}