// import './css/app.styl';

import Vue from 'vue';
import VueObserveVisibility from 'vue-observe-visibility';
import VueScreen from 'vue-screen';
import Clipboard from 'v-clipboard';
import store from './store';
import App from './App.vue';
import * as Analytics from './lib/analytics';

Vue.use(VueObserveVisibility);
Vue.use(VueScreen);
Vue.use(Clipboard);

Vue.config.productionTip = false;

const IMAGES = [];

export default class PS5Quiz {
  constructor(params = {}) {
    this.params = {
      location: 'full', // index, feed, article, page
    };

    this.params = { ...this.params, ...params };

    store.commit('setParams', this.params);

    if (this.params.css) {
      PS5Quiz.loadStyles(this.params.css).then(() => this.init());
    } else {
      this.init();
    }
  }

  static loadStyles(path) {
    return new Promise((resolve, reject) => {
      const link = document.createElement('link');

      link.rel = 'stylesheet';
      link.href = path;

      link.onload = () => resolve();
      link.onerror = () => reject();

      document.body.appendChild(link);
    });
  }

  init() {
    Analytics.sendEvent('Project', 'Show');

    const images = [];

    images.forEach((image) => {
      const img = new Image();
      img.src = image.x1;

      if (image.x2) {
        img.srcset = `${image.x2} 2x`;
      }

      IMAGES.push(img);
    });

    new Vue({
      store,
      render: (h) => h(App),
      methods: {

      },
      mounted() {
        this.$el.addEventListener('click', this.clickHandler);
      },
      beforeDestroy() {
        this.$el.removeEventListener('click', this.clickHandler);
      },
    }).$mount(this.params.container);
  }
}
