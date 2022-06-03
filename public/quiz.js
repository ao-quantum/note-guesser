const button = document.getElementById("play-note");
const answers = document.getElementById("answers");

let quizInfo;

async function main() {
    const audioCtx = new window.AudioContext();

    quizInfo = await getPitch();
    
    button.onclick = e => {
        console.log("clicked");
        const oscillator = audioCtx.createOscillator();
        oscillator.type = 'sine';
        oscillator.frequency.value = quizInfo.frequency;
        oscillator.connect(audioCtx.destination);    
        oscillator.start();
    
        button.disabled = true;
    
        setTimeout(() => {
            oscillator.stop();
            oscillator.disconnect();
            
            button.disabled = false;
        }, 1000);
    };

    answers.onsubmit = e => {
        e.preventDefault();
        
        const key = e.target.elements.key.value;
        console.log(key);

        if (key === quizInfo.key) {
            document.getElementById("result-win").style.display = 'block';
        } else {
            document.getElementById("result-lose").style.display = 'block';
        }
    }
}

async function getPitch() {
    const req = await fetch('/quizInfo');
    const json = await req.json()

    return json;
}

main();
