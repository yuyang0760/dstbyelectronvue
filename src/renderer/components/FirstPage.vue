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

<script>
import { readFromFile, writeFile } from '@/js/baseSetDao';
import { BaseSet } from '@/js/baseSet';
import Vue from 'vue';

let gamestyle_options = [
  { text: '交际', value: 'social' },
  { text: '合作', value: 'cooperative' },
  { text: '竞争', value: 'competitive' },
  { text: '疯狂', value: 'madness' }
];
let gamemode_options = [
  { text: '无尽', value: 'endless' },
  { text: '荒野', value: 'wilderness' },
  { text: '生存', value: 'survival' }
];
let ispvp_options = [
  { text: '是', value: 'true' },
  { text: '否', value: 'false' }
];
let maxplayers_options = [
  { text: '1', value: '1' },
  { text: '2', value: '2' },
  { text: '3', value: '3' },
  { text: '4', value: '4' },
  { text: '5', value: '5' },
  { text: '6', value: '6' },
  { text: '7', value: '7' },
  { text: '8', value: '8' },
  { text: '9', value: '9' },
  { text: '10', value: '10' },
  { text: '11', value: '11' },
  { text: '12', value: '12' },
  { text: '13', value: '13' },
  { text: '14', value: '14' },
  { text: '15', value: '15' },
  { text: '16', value: '16' },
  { text: '17', value: '17' },
  { text: '18', value: '18' },
  { text: '19', value: '19' },
  { text: '20', value: '20' }
];
let servermode_options = [
  { text: '在线', value: 'false' },
  { text: '离线', value: 'true' }
];
let ispause_options = [
  { text: '是', value: 'true' },
  { text: '否', value: 'false' }
];
let iscave_options = [
  { text: '是', value: 'true' },
  { text: '否', value: 'false' }
];

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

    this.gamestyle_options = gamestyle_options;
    this.gamestyle_selected = this.baseset.gameStyle;

    this.gamemode_options = gamemode_options;
    this.gamemode_selected = this.baseset.gameMode;

    this.ispvp_options = ispvp_options;
    this.ispvp_selected = this.baseset.isPvP;

    this.maxplayers_options = maxplayers_options;
    this.maxplayers_selected = this.baseset.maxPlayers;

    this.servermode_options = servermode_options;
    this.servermode_selected = this.baseset.serverMode;

    this.ispause_options = ispause_options;
    this.ispause_selected = this.baseset.isPause;

    this.iscave_options = iscave_options;
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
