$(document).ready(function () {
    $(".revision_arrow").click(function() {
        var revision_id = $(this).attr("revision_id");
        var open = "glyphicon-chevron-down";
        var close = "glyphicon-play";

        if($(this).hasClass(close)) {
            $(this).removeClass(close);
            $(this).addClass(open);
        }else if($(this).hasClass(open)) {
            $(this).removeClass(open);
            $(this).addClass(close);
        }
        $(".revision_"+revision_id).toggle();
    });
});

function inline(_id) {
    $("#revision-inline_"+_id).show();
    $("#revision-side-by-side_"+_id).hide();

    $("#sidebyside-btn-"+_id).removeClass("label-primary");
    $("#inline-btn-"+_id).addClass("label-primary");
}

function sidebyside(_id) {
    $("#revision-inline_"+_id).hide();
    $("#revision-side-by-side_"+_id).show();

    $("#sidebyside-btn-"+_id).addClass("label-primary");
    $("#inline-btn-"+_id).removeClass("label-primary");
}

