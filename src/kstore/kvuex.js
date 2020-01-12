let Vue = null;

class Store{
    constructor(options){
        const store = this;
        this._mutations = options.mutations;
        this._actions = options.actions;
        this._wrappedGetters = options.getters;

        this.getters = {};
        const computed = {};
        Object.keys(this._wrappedGetters).forEach(key => {
            //获取用户定义的getter
            const fn = this._wrappedGetters[key];
            //转换为computed，无参数形式
            computed[key] = function () {  
                return fn(store.state);
            };
            //为getters定义只读属性
            Object.defineProperty(store.getters,key,{
                get: () => store._vm[key]//Vue代理了，
            });
        });
        

        //响应化state
        // this.state = new Vue({
        //     data:options.state
        // });
        this._vm = new Vue({
            data:{
                //加2个$,Vue不做代理
                $$state:options.state
            },
            computed
        });

        //绑定commit，dispath的上下文store实例
        this.commit = this.commit.bind(this);
        this.dispatch = this.dispatch.bind(this);

        console.log(store._vm);
    }

    //store.commit('add',1)
    //type :mutation的类型
    //payload :载荷，是参数
    commit(type,payload){
        const entry = this._mutations[type];
        if(entry){
            entry(this.state,payload);
        }
    }

    dispatch(type,payload){
        const entry = this._actions[type];
        if(entry){
            //传入整个store，因为vuex中是可以解构出commit等的
            entry(this,payload);
        }
    }

    //存取器
    get state(){
        return this._vm._data.$$state;
    }

    set state(v){
        console.log('不要直接修改state的值');
    }

}

function install(_Vue) {  
    Vue = _Vue;

    Vue.mixin({
        beforeCreate() {
            if(this.$options.store){
                Vue.prototype.$store = this.$options.store;
            }
        },
    });
}

//Vuex
export default{
    Store,
    install
};