<template>
    <div class="col-md-5">
      <div class="well text-center invite-primary">
        <h3>Upload a CSV</h3>
        <p>You can upload a CSV of a list of developers / project managers here</p>
        <span class="input-file-csv-icn-group">
          <i class="ion-android-attach"></i>
          Browse for CSV file
        </span>
        <input type="file" class="input-file-csv">
        <button class="btn btn-primary">Upload</button>
        <p class="col-red text-center">
          <b>NOTE:</b> CSV format is indicated in the FAQ Section of Zeedas Platform. </p>
      </div>
    </div>
</template>

<script>

export default {
  name: 'upload-csv',
  props: [],
  methods: {
    // beforeClose() {
    //   modalShow.false(this)
    // },

    // closeModal() {
    //     this.$emit('close');
    // },
  }
};
</script>

<style scoped>
.output-image {
  display: block;
  margin-bottom: 13%;
  margin-top: 13%;
  text-align: -webkit-center;
}

.invite-primary {
  margin-top: 12%;
  background: white;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.12);
  height: 500px;
  border-radius: 1px;
}

.invite-primary h3 {
  color: #000;
  font-weight: 100;
}

.invite-primary p {
  color: #000;
  font-size: 13px;
  font-weight: 100;
  font-family: raleway;
  text-align: center;
}

.invite-primary input {
  margin-bottom: 6%;
  font-size: 14px;
}

.invite-primary button {
  border-radius: 50px;
  padding: 7px 45px;
  font-size: 13px;
}

.invite-primary input[type="file"] {
  padding: 1px;
}

span.btn-hire {
    background: #3369da;
    padding: 9px 14px;
    /* min-width: 30% !important; */
    text-align: center;
    position: fixed;
    font-size: 18px;
    bottom: 6%;
    right: 3%;
    -webkit-box-shadow: 0 2px 15px rgba(0, 0, 0, 0.13);
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.13);
    color: white;
    border-radius: 50%;
}

.col-red {
    color: #9c27b0 !important;
    /* margin-top: 5%; */
    text-align: left !important;
    /* position: absolute; */
    /* bottom: 20px; */
    /* word-break: break-word; */
    /* width: 420px; */
    text-align: center !important;
    margin: 3% 5%;
}

.well.filter {
  border-radius: 10px !important;
}

.well.filter label {
  color: white !important;
}

.input-file-csv {
  opacity: 0;
}

span.input-file-csv-icn-group {
  font-size: 35px;
  position: relative;
  top: 36px;
  pointer-events: none;
  cursor: pointer;
}
.com-son img{
  height: 45px;
  width: 45px;
  margin-top: 7%;
}
.redsa{
  z-index: 10000;
}
</style>
