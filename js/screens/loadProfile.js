//this file controls how the game loads in your user profile
game.LoadProfile = me.ScreenObject.extend({
    /**	
     *  action to perform on state change
     */
    onResetEvent: function() {
        me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage("load-screen")), -10); // TODO
        document.getElementById("input").style.visibility = "visible";
        document.getElementById("load").style.visibility = "visible";



//This makes the ability keys unusable while your in the Buy items screen, as theres no need for them when
//you're not playing
        me.input.unbindKey(me.input.KEY.B);
        me.input.unbindKey(me.input.KEY.Q);
        me.input.unbindKey(me.input.KEY.E);
        me.input.unbindKey(me.input.KEY.X);
        me.input.unbindKey(me.input.KEY.A);

        me.game.world.addChild(new (me.Renderable.extend({
            init: function() {
                this._super(me.Renderable, 'init', [10, 10, 300, 50]);
                this.font = new me.Font("Arial", 26, "white");
            },
            //this function puts down the text you see on screen
            draw: function(renderer) {
                //this.font.draw(renderer.getContext(), "", 430, 130);
                this.font.draw(renderer.getContext(), "Enter your username and password", this.pos.x, this.pos.y);

            },
        })));

    },
    /*	
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
        document.getElementById("input").style.visibility = "hidden";
        document.getElementById("load").style.visibility = "hidden";
    }



});
