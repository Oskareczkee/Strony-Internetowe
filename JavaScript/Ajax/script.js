$(function () {
    $.ajax({
        beforeSend: function (xhr) {
            if (xhr.overrideMimeType)
                xhr.overrideMimeType("application/json");
        }
    });
});
function loadContent(contentPath) {
    $.getJSON(contentPath).done(function (data) {
        var $content = $("#content");
        $content.animate({
            left: "+=430px"
        }, 500, function () {
            $content.clearQueue();
        });
        $content.find("#product-image").attr("src", data.productImage);
        $content.find(".producent").text(data.producent);
        $content.find(".name").text(data.name);
        $content.find(".price").text(data.price);
        $content.find(".currency").text(data.currency);
        $content.find("#description").html(data.descriptionHTML);
        $("#automat-price").text(data.price);
        var $sizes = $content.find("#sizes");
        $sizes.empty();
        $sizes.append($('<select>').attr("name", "sizes"));
        $sizes = $sizes.children().first();
        $sizes.append('<option value="" selected hidden>Wybierz swój rozmiar</option>');
        for (let x = 0; x < data.sizes.length; x++)
            $sizes.append($('<option>').val(data.sizes[x]).text(data.sizes[x]));
        $sizes.append('<script src="select-script.js"></script>');
    })
        .fail(function () {
        alert("File could not be loaded");
        $("#content").animate({
            left: "+=430px"
        }, 500, function () {
            $("#content").clearQueue();
        });
    });
}
$(".automat-product").on('click', function (e) {
    e.preventDefault();
    var $content = $("#content");
    if ($content.is(":animated"))
        return;
    $content.animate({
        left: "-=430px"
    }, 500, function () {
        loadContent(e.target.getAttribute("data-contentPath") || "");
    });
});
