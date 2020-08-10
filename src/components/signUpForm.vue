<template>
    <v-dialog
    v-model="dialog"
    max-width="800px"
    >
        <template v-slot:activator='{on}'>
            <v-btn text v-on="on" >
                add new patient
            </v-btn>
        </template>
        <v-card class="pa-4">
            <v-card-title class='justify-center'>
                <h2>Sign Up</h2>
            </v-card-title>
            <v-card-text>
                <v-form 
                ref="form"
                v-model="isValid">
                    <v-container>
                        <v-row>
                        <v-col
                        cols="12"
                        sm="6">
                        <v-text-field label="First Name"
                        v-model="form.firstName"
                        :rules="firstNameRule"
                        @keyup.enter="$refs.lastName.focus" 
                        ></v-text-field>
                        </v-col>
                        <v-col
                        cols="12"
                        sm="6"
                        >
                        <v-text-field label="Last Name"
                        v-model="form.lastName"
                        :rules="lastNameRule"
                        ref="lastName"
                        @keyup.enter="$refs.phoneNumber.focus" 
                        ></v-text-field>
                        </v-col>
                        </v-row>
                        <v-row>
                            <v-text-field
                            v-model="form.phoneNumber"
                            label="phone number"
                            type="number"
                            prepend-icon="mdi-phone"
                            :rules="phoneRule"
                            ref="phoneNumber"
                            @keyup.enter="$refs.dob.focus" 
                            />
                        </v-row>
                        <v-row>
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
                        </v-row>
                        
                        
                        <v-row>
                            <v-radio-group v-model="form.sex"  
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
                        </v-row>

                        <v-row>
                            <v-textarea label="address" 
                            height="40"
                            class="mt-9"
                            :rules="addressRule"
                            ></v-textarea>
                        </v-row>

                    </v-container>
                </v-form>
            
                <v-btn 
                :disabled="!isValid"
                absolute right
                @click="form.sex='ok'"
                >
                {{isValid}}
                submit</v-btn>
                {{form}}
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
// import {bus} from '../main';

export default{


    props:['helo'],
    data(){
        return{

            dialog:null,
            sex:['male','female'],
            isValid:true,
            form:{
            firstName:this.helo,
            lastName:this.helo,
            dob:null,
            sex:null,
            phoneNumber:'',
            },
            firstNameRule:[
                v=>!!v ||'enter first name'
                ],
            lastNameRule:[v=> !!v||'last name is required'],
            dobRule:[v=> !!v||'date of birth is required'],
            addressRule:[v=> !!v||'address is required'],
            sexRule:[v=> !!v||"patient's sex is required"],
            phoneRule:[v=> !!v && v.length==10||'10 digit phone number']

        }
    },
    computed:{
        formattedDate(){
            return this.form.dob?new Date(this.form.dob).toUTCString().substring(0,16):'';
        }

    },
 
 

}
</script>
<style scoped>
::v-deep input::-webkit-outer-spin-button,
::v-deep input::-webkit-inner-spin-button {
-webkit-appearance: none;
margin: 0;
}
</style>