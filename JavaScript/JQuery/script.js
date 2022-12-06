
var globalWorkersAmount = 0;
var workersSrc = [
    "Images/hehe.jpg",
    "Images/chief worker.jpg",
    "Images/basic worker.png",
    "Images/long worker.png",
    "Images/manager.png",
    "Images/melon worker.png",
    "Images/stupid worker.png"
];
const workerWidth = 50;
const workerHeight = 50;
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getBonus() {
    let bonus = 0;
    let $basicWorkersAmount = parseInt($("#basic-workers-amount").text());
    let $stupidWorkersAmount = parseInt($("#stupid-workers-amount").text());
    let $melonWorkersAmount = parseInt($("#melon-workers-amount").text());
    let $longWorkersAmount = parseInt($("#long-workers-amount").text());
    let $chiefWorkersAmount = parseInt($("#chief-workers-amount").text());
    let $managerWorkersAmount = parseInt($("#manager-amount").text());
    bonus += $basicWorkersAmount;
    bonus += $stupidWorkersAmount * 10;
    bonus += $melonWorkersAmount * 100;
    bonus += $longWorkersAmount * 1000;
    bonus += $chiefWorkersAmount * 10000;
    bonus += $managerWorkersAmount * 100000;
    return bonus;
}
function checkUpgradesAvailability() {
    let $upgradesIcons = $(".upgrade .upgrade-add");
    let $upgradePrices = $(".entity-upgrade-cost");
    let playerMoney = parseInt($("#money-amount").text());
    for (let x = 0; x < $upgradePrices.length; x++) {
        if (parseInt($upgradePrices[x].textContent || "") > playerMoney)
            $upgradesIcons.eq(x).attr("src", "Images/add-sign-inactive.png");
        else
            $upgradesIcons.eq(x).attr("src", "Images/add-sign-active.png");
    }
}
function addWorkerToCottonfield() {
    var _a, _b;
    var $cottonfiled = $("#cottonfield");
    var $randomWorkerSrc = workersSrc[getRandomInt(0, workersSrc.length - 1)];
    var $worker = $("<img />", { src: $randomWorkerSrc, alt: "Worker", class: "cottonfield-worker" });
    $worker.css("top", getRandomInt(0, ((_a = $cottonfiled.height()) !== null && _a !== void 0 ? _a : 50) - workerHeight));
    $worker.css("right", getRandomInt(0, ((_b = $cottonfiled.width()) !== null && _b !== void 0 ? _b : 50) - workerWidth));
    $worker.appendTo($cottonfiled);
}
function calculatePrice(amuntOfUpgrades, basePrice) {
    return amuntOfUpgrades * basePrice;
}
$("#click").on('click', function () {
    var $elem = $("#money-amount");
    var money = parseInt($elem.text());
    var moneyBonus = getBonus();
    money += 1 + moneyBonus;
    $elem.text(money);
    checkUpgradesAvailability();
    let sound = new Audio("Images/click sound.mp3");
    sound.volume = 0.2;
    sound.play();
});
$(".upgrade-add").on('click', function (e) {
    var _a;
    var $upgradeCostNode = $(e.target).parent().next().children().filter(".entity-upgrade-cost");
    var $moneyNode = $("#money-amount");
    var $val = parseInt($(e.target).prev().text());
    var $price = parseInt($upgradeCostNode.text());
    var $money = parseInt($moneyNode.text());
    var $basePricce = parseInt((_a = $upgradeCostNode.attr("data-basePrice")) !== null && _a !== void 0 ? _a : '');
    if ($price > $money)
        return;
    $money -= $price;
    $val++;
    $(e.target).prev().text($val);
    $upgradeCostNode.text(calculatePrice($val, $basePricce));
    $moneyNode.text($money);
    globalWorkersAmount++;
    if (globalWorkersAmount % 10 === 0)
        addWorkerToCottonfield();
    checkUpgradesAvailability();
    var AudioSrc = new Audio("Images/21_3.mp3");
    AudioSrc.play();
});
$("#music").on('click', function () {
    var audioSrc = new Audio("Images/music.mp3");
    audioSrc.loop = true;
    audioSrc.play();
});
