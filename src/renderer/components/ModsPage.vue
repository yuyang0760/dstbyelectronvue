<template>
  <div class='container'>
    <div class='left'>
      <modItem :modname='modInfo.name' id='modItem' @foldername='sendfoldername' :showconfigpic='Object.keys(modInfo.configuration_options).length===0?false:true' :bchecked='modInfo.enabled' :foldername='foldername' v-for="(modInfo,foldername) in modInfos" :key="modInfo.id"></modItem>
      <!-- <div v-for='(item,key) in modInfos' :key='item.id'>{{item.name}}+'====='+{{key}}<button>123</button></div> -->
    </div>
    <div class='right'>
      {{clickedfoldername}} <br>
      <img :src='clickedSrc' :alt='clickAlt' /> <br>
      <span>{{clickModName}}</span> <br>
      <span>{{clickModAuthor}}</span> <br>
      <span>{{clickDesc}}</span> <br>
      <button v-show='configButtonShow'>配置</button>

      <div>
        <span></span>
        <span></span>
        <div :value='item.name' v-for='item in configuration_options' :key='item.id'>
          <span>{{item.label}}</span>
          <select v-model='item.current'>
            <option :value='itemo.data' v-for='itemo in item.options' :key='itemo.id'>{{itemo.description}}</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>
//  ==========================  template ↑ script ↓ ==============================================
<script>
import modItem from './ModItem/modItem.vue';
import { readFromFile_ModOverride } from '@/js/modDao';

let modsFolderPath = 'I:\\Program Files (x86)\\Steam\\steamapps\\common\\Don\'t Starve Together\\mods';
let modInfos = readFromFile_ModOverride('./src/renderer/resources/modoverrides.lua', modsFolderPath);

// console.log(modInfos);

export default {
  name: 'mods_page',
  components: { modItem },
  methods: {
    sendfoldername: function (foldername) {
      // console.log(modInfor);
      // console.log(foldername);
      this.clickedfoldername = foldername;    // 文件夹名字
      this.clickedSrc = '';
      this.clickAlt = modInfos[foldername]['name'];
      this.clickModName = modInfos[foldername]['name'];
      this.clickModAuthor = modInfos[foldername]['author'];
      this.clickDesc = modInfos[foldername]['description'];
      this.configButtonShow = Object.keys(modInfos[foldername].configuration_options).length;
      this.configuration_options = modInfos[foldername]['configuration_options'];
    }
  },
  computed: {
  },
  data: function () {
    return {
      modInfos: modInfos,
      showconfigpic: true,
      clickedfoldername: '',
      clickedSrc: '',
      clickAlt: '',
      clickModName: '',
      clickModAuthor: '',
      clickDesc: '',
      clickenabled: false,
      configButtonShow: false,
      configuration_options: {}
    }
  },
  created: function () {

  }

};
</script>
//  ==========================  style ↓ ==============================================
<style scoped>
.container {
  display: flex;
  flex-flow: row;
}
.left {
  flex: 1;
}
.right {
  flex: 2;
}

#modItem {
  background-color: rgb(231, 17, 17);
  font-size: 12px;
}
</style>
