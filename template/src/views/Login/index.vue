/**
* 创建于 2018/3/29
* 作者: XinWang
* 功能: 登陆页面
*/

<!--suppress CssUnknownTarget, HtmlUnknownTarget -->
<template>
  <div class="login-container">
    <!-- 左侧介绍 -->
    <div class='login-notice'>
      <div class='login-bg'></div>
      <img class='login-logo' src='~assets/imanuf1.png' alt='logo'>
    </div>


    <div class="login-second-title">登录</div>

    <!-- 登陆表单 -->
    <div class="login-tabs">
      <div class='login-tabs-title'></div>

      <el-form class="login-form"
               ref="loginForm"
               :model="loginForm"
               label-width="85px"
               :rules="loginRules">
        <el-form-item prop="userName" label="用户名">
          <el-input name="userName" type="text" autoComplete="on"
                    placeholder="请输入用户名"
                    v-model="loginForm.userName"
                    @keyup.enter.native="handleLogin">
          </el-input>
        </el-form-item>
        <el-form-item prop="password" label="密 码">
          <el-input name="password" type="password" autoComplete="on"
                    placeholder="请输入密码"
                    @keyup.enter.native="handleLogin"
                    v-model="loginForm.password">
          </el-input>
        </el-form-item>

        <!-- 登陆和取消按钮 -->
        <div class='login-btns'>
          <el-row :span='24' type='flex' justify='center'>
            <el-button type="primary"
                       :loading="loading"
                       @click.native.prevent="handleLogin">
              登录
            </el-button>
          </el-row>
        </div>
      </el-form>

    </div>

  </div>
</template>

<script>
  import Cookies from 'js-cookie'
  import { changeBaseURL } from 'utils/fetch'
  import Aes from 'utils/aesHelper'

  export default {
    name: 'Login',
    data() {
      return {
        cardId: '',
        focusState: false,
        loginForm: {
          userName: Cookies.get('rcp_LastLoginUsername') || '',
          password: ''
        },
        loginRules: {
          userName: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
          password: [{ required: true, trigger: 'blur', message: '请输入密码' }]
        },
        loading: false,
        options: [
          {
            value: 'http://172.16.33.104:20014/robot/',
            label: '办公室'
          }, {
            value: 'http://172.16.33.52:20004/robot',
            label: '陈灏灏'
          },  {
            value: 'http://172.16.33.54:20004/robot',
            label: '丁许许开发'
          }, {
            value: 'http://172.16.33.54:20014/robot',
            label: '丁许许测试'
          }, {
            value: 'https://www.easy-mock.com/mock/5aa8d6212e74616d75917bb8/rcp',
            label: 'mock'
          }, {
            value: '5',
            label: 'cto',
            disabled: true
          }, {
            value: 'http://172.16.15.236:20014/robot/',
            label: '测试',
            disabled: true
          }, {
            value: 'http://47.100.52.24:20016/robot/',
            label: '远程'
          }]
      }
    },
    methods: {
      /**
       * 登陆
       */
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            // const tempLoginForm = {
            //   userName: this.loginForm.userName,
            //   password: Aes.encrypt(this.loginForm.password)
            // }
            // this.$store.dispatch('Login', tempLoginForm).then(() => {
            //   this.loading = false
            //   Cookies.set('rcp_LastLoginUsername', this.loginForm.userName)
            this.$router.push({ path: '/' })
            // }).catch(() => {
            //   this.loading = false
            // })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    }
  }

</script>

<style rel="stylesheet/scss" type="text/scss" lang="scss" scoped>
  //noinspection CssUnknownTarget
  @import '~@/styles/mixin.scss';

  $dark_gray: #889aa4;

  .login-container {
    @include relative;
    background-size: cover;
    height: 100vh;
    min-width: 1000px;
    min-height: 750px;
    overflow: hidden;
    margin: 0 auto;
    position: relative;

    /* 左侧介绍 */
    .login-notice {
      position: absolute;
      width: 100%;
      min-width: 593px;
      margin-right: 454px;
      height: 100%;
      background: url('~assets/loginbg.png') no-repeat;
      background-size: cover;
      z-index: -1;

      /* 半透明蒙层 */
      .login-bg {
        width: inherit;
        height: inherit;
        background-color: rgba(0, 0, 0, 0);
        z-index: 0;
      }

      /* imanuf图标 */
      .login-logo {
        position: absolute;
        left: 90px;
        top: 34px;
        width: 119px;
        height: 53px;
      }
    }

    .login-second-title {
      border-radius: 50%;
      height: 134px; width: 134px;
      line-height: 134px;
      text-align: center;
      background-color: #07f;
      font-family: "Microsoft YaHei UI Light";
      font-size: 22px;
      color: #fff;
      margin: 72px auto;
      position: absolute;
      left: calc(50% - 67px);
      right: calc(50% - 67px);
      z-index: 2;
    }

    /* 登陆表单 */
    .login-tabs {
      width: 468px;
      height: 535px;
      margin: 140px auto;
      padding: 118px 60px 83px 60px;
      box-shadow: 0 2px 20px 0 #edf1f7;
      background-color: #fff;
      border-radius: 10px;
      overflow: hidden;
      z-index: 1;
      background-color: rgba(255, 255, 255, 0.9);
      position: relative;

      /* 表单标题：用户登录 */
      .login-tabs-title {
        font-family: "Microsoft YaHei UI Light";
        font-size: 28px;
        color: #07f;
        text-align: center;
        font-weight: bold;
      }

      .login-form {
        margin-top: 80px;
        .el-input,
        .el-select {
          height: 36px;
          width: 250px;
        }
      }

      /*.el-form-item {*/
      /*margin-bottom: 20px;*/
      /*text-align: center;*/

      /*/deep/ .el-input__inner {*/
      /*border-width: 0 0 1px 0;*/
      /*border-radius: 0;*/
      /*}*/
      /*}*/

      /*/deep/ .el-form-item__error {*/
      /*margin-left: 70px;*/
      /*}*/

      /*&:first-of-type {*/
      /*margin-bottom: 20px;*/
      /*}*/
      /*}*/

    }

    .forget-password {
      font-family: "Microsoft YaHei UI Light";
      font-size: 14px;
      color: #9b9b9b;
      position: absolute;
      right: 70px;
      bottom: 180px;
    }

    /* 按钮栏：取消、登陆 */
    .login-btns {
      padding-top: 40px;

      .el-button {
        width: 336px;
        height: 40px;
        font-size: 16px;
        border-radius: 2px;
        letter-spacing: 5px;
        margin-bottom: 22px;
        box-shadow: 2px 2px 4px 0 rgba(46, 78, 218, 0.21);
      }
    }
  }

</style>
