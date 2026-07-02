$(document).ready(function () {
    $(".recommend-box").click(function() {
        var href = $(this).attr("href");
        var count = parseInt($(this).find(".recommend-box-count").text());
        if(count > 0) {
            location.href = href;
        }
    });

    $("#id_content").focus(function() {
        $.post("/scode/check_login", {
        }, function(data){
            if (!data.is_login) {
                $("#answer_login_msg").show();
                $("#id_content").attr("disabled", "disabled");
            }
        }, "json");
    });

    var total_count = $("#total_count").val();
    var current_page_index = $("#current_page").val()-1;
    $("#pagination").pagination(total_count, {
		callback:handlePaginationClick,
		current_page:current_page_index,
		items_per_page:$("#per_page").val(),
		num_display_entries:5,
		num_edge_entries:1,
		prev_text: "이전",
		next_text: "다음"
	});

    /*
    $("pre code").each(function(i, obj) {
	    var lang = $(obj).prop("class");
        if(lang && lang != 'no-highlight') {
	        var lang_div = '<div class="label label-default">'+lang+'</div>';
	        $(obj).parent().before(lang_div);
	        $(obj).parent().css({"margin-top":"5px"});
	    }
	});
	*/

	$(".langby").bind("click", function() {
	    var langby = $(this).attr("lang");
	    var qid = $(this).attr("qid");
	    location.href = "/scode/"+qid+"?langby="+langby;
	});

});


function handlePaginationClick(new_page_index, pagination_container) {
    var nextpage = new_page_index+1;
    $("#hiddenForm #page").val(nextpage);
    $("#hiddenForm").submit();
    return false;
}


function confirm_delete(q_id) {
    apprise('정말로 삭제하시겠습니까?', {'verify': true}, function (r) {
        if (r) {
            location.href = "/scode/delete/"+q_id;
        }
    });
}


function confirm_comment_delete(c_id) {
    apprise('정말로 삭제하시겠습니까?', {'verify': true}, function (r) {
        if (r) {
            location.href = "/scode/comment/delete/"+c_id;
        }
    });
}

function recommend_code(q_id) {
    var msg = [];
    msg.push('<div class="alert alert-info">');
    msg.push('<p><strong>이 코드를 추천합니다.</strong></p>');
    msg.push('정말로 추천하시겠습니까?</p>');
    msg.push('</div>');
    msg.push('<span class="muted">※ 추천취소는 불가능합니다.</span>');

    apprise(msg.join(''), {'verify':true}, function(r) {
        if(r) {
            location.href = "/scode/recommend/"+q_id;
        }
    });
    return;
}

function recommend_comment(c_id) {
    var msg = [];
    msg.push('<div class="alert alert-info">');
    msg.push('<p><strong>이 댓글을 추천합니다.</strong></p>');
    msg.push('정말로 추천하시겠습니까?</p>');
    msg.push('</div>');
    msg.push('<span class="muted">※ 추천취소는 불가능합니다.</span>');

    apprise(msg.join(''), {'verify':true}, function(r) {
        if(r) {
            location.href = "/scode/recommend/comment/"+c_id;
        }
    });
    return;
}

function answer_comment(_id) {
    $.post("/scode/check_login", {
    }, function(data){
        if (data.is_login) {
            $("#comment_answer_"+_id).show();
            $("#comment_answer_"+_id+" textarea").focus();
        }else {
            $("#comment_answer_login_"+_id).show();
            return;
        }
    }, "json");
}

function question_comment(_id) {
    $.post("/scode/check_login", {
    }, function(data){
        if (data.is_login) {
            $("#comment_question_"+_id).show();
            $("#comment_question_"+_id+" textarea").focus();
        }else {
            $("#comment_question_login_"+_id).show();
            return;
        }
    }, "json");
}
