<template>
<div>
  
  
  <v-container>
  
  {{patients}}
    <v-row>
      <v-col 
      cols="6"
      md="3" 
      v-for="(patient,i) in patients"
      :key="i"
      >
      <v-card class="text-center ma-2 pa-4">
       
       <!-- <router-link :to="'/profile/'+patient.id"> -->
       <router-link :to="{name: 'profile', params: {id: patient.id}}">

        {{patient.id}}
       </router-link>


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


firestore:{
  patients:db.collection('patients')

}


}
</script>

