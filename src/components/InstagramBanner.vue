<template>
    <div class="instagram-banner">
        <img
            class="screenshot"
            src="@/assets/images/instagram-banner.png"
            alt=""
        >
        <img
            class="default-image-size sm has-xsmall-bottom-margin"
            src="@/assets/images/icons/instagram.svg"
            alt=""
        >
        <h3>{{ $t('general.instagramBanner.title') }}</h3>
        <BaseButton
            href="https://www.instagram.com/s/aGlnaGxpZ2h0OjE4MDcyNTI2ODEwMTc3MTk2?igshid=qojs3lcnml81"
            target="_blank"
            class="awesome sm"
        >
            <span>{{ $t('general.instagramBanner.button') }}</span>
        </BaseButton>
    </div>
</template>

<script>
export default {

}
</script>
