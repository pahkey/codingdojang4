$(document).ready(function () {
    $('#profile_image').Jcrop({
        aspectRatio: 1/1,
        setSelect:   [0, 0, 350, 350],
        onSelect: showCoords,
        onChange: showCoords
    });
});

function showCoords(c) {
    $("#x1").val(c.x);
    $("#y1").val(c.y);
    $("#x2").val(c.x2);
    $("#y2").val(c.y2);
}