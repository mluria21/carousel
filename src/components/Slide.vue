<template>
  <div tabindex="-1" class="carousel-slide-wrp">
      <slot></slot>
  </div>
</template>

<script>
export default {
    name: 'Slide',

    props:{
        title:String
    }
}
</script>

<style>
.carousel-slide-wrp{
    flex-basis: 100%;
    /* width: 100%;
    height: 100%; */
    flex-grow: 0;
    flex-shrink: 0;
    outline: none;
}
</style>