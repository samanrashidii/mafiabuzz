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
        top:18%;
        left:2%;
        width: 96%;
        min-height: 410px;
        height: 64%;
        overflow-y: hidden;
        border-radius: 6px;
        background:rgba(0, 0, 0, 0.97);
    }
}

</style>

