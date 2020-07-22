<template>
  <div id="demo">
    <div class="wrapper">
      <carousel 
        :slides="urls"
        :autoPlay="false"
        :slidesPerPage="4"
      >
        <template v-slot:slides="{computedSlides}">
          <slide
            v-for="(url,index) in computedSlides"
            :key="index"
          >
            <div style="width: 100%;height: 100%;max-width: 1200px;max-height: 400px;">
              <img v-image-load:fade style="width: 100%;height: 100%;object-fit: cover;" :src="url" alt="">
            </div>
          </slide>
        </template>
        
        <template v-slot:arrowRight="{carousel}">
          <div style="right:0;" class="arrow" @click="carousel.move(-carousel.slideWidth)">right</div>
        </template>

         <template v-slot:arrowLeft="{carousel}">
          <div style="left:0;" class="arrow" @click="carousel.move(carousel.slideWidth)">left</div>
        </template>

        <template v-slot:navigation="{carousel}">
          <div v-if="carousel &&  carousel.activeSlide" class="navigation-wrp">
            <div 
              class="nav-sing"
              @click="carousel.goToIndex(index)"
              :class="{'nav-active':index + 1 == carousel.activeSlide}"
              v-for="(dot,index) in carousel.numberOfSlides"
              :key="index"
            ></div>
          </div>
        </template>
      </carousel>
    </div>
     <!-- <div class="wrapper">
      <carousel 
        :slides="urls"
        :autoPlay="false"
        :touchDrag="true"
      >
        <template v-slot:slides="{computedSlides}">
          <slide
            v-for="(url,index) in computedSlides"
            :key="index"
          >
            <div style="width: 100%;height: 100%;max-width: 1200px;max-height: 400px;">
              <img v-image-load:fade style="width: 100%;height: 100%;object-fit: cover;" :src="url" alt="">
            </div>
          </slide>
        </template>
        
        <template v-slot:arrowRight="{carousel}">
          <div style="right:0;" class="arrow" @click="carousel.move(-carousel.slideWidth)">right</div>
        </template>

         <template v-slot:arrowLeft="{carousel}">
          <div style="left:0;" class="arrow" @click="carousel.move(carousel.slideWidth)">left</div>
        </template>

        <template v-slot:navigation="{carousel}">
          <div v-if="carousel &&  carousel.activeSlide" class="navigation-wrp">
            <div 
              class="nav-sing"
              @click="carousel.goToIndex(index)"
              :class="{'nav-active':index + 1 == carousel.activeSlide}"
              v-for="(dot,index) in carousel.numberOfSlides"
              :key="index"
            ></div>
          </div>
        </template>
      </carousel>
    </div> -->
  </div>
</template>

<script>
import Carousel from './components/Carousel'
import Slide from './components/Slide'
export default {
  name: 'App',

  data(){
    return{
      urls:[
        'https://cdn.shopeichlers.com/media/38765/conversions/s0gi2o0irzc7xsuj__Yiddish-Banner-Apr2020-mobile-1800.jpg',
        'https://cdn.shopeichlers.com/media/34098/conversions/8a2ty852qak88wxh__Shabbos-Banner---Mobile-1800.jpg',
        'https://cdn.shopeichlers.com/media/37652/conversions/xyan3a6o5xzi6ecw__SeforimBanner-Apr2020-mobile-1800.jpg',
        'https://cdn.shopeichlers.com/media/37647/conversions/07e8chgww5ktm1wb__BookSuperstore-Apr2020-Moblie-1800.jpg',
        'https://cdn.shopeichlers.com/media/43690/conversions/vjo6oxvqt6rte6fn__main-toy-banner-02-1800.jpg'
      ]
    }
  },

  components: {
    Carousel,
    Slide
  }
}
</script>

<style>
#demo{
  display: flex;
  justify-content: center;
  align-items: center;
}

.wrapper{
  max-width: 1200px;
  max-height: 400px;
  width: 100%;
  height: 100%;
  /* overflow: hidden; */
}

.arrow{
  position: absolute;
  bottom: -50px;
}

.navigation-wrp{
    position: absolute;
    bottom: -33px;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
}

.nav-sing{
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: black solid 1px;
  margin: 0 2px;
}

.nav-active{
  background-color: green;
}
</style>
