function generateMultiplicationTable(min, max){
    let table = document.getElementById("board-content");
    let text="";

    for(let x=min;x<=max;x++)
        for(let y=min;y<=max;y++)
            text+=x+"\u2A2F"+y+"="+(x*y)+"<br/>";

    table.innerHTML=text;
}

function getValuesFromForm()
{
    let minVal= parseInt(document.getElementById("input-min").value);
    let maxVal=parseInt(document.getElementById("input-max").value);

    if(minVal>maxVal)
    {
        alert("minimum value cannot be greater than max value");
        return;
    }

    generateMultiplicationTable(minVal, maxVal);
}

window.onload=function(){generateMultiplicationTable(1,4);};