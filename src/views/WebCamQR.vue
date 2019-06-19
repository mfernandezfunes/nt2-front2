<template>
    <div class="container">
        <v-layout justify-center wrap>
            <v-flex md12>
                <div class="row">
                    <div class="col-md-6">
                        <div class="row">
                            <v-flex xs12 md12>
                                <qrcode-stream @decode="onDecode" @init="onInit" />
                            </v-flex>
                            <v-flex xs12 md12>
                                <v-toolbar dense>

                                    <h3><a v-bind:href=result>{{ result }}</a></h3>

                                </v-toolbar>
                            </v-flex>
                        </div>
                    </div>
                </div>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    import {
        QrcodeStream
    } from 'vue-qrcode-reader';
    import axios from "axios";

    export default {
        components: {
            QrcodeStream,
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