const gameArea = document.querySelector('.game');
const btn = document.createElement('button');
const output = document.createElement('div');
const answer = document.createElement('input');

output.textContent = 'Click the button to start the game';
btn.textContent = 'start game';

output.classList.add('output');

gameArea.append(output);
gameArea.append(btn);

const opts = ['*', '/', '+', '-'];

//max size? of number can ask user, number of questions to ask user
//ovals is the index num of the op in opts
//hiddenVal is to set which place is asked, 0->first, 1->second, 2->answer, 3->random
const game = {maxValue:10, questions:10, oVals:[1], curQue:0, hiddenVal:3};

btn.addEventListener('click', startGame);
/** 
for(let i=0; i<100; i++){
    let val = Math.floor(Math.random() * (game.maxValue + 1))
    console.log(val);
}
*/

function startGame(){
    //btn.style.display = 'none'; //make the button disapear once it is clicked
    game.curQue = 0;
    buildQuestion();
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
            let temp = vals[0] * vals[1];
            vals.unshift(temp);
            console.log(temp);
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

         
        console.log(hiddenVal);
        vals[hiddenVal] = '__';
        output.innerHTML = `${vals[0]} ${vals[3]} ${vals[1]} = ${vals[2]}`;
    }
    

}