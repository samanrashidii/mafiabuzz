<template>
    <div class="overlay">
        <div class="inner-overlay">
            <div class="overlay-box">
                <div class="inner-overlay-box">
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>

.overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	overflow-y: auto;
	visibility: hidden;
	opacity: 0;
	background: $transparent_black;
	z-index: 999999;
    transition: all .2s ease-in-out;
    .inner-overlay {
        display: table;
        width: 100%;
        height: 100%;
        .overlay-box {
            display: table-cell;
            vertical-align: middle;
            font-size: $font_size_4;
            text-align: center;
            padding: 20px;
            .inner-overlay-box {
                position: relative;
                max-width: 780px;
                margin: auto;
                border-radius: 2px;
            }
        }
    }
    &.active{
        visibility: visible;
	    opacity: 1;
    }
    &.dialog{
        top:1%;
        left:1%;
        width: 98%;
        height: 98%;
        overflow-y: hidden;
        border-radius: 6px;
        background:rgba(0, 0, 0, 0.97);
    }
    &.log{
        top: 50%;
        left: 50%;
        width: 240px;
        height: 240px;
        margin: -120px 0 0 -120px;
        overflow-y: hidden;
        border-radius: 50%;
        background: rgba(0, 0, 0, 0.95);
        transform:scale(0,0);
        &.active{
            transform:scale(1,1);
        }
    }
}

</style>

