import Link from './kvue-link';
import View from './kvue-view';

let Vue = null;

//任务1.实现一个插件，挂载$router
class KVueRouter{
    constructor(options){
        this.$options = options;

        // this.current = '/';
        //将current变成响应式的
        //利用Vue提供的defineReactive使current响应化
        //这样将来current变化的时候，依赖的组件会重新render
        Vue.util.defineReactive(this,'current','/');
    
        //监控URL变化
        window.addEventListener('hashchange',this.onhashChange.bind(this));
        window.addEventListener('load',this.onhashChange.bind(this));

        //创建路由映射表
        this.routerMap = {};
        options.routes.forEach(route => {
            this.routerMap[route.path] = route;
        });
    }

    onhashChange(){
        // console.log(window.location.hash);
        this.current = window.location.hash.slice(1);
    }

}

KVueRouter.install = function (_Vue) { 
    //  保存构造函数，在KVueRouter中使用
    Vue = _Vue;

    //挂载$router
    //怎么获取根实例中的router选项
    Vue.mixin({
        beforeCreate(){
            // console.log(this);
            //确保根实例的时候才执行
            if(this.$options.router){
                Vue.prototype.$router = this.$options.router; 
            }
        }
    });

    //任务2:实现2个全局组件router-link和router-view
    Vue.component('router-link',Link);
    Vue.component('router-view',View);
};

export default KVueRouter;