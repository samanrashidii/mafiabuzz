<template>
    <div>
        <img class="has-bottom-margin" :src="require(`@/assets/images/icons/not-valid.png`)" :alt="$t('general.notValidIcon')" />
        <ul class="error-bullet">
            <li v-if="errorStatus.mafia">
                {{$t('pages.creator.errorText1')}} <span class="hint-color">{{mafiaNumbers}} </span> <strong class="mafia-role">{{$t('common.Mafia')}}</strong> {{$t('pages.creator.errorText2')}}
            </li>
            <li class="blue" v-if="errorStatus.citizens">
                {{$t('pages.creator.errorText1')}} <span class="hint-color">{{citizenNumbers}} </span> <strong class="citizen-role">{{$t('common.Citizen')}}</strong> {{$t('pages.creator.errorText2')}}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  props: {
    errorStatus: Object,
    mafiaNumbers: Number,
    citizenNumbers: Number,
  },
};
</script>
