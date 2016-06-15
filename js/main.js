var buttons=[("green-btn"),("red-btn"), ("yellow-btn"), ("blue-btn")];
$(document).ready(function() {
    var gameManager = new GameManager();
    $("#switch").change(function() {
        if ($(this).is(":checked")) {
            $("#count").css("color", "#b31d1d");
            enableAll();
        } else {
            $("#count").css("color", "#490e0e");
            disableAll();
            gameManager.reset();
        }
    });

    $("#strict").change(function(){
      if ($(this).is(":checked")) {
        gameManager.setStrict(true);
      } else {
        gameManager.setStrict(false);
      }

    });

    $(".game").children("button").click(function(){
      $(this).children("audio")[0].play();
      if (gameManager.getPlayerTurn()){
        var btn_index = buttons.indexOf($(this).attr('id'));
        gameManager.checkInput(btn_index);
      }
    });
    $("#start").on("click", function(){
      gameManager.start();
    });
});

function GameManager(){
  this.level=0;
  this.playerIndex = 0;
  this.playerTurn = false;
  this.strict = false;
  this.pattern = [];
  this.game;
}

GameManager.prototype.start = function(){
  this.startLevel();
  enableAll();
}

GameManager.prototype.getPlayerTurn = function(){
  return this.playerTurn;
}


GameManager.prototype.startLevel = function(){
  this.playerTurn = false;
  this.level+=1;
  this.playerIndex = 0;
  addOne(this.pattern);
  this.playPattern();
  $("#count").text(this.level);
}

GameManager.prototype.reset = function(){
  this.level=1;
  this.playerIndex = 0;
  this.playerTurn = false;
  this.strict = false;
  this.pattern = [];
  this.game = null;
}

GameManager.prototype.checkInput = function(btn_index){
  var actual = this.pattern[this.playerIndex];
  console.log("actual: " + actual)
  console.log("player: " + btn_index);
  if (actual != btn_index){
    this.playerTurn = false;
    if (this.strict){
      this.reset();
    }
    else{
      this.playPattern();
    }
    $("#count").text("!!!");
  }
  else{
    this.playerIndex+=1;
    if (this.playerIndex == this.level){
      this.startLevel();
    }
  }
}

GameManager.prototype.updateFromModel = function(){
  $("#count").text(this.level);
}

GameManager.prototype.setStrict = function(val){
  this.strict = val;
}

GameManager.prototype.playPattern = function(){
  for (var i=0; i < this.pattern.length; i++){
    var btn_index = this.pattern[i];
    var id = buttons[btn_index];
    clickButton(id);
  }
  this.playerTurn = true;
}


function addOne(pattern){
  var btn_index =  Math.floor(Math.random()*4);
  pattern.push(btn_index);
}

function clickButton(id){
  var btn = $("#" + id);
  btn.addClass("active");
  btn.trigger("click");
  setTimeout(function(){
    btn.removeClass("active");
  }, 300);

}

function enableAll(){
  $(".game").children("button").removeAttr("disabled");
  $(".start").removeAttr("disabled");
}

function disableAll(){
  $(".game").children("button").attr("disabled", "disabled");
  $(".start").attr("disabled", "disabled");
}
