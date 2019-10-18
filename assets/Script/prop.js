// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
// 创建道具包
// 道具包属性
// 1. 道具数量，决定主角可以使用多少次道具
// 2. 道具速度, 决定道具包下降速度
// 3. 道具类型当前只定义两种类型道具 类型1为子弹类型道具可以控制当前使用的是什么子弹 类型2为子弹发射方式类型道具可以控制子弹发射类型
// 4. 道具资源

cc.Class({
    extends: cc.Component,

    properties: {
       number: {
          default: 1,
          tooltip: '道具数量，决定主角可以使用多少次道具'
       },
       ySpeed: {
           default: 1,
           tooltip: '道具速度, 决定道具包下降速度' 
       },
       type: {
           default: 1,
           tooltip: '道具类型'
       },
       countText: cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true
    },
    
    setName(text) {
        var label = this.countText;
        label.string = text;
    },

    fire(x) { 
        const parent = cc.find('Canvas/background')
        var action = cc.moveTo(this.ySpeed, x, -((parent.height/2) + (this.node.height * 0.5)) );
        var finished = cc.callFunc(function () {
            $base.objectPool.recyclePool({
                node: this.node,
                name: this.node.name
            })
        }, this);
        var myAction = cc.sequence(cc.show(),action, finished);
        this.node.runAction(myAction);
    },

    onCollisionEnter: function (other, self) {
        console.log(other.node, self);
        this.node.stopAllActions()
        $base.objectPool.recyclePool({
            node: this.node,
            name: this.node.name
        })
    }
    // update (dt) {},
});
