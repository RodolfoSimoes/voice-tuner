(function() {

    let template =
        `<div class="tuner">\
            <tuner-header></tuner-header>\
            <section class="tuner__content"></section>\
            <tuner-footer></tuner-footer>\
        </div>`;

    Vue.component('tuner', {
      template: template
    })

})();
