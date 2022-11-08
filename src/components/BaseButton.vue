<template>
  <a
    class="bttn"
    :href="link"
    :target="target"
    @click="$emit('clicked')"
  >
    <slot />
  </a>
</template>

<script>
export default {
  name: 'BaseButton',
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
