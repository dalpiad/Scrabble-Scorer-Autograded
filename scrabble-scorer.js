// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   return input.question("Let's play some scrabble!\nEnter a word: ");
};

function scorerSimple(word) {
   let simpleScore = 0;
	return simpleScore + word.length;
};

function scorerVowelBonus(word) {
   word = word.toUpperCase();
   let vowelBonusScore = 0;

	for (let i = 0; i < word.length; i++) {
      if (word[i] == "A" || word[i] == "E" || word[i] == "I" || word[i] == "O" || word[i] == "U") {
         vowelBonusScore += 3;
      } else {
         vowelBonusScore += 1;         
      }
   };
   return vowelBonusScore;
};

let simpleScorer = {
   name: "Simple Score",
   description: "Each letter is worth 1 point.", 
   scoringFunction: scorerSimple
};

let vowelBonusScorer = {
   name: "Bonus Vowels",
   description: "Vowels are 3 pts, consonants are 1 pt.", 
   scoringFunction: scorerVowelBonus
};

let scrabbleScorer = {
   name: "Scrabble",
   description: "The traditional scoring algorithm.", 
   scoringFunction: oldScrabbleScorer
};

let scoringArrayFunctions = [scorerSimple, scorerVowelBonus, oldScrabbleScorer];

const scoringAlgorithms = [simpleScorer, vowelBonusScorer, scrabbleScorer];

function scorerPrompt() {};

function transform() {};

let newPointStructure;

function runProgram() {
   console.log(oldScrabbleScorer(initialPrompt()));
   scorerPrompt(input.question(`Which scoring algorithm would you like to use? \n 
0 - ${scoringAlgorithms[0].name}: ${scoringAlgorithms[0].description}
1 - ${scoringAlgorithms[1].name}: ${scoringAlgorithms[1].description}
2 - ${scoringAlgorithms[2].name}: ${scoringAlgorithms[2].description}
Enter 0, 1, or 2: `))
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
