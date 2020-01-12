let Vue = null;

class Store{
    constructor(options){
        this._mutations = options.mutations;
        this._actions = options.actions;

        //响应化state
        // this.state = new Vue({
        //     data:options.state
        // });
        this._vm = new Vue({
            data:{
                $$state:options.state
            }
        });

        //绑定commit，dispath的上下文store实例
        this.commit = this.commit.bind(this);
        this.dispatch = this.dispatch.bind(this);
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
            entry(this,payload);
        }
    }

    //存取器
    get state(){
        console.log(this._vm);
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