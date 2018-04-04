<template>
  <div>
    <modItem :modname='modname'  :bchecked='true'></modItem>
  </div>
</template>
 
<script>
import modItem from './ModItem/modItem.vue';
import { readFromFile_modInfo } from '@/js/modDao';

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

    let modinfo = readFromFile_modInfo('./src/renderer/resources/modinfo.lua');
    console.log(modinfo);
  }

};
</script>

<style>

</style>
