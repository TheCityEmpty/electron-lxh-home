<template>
  <div id="wrapper">
    <div style="flex: 1;">
      <router-view></router-view>
    </div>
    <footer-nav></footer-nav>
  </div>
</template>

<script>
import FooterNav from '@/components/footer-nav.vue'
export default {
  name: 'index',
  components: { FooterNav },
  methods: {
    open (link) {
      this.$electron.shell.openExternal(link)
    }
  }
}
</script>

<style>
#wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
