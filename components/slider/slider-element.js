Polymer({

    is: 'slider-element',

    properties: {
      name: {
        type: String,
        value: function () {
          return 'Polymer and WebComponents'
        }
      }
    },

    fireLasers: function() {
      this.fire('seed-element-lasers', {sound: 'Pew pew!'});
    }

});