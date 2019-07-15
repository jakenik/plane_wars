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
        gameStatus: {
            default: true
        },
        stopSprite: {
            default: [],
            type: cc.SpriteFrame,
            tooltip:'暂停按钮不同状态的图片'
        },
        playSprite: {
            default: [],
            type: cc.SpriteFrame,
            tooltip:'播放按钮不同状态的图片'
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    pause() {
        let spriteFrame
        let Button = this.getComponent(cc.Button)
        
        if(this.gameStatus){
            spriteFrame = this.stopSprite
            cc.game.pause()
        }else { 
            
            spriteFrame = this.playSprite
            cc.game.resume()
        }
        console.log(Button,spriteFrame);
        
        Button.normalSprite = spriteFrame[0];
        Button.pressedSprite = spriteFrame[1];
        Button.hoverSprite = spriteFrame[1];
        this.gameStatus = !this.gameStatus
    },

    start () {

    },

    // update (dt) {},
});
