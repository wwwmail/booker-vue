

<template>

<div class="container">

<!-- {{events}} -->
    <div class="row">
        <div class="col-4">room 1</div>
        <div class="col-4"> room 2</div>
        <div class="col-4"> room 3</div>
    </div>
    <div class="calendar">

        <div class="calendar-header  row">
            <span class="prev" @click="subtractMonth"><icon name="angle-double-left"></icon></span>

            <span class="info">{{initialDate}} {{month + ' - ' + year}} </span>

            <span class="next" @click="addMonth"><icon name="angle-double-right"></icon></span>


            <p>Your selected date is : {{choosenDate}} {{dateToUnix(choosenDate)}}</p>
            <router-link :to="{ name: 'AddEvent'}"> Add event</router-link>

            <b-form-group>
                <b-form-radio-group id="radios" v-model="typeCalendar" name="radioSubComponent">
                    <b-form-radio @change.native="setTypeOfCalendar($event.target.value)" value="1">Monday</b-form-radio>
                    <b-form-radio @change.native="setTypeOfCalendar($event.target.value)" value="6">Sunday</b-form-radio>
                </b-form-radio-group>
            </b-form-group>
        </div>
        <div class="weekdays row">
            <div class="col-2 col-day-week" v-for="day in getDays()">{{day}}</div>
        </div>
        <div class="dates row">
            <div class="col-2 col-day-week" v-for="blank in getfirstDayOfMonth()">&nbsp;</div>
            <div class="col-2 col-day-week border" v-for="date in daysInMonth" :class="{'current-day': date == initialDate && month == initialMonth && year == initialYear, 'chosen-day': choosenDate == date + ' ' + month + ' ' + year}" @click="chooseData(date, month, year)">
                <span>{{date}}</span>

                <ul class="event">
                    <li v-for="item in getEventsByDay(year,monthNumber,date)">

                      <router-link :to="{ name: 'EditEvent', params: {id: item.id} }">{{item.starttime | moment("H:mm") }} - {{item.endtime | moment("H:mm")}}</router-link></li>
                </ul>

            </div>
        </div>
    </div>


</div>
</div>
</div>

</template>

<script>

export default {
    name: 'Calendar',
    data() {
        return {
            today: this.$moment(),
            dateContext: this.$moment().startOf('week').isoWeekday(1),
            //days: ['SUN', 'MON', 'TUE', 'WEN', 'THU', 'FRI', 'SUT'],
            //days2: ['MON', 'TUE', 'WEN', 'THU', 'FRI', 'SUT','SUN'],
            events: [],
            choosenDate: '',
            typeHour:12,
            typeCalendar:localStorage.getItem('calendar-type'),
        }
    },
    methods: {

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
        },

        dateToUnix(date) {
            return Date.parse(date) / 1000; //.getTime()/1000;
        },

        getEvents() {

            let token = localStorage.getItem('user-token') || '';
            this.axios.get(this.$config.API + '/events', {
                headers: {
                    'Authorization': 'Bearer ' + token,
                }
            }).then((response) => {
                this.events = response.data;
            })
        },

        getDays(){
          let type = this.getTypeCalendar();
          if(type == 1){
            return ['MON', 'TUE', 'WEN', 'THU', 'FRI', 'SUT','SUN']
          }else if (type == 6) {
            return ['SUN', 'MON', 'TUE', 'WEN', 'THU', 'FRI', 'SUT']
          }else {
            return ['MON', 'TUE', 'WEN', 'THU', 'FRI', 'SUT','SUN']
          }
        },

        getEventsByDay(year, month, day){

          let formatDate = this.$moment(year+'-'+month+'-'+day).format('YYYY-MM-DD');

          let events = this.events;

          let getEventsByDay = events.filter(function (e) {
              return e.date == formatDate;
          });
          return getEventsByDay;
        },

        setTypeOfCalendar(id){
          localStorage.setItem('calendar-type', id);
          this.typeCalendar = localStorage.getItem('calendar-type');
        },

        getfirstDayOfMonth() {
          let type = this.getTypeCalendar();
          if(type == 1){
            var t = this;
            var firstDay = this.$moment(t.dateContext).subtract((t.currentDate - 0), 'days');

            return firstDay.weekday();
          }else if (type == 6) {
            var t = this;
            var firstDay = this.$moment(t.dateContext).subtract((t.currentDate - 1), 'days');

            return firstDay.weekday();
          }else {
            var t = this;
            var firstDay = this.$moment(t.dateContext).subtract((t.currentDate - 0), 'days');

            return firstDay.weekday();
          }

        },
        getTypeCalendar(){
          return localStorage.getItem('calendar-type');
        }


    },
    created: function() {
        this.getEvents();
    },

    computed: {


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
        days: function(){
          let type = this.getTypeCalendar();
          if(type == 1){
            return ['MON', 'TUE', 'WEN', 'THU', 'FRI', 'SUT','SUN']
          }else if (type == 6) {
            return ['SUN', 'MON', 'TUE', 'WEN', 'THU', 'FRI', 'SUT']
          }else {
            return ['MON', 'TUE', 'WEN', 'THU', 'FRI', 'SUT','SUN']
          }

        }

    },

    filters:{
      formatDate(value) {
        if (value) {
          return this.$moment(String(value)).format('MM/DD/YYYY hh:mm');
        }
    }
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
}

.weekdays li {
    font-weight: bold;
    color: #9644b6;
}


/* .dates li:hover {
    border: 2px solid #bfa2ce;
    color: #9454b6;
    cursor: pointer;
} */

.chosen-day {
    border: 2px solid #44abb6;
    color: #44abb6;
    font-weight: bold;
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
