// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
// 1. 道具生产节点，以分数为区间值 如100-130 生产道具00x
cc.Class({
    extends: cc.Component,

    properties: {
        intervalMin: {
            default: 30
        },
        intervalMax: {
            default: 50
        },
        porp: {
            default: [],
            type: cc.Prefab,
            tooltip: '道具'
        },
        chances: {
            default: [],
            tooltip: '出现几率'
        },
        object_pool: {
            default: null,
            type: require('object_pool'),
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.createEnemy()
        // let porp = this.object_pool.createEnemy({
        //     name: this.porp.name,
        //     parentNode: this.node.parent,
        //     componentName: 'create_porp'
        // })
        // this.schedule(()=> {
        //     porp.fire(-20)
        // }, 2000)
    },

    createEnemy() { // 生成敌人
        let porp = this.porp
        porp.forEach((element) => {
            if (!element) return
            let name = element.name
            this.object_pool.initPool({
                initCount: 10,
                name,
                prefab: element
            })
        })
    },

    start () {

    },

    // update (dt) {},
});
