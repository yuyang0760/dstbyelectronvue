<template>
  <div>
    <selectwithpic :src='v_items.pic' :id='v_items.ID' @selectedinfo='whichselected' :yvalue='v_items.value' :alt='v_items.desc' :option='v_items.option' v-for='(v_items,k_items) in items' :key='k_items'></selectwithpic>
  </div>
</template>
//  ==========================  template ↑ script ↓ ==============================================
<script>
import Vue from 'vue';
import { readFromFile, writeFile } from '@/js/worldDao';
import { worldmap, worldInterface } from '@/js/world';
import selectwithpic from './SelectWithPic/SelectWithPic.vue';

// console.log(this.worldi);
let map = new Map();
map.set('mst', {
  filePath: './src/renderer/resources/worldgenoverride-master.lua',
  forestOrCave: 'forest'
});
let worldi = readFromFile(map);
let items = worldi['world']['mst']['data'];

export default {
  name: 'second_page',
  components: { selectwithpic },    // selectwithpic组件
  data: function () {
    return {
      items: items,                 // items 用于显示的数据
      worldi: worldi
    };
  },
  computed: {

  },
  created: function () {            // 在created时 显示

  },
  methods: {                        // 每次点击select选项时,改变属性worldi的值,之后用于写入文件
    whichselected: function (selectedinfo) {
      console.log(selectedinfo['id'], selectedinfo['selectedvalue']);
      this.worldi.world['mst'].data[selectedinfo['id']].value = selectedinfo['selectedvalue'];
      // console.log(this.worldi);
      // writeFile(this.worldi);

    }
  }
}
</script>

<style>

</style>
