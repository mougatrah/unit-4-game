var game = {
    player: null,
    defender: null,
    over: false,

    characters: [{
        name: "Luke Skywalker",
        defaultHp: 100,
        hp: 100,
        attack: 10,
        counter: 10,
        div: $("#0"),
        hpText: $("#0hp")
    }, {
        name: "Obi-Wan Kenobi",
        defaultHp: 120,
        hp: 120,
        attack: 15,
        counter: 15,
        div: $("#1"),
        hpText: $("#1hp")
    }, {
        name: "Darth Maul",
        defaultHp: 150,
        hp: 150,
        attack: 20,
        counter: 20,
        div: $("#2"),
        hpText: $("#2hp")
    }, {
        name: "Darth Sidious",
        defaultHp: 180,
        hp: 180,
        attack: 25,
        counter: 25,
        div: $("#3"),
        hpText: $("#3hp")
    }],

    setup() {

        game.player = null;
        game.defender = null;
        $("#status").text("Pick a character");
        for (let dude in game.characters) {
            $("#topRow").append(game.characters[dude].div.css("background-color", "gray").css("color", "black"));
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
            $("#playerRow").append($(this).css("background-color", "white"));
        } else if (game.player != null && game.defender === null && game.characters[this.id] != game.player) {
            $("#status").text("setting defender as " + game.characters[this.id].name);
            game.defender = game.characters[this.id];
            $("#defenderRow").append($(this).css("background-color", "black").css("color", "white"));
        }
    },

    attack() {
        if (game.player && game.defender && !game.over) {
            $("#status").text("You hit " + game.defender.name + " for " + game.player.attack + " damage. " + game.defender.name + " hit you for " + game.defender.counter + " damage.");
            game.defender.hp -= game.player.attack;
            if (game.defender.hp <= 0) {
                game.defender.div.hide();
                game.defender = null;
            }

            if (game.defender) {
                game.player.hp -= game.defender.counter;
                game.player.attack += game.player.counter;

                game.player.hpText.text(game.player.hp);
                game.defender.hpText.text(game.defender.hp);


                if (game.player.hp <= 0) {
                    game.over = true;
                    $("#status").text("You DIED.");
                }
            }
        }


    }
}

$(".character").on("click", game.setChar);
$("#attack").on("click", game.attack);
$("#reset").on("click", game.setup);
game.setup();