<template>
  <div
    class="instagram-banner"
  >
    <img
      src="@/assets/images/instagram-banner.png"  
      class="screenshot"
      alt="Instagram Mafiabuzz Banner"
    >
    <img
      src="@/assets/images/icons/instagram.svg"
      class="default-image-size sm has-xsmall-bottom-margin"
      alt="Instagram Icon"
    >
    <h3>
      {{ $t('general.instagramBanner.title') }}
    </h3>
    <BaseButton
      href="https://www.instagram.com/s/aGlnaGxpZ2h0OjE4MDcyNTI2ODEwMTc3MTk2?igshid=qojs3lcnml81"
      target="_blank"
      class="awesome sm"
    >
      <span>
        {{ $t('general.instagramBanner.button') }}
      </span>
    </BaseButton>
  </div>
</template>

<script>
export default {
  name: 'InstagramBanner'
}
</script>
