class Player {
    constructor(name, id, color, active = false) {
        this.name = name;      // Store player's name
        this.id = id;          // Store player's ID
        this.color = color;    // Player's color (used for html rendering)
        this.active = active;  // Used to store if it's this player's turn
        this.tokens = this.createTokens(21);      // Stores player's tokens in array
    }

    /**
     * Creates token objects for player
     * @param {integer} numTokens - Number of token objects to be created
     * @return {array} An array of newly created token objects
     */
    createTokens(numTokens) {
        const tokens = [];

        for (let i = 0; i < numTokens; i++) {
            tokens.push(new Token(i, this));
        }
        return tokens;
    }
}