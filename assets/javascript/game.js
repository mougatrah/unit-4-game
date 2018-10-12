var game = {
    player: null,
    defender: null,

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

        game.player = null;
        game.defender = null;

        for(let dude in game.characters){
            $("#topRow").append(game.characters[dude].div.css("background-color", "gray"));
            game.characters[dude].attack = game.characters[dude].counter;
            game.characters[dude].hp = game.characters[dude].defaultHp;
            game.characters[dude].hpText.text(game.characters[dude].hp);
            game.characters[dude].div.show();

        }
    },

    setChar(){
        if(game.player === null){
            game.player = game.characters[this.id];
            console.log("setting player as " + game.characters[this.id].name);
            $("#enemyRow").append($(".character").css("background-color", "red"));
            $("#playerRow").append($(this).css("background-color", "white"));
        }else if(game.player != null && game.defender === null &&  game.characters[this.id] != game.player){
            console.log("setting defender as " + game.characters[this.id].name);
            game.defender = game.characters[this.id];
            $("#defenderRow").append(this);
        }
    },

    attack(){
        if(game.player && game.defender){
            console.log("You hit " + game.defender + game.player.attack +" damage.");
            game.defender.hp -= game.player.attack;
            if(game.defender.hp <= 0){
                game.defender.div.hide();
                game.defender = null;
            }

            game.player.hp -= game.defender.counter;
            game.player.attack += game.player.counter;

            game.player.hpText.text(game.player.hp);
            game.defender.hpText.text(game.defender.hp);

            
            if(game.player.hp <= 0){
                game.setup();
            }
        }

        
    }
}

$(".character").on("click", game.setChar); 
$("#attack").on("click", game.attack);            
$("#reset").on("click", game.setup);
game.setup();