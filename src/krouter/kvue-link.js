export default {
    props:{
        to:{
            type:String,//或者是对象
            required:true
        },
    },
    render(h){
        //<a href="#/about">xxx</a>
        //<router to="/about">xxx</router>
        return h('a',{attrs:{href:'#'+this.to}},this.$slots.default);
    }
};