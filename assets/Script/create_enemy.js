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
        aircraftLoading: {
            default: () => [{
                quantity: 10,
                chance: 65,
                componentName: 'enemy_01'
            }, {
                quantity: 5,
                chance: 25.2,
                componentName: 'enemy_01'
            }, {
                quantity: 2,
                chance: 9.8,
                componentName: 'enemy_01'
            }],
            tooltip: '飞机装载'
        },
        aircraft: {
            default: [],
            type: cc.Prefab,
            tooltip: '飞机'
        },
        object_pool: {
            default: null,
            type: require('object_pool'),
        },
        taktTime: {
            default: 2000
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.createEnemy()
        this.plant()        
    },

    plant () { // 飞机工厂
        let background = cc.find('Canvas/background')
        setInterval(()=>{
            let {prefab, currentElement} = this.aircraftAdd()
            if(prefab){
                let enemy = this.object_pool.createEnemy({
                    name: prefab.name,
                    parentNode: this.node.parent,
                    componentName: 'enemy_01'
                })
                let node = enemy.node
                node.quantity = currentElement.quantity
                node.chance = currentElement.chance
                node.x = this.randomPosition(background, node)
                node.y = (background.height/2)  + (node.height * 0.5)
                this.takeOff(node, background)
                
            }
        }, this.taktTime)
    },

    randomPosition (parent, node) { // 创建敌人的随机位置
        let random = Math.random()
        let b = parent.width / 2 // 获得屏幕一半
        let number = -parseInt( b - (parent.width * random) ) // 用一半减去百分比 得到整就是少 负值就是多 所以取反
        
        let max = b - (node.width / 2) // 得到不超过屏幕最大值
        let gap = max - Math.abs( number ) // 和最大值的间隙
        if(gap < 0) {
            number > 0 ? number = max : number = -max // 让飞机始终不能超过最大
        }
        return number
    },

    takeOff(enemy, parent) { // 启动飞机
        const object_pool = this.object_pool
        // console.log(enemy.ySpeed, enemy.x);
        var action = cc.moveTo(enemy.ySpeed, enemy.x, -((parent.height/2) + (enemy.height * 0.5)));
        var finished = cc.callFunc(function () {
            object_pool.recyclePool({
                node: enemy,
                name: enemy.name
            })
        }, this);
        var myAction = cc.sequence(cc.show(),action, finished);
        enemy.runAction(myAction);
    },

    createEnemy() { // 生成敌人
        let aircraft = this.aircraft
        let aircraftLoading = this.aircraftLoading
        aircraft.forEach((element, index) => {
            if (!element) return
            let name = element.name
            this.object_pool.initPool({
                initCount: aircraftLoading[index].quantity,
                name,
                prefab: element
            })
        })
    },

    aircraftAdd() { // 飞机添加
        let aircraftLoading = this.aircraftLoading
        
        let num = Math.random()
        let index
        let fistChance = 0
        let currentNumber = 0
        let currentElement
        aircraftLoading.forEach((element, i) => {
            let chance = element.chance / 100
            currentNumber += chance
            if(num > fistChance &&  num <= currentNumber ) {
                index = i
                currentElement = element
            }
            fistChance = currentNumber
        })
        let prefab = this.aircraft[index]
        return {
            prefab,
            currentElement
        }
    }
    // start () {

    // },

    // update (dt) {},
});