Polymer({

    is: 'slider-element',

    properties: {
        current: {
            type: Number,
            notify: true,
            observer: 'gotoCurrent'
        }
    },

    listeners: {
        'sliderHeader.next': 'nextSlide',
        'sliderHeader.prev': 'prevSlide'        
    },
    
    ready: function () {
        this.slides = Polymer.dom(this).querySelectorAll('slider-slide')

        this.slides.forEach(function (slide, index) {
            slide.style.zIndex = this.slides.length - index;
            slide.addEventListener('swipe-left', this.nextSlide.bind(this))
            slide.addEventListener('swipe-right', this.prevSlide.bind(this))
        }.bind(this))

        this.current = 0
    },

    nextSlide: function() {
        if (this.current < this.slides.length-1)
            ++this.current
    },

    prevSlide: function () {
        if (this.current > 0)
            --this.current
    },

    gotoCurrent: function () {        
        this.gotoSlide(this.current)
    },

    /* 
        This method just updates slider-slide's position property
        The slides internally handle that attribute's changes
    */
    gotoSlide: function (index) {        
        // [HACK] Polymer child observers crash 
        // if try to access the property when's not ready
        if (!this.slides[0].position) return
            
        console.info('[GOTO] ', index)

        for (var si = 0; si < index; ++si)
            this.slides[si].position = 'prev'

        this.slides[index].position = 'curr'        

        for (var si = index+1; si < this.slides.length; ++si)
            this.slides[si].position = 'next'
    }

});