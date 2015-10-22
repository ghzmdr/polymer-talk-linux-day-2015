Polymer({

    is: 'slider-element',

    properties: {
    
    },

    listeners: {
        'sliderHeader.next': 'nextSlide',
        'sliderHeader.prev': 'prevSlide'
    },
    
    nextSlide: function(e) {
        e.stopPropagation()
        this.$.sliderContent.next()
    },

    prevSlide: function (e) {
        e.stopPropagation()
        this.$.sliderContent.prev()
    }

});