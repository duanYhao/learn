import Vue from 'vue';
import App from './App.vue';
import router from './krouter';
import create from './utils/create.js';
import store from './kstore';

Vue.use(create);

Vue.config.productionTip = false;

Vue.prototype.$create = create;
//3.挂载router实例，why?
new Vue({
    //Vue.prototype.$router = router  为了全局用
    router,

    store,
    render: h => h(App)
}).$mount('#app');
