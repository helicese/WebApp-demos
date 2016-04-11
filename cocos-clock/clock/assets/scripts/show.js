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
        this.pannel = this.node.getChildByName('pannel');
        this.pannel.opacity = 0;
              
        var showAction = cc.fadeTo(1.0, 255);

        console.log(this.node.children);
        this.pannel.runAction(showAction);
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
