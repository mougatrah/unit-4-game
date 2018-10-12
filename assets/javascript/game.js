var game = {
    player: null,
    defender: null,
    over: false,
    wins: 0,

    characters: [{
        name: "Luke Skywalker",
        defaultHp: 110,
        hp: 100,
        attack: 8,
        counter: 8,
        div: $("#0"),
        hpText: $("#0hp")
    }, {
        name: "Obi-Wan Kenobi",
        defaultHp: 120,
        hp: 120,
        attack: 10,
        counter: 10,
        div: $("#1"),
        hpText: $("#1hp")
    }, {
        name: "Darth Maul",
        defaultHp: 150,
        hp: 150,
        attack: 12,
        counter: 12,
        div: $("#2"),
        hpText: $("#2hp")
    }, {
        name: "Darth Sidious",
        defaultHp: 180,
        hp: 180,
        attack: 15,
        counter: 15,
        div: $("#3"),
        hpText: $("#3hp")
    }],

    setup() {

        game.player = null;
        game.defender = null;
        game.over = false;
        game.wins = 0;
        $("#reset").hide();
        $("#status").text("Pick a character");
        for (let dude in game.characters) {
            $("#topRow").append(game.characters[dude].div.css("background-color", "gray").css("color", "black").css("border", "solid black"));
            game.characters[dude].attack = game.characters[dude].counter;
            game.characters[dude].hp = game.characters[dude].defaultHp;
            game.characters[dude].hpText.text(game.characters[dude].hp);
            game.characters[dude].div.show();

        }
    },

    setChar() {
        if (game.player === null) {
            game.player = game.characters[this.id];
            $("#status").text("setting player as " + game.characters[this.id].name +". Pick an enemy.");
            $("#enemyRow").append($(".character").css("background-color", "red"));
            $("#playerRow").append($(this).css("background-color", "white").css("border", "solid green"));
        } else if (game.player != null && game.defender === null && game.characters[this.id] != game.player) {
            $("#status").text("setting defender as " + game.characters[this.id].name);
            game.defender = game.characters[this.id];
            $("#defenderRow").append($(this).css("background-color", "black").css("color", "white").css("border", "solid green"));
        }
    },

    attack() {
        if (game.player && game.defender && !game.over) {
            $("#status").text("You hit " + game.defender.name + " for " + game.player.attack + " damage. " + game.defender.name + " hit you for " + game.defender.counter + " damage.");
            game.defender.hp -= game.player.attack;
            if (game.defender.hp <= 0) {
                
                $("#status").text(game.defender.name + " has died. Pick a new enemy.");
                game.wins++;
                game.defender.div.hide();
                game.defender = null;
                if(game.wins === 3){
                    game.over = true;
                    $("#reset").show();
                    $("#status").text("You WON! Click Reset to play again.");
                }
            }

            if (game.defender) {
                game.player.hp -= game.defender.counter;
                game.player.attack += game.player.counter;

                game.player.hpText.text(game.player.hp);
                game.defender.hpText.text(game.defender.hp);


                if (game.player.hp <= 0) {
                    game.over = true;
                    $("#reset").show();
                    $("#status").text("You DIED. Click Reset to play again.");
                }
            }
        }else if(!game.over){
            $("#status").text("No enemy here.")
        }


    }
}

$(".character").on("click", game.setChar);
$("#attack").on("click", game.attack);
$("#reset").on("click", game.setup);
game.setup();