var simplemde;

$(document).ready(function () {
    /*
    $('.markdown_editor').griffinEditor({autoSize: false});
    $(".markdown_tooltip").tooltip({
        'selector': '',
        'placement': 'bottom'
    });
    */

    simplemde = new SimpleMDE({
        element: $("#id_content")[0],
        autofocus: false,
        autosave: {
            enabled: false,
            uniqueId: "page_"+$("#page_id").val(),
            delay: 5000,
        },
        forceSync: true,
        hideIcons: ["preview", "side-by-side"],
        indentWithTabs: false,
        lineWrapping: true,
        placeholder: "Type here...",
        promptURLs: true,
        renderingConfig: {
            singleLineBreaks: false,
            codeSyntaxHighlighting: true,
        },
        showIcons: ["code", "table", "strikethrough", "horizontal-rule"],
        spellChecker: false
    });

    $('#markdownPreview').on('show.bs.modal', function () {
        $(this).find('.modal-content').css({
            width: '800px',
            marginLeft: '-100px'
        });
    });

    $("#codeOkBtn").click(function() {
        var codeLang = $("#codeLang").val();
        var codeContent = $("#codeContent").val();
        var code = [];
        if(codeLang) {
            code.push("```{."+codeLang+"}");
        }else {
            code.push("```");
        }
        code.push(codeContent);
        code.push("```")


        var cursorPos = $('#id_content').prop('selectionStart');
        var v = $('#id_content').val();
        var textBefore = v.substring(0,  cursorPos );
        var textAfter  = v.substring( cursorPos, v.length );
        // $('#id_content').val( textBefore+ code.join("\n") +textAfter );
        simplemde.value(textBefore+ code.join("\n") +textAfter);
        $('#insertCode').modal('hide');
    });
});


function insert_code() {
    console.log($('#insertCode').html());
    $('#insertCode').modal('show');
}


function preview() {

    var preview_content = $("#id_content").val();
    $.post("/scode/preview", {
        "preview_content": preview_content
    }, function(data){
        $("#markdown_preview_content").html(data);
        $('pre code').each(function(i, e) {hljs.highlightBlock(e)});
        $('#markdownPreview').modal('show');
    }, "html");


//    var isHide = $("#markdown_preview").hasClass("hide");
//    if (isHide) {
//        var preview_content = $("#id_content").val();
//        $.post("/scode/preview", {
//            "preview_content": preview_content
//        }, function (data) {
//            $("#markdown_preview").html(data);
//            $("#markdown_preview").removeClass("hide");
//            $("#id_content").hide();
//            $("#preview_name").html("미리보기 취소")
//            $('pre code').each(function(i, e) {hljs.highlightBlock(e)});
//        }, "html");
//    } else {
//        $("#markdown_preview").addClass("hide");
//        $("#id_content").show();
//        $("#preview_name").html("미리보기")
//    }

}

function fullscreen() {
    $('#id_content').fullScreen({
        'background': '#111',
        'callback': function (isFullScreen) {
        }
    });
}
