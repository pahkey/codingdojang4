$(document).ready(function () {
    /*
    var info_tab = $.cookie('info_tab');
    if(info_tab) {
        $('#info_tab a[href='+info_tab+']').tab('show');
    }
    $("#info_tab a").click(function() {
        $.cookie('info_tab', $(this).attr("href"));
    });
    */

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

    $(".question_table td").tooltip({"container":'body'});
    $('.question_table td').click(function() {
        var target_url = $(this).attr("question-url");
        if(target_url) {
            location.href = $(this).attr("question-url");
        }
    });


    var plot1 = $.jqplot('pie1', [[
            ['level 1',parseInt($("#level_1").val())],
            ['level 2',parseInt($("#level_2").val())],
            ['level 3',parseInt($("#level_3").val())],
            ['level 4',parseInt($("#level_4").val())],
            ['level 5',parseInt($("#level_5").val())]
        ]], {
//        title:'난이도 별 풀이 현황',
        seriesColors: ["#f0ad4e", "#5cb85c", "#5bc0de", "#428bca", "#d9534f"],
//        gridPadding: {top:0, bottom:38, left:0, right:0},
//        grid: {
//            drawBorder: false,
//            drawGridlines: false,
//            background: '#ffffff',
//            shadow:false
//        },
        seriesDefaults:{
            renderer:$.jqplot.BarRenderer,
            pointLabels:{show:true, stackedValue: true},
            rendererOptions: {
                varyBarColor: true
            }
        },
        axes:{
            xaxis:{
                renderer: $.jqplot.CategoryAxisRenderer
            },
            yaxis:{
                min:0,
                tickInterval:1,
                tickOptions: {
                    formatString: '%d'
                }
            }
        }

    });
});


function handlePaginationClick(new_page_index, pagination_container) {
    var nextpage = new_page_index+1;
    $("#hiddenForm #page").val(nextpage);
    $("#hiddenForm").submit();
    return false;
}