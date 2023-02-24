"use strict";
var $cats = $('#cats .cat');
var catsByColorTags = [];
var catsByRaceTags = [];
var catsByColor = {};
var catsByRace = {};
function getCatsAndTags() {
    $cats.each(function () {
        var obj = this;
        var img = $(this).children("img");
        var color = img.data('color');
        var race = img.data('race');
        if (color) {
            color.split(' ').forEach(function (colorName) {
                colorName = colorName.toLowerCase();
                if (catsByColor[colorName] == null) {
                    catsByColor[colorName] = [];
                    catsByColorTags.push(colorName);
                }
                catsByColor[colorName].push(obj);
            });
        }
        if (race) {
            race.split(' ').forEach(function (raceName) {
                raceName = raceName.toLowerCase();
                if (catsByRace[raceName] == null) {
                    catsByRace[raceName] = [];
                    catsByRaceTags.push(raceName);
                }
                catsByRace[raceName].push(obj);
            });
        }
    });
    var $colorsList = $('#colorsList');
    var $racesList = $("#racesList");
    catsByColorTags.forEach(function (value) {
        var $option = $("<option value=\"" + value + "\">");
        $colorsList.append($option);
    });
    catsByRaceTags.forEach(function (value) {
        var $option = $("<option value=\"" + value + "\">");
        $racesList.append($option);
    });
}
getCatsAndTags();
function updateSearches() {
    var $raceSearch = $("#race-search");
    var $colorSearch = $("#color-search");
    $raceSearch.attr("list", "racesList");
    $colorSearch.attr("list", "colorsList");
}
updateSearches();
$("#search-button").on('click', function () {
    var _a, _b;
    var race = (_a = $("#race-search").val()) === null || _a === void 0 ? void 0 : _a.toString();
    var color = (_b = $("#color-search").val()) === null || _b === void 0 ? void 0 : _b.toString();
    var $catContainer = $("#cats");
    $catContainer.html('');
    if (catsByColor[color] !== undefined) {
        catsByColor[color].forEach(function (obj) {
            $catContainer.append(obj);
        });
    }
    if (catsByRace[race] !== undefined) {
        catsByRace[race].forEach(function (obj) {
            if ($catContainer.find(obj).length)
                return;
            $catContainer.append(obj);
        });
    }
});
