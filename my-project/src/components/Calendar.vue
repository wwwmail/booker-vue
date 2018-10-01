
<template>

<div>
    <div class="row">
        <div class="col-12 padding-0">
            <nav-bar></nav-bar>
        </div>
    </div>
    <b-modal ref="myModalRefU" hide-footer>
        <div v-if="infoMessage" class="alert alert-info">{{infoMessage}}</div>
        <div class="d-block text-center">
            <div class="row">
                <div class="col-12">
                    <h3>B.B details </h3></div>
            </div>

            <div class="row">
                <div class="col-1"></div>
                <div class="col-2 bg-secondary">when</div>
                <div class="col-4 bg-info">
                    <span class="form-control bg-info  text-white" > {{event.newStartTime}}</span>
                    </div>
                <div class="col-4 bg-info">
                    <span class="form-control bg-info  text-white" >{{event.newEndTime}}</span>
                </div>
                <div class="col-1"></div>
            </div>

            <div class="row">
                <div class="col-1"></div>
                <div class="col-2 bg-secondary">who</div>
                <div class="col-8 bg-info"> {{userEvent.first_name}} {{userEvent.last_name}} </div>

                <div class="col-1"></div>
            </div>

            <div class="row">
                <div class="col-1"></div>
                <div class="col-2 bg-secondary">notes:</div>
                <div class="col-8 bg-info">
                    <span class="form-control bg-info text-white" >{{event.description}}</span>
                </div>

                <div class="col-1"></div>
            </div>
            <div class="row">
                <div class="col-1"></div>
                <div class="col-2 bg-secondary">submited:</div>
                <div class="col-8 bg-info"> {{event.created}} </div>

                <div class="col-1"></div>
            </div>



        </div>


    </b-modal>
    <b-modal ref="myModalRef" hide-footer>
        <div v-if="infoMessage" class="alert alert-info">{{infoMessage}}</div>
        <div class="d-block text-center">
            <div class="row">
                <div class="col-12">
                    <h3>B.B details </h3></div>
            </div>

            <div class="row">
                <div class="col-1"></div>
                <div class="col-2 bg-secondary">when</div>
                <div class="col-4 bg-info">
                    <input class="form-control bg-info" v-model="event.newStartTime"> </div>
                <div class="col-4 bg-info">
                    <input class="form-control bg-info" v-model="event.newEndTime">
                </div>
                <div class="col-1"></div>
            </div>

            <div class="row">
                <div class="col-1"></div>
                <div class="col-2 bg-secondary">who</div>
                <div class="col-8 bg-info"> {{userEvent.first_name}} {{userEvent.last_name}} </div>

                <div class="col-1"></div>
            </div>

            <div class="row">
                <div class="col-1"></div>
                <div class="col-2 bg-secondary">notes:</div>
                <div class="col-8 bg-info">
                    <textarea class="form-control bg-info" v-model="event.description"></textarea>
                </div>

                <div class="col-1"></div>
            </div>
            <div class="row">
                <div class="col-1"></div>
                <div class="col-2 bg-secondary">submited:</div>
                <div class="col-8 bg-info"> {{event.created}} </div>

                <div class="col-1"></div>
            </div>

            <div class="row " v-if="event.recursion != 0 && event.recursion != null">
                <div class="col-1"></div>
                <div class="col-10 bg-secondary">Apply to all occurrences?</div>
                <div class="col-1"></div>
            </div>
            <div class="row " v-if="event.recursion != 0 && event.recursion != null">
                <div class="col-1"></div>
                <div class="col-10 bg-secondary">

                    <b-form-radio-group id="radiosRec" v-model="recUpdate" name="radioSubComponentRec">

                        <b-form-radio @change.native="setRecUpdateEvent($event.target.value)" value=0>No</b-form-radio>
                        <b-form-radio @change.native="setRecUpdateEvent($event.target.value)" value=1>Yes</b-form-radio>
                    </b-form-radio-group>

                </div>
                <div class="col-1"></div>
            </div>
            <div class="row">
                <div class="col">
                    <button v-on:click="updateEvent(event.id)" class="btn bg-success text-white">Update</button>
                </div>
                <div class="col">
                    <button v-on:click="removeEvent(event.id)" class="btn bg-danger text-white">Delete</button>
                </div>
            </div>


        </div>


    </b-modal>
    <!-- {{events}} -->
    <div class="row text-center">
        <div class="col rooms" v-for="room in rooms" :class="{'bg-success': room.id == selectRoomId}" v-on:click="selectRoom(room.id)"><span>{{room.name}}</span></div>
    </div>


    <div class="calendar">

        <div class="calendar-header  row">
            <div class="col-8 align-self-center">

                <span class="prev" @click="subtractMonth"><icon name="angle-double-left"></icon></span>

                <!-- <span class="info">{{initialDate}} {{month + ' - ' + year}} </span> -->
                <span class="info">{{month + ' - ' + year}} </span>

                <span class="next" @click="addMonth"><icon name="angle-double-right"></icon></span>
            </div>
            <div class="col-4">
                <button type="button" class="btn btn-success" v-if="selectRoomId">
                    <router-link class="text-white" :to="{ name: 'AddEvent', params: {id:selectRoomId}}"> Add event</router-link>
                </button>

            </div>
        </div>

        <div class="row settings">
            <div class="col-6 align-self-center">

                <b-form-radio-group id="radiosTypeCalendar" v-model="typeCalendar" name="radioSubComponentTypeCalendar">
                    <b-form-radio @change.native="setTypeOfCalendar($event.target.value)" value="1">Monday</b-form-radio>
                    <b-form-radio @change.native="setTypeOfCalendar($event.target.value)" value="6">Sunday</b-form-radio>
                </b-form-radio-group>

            </div>
            <div class="col-6  align-self-center text-right">

                <b-form-radio-group id="radios" v-model="typeTime" name="radioSubComponent">
                    <b-form-radio @change.native="setTypeOfTime($event.target.value)" value="12">12</b-form-radio>
                    <b-form-radio @change.native="setTypeOfTime($event.target.value)" value="24">24</b-form-radio>
                </b-form-radio-group>

            </div>
        </div>


        <div class="weekdays row">
            <div class="col-2 col-day-week" v-for="day in getDays()">{{day}}</div>
        </div>
        <div class="dates row">
            <div class="col-2 col-day-week" v-for="blank in getfirstDayOfMonth()">&nbsp;</div>
            <div class="col-2 col-day-week border" v-for="date in daysInMonth" :class="{'current-day': date == initialDate && month == initialMonth && year == initialYear,
             'chosen-day': choosenDate == date + ' ' + monthNumber + ' ' + year}" @click="chooseData(date, monthNumber, year)">
                <span class="date">{{date}}</span>

                <ul class="event">
                    <li v-for="item in getEventsByDay(year,monthNumber,date)">
                        <a v-if="userId == item.user_id || isAdmin " @click="showModal(item.id)" class="bg-success text-white event">
                          {{item.starttime | moment(momentFilter) }} - {{item.endtime | moment(momentFilter)}}
                      </a>
                        <span @click=showModalU(item.id) class="bg-warning text-white event" v-else>
                          {{item.starttime | moment(momentFilter) }} - {{item.endtime | moment(momentFilter)}}
                      </span>


                    </li>
                </ul>

            </div>
        </div>
    </div>




