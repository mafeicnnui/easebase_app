<template>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <div class="wrap" id="wrap">
            <div class="logGet">
                <div class="logD logDtip">
                    <p class="p1">登 录 <span style="font-size: 15px"> EaseBase2.0 <i class="ion-coffee"></i></span></p>
                </div>
                <div class="lgD">
                  <el-form-item  prop="username">
                        <el-input placeholder="请输入用户名"  v-model="ruleForm.username">
                            <template slot="prepend"><i class="ion-android-social-user"></i></template>
                        </el-input>
                  </el-form-item>
                </div>
                <div class="lgD">
                  <el-form-item prop="password">
                        <el-input placeholder="请输入密码"  show-password v-model="ruleForm.password">
                            <template slot="prepend"><i class="ion-eye"></i></template>
                        </el-input>
                  </el-form-item>
                </div>
                <div class="lgD">
                    <el-form-item prop="input_verification">
                        <el-input   placeholder="请输入验证码"  v-model="ruleForm.input_verification">
                            <template slot="prepend"><i class="ion-ios7-pulse-strong"></i></template>
                            <template slot="append"><span :style="ruleForm.verification_color">{{ruleForm.show_verification}}</span></template>
                        </el-input>
                    </el-form-item>
                </div>
                <el-form-item>
                    <div class="logC">
                        <a><button @click="login('ruleForm')">登 录</button></a>
                    </div>
                </el-form-item>
                <el-form-item>
                    <particles></particles>
                </el-form-item>

            </div>
        </div>
    </el-form>


</template>


<script>
  import config from '@/utils/config.js';
  import utils from '@/utils/common.js'
  import axios from "axios";
  import Particles from '@/components/particles/index';

  export default {
      components: {
          Particles
      },
      data() {
          let validateCode = (rule, value, callback) => {
              if (value.toLowerCase() !== this.ruleForm.show_verification.toLowerCase()) {
                  this.ruleForm.verification_color.color='#909399'
                  callback(new Error("验证码有误!"));
              } else {
                  callback();
              }
          };

          let validateCode2 = (rule, value, callback) => {
              if (value.length == this.ruleForm.show_verification.length) {
                  if (value.toLowerCase() !== this.ruleForm.show_verification.toLowerCase()) {
                      callback(new Error("验证码有误!"));
                      setTimeout(this.createCode,500);
                  } else {
                      this.ruleForm.verification_color.color='blue'
                      setTimeout(callback(),500);

                  }
              } else {
                  this.ruleForm.verification_color.color='#909399'
                  callback(new Error("验证码有误!"));
              }
          };
          return {
              svr: config(),
              ruleForm:{
                  username: '',
                  password: '',
                  input_verification:'',
                  show_verification:'',
                  verification_color:{
                      color:''
                  }
              },
              rules: {
                  username: [
                      { required: true, message: '请输入用户名', trigger: 'blur' },
                      { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
                  ],
                  password: [
                      { required: true, message: '请输入密码', trigger: 'change' }
                  ],
                  input_verification: [
                      { required: true, message: '请输入验证码', trigger: 'change' },
                      { validator: validateCode, message: '验证码有误',trigger: "blur" },
                      { validator: validateCode2, message: '验证码有误',trigger: "change" }
                  ]
              }
          };
      },
      created() {
         this.createCode();
      },
      methods: {
          login:function(formName){
              this.$refs[formName].validate((valid) => {
                  if (valid) {
                          axios({
                              method: 'post',
                              url: utils.stringFormat("http://{0}:{1}/login",[this.svr['server_ip'], this.svr['server_port']]),
                              params: {
                                  username  : this.ruleForm.username,
                                  password  : this.ruleForm.password
                              },
                              timeout: 10000,
                          }).then((res) => {
                              console.log('login=>res=',res)
                              if (res.data['Code'] == 200 ) {
                                  localStorage.setItem('Authorization',res.data['Data'])
                                  this.$router.push('/index');
                              }
                          }).catch((error) => {
                              console.log('error=',error);
                          });

                  } else {
                      console.log('登陆异常!');
                      return false;
                  }
              });
          },
          createCode:function () {
              let codeCheck = "";
              this.ruleForm.show_verification = "";
              let codeLength = 4;
              let random = [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
              for(let i = 0; i < codeLength; i++) {
                  let index = Math.floor(Math.random()*36);
                  codeCheck += random[index];
              }
              this.ruleForm.show_verification = codeCheck;
          }
      }
  }
</script>

<style >
    body {
        /*background-image: url('../assets/logon2.jpg');*/
        background-size: 100%;
        width:100%;
        height:100%;
        background-repeat: no-repeat;
        background-position: center center;
    }

    * {
        margin: 0;
        padding: 0;
    }

    #wrap {
        height: 600px;
        width: 100%;
        background-position: center center;
        position: relative;

    }
    #wrap .logGet {
        height: 428px;
        width: 368px;
        position: absolute;
        background-color: #FFFFFF;
        top: 100px;
        right: 15%;
    }

    .logC a button {
        width: 100%;
        height: 45px;
        background-color: #ee7700;
        border: none;
        color: white;
        font-size: 18px;
    }

    .logGet .logD.logDtip .p1 {
        display: inline-block;
        font-size: 28px;
        margin-top: 35px;
        margin-bottom:5px;
        width: 86%;
    }

    #wrap .logGet .logD.logDtip {
        width: 86%;
        border-bottom: 1px solid #ee7700;
        margin-bottom: 40px;
        margin-top: 5px;
        margin-right: auto;
        margin-left: auto;
    }

    .logGet .lgD img {
        position: absolute;
        top: 12px;
        left: 8px;
    }

    .logGet .lgD input {
        width: 100%;
        height: 42px;
        text-indent: 2.5rem;
    }

    #wrap .logGet .lgD {
        width: 86%;
        position: relative;
        margin-bottom: 30px;
        margin-top: 30px;
        margin-right: auto;
        margin-left: auto;
    }

    #wrap .logGet .logC {
        width: 86%;
        margin-top: 0px;
        margin-right: auto;
        margin-bottom: 0px;
        margin-left: auto;
    }

</style>
