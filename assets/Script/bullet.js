// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
// 由于子弹开始设定没有考虑到多种子弹属性，后续维护使用两种区分
// 保留原逻辑为默认子弹，新建子弹工厂为道具包子弹
// 道具包子弹拥有以下可随时定义属性
// 1.子弹速度
// 2.子弹伤害
// 3.子弹射速
// 4.子弹资源（由当前节点而定）
// 5.子弹音效 (音效由全局播放器资源添加，这边只做抛给播放器要使用什么音效)
// 6.子弹数量 (数量由道具包定义)
// 7.子弹速率
// 8.子弹血量 (决定当前子弹是否具有穿透)
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
        },
        pierce: {
            default: false,
            tooltip: '子弹是否有穿透'
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
        this.object_pool = cc.find('Canvas/object_pool').getComponent('object_pool') // 最初考虑对象池为按需引入 后面发现对象池使用地方太多因改全局对象
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
        $base.audio.play('bullet')
    },
    onCollisionEnter: function (other, self) {
        this.node.stopAllActions()
        this.object_pool.recyclePool({
            node: this.node,
            name: this.node.name
        })
    }
});
