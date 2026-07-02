$(document).ready(function () {
    $('.markdown_editor').griffinEditor({autoSize: false});
    $(".markdown_tooltip").tooltip({
        'selector': '',
        'placement': 'bottom'
    });

    $('#markdownPreview').on('show.bs.modal', function () {
        $(this).find('.modal-content').css({
            width: '800px',
            marginLeft: '-100px'
        });
    });
});

function preview() {
    var preview_content = $("#id_content").val();
    $.post("/scode/preview", {
        "preview_content": preview_content
    }, function (data) {
        $("#markdown_preview_content").html(data);
        $('#markdownPreview').modal('show');
    }, "html");
}