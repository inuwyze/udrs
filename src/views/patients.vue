<template>
<div>
  
  
  <v-container>
  
  
    <v-row>
      <v-col 
      cols="6"
      v-for="(patient,i) in patients"
      :key="i"
      >
      <v-card class="text-center ma-2 pa-4"
      @click="gotoProfile(patient.id)"> 
      <v-row>
        <v-col cols="3">

      <v-avatar
      tile
      size="100">
        <v-img
        :src="patient.img">

        </v-img>
      </v-avatar>
      
        </v-col>
        <v-col>
        <!-- <router-link :to="'/profile/'+patient.id"> -->
        <!-- <router-link :to="{name: 'profile', params: {id: patient.id}}"> -->
        
        {{patient.name}}
        <br>
        {{patient.dob}}
        <br>
        {{patient.phoneNumber}}
        
        </v-col>
      </v-row>
      </v-card>
      </v-col>
    </v-row>
  </v-container>

</div>
</template>

<script>

import { db } from '../db'


export default{

data:()=>({
  patients:[],
  img1:'ola',
  
}),

methods:{
  gotoProfile(id){
    this.$router.push({name: 'profile', params: {id: id}});

  }
},
firestore:{
  patients:db.collection('patients')
}


}
</script>

