var XMove :boolean = true;
var GameEnded : boolean=false;
var AudioSource = new Audio("Images/wakur.mp3");

function boardClick(event : Event){

    if(GameEnded)
    {
        clearBoard();
        GameEnded=false;
        return;
    }

    var target = event.target as Element;
    if(target.classList.contains("x") || target.classList.contains("o"))
        return;

    clearPreview(target);
    
    move(target);

    checkWinAndTie();

    AudioSource.play();

    XMove=!XMove;
}

function clearPreview(elem: Element)
{
    elem.classList.remove("xPreview", "oPreview");
}

function checkWinAndTie()
{
    if(checkWin()){
        if(XMove){
            var XWins= document.getElementById("XWins");
            var XInt = (parseInt(XWins?.textContent as string)+1).toString();
            XWins!.textContent=XInt;
        }
        else{
            var OWins= document.getElementById("OWins");
            var OInt = (parseInt(OWins?.textContent as string)+1).toString();
            OWins!.textContent=OInt;
        }


        GameEnded=true;
        return;
    }

    if(checkTie())
    {
        var ties= document.getElementById("Ties");
        var tiesInt = (parseInt(ties?.textContent as string)+1).toString();
        ties!.textContent=tiesInt;

        let AudioSrc= new Audio("Images/powitanie.mp3").play();
        GameEnded=true;
        return;
    }
}

function move(target: Element)
{
    if(XMove)
    {
        target.classList.add("x");
        target.setAttribute("data-state", "x");
    }
    else
    {
        target.classList.add("o");
        target.setAttribute("data-state", "o")
    }
}

function checkWin() :boolean{
    let gameboard = document.getElementById("gameboard")?.getElementsByTagName("td");
    if(!gameboard)
        return false;

    let states: string[] =[];
    for(let item of gameboard)
        states.push(item.getAttribute("data-state") as string);
    
    if(states[0]===states[1] && states[1]===states[2] && states[0] !== "empty")
        return true;
    else if(states[3]===states[4] && states[4]===states[5] && states[3] !== "empty")
        return true;
    else if(states[6]===states[7] && states[7]===states[8] && states[6] !== "empty")
        return true;    
    else if(states[0]===states[3] && states[3]===states[6] && states[0] !== "empty")
        return true;    
    else if(states[1]===states[4] && states[4]===states[7] && states[1] !=="empty")
        return true;    
    else if(states[2]===states[5] && states[5]===states[8] && states[2] !== "empty")
        return true;    
    else if(states[0]===states[4] && states[4]===states[8] && states[0] !== "empty")
        return true;    
    else if(states[2]===states[4] && states[4]===states[6] && states[2] !=="empty")
        return true;
        
    return false;
}

function clearBoard(){
    let gameboard = document.getElementById("gameboard")?.getElementsByTagName("td");
    if(!gameboard)
        return false;

    for(let item of gameboard)
    {
        item.setAttribute("data-state", "empty");
        item.classList.remove("o", "x");
    }
}

function checkTie() : boolean{
    let gameboard = document.getElementById("gameboard")?.getElementsByTagName("td");
    if(!gameboard)
        return false;
    for(let item of gameboard)
        if(!(item.classList.contains("x") || item.classList.contains("o")))
            return false;
    return true;
}

function boardMouseOver(event : Event){
    var target = event.target as HTMLElement;

    if(target.getAttribute("data-state")==="empty")
        XMove? target.classList.add("xPreview"): target.classList.add("oPreview");
}

function boardMouseOut(event : Event){
    var target = event.target as HTMLElement;

    if(target.getAttribute("data-state")==="empty")
        XMove? target.classList.remove("xPreview"): target.classList.remove("oPreview");
}

window.onload= function(){
    let gameboard = document.getElementById("gameboard")?.getElementsByTagName("td");
    
    if(!gameboard)
    return;
    
    for(var x =0;x<gameboard.length;x++){
        gameboard[x].addEventListener('click', boardClick, false);
        gameboard[x].addEventListener('mouseover', boardMouseOver, false);
        gameboard[x].addEventListener('mouseout', boardMouseOut, false)
    }

    document.getElementById("header")?.addEventListener('click', function(){new Audio("Images/gratulacje.mp3").play();}, false);
}