</div>
</div>
</div>

</template>

<script>

import NavBar from '@/components/NavBar'

export default {
    name: 'Calendar',
    data() {
        return {
            today: this.$moment(),
            dateContext: this.$moment(),//this.$moment().startOf('week').isoWeekday(1),
            //days: ['SUN', 'MON', 'TUE', 'WEN', 'THU', 'FRI', 'SUT'],
            //days2: ['MON', 'TUE', 'WEN', 'THU', 'FRI', 'SUT','SUN'],
            events: [],
            choosenDate: '',
            typeHour: 12,
            typeCalendar: localStorage.getItem('calendar-type') ? localStorage.getItem('calendar-type') : 1,
            event: {
                id: null,
                recursion: 0,
                recursion_id: null,
                user_id: null,
                room_id: null,
                description: null,
                newStartTime: null,
                newEndTime: null,
                starttime: null,
                endtime: null,
                created: null,
            },
            userEvent: {
                email: null
            },
            recUpdate: 0,
            infoMessage: '',
            rooms: [],
            selectRoomId: null,
            typeTime: localStorage.getItem('time-type') ? localStorage.getItem('time-type') : 12,
            momentFilter: localStorage.getItem('time-type') == 12 ? 'h:mm a' : 'H:mm',
        }
    },
    methods: {
        selectRoom(id) {
              if(id == null){
                id =1;
              }
                this.selectRoomId = id;
                this.getEvents();

            },
            getRooms() {
                let token = localStorage.getItem('user-token') || '';
                this.axios.get(this.$config.API + '/rooms', {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    }
                }).then((response) => {
                    this.rooms = response.data;

                    this.selectRoom(response.data[0].id);
                    this.getEvents();

                })
            },
            removeEvent(id) {

                let token = localStorage.getItem('user-token') || '';
                this.axios(this.$config.API + '/events/' + id, {
                    method: "DELETE",
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    },
                    data: {
                        id: id,
                        recursion: this.recUpdate,
                    }
                }).then((response) => {
                  this.getEvents();
                    this.infoMessage = response.data.message;

                })
            },
            updateEvent(id) {
                let token = localStorage.getItem('user-token') || '';

                this.axios(this.$config.API + '/events/' + id, {
                    method: "PUT",
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    },
                    data: {
                        data: this.event,
                        recursion: this.recUpdate,
                    }
                }).then((response) => {
                  this.getEvents();
                    this.infoMessage = response.data.message;
                    //this.getEvents();
                    //this.getRoom();
                })
            },
            setRecUpdateEvent(id) {
                this.recUpdate = id;
            },
            showModal(id) {
                this.infoMessage='';
                this.getEventById(id);

                this.$refs.myModalRef.show()
            },
            hideModal() {
                this.$refs.myModalRef.hide()
            },
            showModalU(id) {
                this.infoMessage='';
                this.getEventById(id);

                this.$refs.myModalRefU.show()
            },
            hideModalU() {
                this.$refs.myModalRefU.hide()
            },
            getUserById(id) {
                let token = localStorage.getItem('user-token') || '';
                this.axios.get(this.$config.API + '/users/' + id, {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    }
                }).then((response) => {
                    this.userEvent = response.data;

                })
            },
            addMonth: function() {
                var t = this;
                t.dateContext = this.$moment(t.dateContext).add(1, 'month');
            },
            subtractMonth: function() {
                var t = this;
                t.dateContext = this.$moment(t.dateContext).subtract(1, 'month');
            },

            chooseData: function(date, month, year) {
                this.choosenDate = date + ' ' + month + ' ' + year;

                this.$store.dispatch('setChoosenDate', date);
                this.$store.dispatch('setChoosenMonth',  month);
                this.$store.dispatch('setChoosenYear',  year);
            },

            dateToUnix(date) {
                return Date.parse(date) / 1000; //.getTime()/1000;
            },

            getEvents() {

                let token = localStorage.getItem('user-token') || '';
                this.axios.get(this.$config.API + '/events?room=' + this.selectRoomId, {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    }
                }).then((response) => {
                    this.events = response.data;
                })
            },
            getEventById(id) {

                let token = localStorage.getItem('user-token') || '';
                this.axios.get(this.$config.API + '/events/' + id, {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    }
                }).then((response) => {
                    this.event = response.data;
                    this.event.newStartTime = this.$moment(this.event.starttime, 'YYYY-MM-DD HH:mm').format(this.momentFilter);
                    this.event.newEndTime = this.$moment(this.event.endtime, 'YYYY-MM-DD HH:mm').format(this.momentFilter);
                    this.getUserById(response.data.user_id);
                })
            },

            getDays() {
                let type = this.getTypeCalendar();
                if (type == 1) {
                    return ['MON', 'TUE', 'WEN', 'THU', 'FRI', 'SUT', 'SUN']
                } else if (type == 6) {
                    return ['SUN', 'MON', 'TUE', 'WEN', 'THU', 'FRI', 'SUT']
                } else {
                    return ['MON', 'TUE', 'WEN', 'THU', 'FRI', 'SUT', 'SUN']
                }
            },

            getEventsByDay(year, month, day) {

                let formatDate = this.$moment(new Date(year + '-' + month + '-' + day)).format('YYYY-MM-DD');

                let events = this.events;

                let getEventsByDay = events.filter(function(e) {
                    return e.date == formatDate;
                });
                return getEventsByDay;
            },

            setTypeOfCalendar(id) {
                localStorage.setItem('calendar-type', id);
                this.typeCalendar = localStorage.getItem('calendar-type');
            },

            setTypeOfTime(id) {
                localStorage.setItem('time-type', id);
                this.typeTime = localStorage.getItem('time-type');
                this.momentFilter = this.typeTime == 12 ? 'h:mm a' : 'H:mm'
            },

            getfirstDayOfMonth() {
                let type = this.getTypeCalendar();
                if (type == 1) {
                    var t = this;
                    var firstDay = this.$moment(t.dateContext).subtract((t.currentDate - 0), 'days');

                    return firstDay.weekday();
                } else if (type == 6) {
                    var t = this;
                    var firstDay = this.$moment(t.dateContext).subtract((t.currentDate - 1), 'days');

                    return firstDay.weekday();
                } else {
                    var t = this;
                    var firstDay = this.$moment(t.dateContext).subtract((t.currentDate - 0), 'days');

                    return firstDay.weekday();
                }

            },
            getTypeCalendar() {
                return localStorage.getItem('calendar-type');
            }


    },
    created: function() {
        this.getRooms();
        //this.getEvents();

    },

    computed: {
        isAdmin: function() {
            return this.$store.state.isAdmin;
        },
        userId: function() {
            return this.$store.state.userId;
        },

        year: function() {
            var t = this;
            return t.dateContext.format('Y');
        },
        month: function() {
            var t = this;
            return t.dateContext.format('MMMM');
        },
        monthNumber: function() {
            var t = this;
            return t.dateContext.format('MM');
        },

        daysInMonth: function() {
            var t = this;
            return t.dateContext.daysInMonth();
        },
        currentDate: function() {
            var t = this;
            return t.dateContext.get('date');
        },

        firstDayOfMonth: function() {
            var t = this;
            var firstDay = this.$moment(t.dateContext).subtract((t.currentDate - 1), 'days');

            return firstDay.weekday();
        },

        initialDate: function() {
            var t = this;
            return t.today.get('date');
        },
        initialMonth: function() {
            var t = this;
            return t.today.format('MMMM');
        },
        initialYear: function() {
            var t = this;
            return t.today.format('Y');
        },
        days: function() {
            let type = this.getTypeCalendar();
            if (type == 1) {
                return ['MON', 'TUE', 'WEN', 'THU', 'FRI', 'SUT', 'SUN']
            } else if (type == 6) {
                return ['SUN', 'MON', 'TUE', 'WEN', 'THU', 'FRI', 'SUT']
            } else {
                return ['MON', 'TUE', 'WEN', 'THU', 'FRI', 'SUT', 'SUN']
            }

        }

    },

    filters: {
        formatDate(value) {
            if (value) {
                return this.$moment(String(value)).format('MM/DD/YYYY hh:mm');
            }
        }
    },
    components: {
        NavBar
    }

}

