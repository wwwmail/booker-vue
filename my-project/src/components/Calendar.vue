

<template>

<div class="container">
    <div class="calendar">
        Calendar
        <div class="calendar-header">
            <span class="prev" @click="subtractMonth"><icon name="angle-double-left"></icon></span>

            <span class="info">{{month + ' - ' + year}}</span>

            <span class="next" @click="addMonth"><icon name="angle-double-right"></icon></span>


            <p>Your selected date is : {{choosenDate}} {{dateToUnix(choosenDate)}}</p>
        </div>
        <ul class="weekdays">
            <li v-for="day in days">{{day}}</li>
        </ul>
        <ul class="dates">
            <li v-for="blank in firstDayOfMonth">&nbsp;</li>
            <li v-for="date in daysInMonth" :class="{'current-day': date == initialDate && month == initialMonth && year == initialYear, 'chosen-day': choosenDate == date + ' ' + month + ' ' + year}" @click="chooseData(date, month, year)">
                <span>{{date}}</span>
                
            </li>
        </ul>
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
            dateContext: this.$moment(),
            days: ['SUN', 'MON', 'TUE', 'WEN', 'THU', 'FRI', 'SUT'],
            events:[{'id':1,'time':'11:00 - 12:00'},{'id':2,'time':'12:00 - 13:00'},{'id':3,'time':'13:00 - 14:00'}],
            choosenDate: '',
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

        dateToUnix(date){
          return Date.parse(date)/1000;//.getTime()/1000;

        }


    },
    created: function() {

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

    },

}

</script>


<style scoped>

ul li {
    display: inline-block;
    width: 14.28%;
    float: left;
    text-align: center;
}

ul li {
    width: 14.28%;
    height: 35px;
    line-height: 35px;
    text-align: center;
    border: 2px solid transparent;
}

ul.dates li.current-day {
    border: 2px solid #673AB7;
    color: #673AB7;
    font-weight: bold;
}

ul.dates li {
  height: 100px;
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

.dates li:hover {
    border: 2px solid #bfa2ce;
    color: #9454b6;
    cursor: pointer;
}

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
