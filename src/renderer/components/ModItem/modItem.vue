<template>
    <div>
        <img :src='modsrc+".png"' />
        <span>{{modname}}</span>
        <span>{{checked}}</span>
        <img :src='configsrc' v-show='true' />
        <input type='checkbox' v-model='checked' />
    </div>
</template>

<script>

export default {
    name: 'moditem_page',
    methods: {

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
        bchecked: Boolean
    }
};
</script>

<style>

</style>
