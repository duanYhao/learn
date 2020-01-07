<template>
	<div class="home">
		<KForm :model="userInfo" :rules="rules" ref="loginForm">
			<KFormItem label="用户名" prop="username">
				<KInput v-model="userInfo.username" placeholder="请输入用户名"></KInput>
			</KFormItem>
			<KFormItem label="密码" prop="password">
				<KInput v-model="userInfo.password" placeholder="请输入密码" type="password"></KInput>
			</KFormItem>
			<KFormItem>
				<button @click="login">登录</button>
			</KFormItem>
		</KForm>
		<p>{{userInfo.username}}-{{userInfo.password}}</p>
	</div>
</template>

<script>
// @ is an alias to /src
import KForm from '@/components/form/KForm';
import KFormItem from '@/components/form/KFormItem';
import KInput from '@/components/form/KInput';
// import Notice from '@/components/Notice';
export default {
    name: 'home',
    components: {
        KForm,
        KInput,
        KFormItem
    },
    data() {
        return {
            userInfo: {
                username: "tom",
                password: "123"
            },
            rules: {
                username: [{
                    required: true,
                    message: "请输入用户名称"
                }],
                password: [{
                    required: true,
                    message: "请输入密码"
                }]
            }
        };
    },
    methods: {
        login(){
            this.$refs["loginForm"].validate(valid => {
                const notice = this.$notice({
                    title: "社会你杨哥喊你来搬砖",
                    message: valid ? "请求登录!" : "校验失败!",
                    duration: 2000
                });
                notice.show();
                // if (valid) {
                //     alert("submit"); 
                // } else { 
                //     console.log("error submit!");
                //     return false;
                // }
            });
        }
    },
};
</script>