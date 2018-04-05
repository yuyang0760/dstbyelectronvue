<template>
  <div>
    <modItem :modname='modInfo.name' @foldername='sendfoldername' :bchecked='modInfo.enabled' :foldername='foldername' v-for="(modInfo,foldername) in modInfos" :key="modInfo.id"></modItem>
    <!-- <div v-for='(item,key) in modInfos' :key='item.id'>{{item.name}}+'====='+{{key}}</div> -->
  </div>
</template>
//  ==========================  template ↑ script ↓ ==============================================
<script>
import modItem from './ModItem/modItem.vue';
import { readFromFile_ModOverride } from '@/js/modDao';

let modsFolderPath = 'I:\\Program Files (x86)\\Steam\\steamapps\\common\\Don\'t Starve Together\\mods';
let modInfos = readFromFile_ModOverride('./src/renderer/resources/modoverrides.lua', modsFolderPath);

console.log(modInfos);

export default {
  name: 'mods_page',
  components: { modItem },
  methods: {
    sendfoldername: function (foldername) {
      // console.log(modInfor);
      console.log(foldername);
    }
  },
  computed: {
  },
  data: function () {
    return {
      modInfos: modInfos
    }
  },
  created: function () {

  }

};
</script>
//  ==========================  style ↓ ==============================================
<style>

</style>
