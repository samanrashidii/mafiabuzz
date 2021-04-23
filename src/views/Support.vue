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
        <div class="d-flex justify-content-between equal-buttons">
          <AppButton
            class="bttn support-bttn blue square-circle lg-fontsize btn-center mt-0"
            link="https://reymit.ir/mafiabuzz"
            target="_blank"
          >
            <span>
              {{ $t('pages.about.supportButton') }}
            </span>
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
