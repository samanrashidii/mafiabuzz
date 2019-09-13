<template>
  <div class="note-box">
    <img
      class="has-xsmall-bottom-margin"
      :src="getImgUrl('/icons', $t('general.warning'))"
      :alt="$t('general.infoIcon')"
    >
    <h3>{{ $t('pages.creator.checkBeforeStart') }}</h3>
  </div>
</template>

<script>
import getImg from '@/mixins/getImg';
export default {
  mixins: [
    getImg
  ]
}
</script>
