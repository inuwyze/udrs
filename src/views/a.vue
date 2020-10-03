<template>
  <div>
  
  </div>
</template>

<script>
// @ is an alias to /src

import {bus} from '../main'

export default {

data(){
  return{
    greetings:'ola'
  }
},
created(){
  bus.$on('changeName',(data)=>{
    this.greetings=data;
  })
}
}
</script>
