<template>
  <div>
    <div class="text-center">
        <div class="empty-state">
            <i class="ion-ios-person"></i>
        </div>
        <h3>
            <slot/>
        </h3>
    </div>
    </div>
</template>

<script>
export default {
  name: 'no-member',
};
</script>

<style scoped>
.empty-state {
  padding-top: 5%;
}

.output-image {
  display: block;
  margin-bottom: 13%;
  margin-top: 13%;
  text-align: -webkit-center;
}

.empty-state i {
  font-size: 60px;
}
</style>
