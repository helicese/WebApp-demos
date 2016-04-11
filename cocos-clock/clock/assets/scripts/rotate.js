cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    // use this for initialization
    onLoad: function () {
        var self = this;
        console.log(this.node.children);
        this.timeDom = [];
        this.timeDom[0] = this.node.getChildByName('second');
        this.timeDom[1] = this.node.getChildByName('minute');
        this.timeDom[2] = this.node.getChildByName('hour');
        
        var toAngles = this.getInitialAngle();
        var deltaAngles = [210, 180, 120];
        var rotateAction = [];
        this.timeDom.forEach(function(item,index) {
            item.rotation = toAngles[index]-deltaAngles[index];
            rotateAction[index] = cc.rotateBy(1.0, deltaAngles[index]);
            rotateAction[index].easing(cc.easeInOut(2.0));
            item.runAction(rotateAction[index]);
        },this);
        console.log('in onLoad');
        console.log(this);
        setTimeout(self.tick.call(self), 1000);
    },

    getInitialAngle: function() {
        var date = new Date();
        var time = {};
        time.h = date.getHours();
        time.h = (time.h > 12) ? time.h-12 : time.h;
        time.m = date.getMinutes();
        time.s = date.getSeconds();
        console.log(time.h+':'+time.m+':'+time.s);
        var angles = [];
        angles[0] = (time.s/60)*360;
        angles[1] = (time.m+time.s/60)/60*360;
        angles[2] = (time.h+time.m/60+time.s/3600)/12*360;
        return angles;
    },
    
    tick: function() {
        var tickAngle = [6, 0.1, 1/120];
        var tickAction = [];
        var self = this;
        console.log('in tick');
        console.log(this);
        setInterval(tickOnce,1000);
        function tickOnce() {
            self.timeDom.forEach(function(item, index){
                tickAction[index] = cc.rotateBy(1.0, tickAngle[index]);
                self.timeDom[index].runAction(tickAction[index]);
                // console.log(self.timeDom[index].rotation);
            });
        };
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
