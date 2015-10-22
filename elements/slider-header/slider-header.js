Polymer({
    is: 'slider-header',

    next: function () {
        this.fire('next')
    },

    prev: function () {
        this.fire('prev')
    }
});