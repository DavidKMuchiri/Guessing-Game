
// This questions_storage is where all questions to be asked are kept.
// The questions are stored as items in an array and the array is the questions_storage.
export const questions_storage = [
    `If a male is represented by the number 1 and a female is represented by the same, what number will be their child?`,
    `What is your lucky number?`,
    `When do you think the world will end? (give the year)`,
    `Should you: (a)do the right thing or (b)do things right?`,
    `It goes in dry, it comes out wet. the longer it is in, the stronger it gets. What is it?`,
    `What goes up but never comes down?`,
    `Which came first, the chicken or the egg?` ,
    `Which question can you never honestly answer yes to?`,
    `What becomes white when it is dirty?`,
    `What gets wetter the more it dries?`,
    `Hippophobia is the fear of?`,
    `What English word has three consecutive double letters?`,
    `A girl has as many brothers as sisters, but each brother has only half as many brothers as sisters. How children are there in the family?`,
    `If I am holding a bee, what do I have in my eye?`,
    `What is next number in this sequence: 1, 11, 21, 1211, 111221, 312211,`,
    `How many spades are found in the standard deck of cards?`,
    `If I tell you 'I am honestly lying', am I (a)being honest or (b)lying`
];

// This function takes the list of questions given to it as all_questions then randomly chooses questions and returns them.
//The function is new as it is not found in the python version where sets were chosen.
// If you want the function to choose a certain number questions, just change the q_to_ask variable in the function.
// Please make sure the list of questions given to the function has more questions than the
// number of questions to be randomly chosen; atleast 1 more question.
// If the questions to be chosen exceeds the number of questions given to the function, the function will automatically
// start repeating some of the questions.
export const questions_generator = (all_questions) => {
    const finalArray = [];
    let q_amount = (all_questions.length) - 1;
    let counter = finalArray.length;
    const old_indexes = [];
    let new_index = 0;
    let limit = 0;
    let q_to_ask = 3;

    while(counter !== q_to_ask){
        
        new_index = (Math.floor(Math.random() * (q_amount - 0 + 1) ) + 0);
        
        if((finalArray.length) === (all_questions.length)){
            alert("Since number of questions to be asked is greater than the number of questions, some questions will be repeated!!")
            limit = "reached";
            new_index = (Math.floor(Math.random() * (q_amount - 0 + 1) ) + 0);
        }
        
        while ((old_indexes.includes(new_index)) && (limit !== "reached")){
            new_index = (Math.floor(Math.random() * (q_amount - 0 + 1) ) + 0);
        }
       
        finalArray.push(all_questions[new_index]);
       
        old_indexes.push(new_index);
       
        counter = finalArray.length
    }
    return finalArray;
}

// This function takes the answers from the user and returns a secret number not greater than 10.
// The parameter of this function only receives an array of numbers(floats, integers etc).
export const secret_number_generator = (all_answers) => {
    let counter = 0;
    let sum_of_answers = 0;
    let finalNumber = 0;

    // We -1 since arrays start at zero.
    let number_of_answers = (all_answers.length) - 1;
    let randomNumber1 = (Math.floor(Math.random() * (500 - 0 + 1) ) + 0);
    let randomNumber2 = (Math.floor(Math.random() * (1000 - 500 + 1) ) + 500);
    let randomNumber3 = (Math.floor(Math.random() * (10 - 0 + 1) ) + 0);
    let randomNumber4 = (Math.floor(Math.random() * (number_of_answers - 0 + 1) ) + 0);

    while (counter < all_answers.length){
        sum_of_answers = sum_of_answers + all_answers[counter]
        counter = counter + 1;
    }
    if (sum_of_answers > 1000){
        finalNumber = ((all_answers[randomNumber4] * randomNumber2) - (sum_of_answers)) + randomNumber3;
    }else if(sum_of_answers > 0 && sum_of_answers < 1000){
        finalNumber = ((all_answers[randomNumber4] * randomNumber1) + (sum_of_answers)) + randomNumber3;
    }else{
        finalNumber = ((all_answers[randomNumber4] * randomNumber1 * randomNumber2) + (sum_of_answers)) + randomNumber3;
    }
    
    finalNumber = Math.abs(finalNumber);
    
    while (finalNumber > 10){
        finalNumber = finalNumber/3;
    }

    finalNumber = Math.trunc(finalNumber);
    finalNumber = finalNumber.toString();
    return finalNumber;
}