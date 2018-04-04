<template>
  <div>
    <modItem :modname='modInfo.name' :bchecked='true' v-for="modInfo in modInfos" :key="modInfo.id"></modItem>
    <!-- <div v-for='item in modInfos' :key='item.id'>{{item.name}}</div> -->
  </div>
</template>
 
<script>
import modItem from './ModItem/modItem.vue';
import { readFromFile_modInfo, readFromFile_AllModInfo } from '@/js/modDao';

export default {
  name: 'mods_page',
  components: { modItem },
  methods: {
  },
  computed: {
  },
  data: function () {
    return {
      modInfos: []
    }
  },
  created: function () {
    // 1. 取出所有mod,来显示
    let modsFolderPath = 'I:\\Program Files (x86)\\Steam\\steamapps\\common\\Don\'t Starve Together\\mods';
    this.modInfos = readFromFile_AllModInfo(modsFolderPath);
    console.log(this.modInfos);

  }

};
</script>

<style>

</style>
