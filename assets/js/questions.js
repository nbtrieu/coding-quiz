// array of question objects
let questions = [
    {
        prompt: 'Which of the following is NOT a primitive data type in JavaScript?',
        choices: ['Booleans', 'Null', 'Strings', 'Lists'],
        answer: 'Lists',
    },
    {
        prompt: 'Hoisting is the default behavior of JavaScript where all the variable and function declarations are moved to the _____',
        choices: ['top', 'bottom', 'center', 'end'],
        answer: 'top',
    },
    {
        prompt: 'Which operator is used to compare both values and types?',
        choices: ['==', '===', '>=', '='],
        answer: '===',
    },
    {
        prompt: 'Which keyword in an object method refers to the object itself?',
        choices: ['object', 'it', 'this', 'self'],
        answer: 'this',
    },
    {
        prompt: '___ is an application programming interface for HTML documents that allows documents to be accessed and manipulated.',
        choices: ['DOC', 'DOM', 'API', 'Developer Tools'],
        answer: 'DOM',
    }
]

console.log(questions.length);