export default{
    bind: function (el, binding, vnode) {
        //debugger
        if(binding.arg === 'fade'){  
            el.style.opacity = 0
            el.style.transition = 'opacity 1s ease'
          
            const fade = function(e){
                el.style.opacity = 1
                el.removeEventListener('load',fade)
            }
            el.addEventListener('load',fade)   
        } 
    }
}