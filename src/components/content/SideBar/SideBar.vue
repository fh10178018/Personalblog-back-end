<template>
  <div class="sidebar">
    <div class="left">
      <h2>sa</h2>
    </div>
    <div class="right">
      <MergeButton v-if="!$route.meta.keepAlive"
                   @leftclick="goBack"
                   @rightclick="goBackHome">
        <template v-slot:left>
          <i class="fa fa-backward"></i>
        </template>
        <template v-slot:center>
          <DropDown>
            <span><i class="fa fa-user-circle"></i></span>
            <template v-slot:dropdown>
              <drop-down-menu>
                <drop-down-item :type="'div'">登录为 <strong>{{userInfo.name}}</strong></drop-down-item>
                <drop-down-item :type="'div'">
                  <span class="user-identity-box">
                    {{userInfo.isAdmin?'管理员身份':'普通用户'}}
                  </span>
                </drop-down-item>
                <!-- <drop-down-item><i class="fa fa-gear" /> 设置</drop-down-item> -->
                <drop-down-item @click="handleLogout"><i class="fa fa-sign-out" /> 登出</drop-down-item>
              </drop-down-menu>
            </template>
          </DropDown>
        </template>
        <template v-slot:right>
          <i class="fa fa-home"></i>
        </template>
      </MergeButton>
    </div>
  </div>
</template>

<script>
import MergeButton from '@/components/common/Button/MergeButton.vue'
import { useStore } from 'vuex'
import { computed, unref } from 'vue'
import { useRouter } from 'vue-router'
import {
  DropDown,
  DropDownItem,
  DropDownMenu
} from '@/components/common/DropDown'

export default {
  name: 'SideBar',
  components: {
    MergeButton,
    DropDown,
    DropDownItem,
    DropDownMenu
  },
  setup () {
    const store = useStore()
    const router = useRouter()
    const userInfo = computed(() => unref(store.state.User.userInfo))

    const handleLogout = () => {
      store.dispatch('LogoutAction')
    }
    const goBack = () => {
      if (window.history.length <= 1) {
        router.push({ path: '/' })
        return false
      } else {
        router.go(-1)
      }
    }
    const goBackHome = () => {
      router.replace({ name: 'Home' })
    }
    return {
      userInfo,
      goBack,
      goBackHome,
      handleLogout
    }
  }
}
</script>

<style lang="less">
.sidebar {
  color: var(--main-font-color);
  grid-area: sidebar;
  background-color: var(--main-color);
  padding: 10px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .user-identity-box {
    border-radius: 6px;
    padding: 4px 8px;
    border: 1px solid var(--theme-color);
  }
}
</style>
