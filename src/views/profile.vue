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
                    <v-img
                    :src=cPicture
                    v-on:error="onImgError"
                    >
                    </v-img>

                    
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
                     <v-combobox
                   
                    v-model="tags"
                    multiple
                    chips
                    >

                    </v-combobox>
                    {{tags}}
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

            <v-form>
                <v-container>
                    <v-row>
                        <v-col md="6">
                            
                            <v-text-field
                            label="height (cm)"
                            v-model.number="height"
                            type="number"
                            />

                            
                            {{height}}
                        </v-col>
                        <v-col>
                            <v-select
                            :items="bloodGroup"
                            label="Blood Group"
                            >

                            </v-select>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col md="6">
                            
                            <v-text-field
                            label="weight (kg)"
                            v-model.number="weight"
                            type="number"
                            />

                            
                            {{weight}}
                        </v-col>
                        <v-col>
                            <v-select
                            :items="bloodGroup"
                            label="Blood Group"
                            >

                            </v-select>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-textarea
                            label="Personal Notes"></v-textarea>
                        </v-col>
                    </v-row>
                </v-container>
            </v-form>

            </v-container>
             <!-- MEDICAL INFO like bldgrp , hght , diabeties etc  -->
       
    </div>
</template>

<script>
import { db } from '../db'
import { storage } from '../db'

    export default{
        data(){
            return{
                id:this.$route.params.id,
                doc:null,
                tags:[],
                height:null,
                bloodGroup:['A+','A-','B+','B-','AB+','AB-','O+','O-']
               
            }
        },

        computed:{
            cPicture:function(){
               
                        return this.doc.img==null?'https://1.bp.blogspot.com/-MhWNihwWr2M/XXtJx1RLAuI/AAAAAAAADSE/RqffvXxfd3IKUQZ2Sr8DJa_XWBfkiYw5QCNcBGAsYHQ/s640/Screenshot_20190912-000604_Multi%2BParallel-min.jpg':this.doc.img;
            }
        },
        
        methods:{
            uploadPic(){
                
                var img=this.$refs.profilePic.files[0]
                
                
                // upload img firebase storage
                var storageRef = storage.ref(`${img.name}`).put(img)
                const ola=this.$route.params.id;

                storageRef.on('state_changed',function(snapshot) {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                snapshot.ref.getDownloadURL().then(function(downloadURL) {
                    console.log('File available at', downloadURL);
                    
                    // update img url in firestore patient info
                    db.collection('patients').doc(ola).update({img:downloadURL})
                    
                  
                });
                });
            },
            onImgError:function(){
                alert('eroor')
                this.failedImg=true
            }
            ,
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


.v-text-field > .v-input__control > .v-input__slot:before, .v-text-field > .v-input__control > .v-input__slot:after {
   display: none!important;
}
.v-text-field > .v-input__control > .v-input__slot:before, .v-text-field > .v-input__control > .v-input__slot:before {
   display: none!important;
}

</style>