<template>
  <div
    class="note-box"
  >
    <img
      src="@/assets/images/icons/warning.svg"
      class="has-xsmall-bottom-margin"
      :alt="$t('general.infoIcon')"
    >
    <h3>
      {{ $t('pages.home.checkBeforeStart') }}
    </h3>
  </div>
</template>

<script>
export default {
  name: 'NoteBox'
}
</script>
