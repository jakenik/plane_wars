cc.Class({
  extends: cc.Component,

  properties: {
    bullet: {
      type: cc.AudioClip,
      default: null
    },
    enemy1_down: {
      type: cc.AudioClip,
      default: null
    },
    enemy2_down: {
      type: cc.AudioClip,
      default: null
    },
    enemy3_down: {
      type: cc.AudioClip,
      default: null
    },
    game_over: {
      type: cc.AudioClip,
      default: null
    }
  },

  play: function (name) {
    cc.audioEngine.play(this[name])
  },

  stop: function (name) {
    cc.audioEngine.stop(this[name])
  },

  resume: function (name) {
    cc.audioEngine.resume(this[name])
  },

  pause: function (name) {
    cc.audioEngine.pause(this[name])
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad () {
    $base.set('audio', this)
  },

});
