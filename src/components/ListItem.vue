<template>
  <div class="list-item">
    <ul>
      <li
        v-for="(item, index) in list"
        :key="index"
      >
        {{ item.text }}
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  props: {
    list: Array
  }
}
</script>
