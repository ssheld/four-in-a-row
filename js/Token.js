class Token {
    constructor(index, owner) {
        this.owner = owner;                         // Store token owner
        this.id = `token-${index}-${owner.id}`;     // Store ID, use template literal and conat for loop indice w/ owner id
        this.dropped = false;                       // Store whether or not this token has been played. Initially false
    }

    drawHTMLToken() {
        const token = document.createElement('div');
        document.getElementById('game-board-underlay').appendChild(token);
        token.setAttribute('id', this.id);
        token.setAttribute('class', 'token');
        token.style.backgroundColor = this.owner.color;
    }

    htmlToken() {
        return this;
    }
}