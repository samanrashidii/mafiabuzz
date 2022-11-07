<template>
  <a
    class="bttn"
    :href="link"
    :target="target"
  >
    <slot />
  </a>
</template>

<script>
export default {
  props: {
    link: {
      type: String,
      default: 'javascript:void(0)'
    },
    target: {
      type: String,
      default: '_self'
    }
  }
}
</script>
