Polymer({

    is: 'slider-slide',

    properties: {
        position: {
            type: String,
            value: function () {
                return this.position
            }
        }
    },

    ready: function () {        
        this.$.ajax.generateRequest()        

        this.buildTimelines()        

        this.applyState(this.position)
    },

    buildTimelines: function () {
        this.enterTimeline = new TimelineLite()
        this.exitTimeline = new TimelineLite()

        this.enterTimeline.fromTo(this.$.material, .5, {scale: 0.8, zIndex: 0}, {scale: 1, zIndex: 1})
        this.enterTimeline.stop()

        this.exitTimeline.fromTo(this.$.material, .5, {x: '0%', zIndex: 1}, {x: '-150%', zIndex: 2})
        this.exitTimeline.stop()
    },


    applyState: function (stateName) {
        if (stateName == 'prev')
            this.exitTimeline.play()
        if (stateName == 'next')
            this.enterTimeline.reverse()
        if (stateName == 'curr')
            this.enterTimeline.reverse()
    },

    appendResult: function (e) {
        var el = document.createElement('div')
        el.innerHTML = e.detail.response
        this.$.material.appendChild(el);
    }

});