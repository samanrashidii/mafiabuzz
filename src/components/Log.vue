<template>
    <div class="log-events">
        <template v-if="!log.passiveLog && !log.godLog">
            <span :class="{'mafia-role': log.mafia, 'citizen-role': !log.mafia}">{{log.attacker}}</span> {{$t('god.logWordUsed')}}
            " <span class="action-color">{{$t(log.action)}}</span> " {{$t('god.logWordOn')}} 
            <span :class="{'mafia-role': log.targetMafia, 'citizen-role': !log.targetMafia, 'binded': log.action == 'Bind'}">{{log.target}}</span>
            <!-- Police Check Result (Normal and Invisible) -->
            <i v-if="log.targetInfo.status.invisible && log.ability.playerChecker"> {{$t('god.logWordBut')}} {{$t('god.logResult')}} <span :class="{'citizen-role':log.targetMafia}">{{$t('common.Citizen')}}</span> {{$t('god.logBecause')}} " <span :class="{'site-color':true}">{{$t(log.targetPassive)}}</span> "</i>
            <i v-else-if="!log.targetInfo.status.invisible && log.ability.playerChecker"> {{$t('god.logWordAnd')}} {{$t('god.logResult')}} <span :class="{'mafia-role':log.targetMafia, 'citizen-role':!log.targetMafia}"><span>{{log.targetMafia ? $t('common.Mafia') : $t('common.Citizen')}}</span></span></i>
            <!-- Chef Check Result -->
            <i v-if="log.ability.roleChecker && log.ability.roleChecker"> {{$t('god.logWordAnd')}} {{$t('god.logResult')}} " <span :class="{'site-color':true}">{{$t(log.targetRole)}}</span> "</i>
            <!-- Cupid Link Result -->
            <i v-if="log.ability.binder"> {{$t('god.logWordAnd')}} <span :class="{'binded': log.target2 != null}">{{log.target2}}</span></i>
        </template>
        <template v-else-if="log.godLog">
            <span class="creator-color">{{$t('god.name')}}</span> {{$t('god.logWordHas')}} 
            " <span class="action-color">{{$t(log.action)}}</span> " 
            <span :class="{'mafia-role': log.targetMafia, 'citizen-role': !log.targetMafia, 'binded': log.action == 'Bind'}">{{log.target}}</span>
        </template>
        <template v-else>
            <span :class="{'mafia-role': log.targetMafia, 'citizen-role': !log.targetMafia}">{{log.target}}</span> {{$t('god.logPassive')}} : 
            <br />
            " <span :class="{'site-color':true}">{{$t(log.passive)}}</span> "
        </template>
    </div>
</template>

<script>
export default {
    props:{
        log: Object
    }
}
</script>
