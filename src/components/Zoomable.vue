<template>
    <div class="zoomable-outer-wrp">
        <div 
        @touchstart="start"
        :data-zoom-id="_uid"
        class="zoomable-inner-wrp"
        >
        <slot/>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            pageXDelta:0,
            isTouch: typeof window !== "undefined" && "ontouchstart" in window,
        }
    },

    methods:{
        start(e){
            if(this.$el.querySelector(`[data-zoom-id="${this._uid}"]`).classList.contains('zoom-in')){
                e.stopImmediatePropagation();
            }
            
            if(!this.isTouch)return
            if (e.touches.length !== 2)return
          
            e.stopImmediatePropagation();
            this.pageXDelta = Math.abs(e.touches[0].pageX - e.touches[1].pageX)
            
            this.$el.addEventListener('touchend',this.end)
            this.$el.addEventListener('touchmove',this.scale)
        },

        scale(e){
            e.stopImmediatePropagation();
            let d = Math.abs(e.touches[0].pageX - e.touches[1].pageX)
            
            if(this.$el.querySelector(`[data-zoom-id="${this._uid}"]`).classList.contains('zoom-in')){
                d < this.pageXDelta ? this.zoomOut() : ''
            }else{
                d > this.pageXDelta ? this.zoomIn() : ''
            }
        },

        end(e){
            e.stopImmediatePropagation();
            this.$el.removeEventListener('touchmove',this.scale)
            this.$el.removeEventListener('touchend',this.end)
            this.$el.querySelector('[class="zoomable-outer-wrp"]').classList.remove('pointer-none')
        },

        zoomIn(){
            this.$el.querySelector('[class="zoomable-inner-wrp"]').classList.add('zoom-in')
        },

        zoomOut(){
            this.$el.querySelector(`[data-zoom-id="${this._uid}"]`).classList.remove('zoom-in')
        },
    }
}
</script>

<style scoped>
.zoomable-outer-wrp{
    overflow: auto;
}

.zoomable-inner-wrp{
    touch-action:  pan-x pan-y;
    transition: 500ms ease transform;
    pointer-events: initial;
}

.zoom-in{
    -ms-transform: scale(2); /* IE 9 */
    -webkit-transform: scale(2); /* Safari 3-8 */
    transform: scale(2);
    transform-origin:left top;
}
</style>