game.GameTimerManager = Object.extend({
    init: function(x, y, settings) {
        this.now = new Date().getTime();
        this.lastCreep = new Date().getTime();
        this.alwaysUpdate = true;
    },
    update: function() {
        this.now = new Date().getTime();
        this.goldTimerCheck();
        this.creepTimerCheck();

        return true;
    },
    goldTimerCheck: function() {
        if (Math.round(this.now / 1000) %20 === 0 && (this.now - this.lastCreep >= 1000)) {
            game.data.gold += (game.data.exp1+1);
        }

    },
    creepTimerCheck: function() {


        if (Math.round(this.now / 1000) % 10 === 0 && (this.now - this.lastCreep >= 1000)) {
            this.lastCreep = this.now;
            var creepe = me.pool.pull("EnemyCreep", 2700, 0, {});
            me.game.world.addChild(creepe, 10);
        }
        
        if (Math.round(this.now / 1000) % 10 === 0 && (this.now - this.lastCreep >= 1000)) {
            this.lastCreep = this.now;
            var creepe = me.pool.pull("FriendlyCreep", 1000, 0, {});
            me.game.world.addChild(creepe, 10);
        }
        
        if (Math.round(this.now / 1000) % 10 === 0 && (this.now - this.lastCreep >= 1000)) {
            this.lastCreep = this.now;
            var creepe = me.pool.pull("EnemyHero", 2700, 0, {});
            me.game.world.addChild(creepe, 10);
        }
    }
});