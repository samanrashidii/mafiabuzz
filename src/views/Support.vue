<template>
  <div class="support-us center-aligned">
    <PageBox>
      <div class="support-box">
        <img
          width="100"
          class="support-icon"
          src="@/assets/images/icons/heart.svg"
          alt="Heart Icon"
        >
        <p class="has-small-top-margin">
          {{ $t('pages.about.thanksForSupport') }}
        </p>
        <div class="d-flex justify-content-between equal-buttons">
          <AppButton
            class="bttn square-circle btn-center mt-0"
            link="https://reymit.ir/mafiabuzz"
            target="_blank"
          >
            {{ $t('pages.about.supportButton') }}
          </AppButton>
          <a
            href="https://ko-fi.com/J3J11323A"
            target="_blank"
          >
            <img
              width="100%"
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
