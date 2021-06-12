<template>
    <div class="login">
        <div class="login_pic">
            <img src="@/assets/pic001.png" alt="">
        </div>
        <div class="login_box">

            <dv-border-box-8 :reverse="true">
                <div class="login_div">
                    <!-- <div class="login_title">登录</div> -->
                    <el-menu :default-active="'1'" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                        <el-menu-item index="1">监控端</el-menu-item>
                        <el-menu-item index="2">企业端</el-menu-item>
                    </el-menu>
                    <div class="line"></div>
                    <div class="login_ipt">
                        <input type="text" placeholder="请输入账号" v-model="username">
                    </div>
                    <div class="login_ipt">
                        <input type="password" placeholder="请输入密码" v-model="pwd">
                    </div>
                    <div class="login_check">
                        <el-checkbox v-model="checked">
                             已阅读并同意
                        </el-checkbox>
                        <span @click="readText" style="color:#409EFF; cursor:pointer">
                      《用户安全协议》
                        </span>
                        <p v-show="showWarning" style="color:red;">{{warningText}}</p>
                    </div>

                    <el-button type="primary" plain @click="clicklogin"><span style="font-weight:bold; font-size:20px;">登 录</span></el-button>
                </div>
            </dv-border-box-8>
        </div>
        <div>
        </div>
        <el-dialog title="用户安全协议" :visible.sync="dialogVisible" width="30%" :before-close="handleClose" :append-to-body='true'>
            <span>用户安全协议</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="onCancel">拒 绝</el-button>
                <el-button type="primary" @click="onSure">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            checked: false,
            dialogVisible: false,
            showWarning: false,
            userType:'1',
            username:'',
            pwd:'',
            warningText:''

        }
    },
    created(){
            sessionStorage.removeItem("userType");

    },
    methods: {
        readText() {
            this.dialogVisible = true;
        },
        onCancel() {
            this.checked = false;
            this.dialogVisible = false;

        },
        onSure() {
            this.showWarning = false
            this.checked = true;
            this.dialogVisible = false;
        },
        handleClose() {
            this.dialogVisible = false;
        },
        clicklogin() {
               if(this.username==''||this.pwd==''){
                this.warningText='请输入账号密码'
                this.showWarning = true
                return
            }
            if (!this.checked) {
                this.warningText='请勾选已阅读用户安全协议'
                this.showWarning = true
                return

            }
            if(this.username!='admin'||this.pwd!='123456'){
                this.warningText='账号密码错误'
                this.showWarning = true
                return
            }
            sessionStorage.removeItem("userType");
            if(this.userType=='1'){
                sessionStorage.setItem("userType", "admin");
                 this.$router.push({
                path: '/main',
            })
            }else{
                sessionStorage.setItem("userType", "company");
    this.$router.push({
                path: '/companyInfo',
            })
            }

        },
        handleSelect(key) {
                this.userType=key
        }
    },

}
</script>

<style lang="less" scoped>
.login {
    height: 100%;
    background: url("~@/assets/bg002.jpeg") no-repeat;
    background-size: cover;
    background-attachment: fixed;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .login_pic {
        width: 50%;
        height: 100%;
        text-align: center;
        img {
            padding-top: 100px;
            width: 500px;
        }
    }
    .login_box {
        padding-bottom: 100px;
        width: 320px;
        height: 400px;
        .login_div {
            padding: 40px 30px;
            display: flex;
            flex-direction: column;
            .login_title {
                color: #fff;
                font-weight: bold;
                font-size: 28px;
            }
            .login_ipt {
                margin-top: 32px;
                input {
                    color: #4cc6d5;
                    width: 100%;
                    height: 40px;
                    border: 1px solid #4cc6d5;
                    background-color: rgba(0, 255, 255, 0.14);
                    text-indent: 16px;
                    font-size: 20px;
                    outline: none;
                }
            }
            .login_check {
                margin-top: 20px;
                margin-bottom: 20px;
                font-size: 16px;
            }
        }
    }
}

/deep/.el-menu {
    background: none;
}
/deep/.el-menu--horizontal {
    border-bottom: none;
    .el-menu-item {
        color: #fff;
        font-size: 18px;
        background: none;
        &.is-active {
            font-weight: bold;
            color: #4cc6d5;
            font-size: 20px;

            background: none;
        }
        &:hover {
            background: none;
        }
    }
}
</style>