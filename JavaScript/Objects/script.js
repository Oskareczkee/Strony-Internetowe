class Stats{
    statName;
    statValue;
    constructor(name, value)
    {
        this.statName=name;
        this.statValue=value;
    }
}

window.onload=function seima()
{
    var stats = [
        new Stats("Zjedzone bryłki węgla", 20),
        new Stats("Wykopane bryłki węgla", 20),
        new Stats("Zjedzone pasztety podlaskie", 5),
        new Stats("Zamordowani Bośniacy", 101),
        new Stats("Ludzie zatruci smogiem", "dużo"),
        new Stats("Wkurzeni górale", 2002)
    ];

    //@ts-ignore
    document.getElementById("stat1").textContent=stats[0].statName;
    //@ts-ignore
    document.getElementById("stat1-val").textContent=stats[0].statValue;

    //@ts-ignore
    document.getElementById("stat2").textContent=stats[1].statName;
    //@ts-ignore
    document.getElementById("stat2-val").textContent=stats[1].statValue;

    //@ts-ignore
    document.getElementById("stat3").textContent=stats[2].statName;
    //@ts-ignore
    document.getElementById("stat3-val").textContent=stats[2].statValue;

    //@ts-ignore
    document.getElementById("stat4").textContent=stats[3].statName;
    //@ts-ignore
    document.getElementById("stat4-val").textContent=stats[3].statValue;

    //@ts-ignore
    document.getElementById("stat5").textContent=stats[4].statName;
    //@ts-ignore
    document.getElementById("stat5-val").textContent=stats[4].statValue;

     //@ts-ignore
    document.getElementById("stat6").textContent=stats[5].statName;
    //@ts-ignore
    document.getElementById("stat6-val").textContent=stats[5].statValue;

    let time = new Date();
    let hh=time.getHours();
    let mm=time.getMinutes();
    let ss=time.getSeconds();

    hh = (hh < "10") ? "0" + hh : hh;
    mm = (mm < "10") ? "0" + mm : mm;
    ss = (ss < "10") ? "0" + ss : ss;
    
    //@ts-ignore
    document.getElementById("stat7-val").textContent=hh+":"+mm+":"+ss;

    let t= setTimeout(function(){seima()}, 1000)
};