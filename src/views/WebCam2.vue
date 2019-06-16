<template>
  <div class="container">
    <div class="row">
      <div class="row">
        <div class="col-md-12">

          <v-select :items="devices" label="item.label" v-model="camera" outline>
          </v-select>

          <v-select v-model="camera">
            <option>-- Seleccionar Dispositivo --</option>
            <option v-for="device in devices" :key="device.deviceId" :value="device.deviceId">{{ device.label }}
            </option>
          </v-select>
        </div>
        <div class="col-md-12">
          <code v-if="rdevice">{{ device.label }}</code>
          <div class="border">
            <vue-web-cam ref="webcam" :device-id="deviceId" width="100%" @started="onStarted" @stopped="onStopped"
              @error="onError" @cameras="onCameras" @camera-change="onCameraChange" />
          </div>

          <v-flex xs12 md12>
            <v-toolbar dense>
              <v-btn color="indigo" @click="onCapture">CAPTURAR <v-icon right dark>mdi-camera</v-icon></v-btn>
              <v-btn color="danger" @click="onStop">PARAR <v-icon right dark>mdi-stop</v-icon></v-btn>
              <v-btn color="success" @click="onStart">INICIAR <v-icon right dark>mdi-play</v-icon></v-btn>
            </v-toolbar>
          </v-flex>
          
        </div>
      </div>

      <div class="col-md-6">
        <h6>Imagen Capturada</h6>
        <figure class="figure">
          <v-img :src="img"></v-img>
        </figure>
      </div>
    </div>
  </div>
</template>

<script>
  import { WebCam } from "vue-web-cam";
  export default {
    name: "App",
    components: {
      "vue-web-cam": WebCam
    },
    data() {
      return {
        img: null,
        camera: null,
        deviceId: null,
        devices: []
      };
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
        this.img = this.$refs.webcam.capture();
      },
      onStarted(stream) {
        console.log("On Started Event", stream);
      },
      onStopped(stream) {
        console.log("On Stopped Event", stream);
      },
      onStop() {
        this.$refs.webcam.stop();
      },
      onStart() {
        this.$refs.webcam.start();
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
      }
    }
  };
</script>