</script>

<style scoped>

ul li {
    display: inline-block;
    width: 14.28%;
    float: left;
    text-align: center;
}

.col-day-week {
    width: 14.28%;
    text-align: center;
    -ms-flex: 0 0 14.28%;
    -webkit-box-flex: 0;
    flex: 0 0 14.28%;
    max-width: 14.28%;
}

ul.dates li.current-day {
    border: 2px solid #673AB7;
    color: #673AB7;
    font-weight: bold;
}

ul.dates li {
    height: auto;
}

ul.event li {
    width: 100%;
    height: auto;
    font-size: 12px;
}

.info {
    padding-left: 10px;
    padding-right: 10px;
    font-weight: bold;
}

.calendar-header {
    text-align: center;
    padding: 10px 0;
    background: #673bb7;
    color: #fff;
    font-size: 16px;
}

#app {
    max-width: 350px;
    border: 2px solid #673AB7;
}

ul {
    display: inline-block;
    width: 100%;
    margin-bottom: 0;
    padding: 0;
}

.weekdays {
    border-bottom: 1px solid #9644b6;
    background-color: #f0f8ff;
}

.weekdays li {
    font-weight: bold;
    color: #9644b6;
}

.event a {
    cursor: pointer;
}


/* .dates li:hover {
    border: 2px solid #bfa2ce;
    color: #9454b6;
    cursor: pointer;
} */

.chosen-day .date{
  color: #277ae3;
    font-weight: 800;
}

.prev,
.next {
    cursor: pointer;
    width: 50px;
    text-align: center;
}

.prev {
    float: left;
}

.next {
    float: right;
}

</style>
