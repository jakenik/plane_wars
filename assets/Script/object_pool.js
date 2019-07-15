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
        bulletPrefab: {
            default: null,
            type: cc.Prefab,
            tooltip: '子弹',
        }
    },

    // LIFE-CYCLE CALLBACKS:

    initPool ({
        initCount = 1,
        name,
        prefab
    }) {
        if( this[`${name}Pool`] ) return
        if( prefab ) this[`${name}Prefab`] = prefab
        this[`${name}Pool`] = new cc.NodePool();
        for (let i = 0; i < initCount; ++i) {
            let node = cc.instantiate(this[`${name}Prefab`]); // 创建节点
            this[`${name}Pool`].put(node); // 通过 put 接口放入对象池
        }
        return this
    },

    recyclePool({ name,node }) {
        this[`${name}Pool`].put(node)
        return this
    },

    createEnemy({
        name,
        parentNode = cc.find('Canvas/background'),
        componentName
    }) {
        let node = null;
        let pool = this[`${name}Pool`]
        let prefab = this[`${name}Prefab`]
        if (pool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
            node = pool.get();
        } else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
            node = cc.instantiate(prefab);
        }
        node.parent = parentNode; // 加入节点树
        if(!componentName) componentName = name
        let component = node.getComponent(componentName)
        // console.log(component,'componentcomponentcomponent');
        if(component.init) component.init()
        if(component) {
            return component
        } else {
            return node
        }
         
    },

    onLoad () {
        window.$object_pool = this
    },

    // start () {

    // },

    // update (dt) {},
});
