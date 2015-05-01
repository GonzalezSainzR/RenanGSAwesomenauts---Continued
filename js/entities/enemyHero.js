game.EnemyHero = me.Entity.extend({
    init: function(x, y, settings) {
        this._super(me.Entity, 'init', [x, y, {
                image: "orcSpear",
                width: 64,
                height: 64,
                spritewidth: "64",
                spriteheight: "64",
                getShape: function() {
                    return (new me.Rect(0, 0, 32, 64)).toPolygon();
                }
            }]);
        this.health = game.data.enemyCreepHealth * 2;
        this.alwaysUpdate = true;
        this.now = new Date().getTime();
        this.attacking = false;
        this.lastAttacking = new Date().getTime();
        this.lastHit = new Date().getTime();
        this.body.setVelocity(game.data.enemyHeroMoveSpeed, 20);
        this.type = "EnemyHero";
        this.dead = false;
        this.creepjump = 1;

        this.renderable.addAnimation("walk", [118, 119, 120, 121, 122, 123, 124, 125], 80);

        this.renderable.setCurrentAnimation("walk");

    },
    update: function(delta) {
        if (this.health <= 0) {
            me.game.world.removeChild(this);
            this.dead = true;
        }
        this.now = new Date().getTime();

        if (this.body.vel.x === 0 && this.creepjump === 1) {
            this.body.vel.y = -this.body.maxVel.y * me.timer.tick;
        }

        this.body.vel.x -= this.body.accel.x * me.timer.tick;

        me.collision.check(this, true, this.collideHandler.bind(this), true);

        this.body.update(delta);
        this._super(me.Entity, "update", [delta]);
        return true;
    },
    loseHealth: function(damage) {
        this.health = this.health - damage;
    },
    collideHandler: function(response) {
        if (response.b.type === 'PlayerBase') {
            this.creepjump = 2;
            this.attacking = true;
            this.lastAttacking = this.now;
            this.body.vel.x = 0;
            this.pos.x = this.pos.x + 1;
            if ((this.now - this.lastHit >= game.data.creepAttackTimer)) {
                this.lastHit = this.now;
                response.b.loseHealth(game.data.enemyCreepAttack + 1);
            }
        }
        else if (response.b.type === 'PlayerEntity') {
            var xdif = this.pos.x - response.b.pos.x;
            this.creepjump = 2;
            this.attacking = true;
            this.lastAttacking = this.now;

            if (xdif > 0) {
                this.body.vel.x = 0;
                this.pos.x = this.pos.x + 1;

            }

            if ((this.now - this.lastHit >= game.data.enemycreepAttackTimer) && xdif > 0) {
                this.lastHit = this.now;
                response.b.loseHealth(game.data.enemyCreepAttack + 1);
            }
        }

        else if (response.b.type === 'EnemyCreep') {
            if (response.b.type === 'PlayerEntity') {
                this.creepjump = 1;
            }
        }
        else {
            this.creepjump = 1;
        }
    }
});