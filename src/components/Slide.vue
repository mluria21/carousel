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
    /* flex-basis: inherit; */
    width: inherit;
    flex-grow: 0;
    flex-shrink: 0;
    outline: none;
}
</style>