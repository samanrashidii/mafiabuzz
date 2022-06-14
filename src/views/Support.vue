<template>
  <div class="support-us center-aligned">
    <PageBox>
      <div class="support-box">
        <img
          width="100"
          class="support-icon"
          src="@/assets/images/support.svg"
          alt="Heart Icon"
        >
        <p class="has-small-top-margin">
          {{ $t('pages.about.thanksForSupport') }}
        </p>
        <div class="text-center">
          <a
            href="https://ko-fi.com/J3J11323A"
            target="_blank"
            class="d-inline-block has-top-margin"
          >
            <img
              width="200"
              src="https://az743702.vo.msecnd.net/cdn/kofi4.png?v=2"
              border="0"
              alt="Buy Us a Coffee at ko-fi.com"
            >
          </a>
        </div>
      </div>
    </PageBox>
  </div>
</template>

<script>
export default {
  name: 'Support'
}
</script>
