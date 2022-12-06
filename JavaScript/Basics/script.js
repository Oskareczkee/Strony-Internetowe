function buttonClick()
{   
    const name = document.getElementById('name').value;
    const height = document.getElementById("height").value;
    const gender = document.getElementById("select-gender").value;

    var nameOutput = document.getElementById("name-output");
    var genderOutput = document.getElementById("gender-output");
    var heightOutput = document.getElementById("height-output");

    if(!parseInt(height))
    {
        alert("Height has to be a number!");
        return;
    }
    if(name.length===0)
    {
        alert("You have to specify your giraffe name");
        return;
    }

    nameOutput.textContent =name;
    genderOutput.textContent =gender;
    heightOutput.textContent =height +" metras";
}