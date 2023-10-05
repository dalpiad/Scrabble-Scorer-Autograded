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

function simpleScorer(word) {
   let simpleScore = 0;
	return simpleScore + word.length;
};

function vowelBonusScorer(word) {
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

let simpleScorerObj = {
   name: "Simple Score",
   description: "Each letter is worth 1 point.", 
   scorerFunction: simpleScorer
};

let vowelBonusScorerObj = {
   name: "Bonus Vowels",
   description: "Vowels are 3 pts, consonants are 1 pt.", 
   scorerFunction: vowelBonusScorer
};

function scrabbleScorer(word) {
	word = word.toLowerCase();
   wordScore = 0;
	for (let i = 0; i < word.length; i++) {
      wordScore += newPointStructure[word[i]];
   }
 	return wordScore;
 }

let scrabbleScorerObj = {
   name: "Scrabble",
   description: "The traditional scoring algorithm.", 
   scorerFunction: scrabbleScorer
};

// let scoringArrayFunctions = [scorerSimple, scorerVowelBonus, oldScrabbleScorer];

const scoringAlgorithms = [simpleScorerObj, vowelBonusScorerObj,scrabbleScorerObj];

// const scoringAlgorithms = [{name: "Simple Score", description: "Each letter is worth 1 point.", scoringFunction: simpleScorer},
// {name: "Bonus Vowels", description: "Vowels are 3 pts, consonants are 1 pt.", scoringFunction: vowelBonusScorer},
// {name: "Scrabble", description: "The traditional scoring algorithm.", scoringFunction: scrabbleScorer}];

function scorerPrompt(num, word) {
   while ((num < 0 || num > 2) || typeof num !== 'number') { //Bonus mission to restrict input.
      num = Number(input.question(`Which scoring algorithm would you like to use? \n 
0 - ${scoringAlgorithms[0].name}: ${scoringAlgorithms[0].description}
1 - ${scoringAlgorithms[1].name}: ${scoringAlgorithms[1].description}
2 - ${scoringAlgorithms[2].name}: ${scoringAlgorithms[2].description}
Enter 0, 1, or 2 ONLY: `))
   };
   console.log(`Score for '${word}': ${scoringAlgorithms[num].scorerFunction(word)}`);
};

function transform(obj) {
let transformedPointStructure = {};
   for (keys in obj) {
      for (let i = 0; i < obj[keys].length; i++) {
         transformedPointStructure[obj[keys][i].toLowerCase()] = Number(keys); 
      }
   }
   return transformedPointStructure;
};

let newPointStructure = transform(oldPointStructure);

newPointStructure[' '] = 0; //bonus mission
// console.log (newPointStructure);


function runProgram() {
//   console.log(oldScrabbleScorer(initialPrompt()));
   let usersWord = initialPrompt();
 scorerPrompt(Number(input.question(`Which scoring algorithm would you like to use? \n 
0 - ${scoringAlgorithms[0].name}: ${scoringAlgorithms[0].description}
1 - ${scoringAlgorithms[1].name}: ${scoringAlgorithms[1].description}
2 - ${scoringAlgorithms[2].name}: ${scoringAlgorithms[2].description}
Enter 0, 1, or 2: `)), usersWord);
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
