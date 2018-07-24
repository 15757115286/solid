<template>
   <div v-move>
        {{ myname }}
   </div>
</template>
<script>
export default {
    name:'testComponent',
    props:['myname'],
    directives:{
        move:{
            bind(el){
                document.body.appendChild(el);
                console.log(el.parentNode);
            }
        }
    }
}
</script>

