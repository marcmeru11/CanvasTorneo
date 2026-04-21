/**
 * Tournament.js
 * Model representing a tournament data structure.
 */
class Tournament {
  #rounds = [];

  constructor(initialRounds = []) {
    this.#rounds = initialRounds;
  }

  addRound(teams) {
    this.#rounds.push(teams);
  }

  get rounds() {
    return this.#rounds;
  }

  get isEmpty() {
    return this.#rounds.length === 0 || this.#rounds[0].length === 0;
  }

  clear() {
    this.#rounds = [];
  }
}

export default Tournament;
