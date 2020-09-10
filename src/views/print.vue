
<template>
<v-container>

<div class="page-footer">
    I'm The Footer
  </div>

      <v-simple-table>
      <thead>
      <tr>
        <td>
          <!--place holder for the fixed-position header-->
          <div class="page-header-space"></div>
        </td>
      </tr>
    </thead>


    <tbody
    >
      <tr>
        <td>
            <div>
              <v-row >

              
              
              </v-row>
    <!-- Use the component in the right place of the template -->
   <div class="tiptap-vuetify-editor__content" v-html="record"/>
  </div>
    

        </td>
      </tr>
    </tbody>

    <tfoot>
      <tr>
        <td>
          <!--place holder for the fixed-position footer-->
          <div class="page-footer-space"></div>
        </td>
      </tr>
    </tfoot>
    </v-simple-table>
  

    

</v-container>
</template>
 
<script>






export default {
  // specify TiptapVuetify component in "components"
  

  data:() => ({
    show:true,
    record:'',
    sideBtns:[{func:'add',icon:'mdi-plus'}
    ],
    doc:[],
   form:null
  }),

  methods:{
  
    print(){
      window.print()
    }

  },
  created (){  
    this.selected.forEach((record)=>{
        this.record+='<div class="page">'+record.complaint+
        '</div>';
        
    })

  },
  computed: {
    selected() {
      return this.$store.state.records
    }
  },
}
</script>







<style >
.page {
  border: 1px solid grey;
  margin: 20px 5px;
  padding: 10px;
  border-radius:10px ;
}
.page {
  page-break-after: always;
}

@media print{
  .page {
  border: none;
  }

header,.row{
    display: none!important;
}

main{
  padding: 0!important;
}


.tiptap-vuetify-editor__content {
 
   margin: 0!important;
    /* border: 2px solid black; */
   
    background: transparent;
    
}
button{
    display: none!important;
}
body{
    /* border:1px solid red; */
    /* background: green; */
    margin:0;
    padding: 0;
    
}
.page-header-space,
.page-footer-space {
  height: 70px;

}
  .page-header,.page-footer {
  z-index: 2;
  display: block;
  }
   thead {display: table-header-group;} 
   tfoot {display: table-footer-group;}
   button {display: none;}
  
   .v-sheet.v-card{
     box-shadow: none!important;
   }
}
</style>