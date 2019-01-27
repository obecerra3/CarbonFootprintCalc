~<template>
  <div id="app">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet">

    <div class="heading"> YOUR CARBON FOOTPRINT </div>

    <br />

    <div class="flight_container">
      <div class="flex_row">
        <i class="material-icons md-18 icon material flight">airplanemode_active</i>
        <div class="flex_col">
          <div class="main_text">Atlanta to New York</div>
          <div class="sub_text">Tue, Nov 20, 2:34 PM</div>
        </div>
        <div class="emissions">1,000 lbs CO2</div>
        <i class="material-icons md-18">keyboard_arrow_down</i>
      </div>
    </div>

    <div class="flight_container">
      <div class="flex_row">
        <i class="material-icons md-18 icon material flight">airplanemode_active</i>
        <div class="flex_col">
          <div class="main_text">New York to Atlanta</div>
          <div class="sub_text">Mon, Nov 26, 2:03 PM</div>
        </div>
        <div class="emissions">1,300 lbs CO2</div>
        <i class="material-icons md-18">keyboard_arrow_down</i>
      </div>
    </div>

    <hr />

    <div class="total_emissions_container">
      <div class="flex_row">
        <i class="material-icons md-18 icon material total">account_balance</i>
        <div class="flex_col">
          <div class="flex_row">
            <div class="main_text">Total CO2 emissions</div>
            <div class="emissions">2,300 lbs CO2</div>
          </div>
          <div class="sub_text">Equivalent to putting n cars on the road for a year</div>
        </div>
        <i class="material-icons md-18 arrow_icon total_emissions_arrow">keyboard_arrow_down</i>
      </div>
    </div>

    <hr />

    <div class="heading"> OFFSET YOUR FOOTPRINT </div>

    <br />

    <a href="https://treesatlanta.org/" target="_blank">
      <div class="donate_button">
        <div class="flex_row">
            <img src="images/trees_atlanta.jpg" class="icon image">
          <div class="flex_col">
            <div class="main_text">Donate 10 trees to Trees Atlanta </div>
            <div class="sub_text">1 tree offsets n lbs of CO2 </div>
          </div>
          <i class="material-icons md-18 arrow_icon donate_arrow">keyboard_arrow_right</i>
        </div>
      </div>
    </a>

    <br />

    <a href="https://treesatlanta.org/" target="_blank">
      <div class="donate_button">
        <div class="flex_row">
          <img src="images/trees_atlanta.jpg" class="icon image">
          <div class="flex_col">
            <div class="main_text">Volunteer n hours with X </div>
            <div class="sub_text">1 hour offsets n lbs of CO2 </div>
          </div>
          <i class="material-icons md-18 arrow_icon donate_arrow">keyboard_arrow_right</i>
        </div>
      </div>
    </a>

    <h1>Vue Count: {{count}}</h1>
    <button v-on:click="incrementCount">
      Increase Count
    </button>
  </div>

</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      count: 0,
    };
  },
  methods: {
    incrementCount() {
      this.count += 1;
    },
  },
};

</script>

<style scoped>

#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-width:300px;
  margin:20px;
}

a {
  color: inherit;
  text-decoration: none; /* no underline */
}

hr {
  border-top: 1px solid #DEDEDE;
  margin-top: 15px;
  margin-bottom: 15px;
}

.flex_row {
  display:flex;
  flex-direction:row;
  align-items:center;
}

.flex_col {
  display:flex;
  flex-direction:column;
}

.main_text {
  font-weight: bold;
  font-size:110%;
}

.sub_text {
  font-size:95%;
  color: #979797;
}

.heading {
  font-size:95%;
  font-weight: bold;
  color: #171717;
}

.arrow_icon {
  margin-left: auto;
}

.total_emissions_arrow {
  align-self:flex-start;
}

.donate_arrow {
  margin-right:10px;
}

.emissions {
  margin-left:auto;
  margin-right:5px;
  justify-content:flex-end;
}

.donate_button {
  border-radius: 5px;
  border: 2px solid #DFDFDF;
  width: 300px;
  height: 50px;
  justify-content: flex-start;
}

.icon_container {
  margin-top:3px;
  margin-right:2px;
  margin-left:0px;
  padding-left:0px;
  overflow: hidden;
  width: 50px;
  height: 50px;
}

.icon {
  width: 40px;
  height: 40px;
  margin-top: 3px;
  margin-bottom: 3px;
  margin-left: 5px;
  margin-right: 9px;
}

.icon.image {
  object-fit: contain;
}

.icon.material{
  display:flex;
  border-radius:50%;
  justify-content: center;
  align-items: center;
}

.icon.material.flight {
  background:#EAEAEA;
  color:#000000;
}

.icon.material.total {
  background:#2C52EF;
  color:#FFFFFF;
}

.material-icons.md-18 { font-size: 18px; }
.material-icons.md-24 { font-size: 24px; }
.material-icons.md-36 { font-size: 36px; }
.material-icons.md-48 { font-size: 48px; }

</style>
