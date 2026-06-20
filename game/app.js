const gameArea = document.querySelector('.game');
const btn = document.createElement('button');
const output = document.createElement('div');
const answer = document.createElement('input');

output.textContent = 'Click the button to start the game';
btn.textContent = 'start game';

answer.setAttribute('type', 'number');
answer.setAttribute('max', 999);
answer.setAttribute('min', 0); //dont want negative values

output.classList.add('output');
answer.classList.add('boxAnswer');

gameArea.append(output);
gameArea.append(btn);

const opts = ['*', '/', '+', '-'];

//max size? of number can ask user, number of questions to ask user
//ovals is the index num of the op in opts
//hiddenVal is to set which place is asked, 0->first, 1->second, 2->answer, 3->random
const game = {correct:'', maxValue:10, questions:10, oVals:[0, 1, 2, 3], curQue:0, hiddenVal:3, inplay:false};

btn.addEventListener('click', btnCheck);

answer.addEventListener('keyup', (e)=>{
    console.log(e.code);
    console.log(answer.value.length);
    if(answer.value.length >= 0){
        btn.style.display = 'block';
        btn.textContent = 'check';
        game.inplay = true;
    }
    if(e.code == 'Enter'){
        game.inplay = true;
        btnCheck();
    }
})

function btnCheck(){
    if(game.inplay){
        console.log('check');
        console.log(game.correct);
        if(answer.value == game.correct){
            console.log('correct');
        }
        else{
            console.log('wrong, correct is: '+game.correct);
        }
        answer.disabled = true;
        buildQuestion();
    }
    else{
        btn.style.display = 'none'; //make the button disapear once it is clicked
        game.curQue = 0;
        buildQuestion();
    }
    
}

function buildQuestion(){
    if(game.curQue < game.questions){
        game.curQue++;
        output.innerHTML = '';

        let vals = [];
        vals[0] = Math.floor(Math.random() * (game.maxValue + 1));
        vals[1] = Math.floor(Math.random() * (game.maxValue + 1));

        game.oVals.sort(()=>{
            return 0.5 - Math.random(); });//randomize the array
        
        if(game.oVals[0] == 1){
            //division check
            //do not want the second value to be 0
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

        answer.value = '';
        answer.disabled = false;

        for(let i = 0; i < 3; i++){
            if(hiddenVal == i){
                game.correct = vals[i];
                output.append(answer);
            }
            else{
                maker(vals[i], 'box');
            }
            
            if(i == 0){ //operator
                maker(vals[3], 'boxSign');
            }
            if(i == 1){
                maker('=', 'boxSign');
            }
        }
        answer.focus();
        //vals[hiddenVal] = '__';
        //output.innerHTML = `${vals[0]} ${vals[3]} ${vals[1]} = ${vals[2]}`;
    }  

}
//pass val and class
function maker(v, cla){
    const temp = document.createElement('div');
    temp.classList.add(cla);
    temp.textContent = v;
    output.append(temp);
}