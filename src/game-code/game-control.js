// The Front-end-manipulation contains all the execution code the user is supposed to see and interacte with.
// Its logic comes from the Front-end.js file which is still function when called.

import { questions_storage, questions_generator, secret_number_generator } from './Back-end.js'

let input = "";
// This array store the questions returned by the question_generator.
let questions_set = [];
// This array stores the answers that the user inputs and which are passed to the secret_number_generator.
let answers = [];
// The step is used to control the first two steps in controlling the game.
//It is incremented so that the same step is not repeated.
let step = 1;
// The step_in_guessing is used to control the different steps when guessing time for user comes.
let step_in_guessing = 0;
// The secret_number stores the secret number which comes from the secret_number_generator.
let secret_number = "0";
// The guess_counter is always 0. It is used to store the number of guesses the user has input.
let guess_counter = 0;
// The guess_limit is used to control how many guesses the user can input.
let guess_limit = 3;
// This store the user guesses. It can be changed but what if the user wants to see their guesses.
let guesses = [];

let instruction1 = "";
let instruction2="";
let btnText = "";
let inputVisibility = "hidden";
let stopVisibility = "hidden";

//The instruction_sets store the different instructions to be be presented to the user at different levels.
const instructions = (set) => {

    if (set === 1){
        instruction1 = `Welcome to my guessing game. To Start, press the START button.`;
        instruction2 = `Press Start`;
        btnText = `Start`;
    }else if (set === 2){
        instruction1 = `How this works is that you have 3 questions to answer. From those
        3 questions, your answers will be used to generate a secret whole number. You win by guessing that secret number.`;
        instruction2 = `Press "Begin" to start the questions.`;
        btnText = `Begin`;
    }else if (set === 3){
        instruction1 = `Answer the questions below`;
        btnText = `Enter Answer`;
    }else if (set === 4){
        instruction1 = `Well done! Now it is time to guess. The secret number you have to guess is not greater 
        than 10 and it is also not less than 0.`;
        instruction2 = `Guessing time`;
        btnText = `Start Guessing`;
    }else if (set === 5){
        instruction1 = `Enter your guesses`;
        btnText = `Enter Guess`;
    }else if (set === 6){
        instruction1 = `Congratulations!! The game has ended`;
        instruction2 = `You win :)`;
        btnText = `Restart`;
    }else if (set === 7){
        instruction1 = `Try again next time. The game has ended`;
        instruction2 = `You lose :(`;
        btnText = `Restart`;
    }else if(set === 8){
        instruction1 = `The game has stopped`;
        instruction2 = `To resart, press the restart button.`;
        btnText = `Restart`;
    }
}

// This function iterates through the random questions generated and asks the
// user those questions while storing their input in the answers array.
// It also checks the different inputs and ensures that the end input to be stored and passed is a number(float, integer). This is
// because the secret_number_generator only accepts number values.
// It then passes the inputs to the secret_number_generator still as an array.
const run_QandA = () => {
    let user_answer = 0;
    if(questions_set.length === 0){
        questions_set = questions_generator(questions_storage);
    }
    
    if(step === "questioning"){
        user_answer = input;
        if(isNaN(user_answer)){
            user_answer = user_answer.length;
        }else{
            user_answer = Number(user_answer)
        }    
        answers.push(user_answer);
        // console.log(questions_set[0] ,answers[(answers.length - 1)]);
        questions_set.shift();
    }

    if (questions_set.length > 0){
        instruction2 = questions_set[0];
    }

    if (questions_set.length === 0){
        inputVisibility = "hidden";
        secret_number = secret_number_generator(answers);
        // console.log('Secret number: ', secret_number);
        step_in_guessing = 0;
        steps_to_guessing();
        step = "guessing";
    }
}

// This is most complex function in this file of the game.
// It just presens the guess number to the user and takes their input.
// It also checks the input so as to convey if they have won, lost or needs to enter the next guess.
const run_guessing = () => {
    if(guess_counter > 0){
        guesses.unshift(input);
    }
    if (guesses[0] === secret_number){
        instructions(6);
        step = "restarting";
        inputVisibility = "hidden";
        stopVisibility = "hidden";
    }else if ((guesses[0] !== secret_number) && (guess_counter === guess_limit)){
        instructions(7);
        step = "restarting";
        inputVisibility = "hidden";
        stopVisibility = "hidden";
    }else {
        if(guess_counter > 0){
        }
        guess_counter = guess_counter + 1;
        instruction2 = `Guess ${guess_counter}`;
    }

    // console.log("Guesses: ", guesses);
    // console.log(guess_counter);

}

// The steps_to_guessing control the different levels the game has to go through so as to reach to the main guessing 
// level.
const steps_to_guessing = () => {
    // This first step presents the instruction for the level to come(guessing).
        if (step_in_guessing === 0){
            instructions(4);
    // This second step is used to present different instructions still for the guessing level.
    // It also make the input box visible again.
        }else if (step_in_guessing === 1){
            instructions(5);
            inputVisibility  = "visible";
        }
    
        step_in_guessing = step_in_guessing + 1;
    }

// This function does as its name states.
export const game_reset = (choice) => {
    guesses = [];
    answers = [];
    questions_set = [];
    guess_counter = 0;
    inputVisibility = "hidden";
    if (choice === "restart"){
        step = 1;
    }else {
        step = "stopping";
        stopVisibility = "hidden";
    }
}

// This is the main function of the game.
// Whenever the main control button is clicked. This is the function called.
// It controls all the different levels and steps the user and the game has to go through.
export const game_control = (user_input) => {
    input = user_input;
    if (step === 1){
        instructions(1);
        step = 2;
    }else if (step === 2){
        instructions(2);
        stopVisibility = "visible";
        step = 3;
    }else if (step === 3){
        instructions(3);
        inputVisibility = "visible";
        run_QandA();
        step = "questioning";
    }else if (step === "questioning"){
        run_QandA();
    }else if (step_in_guessing < 2 && step === "guessing"){
        steps_to_guessing();
        run_guessing();
    }else if (step === "guessing"){
        run_guessing();
    }else if (step === "stopping"){
        instructions(8);
    }

    return(
        [
            instruction1,
            instruction2,
            btnText,
            inputVisibility,
            stopVisibility
        ]
    );

}

