

<template>

<div class="hello main-container">

    <div class="row">
        <div class="col-12">
            <router-link :to="{ name: 'MainApp'}">
                <button class="btn">Back</button>
            </router-link>
        </div>
    </div>


    <form class="form-horizontal" role="form">
        <div class="row">
          <div class="row-12">
            <h2 class="title-event text-center">  Add Event</h2>
          </div>
        </div>
        <div class="row">
          <div class="row-12">
            <h5 class="text-red">{{infoMessage}}</h5>
          </div>
        </div>

        <div class="row"  v-if="isAdmin">
            <div class="col-1"></div>
            <div class="col-2 field-label-responsive">
                <label for="name">Booked for</label>
            </div>
            <div class="col-6">
                <div class="form-group">
                    <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                        <div class="input-group-addon" style="width: 2.6rem">
                            <icon name="user"></icon>
                        </div>
                        <select v-model="selected.user" class="form-control">
                            <option v-for="option in users" v-bind:value="option.id">{{option.first_name}} {{option.last_name}}</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="col-3">
                <div class="form-control-feedback">
                    <span class="text-danger align-middle">
                            <!-- Put name validation error messages here -->
                            <span v-if="errorValidate.user">  {{errorValidate.user}} </span>


                    </span>
                </div>
            </div>

        </div>


        <div class="row">
          <div class="col-1"></div>
            <div class="col-2 field-label-responsive">
                <label for="name">Select Date</label>
            </div>
            <div class="col-6">
                <div class="form-group">
                    <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                        <div class="input-group-addon" style="width: 2.6rem">
                            <icon name="calendar"></icon>
                        </div>

                        <select v-model="selectedDateTime.year" class="form-control">
                            <option value="" disabled selected>Year</option>
                            <option v-for="option in years" v-bind:value="option">{{option}}</option>
                        </select>

                        <select v-model="selectedDateTime.month" class="form-control">
                            <option value="" disabled selected>Month</option>
                            <option v-for="option in monthLabels" v-bind:value="option">{{new Date(option) | moment("MMMM")}}</option>
                        </select>

                        <select v-model="selectedDateTime.day" class="form-control">
                            <option value="" disabled selected>Day</option>
                            <option v-for="option in daysInMonth" v-bind:value="option">{{option}}</option>
                        </select>



                    </div>
                </div>
            </div>
            <div class="col-3">
                <div class="form-control-feedback">
                    <span class="text-danger align-middle">
                              <span v-if="errorValidate.year">  {{errorValidate.year}} </span>
                    </span>
                    <span class="text-danger align-middle">
                              <span v-if="errorValidate.month">  {{errorValidate.month}} </span>
                    </span>
                    <span class="text-danger align-middle">
                              <span v-if="errorValidate.day">  {{errorValidate.day}} </span>
                    </span>
                </div>
            </div>

        </div>




        <div class="row">
            <div class="col-1"></div>
            <div class="col-2 field-label-responsive">
                <label for="email">start time</label>
            </div>
            <div class="col-6">
                <div class="form-group">
                    <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                        <div class="input-group-addon" style="width: 2.6rem">
                            <icon name="clock"></icon>
                        </div>

                        <select v-model="selectedDateTime.startHour" class="form-control">
                            <option value="" disabled selected>hours </option>
                            <option v-for="option in hours[hour]" v-bind:value="option">{{option}}</option>
                        </select>


                        <select v-model="selectedDateTime.startMinutes" class="form-control">
                            <option value="" disabled selected>minutes</option>
                            <option v-for="option in minutes" v-bind:value="option">{{option}}</option>
                        </select>

                        <select v-if="hours[hour] != 24" v-model="selectedDateTime.formatStartTime" class="form-control">
                            <option value="" disabled selected>AM/PM</option>
                            <option v-for="option in t12" v-bind:value="option">{{option}}</option>
                        </select>

                    </div>
                </div>
            </div>
            <div class="col-3">
                <div class="form-control-feedback">
                  <span class="text-danger align-middle">
                            <span v-if="errorValidate.startHour">  {{errorValidate.startHour}} </span>
                  </span>
                  <span class="text-danger align-middle">
                            <span v-if="errorValidate.startMinutes">  {{errorValidate.startMinutes}} </span>
                  </span>
                  <span class="text-danger align-middle">
                            <span v-if="errorValidate.formatStartTime">  {{errorValidate.formatStartTime}} </span>
                  </span>
                </div>
            </div>

        </div>


        <div class="row">
            <div class="col-1"></div>
            <div class="col-2 field-label-responsive">
                <label for="email">end time</label>
            </div>
            <div class="col-6">
                <div class="form-group">
                    <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                        <div class="input-group-addon" style="width: 2.6rem">
                            <icon name="clock"></icon>
                        </div>

                        <select v-model="selectedDateTime.endHour" class="form-control">
                            <option value="" disabled selected>hours </option>
                            <option v-for="option in hours[hour]" v-bind:value="option">{{option}}</option>
                        </select>


                        <select v-model="selectedDateTime.endMinutes" class="form-control">
                            <option value="" disabled selected>minutes</option>
                            <option v-for="option in minutes" v-bind:value="option">{{option}}</option>
                        </select>

                        <select v-if="hours[hour] != 24" v-model="selectedDateTime.formatEndTime" class="form-control">
                            <option value="" disabled selected>AM/PM</option>
                            <option v-for="option in t12" v-bind:value="option">{{option}}</option>
                        </select>

                    </div>
                </div>
            </div>
            <div class="col-3">
                <div class="form-control-feedback">
                  <span class="text-danger align-middle">
                            <span v-if="errorValidate.endtHour">  {{errorValidate.endtHour}} </span>
                  </span>
                  <span class="text-danger align-middle">
                            <span v-if="errorValidate.endMinutes">  {{errorValidate.endMinutes}} </span>
                  </span>
                  <span class="text-danger align-middle">
                            <span v-if="errorValidate.formatEndTime">  {{errorValidate.formatEndTime}} </span>
                  </span>
                </div>
            </div>

        </div>

        <div class="row">
            <div class="col-1"></div>
            <div class="col-2 field-label-responsive">
                <label for="email">description</label>
            </div>
            <div class="col-6">
                <div class="form-group">
                    <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                        <div class="input-group-addon" style="width: 2.6rem">
                            <icon name="align-justify"></icon>
                        </div>

                        <textarea class="form-control" v-model="event.description"></textarea>

                    </div>
                </div>
            </div>
            <div class="col-2">
                <div class="form-control-feedback">
                    <span class="text-danger align-middle">
                          <span v-if="event.error">  {{event.error}} </span>
                    </span>
                </div>
            </div>
            <div class="col-1"></div>
        </div>

        <div class="row">
            <div class="col-1"></div>
            <div class="col-2 field-label-responsive">
                <label for="email">is this going be a reccuring event</label>
            </div>
            <div class="col-6">
                <div class="form-group">
                    <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                        <div class="input-group-addon" style="width: 2.6rem">
                            <icon name="check"></icon>
                        </div>

                        <b-form-group>
                            <b-form-radio-group id="radios" v-model="reccuring" name="radioSubComponent">
                                <b-form-radio selected value="0">No</b-form-radio>
                                <b-form-radio value="1">Yes</b-form-radio>
                            </b-form-radio-group>
                        </b-form-group>


                    </div>
                </div>
            </div>
            <div class="col-2">
                <div class="form-control-feedback">
                    <span class="text-danger align-middle">
                          <span v-if="errorEmail">  {{errorEmail}} </span>
                    </span>
                </div>
            </div>
            <div class="col-1"></div>
        </div>

        <div class="row">
            <div class="col-1"></div>
            <div class="col-2 field-label-responsive">
                <label for="email">if it is reccuring, specify wickly, be-wickly, monthly</label>
            </div>
            <div class="col-6">
                <div class="form-group">
                    <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                        <div class="input-group-addon" style="width: 2.6rem">
                            <icon name="check"></icon>
                        </div>

                        <b-form-group>
                            <b-form-radio-group id="radios2" v-model="reccuringType" name="radio2">
                                <b-form-radio value="weekly">weeckly</b-form-radio>
                                <b-form-radio value="be-weekly">be-weeckly</b-form-radio>
                                <b-form-radio value="monthly">monthly</b-form-radio>
                            </b-form-radio-group>
                        </b-form-group>


                    </div>
                </div>
            </div>
            <div class="col-2">
                <div class="form-control-feedback">
                    <span class="text-danger align-middle">
                          <span v-if="errorEmail">  {{errorEmail}} </span>
                    </span>
                </div>
            </div>
            <div class="col-1"></div>
        </div>




        <div class="row">
          <div class="col-1"></div>
            <div class="col-8">
                If weeckly or bi-weeckly, specify the number of weeks for it to keep reccuring. If monthly, specify the number of months. (If you choose "bi-weekly" and put in an odd number of weeks, the computer will round down.)
            </div>
            <div class="col-3"></div>
        </div>
        <div class="row">

            <div class="col-3">

            </div>
            <div class="col-4">
                <div class="form-group has-danger">
                    <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                        <input type="text" name="password" v-model="reccuringValue" class="form-control"  placeholder="number">
                    </div>
                </div>
            </div>
            <div class="col-3">
                <div class="form-control-feedback">
                    <span class="text-danger align-middle">
                          <span v-if="errorPassword">  {{errorPassword}} </span>
                    </span>
                </div>
            </div>
            <div class="col-2"></div>
        </div>

        <div class="row">
            <div class="col-4"></div>
            <div class="col-8">
                <button v-on:click="sendForm()" class="btn btn-style btn-event bg-success text-white">
                        <icon name="plus"></icon> event</button>
            </div>
        </div>
    </form>

