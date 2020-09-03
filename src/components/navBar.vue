<template>
  <nav>
    <v-app-bar class='primary' app>
      <v-app-bar-nav-icon @click="drawer=!drawer"></v-app-bar-nav-icon>
    </v-app-bar>
    
    
    <v-navigation-drawer
    v-model="drawer"
    app
    >

    <v-row justify="center">
    <signUpForm />
    </v-row>

    <v-list>
      <v-list-item-group>
        <v-list-item v-for="link in links" :key="link.text" router :to="link.router">
          <div>{{link.text}}</div>

        </v-list-item>
      </v-list-item-group>
    </v-list>

    </v-navigation-drawer>
  </nav>
</template>

<script>

import signUpForm from './signUpForm'
  export default {
    components:{
      signUpForm
    },
  data(){
    return{
      drawer:false,
      links:[
        {text:'Complaint',router:'/complaint'},
        {text:'Records',router:'/records'},
        {text:'Patients',router:'/patients'},
      ]
    }
  }
  }
</script>
