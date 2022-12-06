var XMove = true;
var GameEnded = false;
var AudioSource = new Audio("Images/wakur.mp3");
function boardClick(event) {
    if (GameEnded) {
        clearBoard();
        GameEnded = false;
        return;
    }
    var target = event.target;
    if (target.classList.contains("x") || target.classList.contains("o"))
        return;
    clearPreview(target);
    move(target);
    checkWinAndTie();
    AudioSource.play();
    XMove = !XMove;
}
function clearPreview(elem) {
    elem.classList.remove("xPreview", "oPreview");
}
function checkWinAndTie() {
    if (checkWin()) {
        if (XMove) {
            var XWins = document.getElementById("XWins");
            var XInt = (parseInt(XWins === null || XWins === void 0 ? void 0 : XWins.textContent) + 1).toString();
            XWins.textContent = XInt;
        }
        else {
            var OWins = document.getElementById("OWins");
            var OInt = (parseInt(OWins === null || OWins === void 0 ? void 0 : OWins.textContent) + 1).toString();
            OWins.textContent = OInt;
        }
        GameEnded = true;
        return;
    }
    if (checkTie()) {
        var ties = document.getElementById("Ties");
        var tiesInt = (parseInt(ties === null || ties === void 0 ? void 0 : ties.textContent) + 1).toString();
        ties.textContent = tiesInt;
        var AudioSrc = new Audio("Images/powitanie.mp3").play();
        GameEnded = true;
        return;
    }
}
function move(target) {
    if (XMove) {
        target.classList.add("x");
        target.setAttribute("data-state", "x");
    }
    else {
        target.classList.add("o");
        target.setAttribute("data-state", "o");
    }
}
function checkWin() {
    var _a;
    var gameboard = (_a = document.getElementById("gameboard")) === null || _a === void 0 ? void 0 : _a.getElementsByTagName("td");
    if (!gameboard)
        return false;
    var states = [];
    for (var _i = 0, gameboard_1 = gameboard; _i < gameboard_1.length; _i++) {
        var item = gameboard_1[_i];
        states.push(item.getAttribute("data-state"));
    }
    if (states[0] === states[1] && states[1] === states[2] && states[0] !== "empty")
        return true;
    else if (states[3] === states[4] && states[4] === states[5] && states[3] !== "empty")
        return true;
    else if (states[6] === states[7] && states[7] === states[8] && states[6] !== "empty")
        return true;
    else if (states[0] === states[3] && states[3] === states[6] && states[0] !== "empty")
        return true;
    else if (states[1] === states[4] && states[4] === states[7] && states[1] !== "empty")
        return true;
    else if (states[2] === states[5] && states[5] === states[8] && states[2] !== "empty")
        return true;
    else if (states[0] === states[4] && states[4] === states[8] && states[0] !== "empty")
        return true;
    else if (states[2] === states[4] && states[4] === states[6] && states[2] !== "empty")
        return true;
    return false;
}
function clearBoard() {
    var _a;
    var gameboard = (_a = document.getElementById("gameboard")) === null || _a === void 0 ? void 0 : _a.getElementsByTagName("td");
    if (!gameboard)
        return false;
    for (var _i = 0, gameboard_2 = gameboard; _i < gameboard_2.length; _i++) {
        var item = gameboard_2[_i];
        item.setAttribute("data-state", "empty");
        item.classList.remove("o", "x");
    }
}
function checkTie() {
    var _a;
    var gameboard = (_a = document.getElementById("gameboard")) === null || _a === void 0 ? void 0 : _a.getElementsByTagName("td");
    if (!gameboard)
        return false;
    for (var _i = 0, gameboard_3 = gameboard; _i < gameboard_3.length; _i++) {
        var item = gameboard_3[_i];
        if (!(item.classList.contains("x") || item.classList.contains("o")))
            return false;
    }
    return true;
}
function boardMouseOver(event) {
    var target = event.target;
    if (target.getAttribute("data-state") === "empty")
        XMove ? target.classList.add("xPreview") : target.classList.add("oPreview");
}
function boardMouseOut(event) {
    var target = event.target;
    if (target.getAttribute("data-state") === "empty")
        XMove ? target.classList.remove("xPreview") : target.classList.remove("oPreview");
}
window.onload = function () {
    var _a, _b;
    var gameboard = (_a = document.getElementById("gameboard")) === null || _a === void 0 ? void 0 : _a.getElementsByTagName("td");
    if (!gameboard)
        return;
    for (var x = 0; x < gameboard.length; x++) {
        gameboard[x].addEventListener('click', boardClick, false);
        gameboard[x].addEventListener('mouseover', boardMouseOver, false);
        gameboard[x].addEventListener('mouseout', boardMouseOut, false);
    }
    (_b = document.getElementById("header")) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () { new Audio("Images/gratulacje.mp3").play(); }, false);
};