</div>

</template>

<script>

export default {
    name: 'AddEvent',
    data() {
        return {
            users: [],
            selected: {
                user: null,
            },
            roomId:1,
            selectedDateTime: {
                day: '',
                month: '',
                year: (new Date()).getFullYear(),
                formatStartTime: '',
                formatEndTime: '',
                startHour: '',
                startMinutes: '',
                endHour: '',
                endMinutes: '',
            },
            reccuring: 0,
            reccuringType: null,
            reccuringValue:null,




            currentDate: this.$moment(),
            monthLabels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
            years: [2018, 2019],
            hours: {
                12: ['1','2','3','4','5','6','7','8','9','10','11','12'],
                24: ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','00']
            },

            t12: ['AM', 'PM'],
            minutes: ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'],

            event: {
                description: '',
                error:null,
            },
            errorFlag:false,
            //date

            //date

            errorValidate: {
                user: null,
                year: null,
                month: null,
                day: null,
                startHour:null,
                startMinutes:null,
                formatStartTime:null,
                endHour:null,
                endMinutes:null,
                formatEndTime:null,

            },
            errorSelectUser: null,
            infoMessage: '',

            errorFirstName: '',
            errorLastName: '',
            errorEmail: '',
            errorPassword: '',

        }
    },
    methods: {
      setHours(){
        this.hour = localStorage.getItem('time-type') ? localStorage.getItem('time-type') : 12
      },
        getUsers() {
                let token = localStorage.getItem('user-token') || '';

                this.axios.get(this.$config.API + '/users', {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    }
                }).then((response) => {
                    this.users = response.data;

                })
            },

            validateForm(){
              let error = false;
              if (!this.selected.user && this.isAdmin) {
                  this.errorValidate.user = 'Please select user is required';
                  error = true;
              }else {
                this.errorValidate.user = null;
              }

              for (var prop in this.selectedDateTime) {
                if(!this.selectedDateTime[prop]){
                  this.errorValidate[prop] = prop + ' is required';
                  error = true;
                }else{
                    this.errorValidate[prop] = null;
                }
              }

              if (!this.event.description) {
                  this.event.error = 'description is required';
                  error = true;
              }else {
                this.event.error = null;
              }
              return error;

            },



            sendForm: function() {
              if(this.validateForm()){
                return false;
              }else{

                 let token = localStorage.getItem('user-token') || '';
                 let id = this.$route.params.id;
                 this.axios(this.$config.API + '/events', {
                     method: "POST",
                     headers: {
                         'Authorization': 'Bearer ' + token,
                     },
                     data:{
                       user_id: this.selected.user,
                       room_id: this.$route.params.id,
                       recursion:this.reccuring,
                       description: this.event.description,
                       date: this.selectedDateTime.year +"-" + this.selectedDateTime.month+'-'+this.selectedDateTime.day,
                       starttime:this.selectedDateTime.year +"-" + this.selectedDateTime.month+'-'+this.selectedDateTime.day + ' ' + this.selectedDateTime.startHour + ':' + this.selectedDateTime.startMinutes + ' ' + this.selectedDateTime.formatStartTime,
                       endtime: this.selectedDateTime.year +"-" + this.selectedDateTime.month+'-'+this.selectedDateTime.day + ' ' + this.selectedDateTime.endHour + ':' + this.selectedDateTime.endMinutes + ' ' + this.selectedDateTime.formatEndTime,
                       recursion_type: this.reccuringType,
                       recursion_value: this.reccuringValue,


                     }
                 }).then((response) => {
                   this.infoMessage = response.data.message;
                   console.log(response);
                    //this.getBook();
                 })
              }
            },
            validEmail: function(email) {
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
            }
    },
    filters: {

    },
    computed: {
        daysInMonth() {
            let d = new Date(this.selectedDateTime.year, this.selectedDateTime.month, 0);
            return d.getDate();
        },

        isAdmin(){
          return this.$store.state.isAdmin;
        }
    },
    created() {
        this.setHours();
        this.getUsers();
    }
}

</script>
