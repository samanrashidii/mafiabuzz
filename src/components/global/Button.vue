<template>
    <a class="bttn" href="javascript:void(0)">
         <slot></slot>
    </a>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>

a.bttn{
    display:block;
    color:$color_1;
    text-align: center;
    padding:10px;
    margin-top:15px;
    background-color:$background_color_3;
    border-radius: 2px;
    transition:all .2s ease-in-out;
    &:hover{
        background-color: $green_color;
    }
    &.active{
        background-color: $creator_color;
        &:hover{
            background-color: $green_color;
        }
    }
}

</style>

