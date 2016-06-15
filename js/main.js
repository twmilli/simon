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
}

GameManager.prototype.start = function(){
  this.startLevel();
}

GameManager.prototype.getPlayerTurn = function(){
  return this.playerTurn;
}

GameManager.prototype.startLevel = function(){
  disableAll();
  this.playerTurn = false;
  this.level+=1;
  this.playerIndex = 0;
  addOne(this.pattern);
  this.playPattern();
  if (this.level > 20){
    onWin(this);
  }
}

GameManager.prototype.reset = function(){
  this.level=0;
  this.playerIndex = 0;
  this.playerTurn = false;
  this.pattern = [];
  var game = this;
  setTimeout(function(game){
    game.updateFromModel();
  }, 500, game);
}

GameManager.prototype.checkInput = function(btn_index){
  var actual = this.pattern[this.playerIndex];
  if (actual != btn_index){
    this.playerTurn = false;
    if (this.strict){
      onLoss(this);
    }
    else{
      this.playPattern();
      this.playerIndex = 0;
      this.updateFromModel();
    }
    $("#count").text("!!!");
  }
  else{
    this.playerIndex+=1;
    $("#count").text($("#count").text() - 1);
    if (this.playerIndex == this.level){
      this.startLevel();
    }
  }
}

GameManager.prototype.updateFromModel = function(){
  $("#count").text(this.level);
  $("#score").text("Score: " + this.level);
  var high = $("#high").text();
  if (this.level > high){
    $("#high").text(this.level);
  }
}

GameManager.prototype.setStrict = function(val){
  this.strict = val;
}

GameManager.prototype.playPattern = function(){
  var delay = 1000;
  var game = this;
  for (var i=0; i < this.pattern.length; i++){
    var btn_index = this.pattern[i];
    var id = buttons[btn_index];
  (function(currId){
    setTimeout(function(){
      clickButton(currId);
    }, delay);
  })(id);
    delay += 1000;
    if (i==this.pattern.length-1){
      setTimeout(function(){
        game.playerTurn = true;
        game.updateFromModel();
        enableAll();
      }, delay);
    }
  }
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

function onWin(game){
  $(".modal-title").text("You Won!  Would you like to play again?");
  $("#replayModal").modal("show");
  $("#Yes").click(function(){
    game.reset();
    game.start();
  });
}

function onLoss(game){
  $(".modal-title").text("You Lost!  Would you like to play again?");
  $("#replayModal").modal("show");
  $("#Yes").click(function(){
    game.reset();
    game.start();
  });
}
