<template>
    <div>
        <h5>form test</h5>
        <slot></slot>
    </div>
</template>
<script>
export default {
    componentName:'KForm',
    provide(){
        return {
            form:this
        };
    },
    props:{
        model:{
            type:Object,
            required:true
        },
        rules:{
            type:Object
        }
    },
    created(){
        this.fields = [];
        this.$on('kkb.form.addField',field => {
            this.fields.push(field);
        });
    },
    methods: {
        validate(cb){
            //获取所有孩子KFormItem
            // const tasks = this.$children
            //     .filter(item => item.prop)
            //     .map(item => item.validate());
            const tasks = this.fields.map(item => item.validate());

            //统一处理所有promise
            Promise.all(tasks)
                .then(() => {cb(true);})
                .catch(() => {cb(false);});
        }
    },
};
</script>