<template>
    <div class="box-loading" v-show="preloader">
        <div class="loading">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        preloader() {
            return this.$store.state.preloader.preloader;
        }
    }
}
</script>

<style scoped>
    .box-loading {
        position: fixed;
        height: 100vh;
        width: 100vw;
        background: #fff;
        z-index: 999;
        top: 0;
        left: 0;
    }
    .loading {
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .loading span {
        display: inline-block;
        width: 20px;
        height: 20px;
        border-radius: 10px;
        margin: 5px;
        animation: dots .6s cubic-bezier(0.6, 0.1, 1, 0.5) infinite alternate;
    }

    .loading span:nth-child(1) {
        background: #5c6bc0;
        animation-delay: 0.1s;
    }

    .loading span:nth-child(2) {
        background: #3949ab;
        animation-delay: 0.2s;
    }

    .loading span:nth-child(3) {
        background: #283593;
        animation-delay: 0.3s;
    }

    .loading span:nth-child(4) {
        background: #1a237e;
        animation-delay: 0.4s;
    }
    @keyframes dots {
        from {
            transform: translate3d(0, 0, 0);
        }
        to {
            transform: translate3d(0, 30px, 0);
        }
    }
</style>