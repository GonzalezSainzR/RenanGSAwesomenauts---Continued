game.MiniPlayerLocation = me.Entity.extend({
    init: function(x, y, settings) {
        this.settings = settings;
        this.r = 5;
        this.diameter = (this.r + 2) * 2;
        this.anchorPoint = new me.Vector2d(0, 0);
        this.loc = x, y;
        this.settings.width = this.diameter;
        this.settings.height = this.diameter;
        this.settings.spritewidth = this.diameter;
        this.settings.spriteheight = this.diameter;
        this.settings = this.diameter;
        this.floating = true;
        this.image = me.video.createCanvas(this.settings.width, this.settings.height);
        var ctx = me.video.renderer.getContext2d(this.image);

        ctx.fillStyle = "rgb(0, 192, 32, 0.75)";
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 2;

        ctx.arc(this.r + 2, this.r + 2, this.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        var my = this;
        this._super(me.Entity, "init", [x, y, {
                width: my.dimension,
                height: my.dimension,
                spritewidth: my.dimension,
                spriteheight: my.dimension,
                getShape: function() {
                    return(new me.Rect(0, 0, my.dimension, my.dimension)).toPolygon();
                }
            }]);
    },
    draw: function() {

    },
    update: function() {

    }
});