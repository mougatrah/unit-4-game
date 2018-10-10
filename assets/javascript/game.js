var game = {
    state : {
        player : null,
        defender : null
    },
    characters : [{
        name : "Luke Skywalker",
        hp : 100,
        attack : 5,
        counter : 5,
        div: $("#0hp")
    },{
        name : "Obi-Wan Kenobi",
        hp : 120,
        attack : 8,
        counter : 8,
        div: $("#1hp")
    },{
        name : "Darth Sidious",
        hp : 150,
        attack : 20,
        counter : 20,
        div: $("#2hp")
    },{
        name : "Darth Maul",
        hp : 180,
        attack : 25,
        counter : 25,
        div: $("#3hp")
    }],

    setup(){
        for(let dude in this.characters){
            this.characters[dude].div.text(this.characters[dude].hp);
        }
    },

    setChar(){
        if(game.state.player === null){
            game.state.player = game.characters[this.id];
            console.log("setting player as " + game.characters[this.id].name);
            $("#enemyRow").append($(".character").css("background-color", "red"));
            $("#playerRow").append($(this).css("background-color", "white"));
        }else if(game.state.player != null && game.state.defender === null){
            console.log("setting defender as " + game.characters[this.id].name);
            game.state.defender = game.characters[this.id];
            $("#defenderRow").append(this);
        }
    },

    attack(){
        if(game.state.player && game.state.defender){
            console.log("You did " + game.state.player.attack +" damage.");
            console.log(game.state.defender.name + " did " + game.state.defender.counter + " damage to you. ");
            game.state.defender.hp -= game.state.player.attack;
            game.state.player.hp -= game.state.defender.counter;
            game.state.player.attack += game.state.player.counter;

            game.state.player.div.text(game.state.player.hp);
            game.state.defender.div.text(game.state.defender.hp);
        }

        if(game.state.defender.hp <= 0){
            game.state.defender.hp
        }
    }
}

$(".character").on("click", game.setChar); 
$("#attack").on("click", game.attack);            

game.setup();