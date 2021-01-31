<template>
  <div class="comp">
    <img :src="url" width="400" />
  </div>
</template>

<script>
export default {
  name: "Comp",
  props: {
    index: Number
  },
  computed: {
    url: function() {
      return require(`./assets/0${this.index}.jpg`);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.comp {
  height: 640px;
}
</style>
