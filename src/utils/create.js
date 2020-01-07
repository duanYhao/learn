import Vue from 'vue';
import Notice from '@/components/Notice.vue';

function create(component,props){
    //组件构造函数如何获取
    //1.Vue.extend()
    //2.render

    // const vm = new Vue({
    //     //h是createElement，返回VNode,是虚拟DOM
    //     //需要挂在才能变成真实DOM
    //     render:h => h(component,{props})
    // }).$mount();//不指定宿主元素，则会创建真实DOM，但是不会做DOM的追加

    const Ctor = Vue.extend(component);
    const comp = new Ctor({propsData:props});
    comp.$mount();

    //获取并追加真实DOM
    document.body.append(comp.$el);

    comp.remove = function(){
        document.body.removeChild(comp.$el);
        comp.$destroy();
    };

    return comp;
}

export default {
    install(Vue){
        Vue.prototype.$notice = function(options){
            return create(Notice,options);
        };
    }
};