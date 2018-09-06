<template>
    <div>
        <div id="textaudio1" @click="play"></div>
    </div>
</template>

<script>
import audio  from './wx-audio.js'
    export default {
        mixins: ['audio'],
        data() {
            return{
                wxAudio: null,
                play: false
            }
        },
        methods: {
            play() {
                if( play ){
                    this.wxAudio.audioPause()
                    this.play = false
                }else{
                    this.wxAudio.audioPlay()
                    this.play = true
                }
                
            }
        },
        mounted() {
            this.wxAudio = new Wxaudio({
                ele: '#textaudio1',
                title: 'Jar Of Love',
                disc: 'Break Me Up',
                src: 'http://jq22.qiniudn.com/ocean_drive_01.mp3',
                width: '320px'
            });
            // function play() {
            //     wxAudio.audioPlay()
            // }
        }
    }
</script>

<style scoped>
@import "./wx-audio.css";
</style>