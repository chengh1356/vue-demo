<template>
    <div class="user-layout-register">
        <a-form ref="formRegister" :form="form" id="formRegister">
            <a-form-item>
                <a-input size="large" type="text" v-model="username" placeHolder="账号" 
                v-decorator="['email',{rules:[{required:true,message:'请输入注册账号'},{validator:this.handleUsernameCheck}],
                validateTrigger:['change','blur']}]"></a-input>
            </a-form-item>
            <a-popover placement="rightTop" trigger="click" :visible="state.passwordLevelChecked">
                <template slot="content">
                    <div :style="{width:'240px'}">
                        <div :class="['user-register',passwordLevelClass]">强度:<span>{{passwordLeavelName}}</span></div>
                        <a-progress :percent="state.percent" :showInfo="false" :strokeColor="passwordLevelColor"/>
                        <div style="margin-top:10px;">
                            <span>请至少输入6个字符.请不要使用容易被猜到的密码.</span>
                        </div>
                    </div>
                </template>
                <a-form-item>
                    <a-input size="large" v-model="password" type="password" @click="handlePasswordInputClick" autocomplete="false"
                            placeholder="至少6位密码" v-decorator="['password',{rules:[{required:true,message:'至少6位密码'},{validator:this.handlePasswordLevel}],validateTrigger:['change','blur']}]"></a-input>


                </a-form-item>
            </a-popover>
        </a-form>
    </div>
</template>

<script>
const levelNames = {
  0: '低',
  1: '低',
  2: '中',
  3: '强'
}
const levelClass = {
  0: 'error',
  1: 'error',
  2: 'warning',
  3: 'success'
}
const levelColor = {
  0: '#ff0000',
  1: '#ff0000',
  2: '#ff7e05',
  3: '#52c41a'
}
export default {
    beforCreate(){
        this.form=this.$form.createForm(this)
    },
    name:'Regist',
    components:{},
    data(){
        return {
            form:null,
            username:'',
            password:'',
            state:{
                time:60,
                smsSendBtn:false,
                passwordLevel:0,
                passwordLevelChecked:false,
                percent:10,
                progressColor:'#FF0000'
            },
            registerBtn:false
        }
    },
    computed:{
        passwordLevelClass(){
            return levelClass[this.state.passwordLevel]
        },
        passwordLevelName(){
            return levelNames[this.state.passwordLevel]
        },
        passwordLevelColor(){
            return levelColor[this.state.passwordLevel]
        }
    },
    methods:{
        isMobile(){
            return this.$store.state.setting.isMobile
        },
        //密码等级评定
        handlePasswordLevel(rule,value,callback){
            let level = 0

            //判断这个字符串中有没有数字
            if(/[0-9]/.test(value)){
                level++
            }
            //判断字符串中有没有字母
            if(/[a-zA-Z]/.test(value)){
                level++
            }

            //判断字符串中有没有特殊符号
            if(/[^0-9a-zA-Z_]/.test(value)){
                level++
            }

            this.state.passwordLevel = level
            this.state.percent = level * 30
            if(level >= 2){
                if(leval >= 3){
                    this.state.percent = 100
                }
                callback()
            }else{
                if(level === 0){
                    this.state.percent = 10
                }
                callback(new Error('密码强度不够'))
            }
        },
        //密码检查
        handlePasswordCheck(rule,value,callback){
            let password = this.form.getFieldValue('password')
            if(value === undefined){
                callback(new Error('请输入密码'))
            }

            if(value && password && value.trim() !== password.triem()){
                callback(new Error('两次密码不一致'))
            }
            callback()
        },
        //用户名评定
        handleUsernameCheck(rule,value,callback){
            let username = this.username.trim()
            if(username.length){
                if(username.length > 10){
                    callback(new Error('用户名不能超过10个字符'))
                }else if(username.length < 4){
                    callback(new Error('用户名不能少于4个字符'))
                }else{
                    this.$get(`user/check/${username}`).then((r)=>{
                        if(r.data){
                            callback()
                        }else{
                            this.validateStatus = 'error'
                            callback(new Error('抱歉,该用户名已存在'))
                        }
                    })
                }
            }else{
                callback()
            }
        },
        handlePasswordInputClick(){
            if(!this.isMobile){
                this.state.passwordLevelChecked = true
                return
            }
            this.state.passwordLevelChecked = false
        },
        handleSubmit(){
            this.form.validateFields((err,values) =>{
                if(!err){
                    this.$post('regist',{
                        username:this.username,
                        password:this.password
                    }).then(() => {
                        this.$message.success('注册成功')
                        this.returnLogin()
                    }).catch(() => {
                        this.$message.error('抱歉,注册账号失败')
                    })
                }
            })
        },
        returnLogin(){
            this.$emit('regist','Login')
        }
    }
}
</script>
<style lang="less">
    .user-register{
        &.error{
            color:#ff0000;
        }
        &.warning{
            color:#ff7e05;
        }
        &.success{
            color:#52c41a;
        }
    }
    .user-layout-register{
        .ant-input-group-addon{
            &:first-child{
                background-color:#fff
            }
        }
        & > h3{
            font-size:16px;
            margin-bottom:20px;
        }
        .getCaptcha{
            display:block;
            width:100%;
            height:40px;
        }
        .register-button{
            width:50%;
        }
        .login{
            float:right;
            line-height:40px;
        }
    }
    
</style>