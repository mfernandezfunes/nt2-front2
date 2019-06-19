<template>
    <div class="container">
        <v-layout justify-center wrap>
            <div>
                <p>
                    Funcion de Trackeo:
                    <select v-model="selected">
                        <option v-for="option in options" :value="option">
                            {{ option.text }}
                        </option>
                    </select>
                </p>

                <p class="decode-result">
                    Resultado leido del QR: <b>{{ result }}</b>
                </p>
                <qrcode-stream :track="paintBlueDots" @decode="onDecode" @init="onInit" />
            </div>
        </v-layout>
    </div>
</template>

<script>
    import {
        QrcodeStream,
        QrcodeDropZone,
        QrcodeCapture
    } from 'vue-qrcode-reader';

    import axios from "axios";

    export default {
        components: {
            QrcodeStream,
            QrcodeDropZone,
            QrcodeCapture
        },
        data() {
            return {
                result: '',
                error: '',
                selected: ''
            }
        },

        methods: {
            onDecode(result) {
                this.result = result
            },
            paintBlueDots(location, ctx) {
                const {
                    topLeftFinderPattern,
                    topRightFinderPattern,
                    bottomLeftFinderPattern
                } = location

                const pointArray = [
                    topLeftFinderPattern,
                    topRightFinderPattern,
                    bottomLeftFinderPattern
                ]

                ctx.fillStyle = '#007bff'

                pointArray.forEach(({
                    x,
                    y
                }) => {
                    ctx.fillRect(x - 5, y - 5, 10, 10)
                })
            },


            async onInit(promise) {
                try {
                    await promise
                } catch (error) {
                    if (error.name === 'NotAllowedError') {
                        this.error = "ERROR: you need to grant camera access permisson"
                    } else if (error.name === 'NotFoundError') {
                        this.error = "ERROR: no camera on this device"
                    } else if (error.name === 'NotSupportedError') {
                        this.error = "ERROR: secure context required (HTTPS, localhost)"
                    } else if (error.name === 'NotReadableError') {
                        this.error = "ERROR: is the camera already in use?"
                    } else if (error.name === 'OverconstrainedError') {
                        this.error = "ERROR: installed cameras are not suitable"
                    } else if (error.name === 'StreamApiNotSupportedError') {
                        this.error = "ERROR: Stream API is not supported in this browser"
                    }
                }
            }
        }
    }
</script>
<style scoped>
    .error {
        font-weight: bold;
        color: red;
    }
</style>