<template>
  <nav
  class="transparent">
    <!-- TOP NAV BAR -->
    <v-app-bar 
    color="transparent"
    flat
    app>
 
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
    >
      {{ snackbarText }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
      <v-app-bar-nav-icon 
      @click="drawer=!drawer"
      v-if="loggedIn"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      
      
      <!-- themeswitcher -->
      <!-- <v-btn
      @click="()=>{this.$vuetify.theme.dark = true}">

      </v-btn> -->
      <v-dialog
      width="400" 
      
      v-model="dialog"
      >
      
        <v-card 
        >
          <v-container
          class="d-flex justify-center lighter pt-8 pb-6"
          >
          
          <v-form 
          class="mb-16"
          style="width:75%"
          v-model="valid"
          ref="form">
          <div class="text-center">
          <div
          class="text-h3 primary--text mb-10">
          Sign In
          </div>
          <!-- <v-btn
          :disabled='!login'
          @click="login=false">
          signup</v-btn>
          <v-btn
          :disabled='login'
          @click="login=true">
          login</v-btn> -->
          </div>

            <v-text-field
            v-if="!login"
            v-model="name"
            label="name"
            outlined
            dense
            ></v-text-field>
            <v-text-field
            :rules="emailRules"
            v-model="email"  
            label="E-mail"
            outlined
            dense
            ></v-text-field>
            <v-text-field
            :rules="passwordRules"
            v-model="password"
            label="password"
            outlined
            dense
            ></v-text-field>


          </v-form>
            <!-- confirm buttom -->
            <v-btn
            width="70%"
            :disabled='!valid'
            class="primary"
            absolute
            bottom
            
            @click="confirm">confirm
            </v-btn>
            
          </v-container>
        </v-card>
        </v-dialog>



        <!-- min-width=0 to reduce btn-content -->
        <v-btn
        text
        min-width="0"
        class="pa-2 theme "
       >
          
              <v-icon
              v-if="!loggedIn"
              size="30"
              color="error"
              @click.stop="dialog=true">
                mdi-power
              </v-icon>
              <v-icon
              v-if="loggedIn"
              size="30"
              class="success--text "
              @click="logout">
                mdi-power
            </v-icon>
        
        </v-btn>
        
    </v-app-bar>
    
    
  <!-- SIDE NAVBAR -->

    <v-navigation-drawer
    v-model="drawer"
    app
    
    
    class="primary lighter--text "
    >

    <v-row
    class="mt-10"
    justify="center">
      <v-avatar
      size="100"
      >
          <v-img
          :src="pic">

          </v-img>
      </v-avatar>

    </v-row>
    <v-row
    justify="center">
       <div
      class="text-h7">{{name}}</div>
    </v-row>
    <v-row justify="center">
    <signUpForm />
    </v-row>

    <v-list
    >
    
        <v-list-item v-for="item in items" :key="item.text" router :to="item.router">
          
            <v-list-item-icon
            >

            <v-icon
            class="lighter--text">
              {{ item.icon }}</v-icon>
            </v-list-item-icon>
          
          <v-list-item-content
          class="lighter--text">
            {{item.text}}
          </v-list-item-content>
                
        </v-list-item>
       
      
    </v-list>

    </v-navigation-drawer>
   
  </nav>
</template>

<script>
import {bus} from '../main'
import firebase from "firebase";
import signUpForm from './signUpForm';
  export default {
    components:{
      signUpForm
    },
  data(){
    return{
      snackbar:false,
      snackbarText:"",
      timeout:1000,
      valid:false,
      loggedIn:true,
      dialog:true,
      login:true,
      email:'',
      emailRules: [
 
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules: [
     
        v => !!v || 'password is required',
        v => (v && v.length >= 6) || 'Name must be greater or eqaul to 6 characters',
      ],
      pic:null,
      name:null,
      password:'',
      drawer:false,
      items:[
        {text:'Complaint',icon:'mdi-text-box-plus',router:'/complaint'},
        {text:'Records',icon:'mdi-text-box-multiple',router:'/records'},
        {text:'Patients',icon:'mdi-account-group',router:'/patients'},
        {text:'Calendar',icon:'mdi-calendar-month',router:'/calendar'},
      ]
    }
  },
  created(){
    var user=firebase.auth().currentUser
    if(user){
      
      this.name=user.displayName
      this.pic=user.photoURL
      this.dialog=false
      this.loggedIn=true
    }
    bus.$on('patientAdded', () => {
      this.snackbar=true;
      this.snackbarText='patient added'
    })
   
  },
   
  methods:{
    logout(){
      firebase.auth().signOut().then(()=>{
        
        this.dialog=true;
        this.loggedIn=false;
        this.drawer=false;
        this.$router.push('home');
        this.snackbar=true;
        this.snackbarText='logged out'
      })
    },
    confirm(){
      if(this.login)
      firebase.auth().signInWithEmailAndPassword(this.email,this.password)
      .then((user)=>{
        
        
        this.pic=user.user.photoURL;
        this.name=user.user.displayName;
        this.dialog=false;
        this.loggedIn=true
        this.snackbar=true;
        this.snackbarText='logged in'
        this.$refs.form.reset()
      }).catch((error)=>{
        alert(error)
      })
      else
      firebase.auth().createUserWithEmailAndPassword(this.email,this.password)
      .then(user=>{
        
        alert('created')
        // console.log(user) 
        // console.log(user.user.displayName) 
        this.dialog=false;
        this.loggedIn=true
        user.user.updateProfile({
          displayName:this.name,
          photoURL:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQxiCyK4xgqma00Z5GyK8aaV5MkVRABE4vd7Q&usqp=CAU'
        }).then(()=>{
          this.pic=user.user.photoURL;
          // console.log(user.user.photoURL)
          // console.log(user.user.displayName)
          this.name=user.user.displayName
          this.$refs.form.reset()
          this.snackbar=true;
          this.snackbarText='logged in'

        });
      },
      err=>{
        alert(err)
      })
    }

  }
  }
</script>
