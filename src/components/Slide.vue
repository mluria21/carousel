<template>
  <div 
    tabindex="-1" 
    class="carousel-slide-wrp"
    :style="{'flex-basis': flexBasis}"
  >
      <slot></slot>
  </div>
</template>

<script>
export default {
    name: 'Slide',

    props:{
        title:String
    },

    computed:{
        flexBasis(){
            return `${100 / this.carousel.slidesPerPage}%`
        } 
    },

    inject:['carousel']
}
</script>

<style>
.carousel-slide-wrp{
    /* flex-basis: 100%; */
    /* width: 100%;
    height: 100%; */
    flex-grow: 0;
    flex-shrink: 0;
    outline: none;
}
</style>