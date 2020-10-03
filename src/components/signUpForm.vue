<template>
    
    <v-dialog
    v-model="dialog"
    max-width="550px"
    >
        <template v-slot:activator='{on}'>
            
            <v-btn 
            class="secondary" 
            v-on="on" >
            
                <v-icon>mdi-account-plus</v-icon>
                new patient
            </v-btn>
        </template>
        <v-card 
        class="lighter">
            <v-card-title class='justify-center text-h3 lighter--text primary'>
                Sign Up
            </v-card-title>
            <v-card-text>
                <v-form 
                ref="form"
                v-model="isValid">
                    <v-container>
                        
                        <!-- NAME -->
                        <v-text-field label="Name"
                        v-model="form.name"
                        :rules="nameRule"
                        prepend-icon="mdi-account"
                        @keyup.enter="$refs.phoneNumber.focus" 
                        ></v-text-field>


                        <!-- PHONENUMBER -->
                        <v-text-field
                        v-model="form.phoneNumber"
                        label="phone number"
                        type="number"
                        prepend-icon="mdi-phone"
                        :rules="phoneRule"
                        ref="phoneNumber"
                        @keyup.enter="$refs.dob.focus" 
                        />
                    
                    
                        <v-menu>
                        <template v-slot:activator="{on}">
                            <v-text-field label="DOB" prepend-icon="mdi-calendar"
                            v-on="on"
                            :value="formattedDate"
                            :rules="dobRule"
                            ref="dob"
                            ></v-text-field>
                        </template>
                        <v-date-picker 
                            v-model="form.dob"
                        ></v-date-picker>
                        </v-menu>
                    
                        
                        
                            <!-- GENDER -->
                            <v-radio-group 
                            v-model="form.sex"  
                            prepend-icon="mdi-gender-male-female"
                            row
                            :rules="sexRule"
                            class="mt-2"
                            ref="sex"
                            >                    
                                <v-radio 
                                v-for="s in sex" 
                                :key="s"
                                :label="s"
                                :value="s"
                                >       

                                </v-radio>
                                
                            </v-radio-group>
                        

                            <!-- ADDRESS -->
                            <v-textarea
                            prepend-icon="mdi-home" 
                            label="address"
                            rows="2"
                            row-height="15"
                            auto-grow
                            v-model="form.address"
                            :rules="addressRule"
                            ></v-textarea>
                        

                        <v-btn 
                        :disabled="!isValid"
                        
                        
                        @click="submit"
                        >
                        submit</v-btn>
                    </v-container>
                </v-form>
            
                
            </v-card-text>
        </v-card>
        <v-snackbar
            v-model="value"
        >
            snackbarText
            <v-btn flat color="primary" @click.native="value = false">Close</v-btn>
        </v-snackbar>
    </v-dialog>
</template>

<script>
// import {bus} from '../main';
import { bus } from '../main';
import { db } from '../db';
export default{


    props:['helo'],
    data(){
        return{
            value:false,
            snackbarText:'patient added',
            profile:[],
            dialog:null,
            sex:['male','female'],
            isValid:true,
            form:{
            name:'',
            dob:null,
            sex:null,
            phoneNumber:'',
            address:'',
            },
            nameRule:[v=>!!v ||'enter name'],
            dobRule:[v=> !!v||'date of birth is required'],
            addressRule:[v=> !!v||'address is required'],
            sexRule:[v=> !!v||"patient's sex is required"],
            phoneRule:[v=> !!v && v.length==10||'10 digit phone number'],
           
        }
    },
    computed:{
        formattedDate(){
            return this.form.dob?new Date(this.form.dob).toUTCString().substring(0,16):'';
        }

    },
 
 methods:{
     submit(){
        this.dialog=false;
        this.$firestoreRefs.profile.add(this.form).then(()=>{
            bus.$emit('patientAdded',this.form);
            this.$refs.form.reset();
        });
     }
 },
 firestore: {
    profile: db.collection('patients'),
  }

}
</script>
<style scoped>
::v-deep input::-webkit-outer-spin-button,
::v-deep input::-webkit-inner-spin-button {
-webkit-appearance: none;
margin: 0;
}
</style>