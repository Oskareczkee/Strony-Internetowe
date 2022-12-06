var modalWindow = /** @class */ (function () {
    function modalWindow($content) {
        this.content = $content;
        this.modalBackground = $('<div class="modal-background"/>');
        this.modal = $('<div class="modal"/>');
        this.closeButton = $('<div class="modal-close">');
        this.closeButton.on('click', this.buttonClickEvent);
        this.modal.append(this.content, this.closeButton);
        this.modalBackground.append(this.modal);
    }
    modalWindow.prototype.open = function () {
        $(this.modalBackground).appendTo('body');
        $(this.modalBackground).animate({ opacity: 1 }, 400);
    };
    modalWindow.prototype.close = function () {
        this.closeButton.trigger('click');
    };
    modalWindow.prototype.buttonClickEvent = function () {
        $(".modal-background").fadeOut({ duration: 400, complete: function () {
                this.remove();
            } });
    };
    return modalWindow;
}());
$(".accordion").on('click', ".accordion-control", function (e) {
    e.preventDefault();
    $(this)
        .next(".accordion-panel")
        .not(":animated")
        .slideToggle();
});
$(".cards").on('click', '.tab', function (e) {
    e.preventDefault();
    var $this = $(this);
    var $contatiner = $(this).parent();
    var $active = $contatiner.find(".active");
    var $content = $contatiner.parent().find(".active-tab");
    //if active was not found, there is no active yet
    if ($active)
        $active.removeClass("active");
    $this.addClass('active');
    /*get content from the tab and put it in the content tab*/
    $content.html($this.find(".content").html());
});
$(".modal-button").on('click', function () {
    var newModalWindow = new modalWindow($(".modal-content").html());
    newModalWindow.open();
});
$(".photo-viewer .thumbnails").on('click', 'img', function () {
    var src = $(this).attr('src');
    var $photoviewer = $(this).parent().siblings(".active-photo").first();
    var $content = $(".photo-viewer-content");
    $photoviewer.fadeOut(200, function () {
        $photoviewer.attr('src', src || "#");
        $photoviewer.fadeIn(200);
    });
    $content.text($(this).attr('data-description') || "");
});
//slide viewer code
$(".slide-viewer").each(function () {
    var timeoutFunc = function () {
        $this.find(".slide-arrow.right").trigger('click');
    };
    var $dotGroup = $(this).find(".dot-group").first();
    var imgNum = $(this).find(".slide-group").children().length;
    $dotGroup.append("<span class='dot active'></span>");
    for (var x = 1; x < imgNum; x++)
        $dotGroup.append("<span class='dot'></span>");
    var $this = $(this);
    var timeout = setTimeout(timeoutFunc, 4000);
    $this.find(".slide-arrow.right").on('click', function () {
        clearTimeout(timeout);
        var $slideViewer = $(this).parent().first();
        var $actualSlide = $slideViewer.find(".actual-slide img");
        if ($actualSlide.is(":animated"))
            return;
        var $slideGroup = $slideViewer.find(".slide-group");
        var $dotGroup = $slideViewer.find(".dot-group");
        var $activeSlide = $slideGroup.find(".active").first();
        var $activeDot = $dotGroup.find(".active").first();
        $activeSlide.removeClass("active");
        $activeDot.removeClass("active");
        if ($activeSlide.next().length) {
            $activeSlide = $activeSlide.next();
            $activeDot = $activeDot.next();
        }
        else {
            $activeSlide = $slideGroup.children().first();
            $activeDot = $dotGroup.children().first();
        }
        $activeSlide.addClass("active");
        $activeDot.addClass("active");
        var $image = $activeSlide.children("img").first();
        $actualSlide.fadeOut(1000, function () {
            $(this).attr("src", $image.attr("src") || "#");
        }).fadeIn(1000);
        timeout = setTimeout(timeoutFunc, 4000);
    });
    $this.find(".slide-arrow.left").on('click', function () {
        clearTimeout(timeout);
        var $slideViewer = $(this).parent().first();
        var $actualSlide = $slideViewer.find(".actual-slide img");
        if ($actualSlide.is(":animated"))
            return;
        var $slideGroup = $slideViewer.find(".slide-group");
        var $dotGroup = $slideViewer.find(".dot-group");
        var $activeSlide = $slideGroup.find(".active").first();
        var $activeDot = $dotGroup.find(".active").first();
        $activeSlide.removeClass("active");
        $activeDot.removeClass("active");
        if ($activeSlide.prev().length) {
            $activeSlide = $activeSlide.prev();
            $activeDot = $activeDot.prev();
        }
        else {
            $activeSlide = $slideGroup.children().last();
            $activeDot = $dotGroup.children().last();
        }
        $activeSlide.addClass("active");
        $activeDot.addClass("active");
        var $image = $activeSlide.children("img").first();
        $actualSlide.fadeOut(1000, function () {
            $(this).attr("src", $image.attr("src") || "#");
        }).fadeIn(1000);
        timeout = setTimeout(timeoutFunc, 4000);
    });
});
