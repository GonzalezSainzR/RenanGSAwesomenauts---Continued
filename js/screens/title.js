game.TitleScreen = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
        //this function puts down the text you see on screen and makes it clickable
	onResetEvent: function() {	
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage("title-screen")), -10); // TODO
                
                
                me.game.world.addChild(new(me.Renderable.extend({
                   init: function() {
                       this._super(me.Renderable, 'init', [470, 370, 300, 50]);
                       this.font = new me.Font("Arial", 46, "white");
                       me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(this), true);
                   },
                   draw: function(renderer) {
                       //this.font.draw(renderer.getContext(), "", 430, 130);
                       this.font.draw(renderer.getContext(), "START A NEW GAME", this.pos.x, this.pos.y)
                       
                   },
                   update: function(dt) {
                       return true;
                   },
                   newGame: function() {
                       me.input.releasePointerEvent('pointerdown', this);
                       me.save.remove('exp');
                       me.save.remove('exp1');
                       me.save.remove('exp2');
                       me.save.remove('exp3');
                       me.save.remove('exp4');
                       me.save.add({exp: 0,exp1: 0,exp2: 0,exp3: 0, exp4: 0});
                       me.state.change(me.state.NEW);
                   }
                   
                })));
            //this function puts down the text you see on screen and makes it clickable
            me.game.world.addChild(new(me.Renderable.extend({
                   init: function() {
                       this._super(me.Renderable, 'init', [590, 490, 250, 50]);
                       this.font = new me.Font("Arial", 46, "white");
                       me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(this), true);
                   },
                   draw: function(renderer) {
                       //this.font.draw(renderer.getContext(), "", 430, 130);
                       this.font.draw(renderer.getContext(), "Continue", this.pos.x, this.pos.y)
                       
                   },
                   update: function(dt) {
                       return true;
                   },
                   //starts a new game when New Game is pressed
                   newGame: function() {
                        me.input.releasePointerEvent('pointerdown', game.data.option1);
                       me.input.releasePointerEvent('pointerdown', this);
                       me.state.change(me.state.LOAD);
                                }
                   
                })));
            },
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
           
	}
        
        
        
});
