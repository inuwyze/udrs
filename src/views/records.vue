


<template>
<v-container>
  <v-row justify="end" justify-sm="center">

<v-col cols="10" md="12" >

  <v-expansion-panels multiple focusable>
    <v-expansion-panel
    v-for="record in records"
    :key="record.patient"
    >
    <v-checkbox @click="show" 
    :name='record'
    class='checkboxes'
    :value="record.complaint"
    v-model="selected"
    ></v-checkbox>
      <v-expansion-panel-header > 
        <v-row justify="space-between">
          <v-col cols="9">

        {{record.patient}}
          </v-col>
          <v-col >
        {{record.createdAt.toDate().toString().substring(0,24)}}
          
          </v-col>
        </v-row>
        
      </v-expansion-panel-header>
      <v-expansion-panel-content>
          
        <div class="tiptap-vuetify-editor__content" v-html="record.complaint"/>
        
  

      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
  </v-col>
  </v-row>
  </v-container>
</template>
<script>
import {db} from '../db'

export default{ 
  
  data:()=>({
    selected:[],
    records:[]
  }),
   firestore: {
    records: db.collection('documents'),
  },
  methods:{
    show(){
      console.log(this.selected)
      
    }
  }
}

</script>

<style >
.checkboxes{
  position: absolute;
  left: -35px;
}
</style>