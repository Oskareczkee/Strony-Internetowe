"use strict";
$(".images-container img").on('click', function () {
    $("#big-image").attr('src', $(this).attr('src') || " ");
});
