<template>
  <div>
    <modItem :modname='modname'  :bchecked='true'></modItem>
  </div>
</template>
 
<script>
import modItem from './ModItem/modItem.vue';
import { readFromFile_modInfo, readFromFile_AllModInfo } from '@/js/modDao';

export default {
  name: 'mods_page',
  components: { modItem },
  methods: {
    open(link) {
      this.$electron.shell.openExternal(link);
    }
  },
  data: function () {
    return {
      modname: '饥荒mod'
    }
  },
  created: function () {

    // let modinfo = readFromFile_modInfo('./src/renderer/resources/modinfo.lua');
    // console.log(modinfo);
    let modsFolderPath = 'I:\\Program Files (x86)\\Steam\\steamapps\\common\\Don\'t Starve Together\\mods';
    let allModInfo = readFromFile_AllModInfo(modsFolderPath);
    console.log(allModInfo);
  }

};
</script>

<style>

</style>
