game.PlayerEntity = me.Entity.extend({
    init: function(x, y, settings) {
        this.setSuper(x, y);
        this.setPlayerTimers();
        this.setAttributes();
        this.type = "PlayerEntity";
        this.setFlags();
        this.addAnimation();
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
    },
    setSuper: function(x, y) {
        this._super(me.Entity, 'init', [x, y, {
                image: "player",
                width: 64,
                height: 64,
                spritewidth: "64",
                spriteheight: "64",
                getShape: function() {
                    return(new me.Rect(0, 0, 64, 64)).toPolygon();
                }
            }]);
    },
    setPlayerTimers: function() {
        this.now = new Date().getTime();
        this.lastSpear = this.now;
        this.lastHit = this.now;
        this.lastAttack = new Date().getTime();
    },
    setAttributes: function() {
        this.health = game.data.playerHealth;
        this.body.setVelocity(game.data.playerMoveSpeed, 20);
        this.attack = game.data.playerAttack;
    },
    setFlags: function() {
        //keeps track of which direction my character is going
        this.facing = "right";
        this.dead = false;
        this.attacking = false;
    },
    addAnimation: function() {
        this.renderable.addAnimation("idle", [78]);
        this.renderable.addAnimation("walk", [118, 119, 120, 121, 122, 123, 124, 125], 80);
        this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);
        this.renderable.addAnimation("dance", [221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 256, 257, 258, 259, 260, 261, 262, 263, 264, 265, 264, 263, 262, 261, 260, 260, 261, 262, 263, 264, 265, 264, 263, 262, 261, 260], 80);
        this.renderable.setCurrentAnimation("idle");
    },
    update: function(delta) {

        this.now = new Date().getTime();

        this.dead = this.checkIfDead();

        this.checkKeyPressesAndMove();
        
        this.checkAbilityKeys();

        this.setAnimation();

        this.animationVelocity();




        me.collision.check(this, true, this.collideHandler.bind(this), true);
        this.body.update(delta);
        this._super(me.Entity, "update", [delta]);
        return true;
    },
    checkIfDead: function() {
        if (this.health <= 0) {
            this.dead = true;
        }
    },
    checkKeyPressesAndMove: function() {
        if (me.input.isKeyPressed("right")) {
            this.moveRight();
        } else if (me.input.isKeyPressed("left")) {
            this.moveLeft();
        }
        else {
            this.body.vel.x = 0;
        }

        if (me.input.isKeyPressed("jump") && !this.body.jumping && !this.body.falling) {
            this.jump();
        }
//        if (me.input.isKeyPressed("dance")) {
//            this.body.vel.x = 0;
//            this.dance();
//        }
        this.attacking = me.input.isKeyPressed("attack");

    },
    moveRight: function() {
        //sets the position of my X by adding the velocity defined above in
        //setVelocity and multiplying it by me.timer.tick
        //me.timer.tick makes the movement look smooth
        this.body.vel.x += this.body.accel.x * me.timer.tick;
        this.facing = "right";
        this.flipX(true);
    },
    moveLeft: function() {
        this.facing = "left";
        this.flipX(false);
        this.body.vel.x -= this.body.accel.x * me.timer.tick;
    },
    jump: function() {
        this.body.jumping = true;
        this.body.vel.y -= this.body.accel.y * me.timer.tick;
        me.audio.playTrack("jump");
    },
    
    checkAbilityKeys: function(){
        if(me.input.isKeyPressed("skill1")){
            //this.speedBurst();
        }else if(me.input.isKeyPressed("skill2")){
            //this.
        }else if(me.input.isKeyPressed("skill3")){
            this.throwSpear();
        }
    },
    
    throwSpear: function() {
        if ((this.now-this.lastSpear) >= game.data.spearTimer*1000 && game.data.ability3 > 0) {
            this.lastSpear = this.now;
            var spear = me.pool.pull("spear", this.pos.x, this.pos.y, {}, this.facing);
            me.game.world.addChild(spear, 10);
        }
    },
    
    setAnimation: function() {
        if (this.attacking) {
            if (!this.renderable.isCurrentAnimation("attack")) {
//sets current animation to attack then return to idle
                this.renderable.setCurrentAnimation("attack", "idle");
                //makes it that so the next time we start a sequence we begin
                //from the first animation, not wherever we left off when we
                //switched to another animation 
                this.renderable.setAnimationFrame();
            }
        }

        else if (this.body.vel.x !== 0 && !this.renderable.isCurrentAnimation("attack")) {
            if (!this.renderable.isCurrentAnimation("walk")) {
                this.renderable.setCurrentAnimation("walk");
            }
        } else if (!this.renderable.isCurrentAnimation("attack")) {
            this.renderable.setCurrentAnimation("idle");
        }
//        else if (!this.renderable.isCurrentAnimation("dance")) {
//            this.renderable.setCurrentAnimation("dance, idle");
//            this.renderable.setAnimationFrame;
//        }


    },
    loseHealth: function(damage) {
        this.health = this.health - damage;
    },
    collideHandler: function(response) {
        if (response.b.type === 'EnemyBaseEntity') {
            this.collideWithEnemyBase(response);
        } else if (response.b.type === 'EnemyCreep') {
            this.collideWithEnemyCreep(response);
        }
    },
    collideWithEnemyBase: function(response) {
        var ydif = this.pos.y - response.b.pos.y;
        var xdif = this.pos.x - response.b.pos.x;
        console.log("xdif " + xdif + "ydif" + ydif);
        if (ydif < -40 && xdif < 70 && xdif > -35) {
            this.body.falling = false;
            this.body.vel.y = -1;
        }
        else if (xdif > -35 && this.facing === 'right' && (xdif < 0)) {
            this.body.vel.x = 0;
            this.pos.x = this.pos.x - 1;
        } else if (xdif < 60 && this.facing === 'left' && xdif > 0) {
            this.body.vel.x = 0;
            this.pos.x = this.pos.x + 1;
        }

        if (this.renderable.isCurrentAnimation("attack") && this.now - this.lastHit >= game.data.playerAttackTimer) {
            this.lastHit = this.now;
            response.b.loseHealth(game.data.playerAttack);
        }
    },
    collideWithEnemyCreep: function(response) {

        var xdif = this.pos.x - response.b.pos.x;
        var ydif = this.pos.y - response.b.pos.y;

        this.stopMovement(xdif);

        if (this.checkAttack(xdif, ydif)) {
            this.hitCreep(response);
        }
        ;
    },
    stopMovement: function(xdif) {
        if (xdif > 0) {
            this.pos.x = this.pos.x + 1;
            if (this.facing === "left")
                this.body.vel.x = 0;
        } else {
            this.pos.x = this.pos.x - 1;
            if (this.facing === "right")
                this.body.vel.x = 0;
        }
    },
    checkAttack: function(xdif, ydif) {
        if (this.renderable.isCurrentAnimation("attack") && this.now - this.lastHit >= game.data.playerAttackTimer
                && (Math.abs(ydif) <= 40) &&
                (((xdif > 0) && this.facing === "left") || ((xdif < 0) && this.facing === "right"))
                ) {
            this.lastHit = this.now;
            //if the creeps health is lower than our attack, execute code in if statement
            return true;
        }
        return false;
    },
    hitCreep: function(response) {
        if (response.b.health <= game.data.playerAttack) {
            //adds one gold for one creep kill
            game.data.gold += 1;
        }

        response.b.loseHealth(game.data.playerAttack);
    },
    animationVelocity: function() {
        if (me.input.isKeyPressed("sprint")) {
            this.body.setVelocity(15, 20);
        } else {
            this.body.setVelocity(5, 20);
        }

        if (me.input.isKeyPressed("attack")) {
            this.body.setVelocity(2, 20);
        } else {
            this.body.setVelocity(5, 20);
        }
        if (me.input.isKeyPressed("sprint")) {
            this.body.setVelocity(15, 20);
        }
    },
    dance: function() {
        this.renderable.setCurrentAnimation("dance");
    },
});
