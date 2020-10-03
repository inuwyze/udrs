


<template>
<v-container>
  
  <v-row justify="end" justify-sm="center">
  <v-col cols="10" md="12" >

  <v-expansion-panels multiple focusable>
    <v-expansion-panel
    v-for="(record,index) in records"
    :key="index"
    >
    <v-checkbox 
    v-model="selected"
    class='checkboxes'
    :value="record"
    
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
  <router-link to="/print">

  <v-btn @click="show">button</v-btn>
  </router-link>
  </v-container>
</template>
<script>
import {db} from '../db'


export default{ 
  
  data:()=>({
    records:[],
    selected:[],
  }),
   firestore: {
    records: db.collection('documents'),
  },
  methods:{
    show(){
      
      this.$store.commit('increment',this.selected);
      // alert(this.selected)
      // console.log(this.$store.state.records)
    }
  },
 
      
}

</script>

<style scoped>
.checkboxes{
  position: absolute;
  left: -35px;
}
</style>