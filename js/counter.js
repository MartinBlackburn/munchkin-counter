MunchkinCounter = function() 
{   
	//variables
	var playerBoard = $('.players .player').first().clone();
    
	var players = new Array();    
    for (var i=0; i<8; i++)
	{   
    	players.push(new Player());
    }
    
    var monster = 0;
    var playerModifier = 0;
    var numPlayers = parseInt($(".numPlayers").first().val());
    var winningLevel = parseInt($(".winningLevel").first().val());
    
    
    //stop a person leaving the page by mistake
    $(window).bind('beforeunload', function() {
    	return "Are you sure you dont want to have another game?";
    });
    
	//number of players changed
    $(".numPlayers").on("change", function(event) 
    {	 
        //update number of players
        numPlayers = parseInt($(this).val());
        
        //add player boards
        addPlayerBoards();
        
        //setup all buttons
        setupButtons();
        
        //reset game
        reset();
    });
    
    //simulate change on number of players to start
    $(".numPlayers").trigger('change');
    
    
    //setup all buttons
    function setupButtons()  
    {
    	//clear all handelers
        $(".button, .name, .selectPlayer li, .warrior").unbind();
        
        //reset button
        $(".button.reset").click(function()
        {
        	reset();
        });
        
        //increase buttons
        $(".button.increase").click(function()
        {            
            //increase level
            if($(this).hasClass("level"))
            {
            	var player = $(this).closest(".player").index();
                
                players[player].increaseLevel();
            }
            
            //increase gear
            if($(this).hasClass("gear"))
            {
            	var player = $(this).closest(".player").index();
                
                players[player].increaseGear();
            }
            
            //increase player modifier
            if($(this).hasClass("playerModifier"))
            {
            	playerModifier++;
            }
            
            //increase monster level
            if($(this).hasClass("monster"))
            {
            	monster++;
            }
            
            //update fight board
            updateFightBoard();
            
            //update player boards
            updatePlayerBoards();
        });
        
        //decrease buttons
        $(".button.decrease").click(function()
        {            
            //decrease level
            if($(this).hasClass("level"))
            {
            	var player = $(this).closest(".player").index();
                
                players[player].decreaseLevel();
            }
            
            //decrease gear
            if($(this).hasClass("gear"))
            {
            	var player = $(this).closest(".player").index();
                
                players[player].decreaseGear();
            }
            
            //decrease player modifier
            if($(this).hasClass("playerModifier"))
            {
            	playerModifier--;
            }
            
            //decrease monster level
            if($(this).hasClass("monster"))
            {
            	monster--;
            }
            
            //update fight board
            updateFightBoard();
            
            //update player boards
            updatePlayerBoards();
        });
        
        
        //change player names in select player dropdown
        $(".name").keyup(function()
        {       
       		//update each players name
        	$(".name").each(function(index) 
            {    
            	var name = $(this).val();
                
                if(!name)
                {
                	name = "player";
                }
                
                //add players name to fight list
                $(".selectPlayer li").eq(index).text(name);
                
                //store players name
                players[index].setName(name);
            });
        });
        
        //update winning level, if its changed
        $(".winningLevel").keyup(function()
        {       
       		winningLevel = parseInt($(".winningLevel").first().val());
            
            //update player boards
            updatePlayerBoards();
        });
        
        
        //setup player select on fight box
        $(".selectPlayer li").on("click", function()
        {	
            var player = $(this).index();
            
            if($(this).hasClass("selected"))
            {
            	//unselect player
                $(this).removeClass("selected");
                $(".players .player").eq(player).removeClass("selected");
                players[player].removeFighting();
            }
            else if($(".players .player.selected").length < 2)
            {
            	//select player, if less than 2 already selected
                $(this).addClass("selected");
                $(".players .player").eq(player).addClass("selected");
                players[player].setFighting();
            } 
            
            //update fight board
            updateFightBoard();
        });
        
        //setup player select on fight box
        $(".warrior").on("click", function()
        {
        	var player = $(this).closest(".player").index();
            
        	if($(this).hasClass("isWarrior"))
            {
                //update text
                $(this).removeClass("isWarrior");
                $(this).text("Not a warrior");
                
                //unset as warrior
                players[player].unsetWarrior();
            }
            else
            {
            	//update text
                $(this).addClass("isWarrior");
                $(this).text("Is a warrior");
                
                //set as warrior
                players[player].setWarrior();
            }
            
            //update fight board
            updateFightBoard();
        });
    }
    
    
    //reset game, dont reset number of players or their names
    function reset() 
    {
    	//reset players
        for (var i=0; i < players.length; i++)
        {
            players[i].reset();
        }
        
        //remove winning class
        $(".player").each(function() 
        {
            $(this).removeClass("hasWon");
        });
        
        //remove selected players
        $(".selected").each(function() 
        {
            $(this).removeClass("selected");
        });
        
        //update player boards
        updatePlayerBoards();
    }
    
    
    //add player boards
    function addPlayerBoards()
    {
    	//remove all player boards 
        $('.players .player').remove();
        
        //added correct number of player boards
        for (var i=0; i < numPlayers; i++)
        {
            playerBoard.clone().appendTo('.players');
        }
        
        //add players to select box
        $('.selectPlayer li').remove();
        
        $(".player").each(function() 
        {
            var name = $(this).find(".name").val();
            
            if(!name)
            {
                name = "player";
            }
            
            $("<li>" + name + "</li>").appendTo('.selectPlayer');
        });
    }
    
    
    //update player boards
    function updatePlayerBoards() 
    {
    	$(".players .player").each(function(index) 
        {    
        	//display level
            $(this).find(".left .value").text(players[index].getLevel());
            
            //check if player has won or not
            if(players[index].getLevel() >= winningLevel)
            {
            	$(this).addClass("hasWon");
            } else {
            	$(this).removeClass("hasWon");
            }
            
            //display gear
            $(this).find(".right .value").text(players[index].getGear());
            
            //display name
            $(this).find(".name").val(players[index].getName());
            
            //display strength
            $(this).find(".strength .value").text(players[index].getStrength());
        });
    }
    
    
    //update fight board
    function updateFightBoard() 
    {
    	//calculate score of fighting player(s)
        var playerScore = 0;
        var warriors = false;
        
    	for (var i=0; i < players.length; i++)
        {            
            if(players[i].getFighting())
            {
            	playerScore += players[i].getStrength();
                
                if(warriors == false)
                {
                	warriors = players[i].getWarrior();
                }
            }
        }
        
        playerScore += playerModifier;
        
        //displayer scores
        $(".fight .left .value").text(playerScore);        
        $(".fight .right .value").text(monster);
        
        //display whos winning
        if(playerScore > monster)
        {
        	$(".fight .winner .value").text("Player");
        } else if(playerScore == monster && warriors) {
        	$(".fight .winner .value").text("Player");
        } else {
        	$(".fight .winner .value").text("Monster");
        }
    }
};

$(function()
{
    var munchkinCounter = new MunchkinCounter();
});