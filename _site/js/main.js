$(document).ready(function() {
    $("#switch").change(function() {
        if ($(this).is(":checked")) {
            $("#count").css("color", "#b31d1d");
            console.log("enable");
            enableAll();
        } else {
            $("#count").css("color", "#490e0e");
            disableAll();
        }
    });
});

function onButtonClick(btn){
    btn.children[0].play();
}


function enableAll(){
  $(".game").children("button").removeAttr("disabled");
}

function disableAll(){
  $(".game").children("button").attr("disabled", "disabled");
}
