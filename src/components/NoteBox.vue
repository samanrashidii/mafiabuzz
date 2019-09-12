<template>
  <div class="note-box">
    <img
      class="has-xsmall-bottom-margin"
      :src="require(`@/assets/images/icons/warning.svg`)"
      :alt="$t('general.infoIcon')"
    >
    <h3>{{ $t('pages.creator.checkBeforeStart') }}</h3>
  </div>
</template>

<script>
export default {

};
</script>
