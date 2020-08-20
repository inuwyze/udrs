
<template>
<v-container id="cont">
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


    <tbody>
      <tr>
        <td>
            <div>
              <v-row>

                <v-col cols='12' md='6'>
              <v-text-field v-model="form.doctor" label='doctor'></v-text-field>
                </v-col>
                <v-col cols='12' md='6'>
              <v-text-field v-model="form.patient" label='patient'></v-text-field>
                </v-col>
              
              </v-row>
    <!-- Use the component in the right place of the template -->
    <tiptap-vuetify
      v-model="content"
      :extensions="extensions"
    />
  </div>
  <div id="side-toolbar"  
  @mouseenter="show=true"
  @mouseleave="show=false"
  :class="{bg:show}"
  >
      <v-card 
      flat
      class="d-flex flex-column justify-end align-content-end flex-wrap mt-11 pr-3"
      height="80%"
      color="rgb(0, 0, 0, 0)"
      
      >
      <transition-group name='appear' >
        <div v-if="show" :key="1">

          <v-card 
          flat
          v-for="btn in sideBtns"
          color="rgb(0, 0, 0, 0)"
          :key="btn.func"
          class="mb-2">
            <v-btn 
            
            @click="fnc(btn.func)" 
            :id="btn.func" 
            fab>
            
              <v-icon>{{btn.icon}}</v-icon>
            </v-btn>
          </v-card>
        </div>
      </transition-group>
      </v-card>
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
// import the component and the necessary extensions
import { TiptapVuetify, Heading, Bold, Italic, Strike, Underline, Code, Paragraph, BulletList, OrderedList, ListItem, Link, Blockquote, HardBreak, HorizontalRule, History } from 'tiptap-vuetify'
import { db} from '../db'
import { Timestamp } from '../db'
export default {
  // specify TiptapVuetify component in "components"
  components: { TiptapVuetify },
  data: () => ({
    show:true,
    record:null,
    sideBtns:[{func:'add',icon:'mdi-plus'}
    ],
    doc:[],
    form:{
      doctor:'dr mundo',
      patient:'',
      complaint:'',
      createdAt: ''

    },
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
    // starting editor's content
    content: `
     
      <h3>Complaints</h3>
      <hr>
     <br>
      <h3>present History</h3>
      <hr>
        <br>

      <h3>Prescription</h3>
      <hr>
      <br>
    `
  }),
  methods:{
    fnc(f){
      this[f]()
    },
    add(){
      // on pressing addpops it and then adds update and print button
      // since addition u should save changes not create a different record
      this.sideBtns.pop();
      [{func:'print',icon:'mdi-printer'},
      {func:'update',icon:'mdi-floppy'}].forEach((a)=>{
        this.sideBtns.push(a)
      })

      this.form.complaint=this.content;
      this.form.createdAt=Timestamp.FieldValue.serverTimestamp();
      this.$firestoreRefs.doc.add(this.form).then((docRef)=>{
        this.record=docRef;
        alert(this.record)
      });
    },
    update(){
      this.form.complaint=this.content;
      this.form.recentUpdateAt=Timestamp.FieldValue.serverTimestamp();
      this.$firestoreRefs.doc.doc(this.record.id).update(this.form)
      
      
    },
  
    print(){
      window.print()
    }

  },
   firestore: {
    doc: db.collection('documents'),
  }
}
</script>







<style>
 html::-webkit-scrollbar {
  display: none!important;
}



/* transition */
.appear-enter-active, .appear-leave-active {
  transition: all 1s;
}
.appear-enter, .appear-leave-to /* .list-leave-active below version 2.1.8 */ {
  /* opacity: 0; */
  transform: translateX(100px);
}
#side-toolbar{
  position: fixed;

  height: 300px;
  width: 200px;
  bottom:0px;
  right:0;
}

.v-data-table__wrapper {
    overflow-x: hidden;
    overflow-y: hidden;
    width: 1100px;
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
.tiptap-vuetify-editor__content,tbody tr td{
  max-width: 1100px;
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
  border-top: 3px solid green; /* for demo */

}


tr:hover{
  background: none!important;
}

@media print{
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