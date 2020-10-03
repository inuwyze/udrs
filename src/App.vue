<template>

  <v-app 
  class>
     <navBar />
     <v-main
  
     class="tertiary ">
  <router-view></router-view>
     </v-main>
     
  </v-app>
</template>

<script>
import navBar from './components/navBar'

export default {
  name: 'App',
  components:{
    navBar
  },

  data: () => ({
    //
  }),
};
</script>
