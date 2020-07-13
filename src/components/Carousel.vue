<template>
  <div 
    class="carousel-gen-wrp">
      <div class="carousel-outer-wrp">
          <div class="carousel-inner-wrp"
            :style="{
                'transform':`translateX(${translate.translateX}px)`,
                'transition':this.translate.transition
            }"
          >
            <slot name="slides" v-bind:computedSlides="computedSlides" />
          </div> 
      </div>   
      <slot name="arrowRight" v-bind:carousel="self"/>
      <slot name="arrowLeft" v-bind:carousel="self"/>
      <slot name="navigation" v-bind:carousel="self"/>
  </div>
</template>

<script>

export default {
    name: 'Carousel',

    props:{
        slides:{
            type:Array,
            default:()=>{
                return []
            }
        },
        height:String,
        width:String,
        easing: {
            type: String,
            validator: function(value) {
                return (
                ["ease", "linear", "ease-in", "ease-out", "ease-in-out"].indexOf(
                    value
                ) !== -1 || value.includes("cubic-bezier")
                );
            },
            default: "ease"
        },
        speed:{
            type:Number,
            default:500
        },
        autoPlay:{
            type:Boolean,
            default:false
        },
        autoPlayTime:{
            type:Number,
            default:3000
        },
        touchDrag: {
            type: Boolean,
            default: true
        },
    },

    data(){
        return{
            translate:{
                translateX:0,
                transition:''
            },
            carouselLength:0,
            isTouch: typeof window !== "undefined" && "ontouchstart" in window,
            interval:null,
            carouselPositionOnStartDrag:0,
            dragStartX:null,
            moves:[],
            computedSlides:null
        }
    },

    computed:{
        dragable(){
            return this.touchDrag && this.numberOfSlides > 1
        },

        internalNumberOfSlides(){
            return this.computedSlides.length
        },

        numberOfSlides(){
            return this.internalNumberOfSlides / 2
        },

        carouselPositionX(){
            return this.translate.translateX
        },

        maxCarouselPositionX(){
            return -(this.carouselLength - this.slideWidth)
        },

        minCarouselPositionX(){
            return 0
        },

        slideWidth(){
            return this.carouselLength / this.computedSlides.length
        },

        activeSlide(){
            const delta = this.internalActiveSlide - this.numberOfSlides
            return delta > 0 ? delta : this.internalActiveSlide
        },

        internalActiveSlide(){
            return Math.round( ((this.translate.translateX * this.internalNumberOfSlides) / -this.carouselLength) + 1)
        },

        self(){
            return this
        }
    },

    methods:{
        reset(){
            this.computedSlides = null
            this.resetTimer()
            this.moves = []
            document.removeEventListener(
                this.isTouch ? "touchend" : "mouseup",
                this.onEnd
            );
            document.removeEventListener(
                this.isTouch ? "touchmove" : "mousemove",
                this.onDrag
            );
        },

        async init(){ 
            this.reset()   
            this.computedSlides = [...this.slides.slice(),...this.slides.slice()]  
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            this.carouselLength = this.$el.querySelector('[class="carousel-inner-wrp"]').scrollWidth
            this.translate.transition = ''
            this.translate.translateX = - (this.carouselLength / 2)

            let counter = 0
            while(counter > this.maxCarouselPositionX){
                this.moves.push(counter)
                counter += -this.slideWidth
            }
            this.moves.push(this.maxCarouselPositionX)
            
            if(this.autoPlay){
                this.resetTimer()
                this.setTimer()
            }
            if ((this.isTouch && this.touchDrag) || this.touchDrag) {
                this.$el.addEventListener(
                    this.isTouch ? "touchstart" : "mousedown",
                    this.onStart
                );
            }
        },

        getMove(goal){
            return this.moves.reduce((prev, curr) =>{
                    return (Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev);
                });
        },

        onStart(e) {
            // detect right click
            if (e.button == 2) {
                return;
            }
            if(!this.dragable)return
            
            this.$el.addEventListener("dragstart", e => e.preventDefault());
           
            this.resetTimer()
            if(this.carouselPositionX <= this.maxCarouselPositionX){
                this.translate.transition = ''
                this.translate.translateX = - ((this.carouselLength / 2) - this.slideWidth) 
            }

            if(this.carouselPositionX >= this.minCarouselPositionX){
                this.translate.transition = ''
                this.translate.translateX = - (this.carouselLength / 2) 
            }
            this.carouselPositionOnStartDrag = this.carouselPositionX
            document.addEventListener(
                this.isTouch ? "touchend" : "mouseup",
                this.onEnd
            )
            document.addEventListener(
                this.isTouch ? "touchmove" : "mousemove",
                this.onDrag
            )
        
            this.dragStartX = this.isTouch ? e.touches[0].clientX : e.clientX;            
        },

        onDrag(e){
            const eventPosX = this.isTouch ? e.touches[0].clientX : e.clientX;
            const newOffsetX = this.dragStartX - eventPosX;
           
            e.stopImmediatePropagation();
            this.translate.transition = ''
            this.translate.translateX = this.carouselPositionOnStartDrag - newOffsetX

        },
    
        onEnd(e) {
            const eventPosX = this.isTouch ? e.changedTouches[0].clientX : e.clientX;
            const delta = this.dragStartX - eventPosX
     
            if(delta < 0 ){
                const remaining = -this.slideWidth - delta
                if(delta < -20){
                    this.translate.transition = `${this.speed}ms ${this.easing} transform`
                    this.translate.translateX = this.getMove(this.translate.translateX - remaining)
                }else{
                    this.translate.transition = `${this.speed}ms ${this.easing} transform`
                    this.translate.translateX = this.getMove(this.translate.translateX + delta)
                }
            }else{
                const remaining = this.slideWidth - delta
                if(delta > 20){
                    this.translate.transition = `${this.speed}ms ${this.easing} transform`
                    this.translate.translateX = this.getMove((this.translate.translateX) + (-remaining))
                }else{
                    this.translate.transition = `${this.speed}ms ${this.easing} transform`
                    this.translate.translateX = this.getMove((this.translate.translateX) - (-delta))
                }
            }
            
            // clear events listeners
            document.removeEventListener(
                this.isTouch ? "touchend" : "mouseup",
                this.onEnd
            );
            document.removeEventListener(
                this.isTouch ? "touchmove" : "mousemove",
                this.onDrag
            );
            if(this.autoPlay){
                this.setTimer()
            }
        },

        setTimer(){
            this.interval = setInterval(() => {
                this.move(-this.slideWidth)
            }, this.autoPlayTime);
        },

        resetTimer(){
            if(this.interval){
                this.interval = clearInterval(this.interval)
            }
        },

        pauseTimer(){
            this.resetTimer()
            this.setTimer()
        },

        move(x){
            if(!this.dragable)return
            if(this.autoPlay){
                this.pauseTimer()
            }
            
            if(this.carouselPositionX <= this.maxCarouselPositionX){
                this.translate.transition = ''
                this.translate.translateX = - ((this.carouselLength / 2) - this.slideWidth) 
            }

            if(this.carouselPositionX >= this.minCarouselPositionX){
                this.translate.transition = ''
                this.translate.translateX = - (this.carouselLength / 2) 
            }
           
            setTimeout(() => {
                this.translate.transition = `${this.speed}ms ${this.easing} transform`
                this.translate.translateX += x
            });
        },

        goToIndex(index){   
            index += 1
            if(index == this.activeSlide)return
            const delta = index > this.activeSlide ? index - this.activeSlide : this.activeSlide - index
            const moveToX = index > this.activeSlide ? -(delta * this.slideWidth) : delta * this.slideWidth
            this.move(moveToX)
        }
    },

    mounted(){
        window.addEventListener('orientationchange',this.init)
        window.addEventListener('resize',this.init)
    },

    beforeDestroy(){
        this.reset()
        window.removeEventListener('orientationchange',this.init)
        window.removeEventListener('resize',this.init)
    },

    watch:{
        slides:{
            immediate:true,
             handler(){
                this.init()
            }
        }
    }
}
</script>

<style>
.carousel-gen-wrp{
    width: 100%;
    height: 100%;
    /* width: auto;
    height: auto; */
    position: relative;
}

.carousel-outer-wrp{
    /* width: auto;
    height: auto; */
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
}

.carousel-inner-wrp{
    display: flex; 
    /* width: auto;
    height: auto; */
    width: 100%;
    height: 100%;
    user-select: none;
    outline: none;
}
</style>