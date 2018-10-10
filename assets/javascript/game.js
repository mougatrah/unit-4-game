var game = {
    state : {
        player : null,
        defender : null
    },
    characters : [{
        name : "Luke Skywalker",
        hp : 100,
        attack : 5,
        counter : 5
    },{
        name : "Obi-Wan Kenobi",
        hp : 120,
        attack : 8,
        counter : 8
    },{
        name : "Darth Sidious",
        hp : 150,
        attack : 20,
        counter : 20
    },{
        name : "Darth Maul",
        hp : 180,
        attack : 25,
        counter : 25
    }],
 
    setPlayer(id){
        console.log("setting player as " + id.name);
      
    },
    setDefender(){
        console.log("setting defender");
        this.state.defender = this.characters[this.id];
    },

    attack(){
        if(this.state.player && this.state.defender){
            console.log("You did " + this.state.player.attack.toString() +" damage.");
            console.log(this.state.defender.name + " did " + this.state.defender.counter.toString() + " damage to you.");
            this.state.defender.hp -= this.state.player.attack;
            this.state.player.hp -= this.state.defender.counter;
            this.state.player.attack += this.state.player.counter;
        }
    }
}

$(".character").on("click", {name: "yekl"} ,game.setPlayer);


