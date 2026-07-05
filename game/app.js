//create elements
const gameArea = document.querySelector('.game');
const gameOptions = document.querySelector('.gameOptions');

const btn = document.createElement('button');
const output = document.createElement('div');
const message = document.createElement('div');

//update elements
output.classList.add('question')
output.classList.add('output'); //the name of the element (output) and then the classname you want to give (output) in style sheet .output
message.classList.add('message');
btn.classList.add('startBtn')

output.textContent = 'Click the button to start the game';
btn.textContent = 'start game';

//add elements to page
gameArea.append(message);
gameArea.append(output);
gameArea.append(btn);

//game options
const opts = ['*', '/', '+', '-'];

//max size? of number can ask user, number of questions to ask user
//ovals is the index num of the op in opts
//hiddenVal is to set which place is asked, 0->first, 1->second, 2->answer, 3->random
const game = {correct:'', maxValue:10, questions:10, oVals:[0, 1, 2, 3], curQue:0, hiddenVal:3, inplay:false};
const player = {correct:0, incorrect:0};

//start game on click
btn.addEventListener('click', startGame);

function startGame(){

    getValues(); 
    btn.style.display = 'none';
    gameOptions.style.display = 'none';
    buildBoard();   
    
}

function buildBoard(){
    console.log(game.questions);

    output.innerHTML = '';
    for( let i = 0; i < game.questions; i++){
        const div = document.createElement('div');//parent question div
        div.classList.add('question'); //each "box" around the question (styling)
        div.append(document.createTextNode(i+1+'. '));
        output.append(div);
        buildQuestions(div);
    }
}

function buildQuestions(div){

    let vals = [];
        vals[0] = Math.ceil(Math.random() * (game.maxValue)); //ceiling to get less 0s
        let tempMax = game.maxValue + 1;

        game.oVals.sort(()=>{
            return 0.5 - Math.random(); });//randomize the array

        //subtraction check, no negative answers check
        if(game.oVals[0] == 3){
            tempMax = vals[0];
        }

        vals[1] = Math.floor(Math.random() * tempMax);
        
        if(game.oVals[0] == 0){
            //mult check no 0
            if(vals[1] == 0){
                vals[1] = 1;
            }
            if(vals[0] == 0){
                vals[0] = 1;
            }
        }
        //division check no 0
        if(game.oVals[0] == 1){
            
            if(vals[0] == 0){
                vals[0] = 1;
            }
            let temp = vals[0] * vals[1];
            vals.unshift(temp);
        }
        else{
            vals[2] = eval(vals[0] + opts[game.oVals[0]] + vals[1]);
        }
        vals[3] = opts[game.oVals[0]];
        console.log(vals);

        let hiddenVal;

        //if set to a specific value, then that is the hidden position
        if(game.hiddenVal != 3){
            hiddenVal = game.hiddenVal;
        }
        else{
            //if set to 3 pick a random spot
            hiddenVal = Math.floor(Math.random() * 3);//random location for the hidden val
        }

        const answer = document.createElement('input');
        const myBtn = document.createElement('div');

        answer.setAttribute('type', 'number');
        answer.setAttribute('max', 999);
        answer.setAttribute('min', 0); //dont want negative values
        answer.classList.add('boxAnswer');

        answer.addEventListener('keyup', (e)=>{
            if(e.code == 'Enter'){
                checkAnswer()
            }
        })

        function checkAnswer(){
            answer.disabled = true;
            if(answer.correct == answer.value){
                div.style.backgroundColor = 'green';
                myBtn.style.backgroundColor = 'green';
            }
            else{
                div.style.backgroundColor = 'red';
                myBtn.style.backgroundColor = 'red';
            }
            
            myBtn.textContent = answer.correct;

            //return answer.correct == answer.value;
            
        }

        for(let i = 0; i < 3; i++){
            if(hiddenVal == i){
                answer.correct = vals[i];
                div.append(answer);
            }
            else{
                maker1(div, vals[i], 'box');
            }
            
            if(i == 0){ //operator
                let tempSign = vals[3] == '*' ? '&times' : vals[3]; //&times is mult symbol
                maker1(div, tempSign, 'boxSign');
            }
            if(i == 1){
                maker1(div, '=', 'boxSign');
            }
            if(i == 2){
                
                myBtn.classList.add('myBtn');
                myBtn.textContent = 'check';
                myBtn.addEventListener('click', (e)=>{ 
                    checkAnswer();    
                },{once:true});//with this option you can only click it once in the event list
                div.append(myBtn);
            }
        }
        
}

//pass val and class
function maker1(div, v, cla){
    const temp = document.createElement('div');
    temp.classList.add(cla);
    temp.innerHTML = v;
    div.append(temp);
}


function getValues(){
    game.maxValue = Number(document.querySelector('#maxVal').value); //select the id with the id maxVal (need # infront)
    game.questions = Number(document.querySelector('#numQuestions').value);
    let temp = document.querySelector('#selOpt');
    let tempArr = [];

    for(let i = 0; i < temp.options.length; i++){
        if(temp.options[i].selected){
            tempArr.push(i);
        }
    }
    game.oVals = tempArr;
    
    console.log(game);
}


