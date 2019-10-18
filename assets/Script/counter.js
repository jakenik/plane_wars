// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
let countText = null
cc.Class({
    extends: cc.Component,

    properties: {
        countText: cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        $base.set('count', this.count)
        countText = this.countText
        countText.string = $base.countNumber
    },

    count(num, symbol = '++') {
        try {
            let label = countText;
            let countNumber = Number(label.string);
            symbol === '++'
            ?  countNumber =+ Number(num)
            : countNumber -= Number(num)
            $base.countNumber += countNumber
            label.string = $base.countNumber; 
        } catch (error) {
            console.log(error);
        }
    }

    // start () {
    // },

    // update (dt) {

    // },
});
