
game.EnemyCreep = me.Entity.extend({
    init: function(x, y, settings) {
        this._super(me.Entity, 'init', [x, y, {
                image: "creep1",
                width: 32,
                height: 64,
                spritewidth: "32",
                spriteheight: "64",
                getShape: function() {
                    return(new me.Rect(0, 0, 32, 64)).toPolygon();
                }
            }]);
        this.health = game.data.enemyCreepHealth;
        this.alwaysUpdate = true;
        //this.attacking determines whether the enemy is currently attacking or not
        this.attacking = false;
        //keeps track of creeps last attack
        this.lastAttacking = new Date().getTime();

        //keeps track of the last time our creep hit anything
        this.lastHit = new Date().getTime();
        this.creepjump = 1;
        this.now = new Date().getTime();
        this.body.setVelocity(3, 20);

        this.type = "EnemyCreep";

        this.renderable.addAnimation("walk", [3, 4, 5], 80);
        this.renderable.setCurrentAnimation("walk");
    },
    loseHealth: function(damage) {
        this.health = this.health - damage;
    },
    update: function(delta) {
        if (this.health <= 0) {
            me.game.world.removeChild(this);
        }

        this.now = new Date().getTime();

        if (this.body.vel.x - this.body.accel.x === -3 && this.creepjump === 1) {
            this.body.vel.y = -this.body.maxVel.y * me.timer.tick;
        }

        this.body.vel.x -= this.body.accel.x * me.timer.tick;

        me.collision.check(this, true, this.collideHandler.bind(this), true);

        this.body.update(delta);


        this._super(me.Entity, "update", [delta]);

        return true;
    },
    collideHandler: function(response) {
        if (response.b.type === 'PlayerBase') {
            this.attacking = true;
            //this.lastAttacking=this.now
            this.body.vel.x = 0;
            this.creepjump=2;
            //keeps moving the creep to the right to maintain its position
            this.pos.x = this.pos.x + 1;
            //checks that it has been at least 1 second since this creep hit a base
            if ((this.now - this.lastHit >= 1000)) {
                //updates last hit timer
                this.lastHit = this.now;
                //makes the player call its losehealth function and passes it
                //damage of 1
                response.b.loseHealth(game.data.enemyCreepAttack);
            }
        } else if (response.b.type === 'PlayerEntity') {
            var xdif = this.pos.x - response.b.pos.x;
            
            this.creepjump=2;
            
            this.attacking = true;
            //this.lastAttacking=this.now;


            if (xdif > 0) {
                this.pos.x = this.pos.x + 1;
                
                this.body.vel.x = 0;
                //keeps moving the creeo to the right to maintain its position
            }
            this.pos.x = this.pos.x + 1;
            //checks that it has been at least 1 second since this creep hit a base
            if ((this.now - this.lastHit >= 1000) && xdif > 0) {
                //updates last hit timer
                this.lastHit = this.now;
                //makes the player call its losehealth function and passes it
                //damage of 1
                response.b.loseHealth(game.data.enemyCreepAttack);
            } else if (response.b.type === 'EnemyCreep') {
                if (response.b.type === 'PlayerEntity') {
                    this.creepjump = 1;
                }
            }
            else {
                this.creepjump = 1;
            }
        }
    }

});