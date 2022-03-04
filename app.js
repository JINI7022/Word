const gameBoard = document.querySelector("#gameBoard")

const keys = "abcdefghijklmnopqrstuvwxyzQWERTOP";

let cntBlock = 0;
let cntSpell = 0;

let blocks = [];

const maxSpell = 9;
const maxBlock = 6;

const matchSpell = {
    a: "ㅁ",
    b: "ㅠ",
    c: "ㅊ",
    d: "ㅇ",
    e: "ㄷ",
    f: "ㄹ",
    g: "ㅎ",
    h: "ㅗ",
    i: "ㅑ",
    j: "ㅓ",
    k: "ㅏ",
    l: "ㅣ",
    m: "ㅡ",
    n: "ㅜ",
    o: "ㅐ",
    p: "ㅔ",
    q: "ㅂ",
    r: "ㄱ",
    s: "ㄴ",
    t: "ㅅ",
    u: "ㅕ",
    v: "ㅍ",
    w: "ㅈ",
    x: "ㅌ",
    y: "ㅛ",
    z: "ㅋ",
    Q: "ㅃ",
    W: "ㅉ",
    E: "ㄸ",
    R: "ㄲ",
    T: "ㅆ",
    O: "ㅒ",
    P: "ㅖ",
}

const words = [
    "djWjfxlql",
    "djaak",
    "wjWjfxlql",
    "dkssud",
    "wkehdck",
    "cor",
    "gbwl",
    "zjavbxj",
    "gksrnr",
    "tor",
    "wkdsksrka",
];
const answer = words[Math.floor(Math.random() * words.length)];

function init() {
    for (let i = 0; i < maxBlock; i++) {
        const block = document.createElement("div");
        blocks[i] = [];
        for (let j = 0; j < maxSpell; j++) {
            const div = document.createElement("div");
            div.className = "spells";
            block.appendChild(div);
            blocks[i].push(div);
        }

        block.className = "blocks";
        gameBoard.appendChild(block);
    }
}

function handleKeyPress(event) {
    if (keys.includes(event.key) && cntSpell < maxSpell) {
        console.log(cntBlock)
        cntSpell = cntSpell < 0 ? 0 : cntSpell;
        blocks[cntBlock][cntSpell].innerText = matchSpell[event.key];
        blocks[cntBlock][cntSpell].style.border = "1px solid black";
        cntSpell++;
    } else if (event.key == "Enter") {
        handleSubmit();
    } 
    
}

function handleKeyDown(event) {
    if (event.key == "Backspace" && cntSpell >= 0) {
        cntSpell = cntSpell >= maxSpell ? maxSpell - 1 : cntSpell - 1;
        blocks[cntBlock][cntSpell].innerText = "";
        blocks[cntBlock][cntSpell].style.border = "1px solid lightgray";
    }
}

function handleSubmit() {
    let fakeAnswer = answer;
    for (let i = 0; i < answer.length; i++) {
        const text = Object.keys(matchSpell).find(key => matchSpell[key] === blocks[cntBlock][i].innerText);
        if (fakeAnswer.indexOf(text) === i) {
            blocks[cntBlock][i].style.background = "#6AAA64";
            fakeAnswer = fakeAnswer.replace(text, "0");
        } else if (fakeAnswer.includes(text)) {
            blocks[cntBlock][i].style.background = "#C9B458";
            fakeAnswer = fakeAnswer.replace(text, "0");
        } else {
            blocks[cntBlock][i].style.background = "#787C7E";
        }
        blocks[cntBlock][i].style.color = "white";
        blocks[cntBlock][i].style.border = "none";
    }
    cntBlock++;
    cntSpell = 0;
}

init();
window.addEventListener("keypress", handleKeyPress);
window.addEventListener("keydown", handleKeyDown);
