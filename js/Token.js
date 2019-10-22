class Token {
    constructor(index, owner) {
        this.owner = owner;                         // Store token owner
        this.id = `token-${index}-${owner.id}`;     // Store ID, use template literal and conat for loop indice w/ owner id
        this.dropped = false;                       // Store whether or not this token has been played. Initially false
        this.columnLocation = 0;                    // Store location of a token at any given time. Initially set to 0.
    }

    drawHTMLToken() {
        const token = document.createElement('div');
        document.getElementById('game-board-underlay').appendChild(token);
        token.setAttribute('id', this.id);
        token.setAttribute('class', 'token');
        token.style.backgroundColor = this.owner.color;
    }

    /**
     * Gets left offset of html element.
     * @return {number}  Left offset of token object's htmlToken.
     */
     get offsetLeft () {
         return this.htmlToken.offsetLeft;
     }

     /**
      * Gets associated htmlToken.
      * @return {element} Html element associated with token object.
      */
     get htmlToken() {
         return document.getElementById(this.id);
     }

     /**
      * Moves html token one column to the left.
      */
     moveLeft() {
         if (this.columnLocation > 0) {
             this.htmlToken.style.left = this.offsetLeft - 76;
             this.columnLocation--;
         }
     }

     /**
      * Moves html token one column to right.
      * @param {number} columns - number of columns in the game board
      */
     moveRight(totalColumns) {
         if (this.columnLocation < totalColumns - 1) {
             this.htmlToken.style.left = this.offsetLeft + 76;
             this.columnLocation++;
         }
     }

     /**
      * Drops html token into targeted board space.
      * @param {object} target - Targeted space for dropped token.
      * @param {function} reset - The reset function to call after the drop animation has completed.
      */
     drop(target, reset) {
         this.dropped = true;
         $(this.htmlToken).animate({
             top: (target.y * target.diameter)
         }, 750, 'easeOutBounce', reset);
     }

}