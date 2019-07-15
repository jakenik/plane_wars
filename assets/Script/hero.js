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
        object_pool: {
            default: null,
            type: require('object_pool'),
        },
        fireRate: {
            default: 300,
            tooltip: '射速'
        },
        harm: {
            default: 5
        }
    },

    onLoad () {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true
        this.node.componentName = 'hero'
        this.onDrag()
        this.initBullet()
        this.fire()
    },
    
    fire() {
        setInterval(()=>{
            let create = {
                name: 'bullet',
                parentNode: this.node.parent
            }
            this.object_pool.createEnemy(create).setCurrentPosition(this.node).fire(this.node)
        }, this.fireRate)
    },

    initBullet() {
        let init = {name: 'bullet', initCount: 10}
        
        this.object_pool.initPool(init)
    },

    onDrag() { // 主角可以进行拖动
        this.getLimit() // 获取移动结界
        this.node.on('touchmove', this.dragMove, this);
    },
    getLimit() {
        const parent = cc.winSize
        this.minX = -parent.width/2+this.node.width/2;
        this.maxX = -this.minX;
        this.minY = -parent.height/2+this.node.height/2;
        this.maxY = -this.minY;
    },
    dragMove: function(event){ 
        // convertToNodeSpaceAR // 将一个点转换到节点 (局部) 空间坐标系，这个坐标系以锚点为原点。
        const parent = this.node.parent
        var info = parent.convertToNodeSpaceAR(event.getLocation()) // https://docs.cocos.com/creator/api/zh/classes/Event.EventMouse.html#getlocation
        let {
            x,
            y
        } = info
        //飞机不移出屏幕 
        if (x< this.minX){
            x = this.minX;
        }
        if (x>this.maxX){
            x = this.maxX;
        }
        if (y< this.minY){
            y = this.minY;
        }
        if (y> this.maxY){
            y = this.maxY;
        }
        this.node.setPosition(x,y) // https://docs.cocos.com/creator/api/zh/classes/Node.html#setposition
    },

    ruin() {
        this.node.off('touchmove')
        let name = this.node.name
        let anim = this.getComponent(cc.Animation);
        let animName = `${name}_ruin`
        anim.on('finished',()=>{
            anim.off('finished')
            anim.node.runAction(cc.hide())
            anim.setCurrentTime(0,animName)
            this.node.destroy()
            this.isHit = false
        },anim);
        anim.play(animName)
    },

    onCollisionEnter: function (other) { // 碰撞结束
        console.log('击中');
        
        if(this.isHit) return
        this.isHit = true
        let component = other.getComponent(other.node.componentName)
        this.ruin()
        // console.log(component, other);
    }

    // update (dt) {},
});
