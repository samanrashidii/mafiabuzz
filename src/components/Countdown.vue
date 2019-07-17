<template>
    <strong class="time-tracker">
        <strong :class="{'finished': timeFinished}">{{timeLeft}}</strong>
    </strong>
</template>

<script>
var intervalTimer;

export default {
    props:{
        dayTime:{}
    },
    data(){
        return {
            timeLeft: '',
            timeFinished: false,
            endTime: '0',
        };
    },
    created(){
        this.setTime(this.dayTime);
    },
    methods: {
        setTime(seconds) {
            this.timer(seconds);
        },
        timer(seconds) {
            const now = Date.now();
            const end = now + seconds * 1000;
            this.displayTimeLeft(seconds);
            this.countdown(end);
        },
        countdown(end) {
            intervalTimer = setInterval(() => {
                const secondsLeft = Math.round((end - Date.now()) / 1000);
                if(secondsLeft === 0) {
                    this.endTime = 0;
                    this.timeFinished = true;
                }
                if(secondsLeft < 0) {
                    clearInterval(intervalTimer);
                    return;
                }
                this.displayTimeLeft(secondsLeft)
            }, 1000);
        },
        displayTimeLeft(secondsLeft) {
            const minutes = Math.floor((secondsLeft % 3600) / 60);
            const seconds = secondsLeft % 60;
            this.timeLeft = `${zeroPadded(minutes)}:${zeroPadded(seconds)}`;
        },
    }
}

function zeroPadded(num) {
  return num < 10 ? `0${num}` : num;
}

</script>
