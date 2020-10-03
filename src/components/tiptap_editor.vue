
<template>
<v-container 
class="pa-0 ma-0 "
>
  
      <div class="page-footer">
    I'm The Footer
  </div>
    <v-simple-table>
      <thead>
      <tr>
        <td>
          <!--place holder for the fixed-position header-->
          <div class="page-header-space">
            gogo anime
          </div>
        </td>
      </tr>
    </thead>


    <tbody
    class="tertiary"

    >
      <tr>
        <td
        >
            <div>
              <v-row >

                <v-col cols='12' md='6'>
              <v-text-field v-model="form.doctor" label='doctor'></v-text-field>
                </v-col>
                <v-col cols='12' md='6'>
              <v-text-field v-model="form.patient" label='patient'></v-text-field>
                </v-col>
              
              </v-row>
    <!-- Use the component in the right place of the template -->
    <tiptap-vuetify
      v-model="form.complaint"
      :extensions="extensions"
    />
  </div>
    

        </td>
      </tr>
    </tbody>

    <tfoot
    class="tertiary">
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
// import the component and the necessary extensions
import { TiptapVuetify, Heading, Bold, Italic, Strike, Underline, Code, Paragraph, BulletList, OrderedList, ListItem, Link, Blockquote, HardBreak, HorizontalRule, History } from 'tiptap-vuetify'
import { bus } from '../main'
import { debounce } from 'vue-debounce'
import firebase from 'firebase'
export default {
  // specify TiptapVuetify component in "components"
  components: { TiptapVuetify },
  data: () => ({
   
    
    // declare extensions you want to use
    extensions: [
      History,
      Blockquote,
      Link,
      Underline,
      Strike,
      Italic,
      ListItem,
      BulletList,
      OrderedList,
      [Heading, {
        options: {
          levels: [1, 2, 3]
        }
      }],
      Bold,
      Code,
      HorizontalRule,
      Paragraph,
      HardBreak
    ],
     form:{
      doctor:'',
      patient:'',
      createdAt:'',
      complaint: `
     
      <h3>Complaints</h3>
      <hr>
      <br><br><br>
     <br><br><br><br><br>
      <h3>present History</h3>
      <hr>
        <br><br><br><br><br>
      <h3>Prescription</h3>
      <hr>
      <br>`

    },
    // starting editor's content
     
  }),
  created(){
    this.form.doctor=firebase.auth().currentUser.displayName;
  },
  watch:{

    form:{
      deep: true,
      handler: debounce(function(){

      bus.$emit('getForm',this.form);
      },1000)
    
  },
  
  }
}
</script>







<style >
 html::-webkit-scrollbar {
  display: none!important;
}
/* .v-data-table>.v-data-table__wrapper>table>tfoot>tr>td, .v-data-table>.v-data-table__wrapper>table>thead>tr>td{
  display: none;
} */

thead{
  display: none;
}

/* transition */
.appear-enter-active, .appear-leave-active {
  transition: all 0.5s;
}
.appear-enter, .appear-leave-to /* .list-leave-active below version 2.1.8 */ {
  /* opacity: 0; */
  transform: translateX(100px);
}


.v-data-table__wrapper {
    overflow-x: hidden;
    overflow-y: hidden;
    
}

.tiptap-vuetify-editor__content {
  font-size: 20px;
  margin: auto;
}
 .tiptap-vuetify-editor__content .ProseMirror p{
    margin-bottom:0px!important;
    margin-top: 0px!important;
   
    line-height: 1;
}

.ProseMirror hr{
  margin-bottom: 5px!important;
}

.page-footer {
  display: none;
  position: fixed;
  height: 60px;
  bottom: 0;
  width: 100%;
  background-color: greenyellow;
  border-top: 3px solid green; /* for demo */

}


tr:hover{
  background: none!important;
}


@media print{
/* header,.row{
    display: none!important;
} */

/* main{
  padding: 0!important;
  margin: 0!important;
} */


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
    background: green;
    margin:0!important;
    padding: 0!important;
    
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