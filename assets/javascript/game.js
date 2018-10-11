var game = {
    state : {
        player : null,
        defender : null
    },
    characters : [{
        name : "Luke Skywalker", 
        defaultHp: 100,  
        hp : 100,
        attack : 5,
        counter : 5,
        div: $("#0"),
        hpText: $("#0hp")
    },{
        name : "Obi-Wan Kenobi",
        defaultHp: 120,  
        hp : 120,
        attack : 8,
        counter : 8,
        div: $("#1"),
        hpText: $("#1hp")
    },{
        name : "Darth Sidious",
        defaultHp: 150,  
        hp : 150,
        attack : 20,
        counter : 20,
        div: $("#2"),
        hpText: $("#2hp")
    },{
        name : "Darth Maul",
        defaultHp: 180,  
        hp : 180,
        attack : 25,
        counter : 25,
        div: $("#3"),
        hpText: $("#3hp")
    }],

    setup(){

        game.state.player = null;
        game.state.defender = null;

        for(let dude in game.characters){
            $("#topRow").append(game.characters[dude].div.css("background-color", "gray"));
            game.characters[dude].attack = game.characters[dude].counter;
            game.characters[dude].hp = game.characters[dude].defaultHp;
            game.characters[dude].hpText.text(game.characters[dude].hp);
            game.characters[dude].div.show();

        }
    },

    setChar(){
        if(game.state.player === null){
            game.state.player = game.characters[this.id];
            console.log("setting player as " + game.characters[this.id].name);
            $("#enemyRow").append($(".character").css("background-color", "red"));
            $("#playerRow").append($(this).css("background-color", "white"));
        }else if(game.state.player != null && game.state.defender === null &&  game.characters[this.id] != game.state.player){
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

            game.state.player.hpText.text(game.state.player.hp);
            game.state.defender.hpText.text(game.state.defender.hp);

            if(game.state.defender.hp <= 0){
                game.state.defender.div.hide();
                game.state.defender = null;
            }
            if(game.state.player.hp <= 0){
                game.setup();
            }
        }

        
    }
}

$(".character").on("click", game.setChar); 
$("#attack").on("click", game.attack);            
$("#reset").on("click", game.setup);
game.setup();