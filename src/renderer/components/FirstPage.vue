<template>
  <div>
    <div>
      <label>游戏风格</label>
      <select v-model='gamestyle_selected' @change='gamestyle_change'>
        <option v-for='opt in gamestyle_options' :key='opt.id' v-bind:value='opt.value'>{{opt.text}}</option>
      </select>
    </div>
    <div>
      <label>名称</label>
      <input type='text' v-model='housename' @change='housename_change' />
    </div>
    <div>
      <label>描述</label>
      <input type='text' v-model='description' @change='description_change' />
    </div>
    <div>
      <label>密码</label>
      <input type='text' v-model='password' @change='password_change' />
    </div>
    <div>
      <label>游戏模式</label>
      <select v-model='gamemode_selected' @change='gamemode_change'>
        <option v-for='opt in gamemode_options' :key='opt.id' v-bind:value='opt.value'>{{opt.text}}</option>
      </select>
    </div>
    <div>
      <label>PVP</label>
      <select v-model='ispvp_selected' @change='ispvp_change'>
        <option v-for='opt in ispvp_options' :key='opt.id' v-bind:value='opt.value'>{{opt.text}}</option>
      </select>
    </div>
    <div>
      <label>最大玩家数</label>
      <select v-model='maxplayers_selected' @change='maxplayers_change'>
        <option v-for='opt in maxplayers_options' :key='opt.id' v-bind:value='opt.value'>{{opt.text}}</option>
      </select>
    </div>
    <div>
      <label>服务器模式</label>
      <select v-model='servermode_selected' @change='servermode_change'>
        <option v-for='opt in servermode_options' :key='opt.id' v-bind:value='opt.value'>{{opt.text}}</option>
      </select>
    </div>
    <div>
      <label>无人时暂停</label>
      <select v-model='ispause_selected' @change='ispause_change'>
        <option v-for='opt in ispause_options' :key='opt.id' v-bind:value='opt.value'>{{opt.text}}</option>
      </select>
    </div>
    <div>
      <label>开启洞穴</label>
      <select v-model='iscave_selected' @change='iscave_change'>
        <option v-for='opt in iscave_options' :key='opt.id' v-bind:value='opt.value'>{{opt.text}}</option>
      </select>
    </div>
  </div>
</template>
//  ==========================  template ↑ script ↓ ==============================================
<script>
import { readFromFile, writeFile } from '@/js/baseSetDao';
import { BaseSet } from '@/js/baseSet';
import Vue from 'vue';

export default {
  name: 'first_page',
  computed: {
    baseset: function () {

      let basesetRe = readFromFile('./src/renderer/resources/cluster.ini');
      console.log(basesetRe);
      return basesetRe;
    }

  },
  data: function () {
    return {
      // 属性直接赋值 初始值占位
      gamestyle_selected: '',
      gamestyle_options: [],

      gamemode_selected: '',
      gamemode_options: [],

      ispvp_selected: false,
      ispvp_options: [],

      maxplayers_selected: 10,
      maxplayers_options: [],

      servermode_selected: false,
      servermode_options: [],

      ispause_selected: false,
      ispause_options: [],

      iscave_selected: false,
      iscave_options: [],

      housename: '',

      password: '',

      description: ''
    };
  },
  // hook created
  created: function () {

    this.housename = this.baseset.houseName;
    this.password = this.baseset.secret;
    this.description = this.baseset.describe;

    this.gamestyle_options = this.baseset.gamestyle_options;
    this.gamestyle_selected = this.baseset.gameStyle;

    this.gamemode_options = this.baseset.gamemode_options;
    this.gamemode_selected = this.baseset.gameMode;

    this.ispvp_options = this.baseset.ispvp_options;
    this.ispvp_selected = this.baseset.isPvP;

    this.maxplayers_options = this.baseset.maxplayers_options;
    this.maxplayers_selected = this.baseset.maxPlayers;

    this.servermode_options = this.baseset.servermode_options;
    this.servermode_selected = this.baseset.serverMode;

    this.ispause_options = this.baseset.ispause_options;
    this.ispause_selected = this.baseset.isPause;

    this.iscave_options = this.baseset.iscave_options;
    this.iscave_selected = this.baseset.isCave;
  },

  methods: {
    // 事件,方法 计算属性用get +方法
    gamestyle_change: function () {
      this.baseset.gameStyle = this.gamestyle_selected;
      writeFile('./src/renderer/resources/cluster1.ini', this.baseset);
    },
    // 事件,方法 计算属性用get +方法
    gamemode_change: function () {
      this.baseset.gameMode = this.gamemode_selected;
      writeFile('./src/renderer/resources/cluster1.ini', this.baseset);
    },
    ispvp_change: function () {
      this.baseset.isPvP = this.ispvp_selected;
      writeFile('./src/renderer/resources/cluster1.ini', this.baseset);
    },
    maxplayers_change: function () {
      this.baseset.maxPlayers = this.maxplayers_selected;
      writeFile('./src/renderer/resources/cluster1.ini', this.baseset);
    },
    servermode_change: function () {
      this.baseset.serverMode = this.servermode_selected;
      writeFile('./src/renderer/resources/cluster1.ini', this.baseset);
    },
    ispause_change: function () {
      this.baseset.isPause = this.ispause_selected;
      writeFile('./src/renderer/resources/cluster1.ini', this.baseset);
    },
    iscave_change: function () {
      this.baseset.isCave = this.iscave_selected;
      writeFile('./src/renderer/resources/cluster1.ini', this.baseset);
    },
    housename_change: function () {
      this.baseset.houseName = this.housename;
      writeFile('./src/renderer/resources/cluster1.ini', this.baseset);
    },
    password_change: function () {
      this.baseset.secret = this.password;
      writeFile('./src/renderer/resources/cluster1.ini', this.baseset);
    },
    description_change: function () {
      this.baseset.describe = this.description;
      writeFile('./src/renderer/resources/cluster1.ini', this.baseset);
    }
  }
};
</script>

<style>

</style>
