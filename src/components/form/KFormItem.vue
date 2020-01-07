<template>
    <div>
        <div v-if="label">{{label}}</div>
        <slot></slot>
        <p v-if="error">{{error}}</p>
    </div>
</template>
<script>
import Schema from 'async-validator';
import emitter from '@/mixins/emitter';
export default {
    componentName:'KFormItem',
    inject:['form'],
    mixins:[emitter],
    props:{
        label:{
            type:String,
            default:''
        },
        prop:{
            type:String
        }
    },
    data(){
        return {
            error:''
        };
    },
    mounted() {
        this.$on('validate',() => {
            this.validate();
        });
        if(this.prop){
            this.dispatch('KForm','kkb.form.addField',[this]);
        }
    },
    methods: {
        validate() {
            //规则
            const rules = this.form.rules[this.prop];
            // console.log(this.form.rules[this.prop]);
            //当前值
            const value = this.form.model[this.prop];
            // console.log(this.form.model[this.prop]);
            
            //校验描述对象
            const desc = {[this.prop]:rules};

            //创建Schema实例
            const schema = new Schema(desc);

            return schema.validate({[this.prop]:value},errors => {
                if(errors){
                    this.error =errors[0].message;
                }else{
                    this.error = '';
                }
            });
        }
    },
};
</script>