<template>
  <div class="footer">
    <div class="tool-left">
      <ul class="">
        <li v-for="(item, index) in toolLeft" class="items" :key="index">
          <svg-resolve :path="item.icon" fillHover="#f00" :width="24" :height="24"></svg-resolve>
        </li>
      </ul>

      <ul class="current-pages">
        <li>2222222222</li>
      </ul>
    </div>

    <ul class="tool-right">
      <li>3333333333</li>
    </ul>
  </div>
</template>

<script>
import SvgResolve from '@/components/utils/svg-resolve'

export default {
  components: {
    SvgResolve
  },
  data () {
    return {
      toolLeft: [
        {
          icon: '/static/imgs/tool.svg',
          alt: '工具'
        }
      ]
    }
  }
}
</script>

<style lang="less" scope>
.footer {
  background-color: rgba(27, 42, 43, 1);
  height: 40px;
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;

  img {
    width: 18px;
  }

  .tool-left {
    display: flex;
    flex-grow: 1;
    height: inherit;
  }

  .current-pages {

  }

  .tool-right {

  }

  .items {
    padding: 0 10px;
    height: 100%;
    display: flex;
    align-items: center;
  }

  .items:hover {
    background-color: rgba(255, 255, 255, 0.12);
  }
}
</style>
