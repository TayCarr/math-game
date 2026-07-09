//create elements
const gameArea = document.querySelector('.game');
const gameOptions = document.querySelector('.gameOptions');

const btn = document.createElement('button');
const btn1 = document.createElement('button');//download csv
const output = document.createElement('div');
const message = document.createElement('div');

//update elements
btn1.style.display = 'none';
output.classList.add('question')
output.classList.add('output'); //the name of the element (output) and then the classname you want to give (output) in style sheet .output
message.classList.add('message');
btn.classList.add('startBtn')
btn1.classList.add('startBtn')

output.textContent = 'Click the button to start the game';
btn.textContent = 'start game';
btn1.textContent = 'download results';

//add elements to page
gameArea.append(message);
gameArea.append(output);
gameArea.append(btn);
gameArea.append(btn1);

//game options
const opts = ['*', '/', '+', '-'];

//max size? of number can ask user, number of questions to ask user
//ovals is the index num of the op in opts
//hiddenVal is to set which place is asked, 0->first, 1->second, 2->answer, 3->random
const game = {correct:'', maxValue:10, questions:10, oVals:[0, 1, 2, 3], curQue:0, hiddenVal:3, inplay:false};
const player = {correct:0, incorrect:0, score:[]};

//start game on click
btn.addEventListener('click', startGame);
btn1.addEventListener('click', createCSV);

function createCSV(){
    
}

function startGame(){

    getValues(); 
    btn.style.display = 'none'; //hide start button
    gameOptions.style.display = 'none'; //hide option inputs
    buildBoard();   
    
}

function buildBoard(){

    output.innerHTML = '';
    for( let i = 0; i < game.questions; i++){
        const div = document.createElement('div');//parent question div
        div.classList.add('question'); //each "box" around the question (styling)
        div.indexVal = i; //wont always answer in order need to track the index for order
        div.append(document.createTextNode(i+1+'. ')); //add counter
        output.append(div); //add to html page
        buildQuestions(div); //add question
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

    vals[1] = Math.floor(Math.random() * tempMax); //rndom val for 2nd 
    
    if(game.oVals[0] == 0){//if multiplication 
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
    //console.log(vals);

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

        player.score[div.indexVal][4] = true; //updates that the question has been answered
        answer.disabled = true;
        if(answer.correct == answer.value){
            player.score[div.indexVal][3] = true;
            div.style.backgroundColor = 'green';
            myBtn.style.backgroundColor = 'green';
        }
        else{
            div.style.backgroundColor = 'red';
            myBtn.style.backgroundColor = 'red';
        }
        //console.log(player.score[div.indexVal]);
        checkComplete();
        myBtn.textContent = answer.correct;
    }//end of check ans func

    function checkComplete(){
        let cnt = 0;
        player.score.forEach((el) => {
            //console.log(el);

            if(el[4]){
                cnt++;
            }
        })
        if(cnt >= game.questions){
            console.log("game done");
            btn1.style.display = 'block';
            btn.style.display = 'block';
        }
        console.log('Questions done: '+cnt);
    }

     //let tempOutput = vals.join(' ');
     let ansx = [];
     let quex = [];

    for(let i = 0; i < 3; i++){
        ansx.push(vals[i]);
        if(hiddenVal == i){
            quex.push('_');
            answer.correct = vals[i];
            div.append(answer);
        }
        else{
            maker1(div, vals[i], 'box');
            quex.push(vals[i]);
        }
        
        if(i == 0){ //operator
            let tempSign = vals[3] == '*' ? '&times' : vals[3]; //&times is mult symbol
            if(vals[3] == '*'){
                ansx.push('x');
                quex.push('x');
            }else{
                ansx.push(tempSign);
                quex.push(tempSign);
            }
            
            maker1(div, tempSign, 'boxSign');
        }
        if(i == 1){
            ansx.push('=');
            quex.push('=');
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
    quex = quex.join(' ');
    ansx = ansx.join(' ');
    //console.log(quex, ansx);
    
    player.score.push([div.indexVal, quex, ansx, false]);
    //console.log(player.score);
        
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
    
    //console.log(game);
}


