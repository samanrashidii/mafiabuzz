<template>
    <div class="roles">
        <div class="info-box" :class="{'active': info.show}">
            <a href="javascript:void(0)" @click="info.show = false"></a>
            <img :src="getImgUrl(info.icon)" alt="">
            <h2>{{info.name}}</h2>
            <div class="mafia-status">
                <strong class="mafia-role" v-if="info.mafia">mafia</strong>
                <strong class="citizen-role" v-else>citizen</strong>
            </div>
            <p>{{info.description}}</p>
        </div>
        <ul class="has-clear-fix">
            <li v-for="(role, index) in Roles" :key="index" :class="{'mafia': role.mafia}">
                <input @change="checkRoles(role.name)" type="checkbox" name="roles" :id="`role_${index+1}`" :value="roleControl(role.name, role.mafia, role.power)" v-model="selectedRoles" />
                <label :for="`role_${index+1}`">
                    <div class="inner-label">
                        <img :src="getImgUrl(role.icon)" :alt="role.alt" />
                        <strong>{{role.name}} <span v-if="checkNumbers(role.name)">x <i>{{role.name == 'Mafia' ? normalMafia : normalCitizen}}</i></span></strong>
                    </div>
                </label>
                <div class="number-control" v-if="checkNumbers(role.name)">
                    <span @click="decrNumber(role.name, role.mafia, role.power)">-</span>
                    <span @click="incrNumber(role.name, role.mafia, role.power)">+</span>
                </div>
                <a @click="showInfo(role.name, role.icon ,role.description, role.mafia)" class="info" href="javascript:void(0)"></a>
            </li>
        </ul>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
    data(){
        return {
            selectedRoles: [],
            normalMafia: 0,
            normalCitizen: 0,
            info: {
                show: false,
                name: "Default",
                description: "Default Description",
                icon: "default.png",
                mafia: false
            }
        }
    },
    computed:{
        ...mapGetters([
            'Roles',
        ])
    },
    methods:{
        getImgUrl(pic) {
            return require(`@/assets/images/roles/${pic}`);
        },
        roleControl(name,role,power){
            return {
                name : name,
                mafia : role,
                power : power
            }
        },
        checkRoles(role){
            if(role == 'Mafia' && this.normalMafia == 0){
                this.normalMafia = 1;
            } else if(role == 'Mafia' && this.normalMafia >= 1){
                this.normalMafia = 0;
                this.selectedRoles = this.selectedRoles.filter(value => value.name != role);
            } else if(role == 'Citizen' && this.normalCitizen == 0){
                this.normalCitizen = 1;
            } else if(role == 'Citizen' && this.normalCitizen >= 1){
                this.normalCitizen = 0;
                this.selectedRoles = this.selectedRoles.filter(value => value.name != role);
            }
            this.$emit('selectedRoles', this.selectedRoles);
        },
        checkNumbers(role){
            if(this.normalMafia > 0 && role == 'Mafia'){
                return true;
            } else if(this.normalCitizen > 0 && role == 'Citizen'){
                return true;
            } else {
                return false;
            }
        },
        incrNumber(role, mafia, power){
            let $roles = this.selectedRoles;
            if(role == 'Mafia'){
                if(this.normalMafia < 10){
                    this.normalMafia++;
                    $roles.push(this.roleControl(role, mafia, power));
                }
                
            } else if(role == 'Citizen'){
                if(this.normalCitizen < 20){
                    this.normalCitizen++;
                    $roles.push(this.roleControl(role, mafia, power));
                }
            }
        },
        decrNumber(role, mafia, power){
            let $roles = this.selectedRoles;
            if(this.normalCitizen > 1 && role == 'Citizen'){
                for(let el of $roles) {
                    if(el.name == role){
                        $roles.splice($roles.indexOf(el),1);
                        break;
                    }
                }
                this.normalCitizen--;
            }
            if(this.normalMafia > 1 && role == 'Mafia'){
                for(let el of $roles) {
                    if(el.name == role){
                        $roles.splice($roles.indexOf(el),1);
                        break;
                    }
                }
                this.normalMafia--;
            }
        },
        showInfo(name, icon, description, mafia){
            this.info.name = name;
            this.info.icon = icon;
            this.info.description = description;
            this.info.mafia = mafia;
            this.info.show == false ? this.info.show = true : this.info.show = false;
        }
    }
}
</script>

<style lang="scss" scoped>

.roles{margin-top:15px;}
.roles li{
    position: relative;
    float: left;
    width:48%;
    margin:4% 0 0 4%;
    &:nth-child(2n+1){
        margin-left:0;
    }
}

.roles li label{
    display: table;
    width: 100%;
    height: 144px;
    font-family: $font_mafia;
    font-size: $font_size_big;
    color:$color_1;
    text-align: center;
    padding:5px 7px;
    cursor: pointer;
    background-color: $background_color_citizen;
    border:3px solid $black_color;
    border-radius: 2px;
    transition:all .3s ease-in-out;
    > div{
        display: table-cell;
        vertical-align: middle;
        strong{
            display: block;
            margin-top:5px;
            span{
                display: block;
                font-family: $font_normal;
                font-size: $font_size_6;
                color:$color_1;
                transition:all .3s ease-in-out;
                i{font-size: $font_size_8;}
            }
        }
    }
}

.roles li.mafia label{background-color:$background_color_mafia;}

.roles li input{display: none;}

.number-control span{
    position:absolute;
    top:50%;
    left:-12px;
    display: block;
    width:30px;
    height: 30px;
    line-height: 24px;
    font-family: $font_normal;
    font-size: $font_size_9;
    color:$color_1;
    text-align: center;
    margin-top:-15px;
    cursor: pointer;
    background-color: $black_color;
    border:1px solid $color_1;
    border-radius: 50%;
    transition:all .2s ease-in-out;
    z-index: 99;
    &:active{
        transform: scale(.6,.6);
        border-color:$black_color;
    }
    &:last-child{
        left:auto;
        right:-12px;
    }
    
}


</style>
