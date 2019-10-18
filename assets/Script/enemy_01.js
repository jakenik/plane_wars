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
        initHp: {
            default: 1
        },
        HP: {
            default: 1
        },
        ySpeed: {
            default: 3,
            tooltip: '移动到底部需要多少时间'
        }
    },

    // LIFE-CYCLE CALLBACKS:

    hitAnimation() { // 击中执行动画
        let node = this.node
        let anim = this.getComponent(cc.Animation);
        let name = node.name
        node.hide = false
        if(this.HP === 0) {
            let animName = `${name}_ruin`
            let audioName = `${name}_down`
            node.stopAllActions()
            $base.count(this.node.grade)
            anim.on('finished',()=>{
                
                // console.log('结束');
                anim.off('finished')
                const object_pool = cc.find('Canvas/object_pool').getComponent('object_pool')
                node.hide = true
                anim.node.runAction(cc.hide())
                this.HP = this.getInitHp()
                // console.log(this, 'this.getInitHp()');
                anim.setCurrentTime(0,animName)
                node.ySpeed = this.ySpeed
                object_pool.recyclePool({ name,node })
                this.isHit = false
            },anim);
            anim.play(animName)
            $base.audio.play(audioName)
        } else {
            
            let animName = `${name}_hit`
            // console.log(animName,this, this.HP, '未灭亡');
            anim.on('finished',()=>{
                // console.log('结束');
                anim.off('finished')
                anim.setCurrentTime(0,animName)
                this.isHit = false
            },anim);
            anim.play(animName)
        }
    },

    hit(ruin) {
        this.HP -= ruin
        if(this.HP  < 0 ) this.HP = 0
        this.hitAnimation()
        return this.HP
    },

    getInitHp() {
        return  new Number( this.initHp )
    },

    init() {
        this.node.componentName = 'enemy_01'        
        this.node.ySpeed = this.ySpeed
    },

    onLoad () {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true
        this.init()
    },

    onCollisionEnter: function (other) { // 碰撞开始
        if(this.isHit) return
        this.isHit = true
        let component = other.getComponent(other.node.componentName)
        let harm = component.harm
        this.hit(harm, other)
        // console.log(component, other);
    },

    start () {

    },

    // update (dt) {},
});
