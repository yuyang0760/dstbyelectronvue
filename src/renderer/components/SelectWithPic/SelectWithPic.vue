<template>
  <div>
    <img :src='src+".png"' :alt='alt' />
    <select v-model='vvalue' @change='sendvalue'>
      <option v-for='(v_opt,k_opt) in option' :key='k_opt' v-bind:value='k_opt'>{{v_opt}}</option>
    </select>
  </div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'landing-page',
  methods: {
    open(link) {
      this.$electron.shell.openExternal(link);
    },
    sendvalue: function () {
      this.$emit('selectedinfo', { selectedvalue: this.vvalue, id: this.id })
    }
  },
  props: {
    src: String,
    alt: String,
    option: Object,
    yvalue: String,
    id: String
  },
  data: function () {

    return {
      vvalue: this.yvalue
    }
  }
});
</script>

<style>

</style>
