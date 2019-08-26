<template>
  <div class="note-box">
    <img
      class="has-xsmall-bottom-margin"
      :src="require(`@/assets/images/icons/info.png`)"
      :alt="$t('general.infoIcon')"
    >
    <h3>{{ $t('pages.creator.checkBeforeStart') }}</h3>
  </div>
</template>

<script>
export default {

};
</script>

<style lang="scss" scoped>

.note li{
    font-size: $font_size_3;
    color:$color_6;
    margin-bottom:12px;
    &::before{
        content:'*';
        display: inline-block;
        vertical-align: middle;
        margin-right: 7px;
    }
}

</style>
