<template>
    <div class="log-events">
        <template v-if="!log.passiveLog && !log.godLog">
            <span :class="{'mafia-role': log.mafia, 'citizen-role': !log.mafia}">{{log.attacker}}</span> used
            " <span class="action-color">{{log.action}}</span> " on 
            <span :class="{'mafia-role': log.targetMafia, 'citizen-role': !log.targetMafia, 'binded': log.action == 'Bind'}">{{log.target}}</span>
            <!-- Police Check Result (Normal and Invisible) -->
            <i v-if="log.status.invisible && log.ability.playerChecker"> but result is <span :class="{'citizen-role':log.targetMafia}">Citizen</span> because of " <span :class="{'site-color':true}">{{log.targetPassive}}</span> "</i>
            <i v-else-if="!log.status.invisible && log.ability.playerChecker"> and result is <span :class="{'mafia-role':log.targetMafia, 'citizen-role':!log.targetMafia}"><span>{{log.targetMafia ? 'Mafia' : 'Citizen'}}</span></span></i>
            <!-- Chef Check Result -->
            <i v-if="log.ability.roleChecker && log.ability.roleChecker"> and result is " <span :class="{'site-color':true}">{{log.targetRole}}</span> "</i>
            <!-- Cupid Link Result -->
            <i v-if="log.ability.binder"> and <span :class="{'binded': log.target2 != null}">{{log.target2}}</span></i>
        </template>
        <template v-else-if="log.godLog">
            <span class="creator-color">{{log.attacker}}</span> has 
            " <span class="action-color">{{log.action}}</span> " 
            <span :class="{'mafia-role': log.targetMafia, 'citizen-role': !log.targetMafia, 'binded': log.action == 'Bind'}">{{log.target}}</span>
        </template>
        <template v-else>
            <span :class="{'mafia-role': log.targetMafia, 'citizen-role': !log.targetMafia}">{{log.target}}</span> passive activated : 
            <br />
            " <span :class="{'site-color':true}">{{log.passive}}</span> "
        </template>
    </div>
</template>

<script>
export default {
    props:{
        log:{
            type: Object
        }
    }
}
</script>

<style>

</style>
