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
        ySpeed: {
            default: 3,
            tooltip: '子弹速度',
            type: cc.Integer
        },
        harm: {
            default: 1,
            tooltip: '伤害'
        },
        easeOut: {
            default: 1.6,
            tooltip: '子弹由快到慢'
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true
       this.init()
    },

    init() {
        this.node.componentName = 'bullet'
        this.object_pool = cc.find('Canvas/object_pool').getComponent('object_pool')
    },
    // start () {
    // },

    // update (dt) {

    // },

    setCurrentPosition(node) {
        // console.log(this.node.parent, 'setCurrentPosition');
        this.node.x = node.x
        this.node.y = node.y + (node.height / 2) + (this.node.height / 2)
        return this
    },

    fire(currentNode) { 
        const parent = cc.find('Canvas/background')
        const object_pool = this.object_pool
        var action = cc.moveTo(this.ySpeed, currentNode.x, (parent.height/2) + (this.node.height * 0.5));
        action.easing(cc.easeOut(this.easeOut))
        var finished = cc.callFunc(function () {
            object_pool.recyclePool({
                node: this.node,
                name: this.node.name
            })
        }, this);
        var myAction = cc.sequence(cc.show(),action, finished);
        this.node.runAction(myAction);
    },
    onCollisionEnter: function (other, self) {
        this.node.stopAllActions()
        this.object_pool.recyclePool({
            node: this.node,
            name: this.node.name
        })
    }
});
