<template>
    <div class="login-form">
        <div class="g-form">
            <div class="g-form-line">
                <span class="g-form-label">用户名：</span>
                <div class="g-form-input">
                    <input type="text" v-model="usernameModel" placeholder="请输入用户名">
                </div>
                <span class="g-form-error">{{userErrors.errorText}}</span>
            </div>
            <div class="g-form-line">
                <span class="g-form-label">密码：</span>
                <div class="g-form-input">
                    <input type="password" v-model="passwordModel" placeholder="请输入密码">
                </div>
                <span class="g-form-error">{{ passwordErrors.errorText }}</span>
            </div>
            <div class="g-form-line">
                <div class="g-form-btn">
                    <a class="button" @click="onLogin">登录</a>
                </div>
            </div>
            <p>{{ errorText }}</p>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      usernameModel: "",
      passwordModel: "",
      errorText: ""
    };
  },
  computed: {
    userErrors() {
      let errorText, status;
      if (!/@/g.test(this.usernameModel)) {
        status = false;
        errorText = "不包含@";
      } else {
        status = true;
        errorText = "";
      }
      if (!this.userFlag) {
        errorText = "";
        this.userFlag = true;
      }
      return {
        status,
        errorText
      };
    },
    passwordErrors() {
      let errorText, status;
      if (!/^\w{8,16}$/g.test(this.passwordModel)) {
        status = false;
        errorText = "密码为8-16位";
      } else {
        status = true;
        errorText = "";
      }
      if (!this.passwordFlag) {
        errorText = "";
        this.passwordFlag = true;
      }
      return {
        status,
        errorText
      };
    }
  },
  methods: {
    onLogin() {
      if (!this.userErrors.status || !this.passwordErrors.status) {
        this.errorText = "用户名或密码未通过";
      } else {
        this.errorText = "";
        this.$http.get("http://localhost:3000/login")
        .then((res) => {
            this.$emit("has-log", res.data);
          }, (error) => {
            console.log(error);
          }
        );
      }
    }
  }
};
</script>

<style scoped>
.g-form {
    
}

.g-form-line {
  padding: 15px 0;
}

.g-form-label {
  width: 100px;
  font-size: 16px;
  display: inline-block;
}

.g-form-input {
  display: inline-block;
}

.g-form-input input {
  height: 30px;
  width: 200px;
  line-height: 30px;
  vertical-align: middle;
  padding: 0 10px;
  border: 1px solid #ccc;
}

.g-form-btn {
  padding-left: 100px;
}

.g-form-error {
  color: red;
  padding-left: 15px;
}
</style>
