<template>
  <div
    class="list-item"
  >
    <ul>
      <li
        v-for="(item, index) in items"
        :key="index"
      >
        {{ item.text }}
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'ListItem',
  props: {
    items: {
      type: Array,
      default: () => []
    }
  }
}
</script>
