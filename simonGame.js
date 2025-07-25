let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red" ,"purple", "green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

function startGame() {
    if (!started) {
        started = true;
        levelUp();
    }
}

document.addEventListener("keypress", startGame);
document.addEventListener("touchstart", startGame);

document.addEventListener("click", function(e) {
    // Avoid starting when clicking buttons
    if (!e.target.classList.contains("btn")) {
        startGame();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * btns.length);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    gameFlash(randBtn);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Tap anywhere or press any key to restart.`;
        document.body.style.backgroundColor = "red";
        setTimeout(() => {
            document.body.style.backgroundColor = "";
        }, 200);
        reset();
    }
}

function btnPress() {
    if (!started) return;

    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allBtn = document.querySelectorAll(".btn");
allBtn.forEach(btn => btn.addEventListener("click", btnPress));

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
