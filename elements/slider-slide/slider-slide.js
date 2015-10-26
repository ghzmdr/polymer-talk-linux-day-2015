Polymer({

    is: 'slider-slide',

    behaviors: [Polymer.NeonAnimatableBehavior, Polymer.NeonAnimationRunnerBehavior],

    properties: {
        position: {
            type: String,
            observer: 'applyCurrentPosition'
        },
        number: {
            type: String
        }
    },

    listeners: {
        'track': 'onTrack',
        'neon-animation-finish': 'fixElementStyle'
    },

    ready: function () {        
        this.$.ajax.generateRequest()        
        this.buildAnimationConfig()
    },

    buildAnimationConfig: function (currentLedft) {
        this.animationConfig = {
            'next-in': [{
                name: 'transform-animation',
                transformFrom: 'translate3d(0, 0, 0.001px) scale(0.8)',
                transformTo: 'translate3d(0, 0, 0.001px) scale(1)',
                node: this
            }], 
            'next-out': [{
                name: 'transform-animation',
                transformFrom: 'translate3d(0, 0, 0.001px) scale(1)',
                transformTo: 'translate3d(0, 0, 0.001px) scale(0.8)',
                node: this
            }],
            'prev-in': [{
                name: 'transform-animation',
                transformFrom: 'translate3d(-150%, 0, 0.001px) scale(1)',
                transformTo: 'translate3d(0, 0, 0.001px) scale(1)',
                node: this
            }],
            'prev-out': [{
                name: 'transform-animation',
                transformFrom: 'translate3d(0, 0, 0.001px) scale(1)',
                transformTo: 'translate3d(-150%, 0, 0.001px) scale(1)',
                node: this
            }]
        }
    },

    applyPosition: function (position) {        
        if (!this.prevPosition){
            if (position == 'curr')
                this.playAnimation('next-in')
            else this.fixElementStyle()

            this.prevPosition = position
            return
        }

        this.cancelAnimation()

        switch (position) {
            case 'next':
                this.$.material.elevation = 1                

                if (this.prevPosition == 'curr')                     
                    this.playAnimation('next-out')
                
                break
            case 'curr':
                this.$.material.elevation = 2                
                if (this.prevPosition == 'prev')
                    this.playAnimation('prev-in')
                else this.playAnimation('next-in')

                break

            case 'prev':
                this.$.material.elevation = 3

                if (this.prevPosition == 'curr')
                    this.playAnimation('prev-out')

                break
        }

        this.prevPosition = position
    },

    applyCurrentPosition: function () {
        this.applyPosition(this.position)
    },

    appendResult: function (e) {        
        this.$$('#container').innerHTML = e.detail.response        
    },

    onTrack: function (e, track) {
        var moveThresold = 100

        if (track.state == 'end') {
            if (Math.abs(track.dx) >= moveThresold) {
                if (track.dx < 0) {
                    this.fire('swipe-left')
                } else {
                    this.fire('swipe-right')                    
                }                
            }
        }
    },

    fixElementStyle: function () {        

        switch (this.position) {
            case 'next':
                this.transform('scale(0.8) translate3d(0, 0, 0.001px)')
                break
            case 'curr':
                this.transform('scale(1) translate3d(0, 0, 0.001px)')
                break
            case 'prev':
                this.transform('scale(1) translate3d(-150%, 0, 0.001px)')
                break
        }
    },

    setNumber: function (num) {
        this.number = num
    }

});