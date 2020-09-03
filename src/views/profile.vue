<template>
    <div>
       {{doc}}
            <v-container>
            <v-row>

            <v-col
                class="d-flex flex-column justify-center align-center flex-wrap"
            >
                
                <div style="position:relative">

                <v-avatar size="170">
                    <img
                        src="https://cdn.vuetifyjs.com/images/john.jpg"
                        alt="John"
                    >
                </v-avatar>
                <v-btn
                x-small
                fab
                absolute
                @click="clk"
                    >
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>
                    <input 
                    style="display:none"
                    type="file"
                    ref="profilePic"
                    @change="uploadPic">
                </div>
            </v-col>
            <v-col>
            <v-row>
            <!-- BASIC INFO -->
            <v-col>
            <div class="text-h7 grey--text">Name</div>
            {{doc.firstName}} {{doc.lastName}}
            </v-col>
            <v-col>
            <div class="text-h7 grey--text">Gender</div>
            {{doc.sex}}
            </v-col>
            </v-row>
            <v-row>
                <!-- age -->
             <!--dob format needs change Month name  -->
             <v-col>
            <div class="text-h7 grey--text">Date of Birth</div>
            {{doc.dob}} 
             </v-col>
             <v-col>
            <div class="text-h7 grey--text">Contact Number</div>
            {{doc.phoneNumber}} 
             </v-col>
            </v-row>
            <v-row>
                <v-col>

            <div class="text-h7 grey--text">Address</div>
            {{doc.address}}
                </v-col>
            </v-row>
            </v-col>
            </v-row>

            </v-container>
             <!-- MEDICAL INFO like bldgrp , hght , diabeties etc  -->
      
    </div>
</template>

<script>
import { db } from '../db'
    export default{
        data(){
            return{
                id:this.$route.params.id,
                doc:null
            }
        },
        
        methods:{
            uploadPic(){
                alert(this.$refs.profilePic.files[0])
                // upload img firebase storage
                // update img url in firestore patient info
            },
            clk(){
                this.$refs.profilePic.click();
            },
        },

        firestore(){
            return{
                doc: db.collection('patients').doc(this.$route.params.id)
            }
        }

        

    }
</script>
<style scoped>
.v-btn{
    bottom: 0;
    right: 20px;
    
}
</style>