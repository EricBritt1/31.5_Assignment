/** Textual markov chain generator */
//This is all credit to solution. Will go over with my mentor. I watched videos regarding javascript classes, constructors etc because it's been a long time and I never truly understood it. Will continue to review. 

class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    // /[ \r\n]+/ Splits up the text and gives each word a single position in an array.
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    //Calls makeChains on MarkovMachine class instance whenever a new one is made
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    const chains = new Map()
    for (let i = 0; i < this.words.length; i++) {
      let word = this.words[i]
      let nextWord = this.words[i + 1] || null

      if (chains.has(word)) chains.get(word).push(nextWord);
      else chains.set(word, [nextWord]);
    }
    this.chains = chains;
  }

  static choice(ar) {
    return ar[Math.floor(Math.random() * ar.length)];
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    let keys = Array.from(this.chains.keys());
    let key = MarkovMachine.choice(keys);
    let out = [];

    while (out.length < numWords && key !== null) {
      out.push(key);
      key = MarkovMachine.choice(this.chains.get(key));
    }

    return out.join(" ");
  }
}

module.exports = {
  MarkovMachine
};