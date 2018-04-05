<template>
    <div @click="sendfoldername">
        <img :src='modsrc+".png"' />
        <span>{{modname}}</span>
        <span>{{checked?'启用':'禁用'}}</span>
        <img :src='configsrc+".png"' v-show='showconfigpic' />
        <input type='checkbox' v-model='checked' />
    </div>
</template>
//  ==========================  template ↑ script ↓ ==============================================
<script>

export default {
    name: 'moditem_page',
    methods: {
        sendfoldername: function () {
            this.$emit('foldername', this.foldername)
        }
    },
    computed: {

    },
    data: function () {
        return {
            checked: this.bchecked
        }
    },
    props: {
        modname: String,
        configsrc: String,
        modsrc: String,
        bchecked: Boolean,
        foldername: String,
        showconfigpic: Boolean
    }
};
</script>

<style>

</style>
