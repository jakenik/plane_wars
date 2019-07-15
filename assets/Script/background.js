// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        bg1: {
            default: null,
            type: cc.Node,
        },
        bg2: {
            default: null,
            type: cc.Node,
        },
        roll_speed: 3,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    // start () {

    // },

    update (dt) {
        var parentHeight = this.node.parent.height;
        this.bg1.y -= this.roll_speed;
        this.bg2.y -= this.roll_speed;
        if(this.bg1.y <= -parentHeight) {
            var bg2Height = this.bg2.y;
            this.bg1.y = parentHeight + bg2Height;
        }
    
        if(this.bg2.y <= -parentHeight) {
            var bg1Height = this.bg1.y;
            this.bg2.y = parentHeight + bg1Height;
        }
    },
});
