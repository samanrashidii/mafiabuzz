<template>
    <div class="step-box">
        <p v-html="$t(`pages.creator.step${index}`)"></p>
        <select @change="calcVal" name="quantity" id="quantity" v-model.number="selectVal">
            <option v-for="(n, index) in value" :key="index">{{n + margin}}</option>
        </select>
    </div>
</template>

<script>
export default {
  data() {
    return {
      selectVal: 0,
    };
  },
  created() {
    this.selectVal = this.default;
  },
  props: {
    index: Number,
    value: Number,
    margin: Number,
    default: Number,
  },
  methods: {
    calcVal() {
      this.$emit('selectVal', this.selectVal);
    },
  },
};
</script>
