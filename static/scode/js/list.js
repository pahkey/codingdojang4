$(document).ready(function () {
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
});

function handlePaginationClick(new_page_index, pagination_container) {
    var sort = $("#sort").val();
    var sort_order = $("#sort_order").val();
	var nextpage = new_page_index+1;
    var url = "/list/"+nextpage;
    if (sort) {
        url += "?sort="+sort+"&sort_order="+sort_order;
    }
    location.href = url;
    return false;
}