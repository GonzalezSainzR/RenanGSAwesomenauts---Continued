game.MiniMap = me.Entity.extend({
    init: function(x, y , settings){
        this._super(me.Entity, "init", [x, y, {
            image: "minimap",
            width: 362,
            height: 182,
            spritewidth: "362", 
            spriteheight: "182",
            getshaoe: function() {
                return (new me.Rect(0, 0, 362, 182)).toPolygon();
            }
            
        }]);
    this.floating = true;
    
    
    },
    update: function(delta){
        return true;
    }
});