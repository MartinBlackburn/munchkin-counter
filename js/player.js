Player = function() 
{   
	//default values
	this.name = "player";
    this.level = 1;
    this.gear = 0;
    this.isWarrior = false;
    this.isFighting = false;
    
    //get name
	Player.prototype.getName = function()
	{
		return this.name;
	}
    
    //set name
	Player.prototype.setName = function(value)
	{
		this.name = value;
	}
    
    //get level
	Player.prototype.getLevel = function()
	{
		return this.level;
	}
    
    //increase level
	Player.prototype.increaseLevel = function()
	{
		this.level++;
	}
    
    //decrease level
	Player.prototype.decreaseLevel = function()
	{
		this.level--;
	}
    
    //get gear
	Player.prototype.getGear = function()
	{
		return this.gear;
	}
    
    //increase gear
	Player.prototype.increaseGear = function()
	{
		this.gear++;
	}
    
    //decrease gear
	Player.prototype.decreaseGear = function()
	{
		this.gear--;
	}
    
    //get strength
	Player.prototype.getStrength = function()
	{
		return this.gear + this.level;
	}
    
    //is player a warrior
	Player.prototype.getWarrior = function()
	{
		return this.isWarrior;
	}
    
    //set player is a warrior
	Player.prototype.setWarrior = function()
	{
		this.isWarrior = true;
	}
    
    //set player is not a warrior
	Player.prototype.unsetWarrior = function()
	{
		this.isWarrior = false;
	}
    
    //is player fighting
	Player.prototype.getFighting = function()
	{
		return this.isFighting;
	}
    
    //set player is fighting
	Player.prototype.setFighting = function()
	{
		this.isFighting = true;
	}
    
    //set player is not fighting
	Player.prototype.removeFighting = function()
	{
		this.isFighting = false;
	}
    
    //reset player to defaults
	Player.prototype.reset = function()
	{
        this.level = 1;
        this.gear = 0;
        this.isWarrior = false;
        this.isFighting = false;
	}
};