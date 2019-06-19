<template>
    <div class="container">
        <v-layout justify-center wrap>
            <v-flex md12>
                <div class="row">
                    <div class="col-md-6">
                        <div class="row">
                            <v-flex xs12 md12>
                                <vue-web-cam ref="webcam" :device-id="deviceId" height="400"  @started="onStarted"
                                    @stopped="onStopped" @error="onError" @cameras="onCameras"
                                    @camera-change="onCameraChange" />
                            </v-flex>
                            <v-flex xs12 md12>
                                <select v-model="camera">
                                    <option>-- Seleccionar Dispositivo --</option>
                                    <option v-for="device in devices" :key="device.deviceId" :value="device.deviceId">
                                        {{ device.label }}</option>
                                </select>


                                <v-toolbar dense>
                                    <v-btn color="grey" @click="goBack">VOLVER <v-icon right dark>mdi-arrow-back
                                        </v-icon>
                                    </v-btn>
                                    <v-btn color="indigo" @click="enviarFoto" v-bind:disabled="!isPlaying">CAPTURAR <v-icon right dark>mdi-camera
                                        </v-icon>
                                    </v-btn>
                                    <v-btn color="danger" @click="onStop" v-bind:disabled="!isPlaying">PARAR <v-icon
                                            right dark>mdi-stop</v-icon>
                                    </v-btn>
                                    <v-btn color="success" @click="onStart" v-bind:disabled="isPlaying">INICIAR <v-icon
                                            right dark>mdi-play</v-icon>
                                    </v-btn>
                                </v-toolbar>
                            </v-flex>
                        </div>
                    </div>
                    <!--div class="col-md-6">
                        <h2>Captured Image</h2>
                        <figure class="figure">
                            <img :src="imgCam" class="img-responsive">
                        </figure>
                    </div-->
                </div>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    import { WebCam } from "vue-web-cam";
    
    import axios from "axios";
    import Swal from 'sweetalert2';
 
    export default {
        name: "App",
        components: {
            "vue-web-cam": WebCam
        },
        data() {
            return {
                personaId: null,
                imgCam: null,
                camera: null,
                deviceId: null,
                devices: [],
                isPlaying: false
            };
        },
        mounted() {
            this.personaId = this.$route.query.id
        },
        computed: {
            device: function () {
                return this.devices.find(n => n.deviceId === this.deviceId);
            }
        },
        watch: {
            camera: function (id) {
                this.deviceId = id;
            },
            devices: function () {
                // Once we have a list select the first one
                const [first, ...tail] = this.devices;
                if (first) {
                    this.camera = first.deviceId;
                    this.deviceId = first.deviceId;
                }
            }
        },
        methods: {
            onCapture() {
                this.imgCam = this.$refs.webcam.capture();
            },
            onStarted(stream) {
                console.log("On Started Event", stream);
                this.play(true)
            },
            onStopped(stream) {
                console.log("On Stopped Event", stream);
            },
            onStop() {
                this.$refs.webcam.stop();
                this.play(false)
            },
            onStart() {
                this.$refs.webcam.start();
                this.play(true)
            },
            onError(error) {
                console.log("On Error Event", error);
            },
            onCameras(cameras) {
                this.devices = cameras;
                console.log("On Cameras Event", cameras);
            },
            onCameraChange(deviceId) {
                this.deviceId = deviceId;
                this.camera = deviceId;
                console.log("On Camera Change Event", deviceId);
            },
            play: function (enable) {
                this.isPlaying = enable;
            },
            enviarFoto() {

                this.imgCam = this.$refs.webcam.capture();
                axios // agregar this.img para el post
                    .post(`${process.env.VUE_APP_ROOT_API}/persona/${this.personaId}/webcam/`, {
                        picture: this.imgCam
                    })
                    .then(response => {
                        Swal.fire({
                            type: 'success',
                            title: 'Se ha tomado con exito la foto',
                            showConfirmButton: false,
                            timer: 2500
                        })
                        this.goBack()

                    })
                    .catch(err => {
                        Swal.fire({
                            type: 'error',
                            title: 'Oops...',
                            text: 'Algo salio mal!',
                            footer: err
                        })
                    })
            },
            goBack() {
                window.history.length > 1 ?
                    this.$router.go(-1) :
                    this.$router.push('/')
            }
        }
    };
</script>