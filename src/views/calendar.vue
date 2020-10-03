<template>
  <v-row class="fill-height ml-8 mr-8">

    <v-col>
    
        <v-sheet height="60">
        <v-toolbar flat color="white">
          <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
            Today
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="prev">
            <v-icon small>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="next">
            <v-icon small>mdi-chevron-right</v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-menu bottom right>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                outlined
                color="grey darken-2"
                v-bind="attrs"
                v-on="on"
              >
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right>mdi-menu-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Day</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Week</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Month</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = '4day'">
                <v-list-item-title>4 days</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="400">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :type="type"
          :events="events"
          :event-color="getEventColor"
          :event-ripple="false"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
          @change="change"
        
          @mousedown:event="startDrag"
          @mousedown:time="startTime"
          @mousemove:time="mouseMove"
          @mouseup:time="endDrag"
      
      
          @mousemove:day="mouseMove"
          @mousedown:day="startTime"
          @mouseup:day="endDrag"
          @mouseleave.native="cancelDrag"
        >
          <template #event="{ event, timed, eventSummary }"
          >
            <div
              class="v-event-draggable"
              v-html="eventSummary()"
            ></div>
            <div
              v-if="timed"
              class="v-event-drag-bottom"
              
              @mousedown.stop="extendBottom(event)"
            ></div>
          </template>
        </v-calendar>



         <v-dialog
          width="800"
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card
            color="grey lighten-4"
            min-width="350px"
            flat
          >
            <v-toolbar
              :color="selectedEvent.color"
              dark
            >
              <v-btn icon
              @click="deleteItem()">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>
              
              <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text>

              <!-- event -->
             <v-form
             v-if="currentlyEditing==selectedEvent.id">
                <v-text-field
            v-model="selectedEvent.name"
            label="name"
            required
          ></v-text-field>

          <v-textarea
          label="detail"
          v-model="detail">

          </v-textarea>
          

          <!-- event dates and time field -->
          <v-expansion-panels>
            <v-expansion-panel>
            <v-expansion-panel-header>{{dates}}</v-expansion-panel-header>
            <v-expansion-panel-content>
                
                <v-date-picker
                  v-model="dates"
                  multiple
                  no-title
                  type="date"
                  label="name"
                  required
                ></v-date-picker>
            
            </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
            <v-expansion-panel-header>{{from}} - {{to}}</v-expansion-panel-header>
            <v-expansion-panel-content>
            
                <v-row>
                    <v-col cols="6">

                          <v-time-picker 
                          v-model="from" 
                          color="green lighten-1"
                          scrollable
                          ></v-time-picker>
                    </v-col>
                    <v-col cols="6">
                          <v-time-picker 
                          v-model="to" 
                          color="green lighten-1"
                          scrollable
                          ></v-time-picker>
                    </v-col>
                </v-row>
            
            </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>


             </v-form>
             <v-container
             v-else>
             {{selectedEvent.name}}
             <br>
             {{selectedEvent.start | converToTime}} - {{selectedEvent.end | converToTime}}

             <br>
             {{selectedEvent.detail}}
             </v-container>
            </v-card-text>
            <v-card-actions>
              <v-btn
                text
                color="secondary"
                @click="selectedOpen = false;currentlyEditing=null;"
              >
                Close
              </v-btn>
              <v-btn
                text
                color="secondary"
                v-if='currentlyEditing!==selectedEvent.id'
                @click.prevent="editEvent"
              >
                edit
              </v-btn>
              <v-btn
                text
                color="secondary"
                v-else
                @click.prevent="saveEdit"
              >
                save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>

  import {db} from '../db'
  export default {
    data: () => ({
      value: '',
      colors: ['#2196F3', '#3F51B5', '#673AB7', '#00BCD4', '#4CAF50', '#FF9800', '#757575'],
      names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
      dragEvent: null,
      dragStart: null,
      createEvent: null,
      createStart: null,
      extendOriginal: null,
      focus: '',
      type: 'week',
      typeToLabel: {
        month: 'Month',
        week: 'Week',
        day: 'Day',
        '4day': '4 Days',
      },
      // event fields
      dates:null,
      from:null,
      to:null,
      name:null,
      detail:null,
      start:null,
      end:null,
      EventType:null,
      currentlyEditing:null,
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      events: [],
      eventss: [],
      dialog:false,
      clk:false
    
    }),


    firestore:{
      events:db.collection('events')
    },
   

    methods: {
      change(){
        console.log('change')
      },

      deleteItem(){
        console.log(this.selectedEvent.name)
        this.$firestoreRefs.events.doc(this.selectedEvent.id).delete()
        this.selectedOpen=false
        console.log(this.selectedEvent)
        // this.selectedEvent=null
        console.log(this.selectedOpen)
      },


      click(){
        alert('double')
        },
      startDrag ({ event, timed }) {
        console.log('startDrag')
        console.log(event)
        console.log(timed)
        this.clk=true
        if (event && event.timed) {
          console.log('event timed')
          this.dragEvent = event
          this.selectedEvent=event
          this.dragTime = null
          this.extendOriginal = null
        }
      },
      startTime (tms) {
        console.log('startTime')
        console.log(tms)
        const mouse = this.toTime(tms)
        console.log(mouse)

        if (this.dragEvent && this.dragTime === null) {
          const start = this.dragEvent.start

          this.dragTime = mouse - start
        } else {
          
          this.createStart = this.roundTime(mouse)
          console.log('ext')
          this.createEvent = {
            name: `Event #${this.events.length}`,
            color: this.rndElement(this.colors),
            start: this.createStart,
            end: this.createStart+1000000,
            timed: true,
          }
          this.events.push(this.createEvent)
          // this.$firestoreRefs.events.add(this.createEvent)
           
         
        }
      },
      extendBottom (event) {
        console.log('extendBottom')
        this.createEvent = event
        this.createStart = event.start
        this.extendOriginal = event.end
      },
      mouseMove (tms) {
        console.log('mouseMove')
        this.clk=false
        const mouse = this.toTime(tms)

        if (this.dragEvent && this.dragTime !== null) {
          const start = this.dragEvent.start
          const end = this.dragEvent.end
          const duration = end - start
          const newStartTime = mouse - this.dragTime
          const newStart = this.roundTime(newStartTime)
          const newEnd = newStart + duration

          this.dragEvent.start = newStart
          this.dragEvent.end = newEnd
        } else if (this.createEvent && this.createStart !== null) {
          const mouseRounded = this.roundTime(mouse, false)
          const min = Math.min(mouseRounded, this.createStart)
          const max = Math.max(mouseRounded, this.createStart)
          console.log('extend mouse move')
          console.log(this.createEvent)
          this.createEvent.start = min
          this.createEvent.end = max
        }
      },
      endDrag () {
        console.log('endDrag')
        //checking the event object used for each action
        console.log(this.selectedOpen)
        // used for drag and move event
        console.log(this.dragEvent)
        // used for extend bottom of event
        console.log(this.createEvent);
      if (this.dragEvent){
        // dragEvent when event is drag and dropped
          this.$firestoreRefs.events.doc(this.dragEvent.id).update(this.dragEvent)
      }
      else{
        //createEvent trigger when event created and bottom extended
        if(this.createEvent.id)
        {
          //update doc from eventDB 
          this.$firestoreRefs.events.doc(this.createEvent.id).update(this.createEvent)
        }
        else
          this.$firestoreRefs.events.add(this.events.pop())
      }
        this.dragTime = null
        this.dragEvent = null
        this.createEvent = null
        this.createStart = null
        this.extendOriginal = null
      },
      cancelDrag () {
        console.log('cancelDrag')
        if (this.createEvent) {
          if (this.extendOriginal) {
            this.createEvent.end = this.extendOriginal
          } else {
            const i = this.events.indexOf(this.createEvent)
            if (i !== -1) {
              this.events.splice(i, 1)
            }
          }
        }

        this.createEvent = null
        this.createStart = null
        this.dragTime = null
        this.dragEvent = null
      },
      roundTime (time, down = true) {
        const roundTo = 15 // minutes
        const roundDownTime = roundTo * 60 * 1000

        return down
          ? time - time % roundDownTime
          : time + (roundDownTime - (time % roundDownTime))
      },
      toTime (tms) {
        return new Date(tms.year, tms.month - 1, tms.day, tms.hour, tms.minute).getTime()
      },
      getEventColor (event) {
        const rgb = parseInt(event.color.substring(1), 16)
        const r = (rgb >> 16) & 0xFF
        const g = (rgb >> 8) & 0xFF
        const b = (rgb >> 0) & 0xFF

        return event === this.dragEvent
          ? `rgba(${r}, ${g}, ${b}, 0.7)`
          : event === this.createEvent
            ? `rgba(${r}, ${g}, ${b}, 0.7)`
            : event.color
      },
      // getEvents ({ start, end }) {
        

        
      // },
      

      rnd (a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a
      },
      rndElement (arr) {
        return arr[this.rnd(0, arr.length - 1)]
      },
      viewDay ({ date }) {
        this.focus = date
        this.type = 'day'
      },
      
      setToday () {
        this.focus = ''
      },
      prev () {
        this.$refs.calendar.prev()
      },
      next () {
        this.$refs.calendar.next()
      },
      showEvent ({ nativeEvent, event }) {
        console.log('showEventooooo')
        console.log(event)
        const open = () => {
          this.selectedEvent = event
          this.selectedElement = nativeEvent.target
          setTimeout(() => this.selectedOpen = true, 10)
        }

        if (this.clk) {
         
          open()
        }

        nativeEvent.stopPropagation()
      },

      //showEvent actions
        editEvent(){
        this.dates=[]
        
       
    
       var from = new Date(this.selectedEvent.start),
        month = '' + (from.getMonth() + 1),
        day = '' + from.getDate(),
        year = from.getFullYear(),
        fromHour = from.getHours(),
        fromMin = ''+from.getMinutes()

       var to = new Date(this.selectedEvent.end),
        toHour = +to.getHours(),
        toMin = ''+to.getMinutes()
        
    console.log(toMin)

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    if (fromMin.length < 2) 
        fromMin = '0' + fromMin;
    if (toMin.length < 2) 
        toMin = '0' + toMin;

        
      this.from=fromHour+':'+fromMin;
      this.to=toHour+':'+toMin;
       var date=[year, month, day].join('-');
       
    

        this.dates.push(date)
        this.currentlyEditing=this.selectedEvent.id
      },

      saveEdit(){
        this.currentlyEditing=null;
        this.$firestoreRefs.events.doc(this.selectedEvent.id).delete();
        var editEvent=this.selectedEvent;
        editEvent.detail=this.detail
        this.dates.forEach((eventDate)=>{
          editEvent.start=Date.parse(eventDate+' '+this.from);
          editEvent.end=Date.parse(eventDate+' '+this.to);
          editEvent.from=this.from;
          editEvent.to=this.to;
          
          
          console.log(editEvent)
          this.$firestoreRefs.events.add(editEvent)
        })
      this.selectedOpen=false
      }

    },
    filters:{
      // to display event timing(hh:mm) from timestamp
      converToTime:function(timestamp){
        var d=new Date(timestamp),
        hr=d.getHours(),
        min=''+d.getMinutes();
        console.log(hr)
        console.log(min)
        if (min.length < 2) 
        min = '0' + min;


        return hr+':'+min
      }
    }
    
  }
</script>

<style scoped lang="scss">
.v-event-draggable {
  padding-left: 6px;
}

.v-event-timed {
  user-select: none;
  -webkit-user-select: none;
}

.v-event-drag-bottom {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 4px;
  height: 4px;
  cursor: ns-resize;

  &::after {
    display: none;
    position: absolute;
    left: 50%;
    height: 4px;
    border-top: 1px solid white;
    border-bottom: 1px solid white;
    width: 16px;
    margin-left: -8px;
    opacity: 0.8;
    content: '';
  }

  &:hover::after {
    display: block;
  }
}
</style>