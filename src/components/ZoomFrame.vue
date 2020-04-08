<template>
  <div class="iframe-container">
    <meta charset="utf-8">
    <link type="text/css" rel="stylesheet" href="https://dmogdx0jrul3u.cloudfront.net/1.3.7/css/bootstrap.css">
    <link
      type="text/css"
      rel="stylesheet"
      href="https://dmogdx0jrul3u.cloudfront.net/1.3.7/css/react-select.css"
    >

    <meta name="format-detection" content="telephone=no">
  </div>
</template>
<script>
// import { ZoomMtg } from "zoomus-jssdk";

// console.log("checkSystemRequirements");
// console.log(JSON.stringify(ZoomMtg.checkSystemRequirements()));

// // CDN version default
// ZoomMtg.setZoomJSLib('https://dmogdx0jrul3u.cloudfront.net/1.4.2/lib', '/av'); 
// ZoomMtg.preLoadWasm();
// ZoomMtg.prepareJssdk();

var API_KEY = "JOhVkSudQyK9Y2ejfURPHQ"
var API_SECRET = "WMYMM0WUjdJLKiaK8B44Yd0OhiHgo8LefTJ9"

export default {
    name: "ZoomFrame",
    data: function() {
        return {
            src: "",
            meetConfig: {},
            signature: {}
        };
    },
    props: {
        meetingId: String,
        leaveUrl: String,
    },
    created: function() {
        // Meeting config object
        this.meetConfig = {
            apiKey: API_KEY,
            apiSecret: API_SECRET,
            meetingNumber: this.meetingId,
            userName: this.$root.profile.name,
            passWord: "",
            leaveUrl: this.leaveUrl,
            role: 0
        };
        // Generate Signature function
        this.signature = ZoomMtg.generateSignature({
            meetingNumber: this.meetConfig.meetingNumber,
            apiKey: this.meetConfig.apiKey,
            apiSecret: this.meetConfig.apiSecret,
            role: this.meetConfig.role,
            success: function(res) {
                console.log("success signature: " + res.result);
            }
        });
        // join function
        ZoomMtg.init({
            leaveUrl: this.leaveUrl,
            isSupportAV: true,
            success: () => {
                ZoomMtg.join({
                    meetingNumber: this.meetConfig.meetingNumber,
                    userName: this.meetConfig.userName,
                    signature: this.signature,
                    apiKey: this.meetConfig.apiKey,
                    userEmail: this.$root.profile.email,
                    passWord: this.meetConfig.passWord,
                    success: function(res) {
                        console.log("join meeting success");
                    },
                    error: function(res) {
                        console.log(res);
                    }
                });
            },
            error: function(res) {
                console.log(res);
            }
        });
    },
    mounted: function() {}
};
</script>