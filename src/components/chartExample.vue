<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <img class = "logo" src="../assets/img/logo.png">
        </div>
    </div>

    <div class="row">
      <div class="form-group col-6 col-md-4">
        <div v-for="(t, index) in sales">
            <input v-model.number="sales[index].total" type="number"> 
            <button v-model="sales[index]" type="submit" @click="removeItem(index, $event)"> [-] </button>             
        </div>
        <button v-on:click="newItem"> [+] </button>
      </div>
      <div class="col-6 col-md-8">
        <div class="row">
          <div class="col-12">
            <v-chart v-bind:chartData="lineGraphData"></v-chart>
          </div>
          <div class="col-12 col-lg-6">
            <v-chart v-bind:chartData="areaChartData"></v-chart>
          </div>
          <div class="col-12 col-lg-6">
            <v-chart v-bind:chartData="barChartData"></v-chart>
          </div>
          <div class="col-12 col-lg-6">
            <v-chart v-bind:chartData="vBarChartData"></v-chart>
          </div>
          <div class="col-12 col-lg-6">
            <v-chart v-bind:chartData="pieChartData"></v-chart>
          </div>
        </div>  
      </div>
    </div>
    <a href="https://github.com/ignoreintuition/v-chart-plugin"><img style="position: absolute; top: 0; right: 0; border: 0;" src="https://s3.amazonaws.com/github/ribbons/forkme_right_red_aa0000.png" alt="Fork me on GitHub"></a>
  </div>
</template>

<script>
import sales from "../assets/data/sales";

export default {
  name: "barChartExample",
  methods: {
    newItem: function(){
      this.sales.push({
        "month": null,
        "year": null,
        "total": null,
        "actual": false
      })
    },
    removeItem: function(d, e){
      e.preventDefault();
      this.sales.splice(d, 1)
    }
  },
  data() {
    return {
      sales: sales,
      areaChartData: {
        chartType: "areaChart",
        selector: "areaChart",
        title: "Area Chart",
        width: 300,
        height: 200,
        metric: "total",
        dim: "month",
        data: sales
      },
      barChartData: {
        chartType: "barChart",
        selector: "chart",
        title: "Bar Chart",
        subtitle: "Sales by month",
        width: 300,
        height: 200,
        metric: "total",
        dim: "month",
        data: sales
      },
      lineGraphData: {
        chartType: "lineGraph",
        selector: "lineGraph",
        title: "Line Graph",
        width: 600,
        subtitle: "Sales by month",        
        height: 200,
        metric: "total",
        dim: "month",
        data: sales
      },
      vBarChartData: {
        chartType: "vBarChart",
        selector: "vChart",
        title: "Verticle Bar Chart",
        subtitle: "Sales by month",
        width: 300,
        height: 200,
        metric: "total",
        dim: "month",
        data: sales
      },
      pieChartData: {
        chartType: "pieChart",
        selector: "pieChart",
        title: "Pie Chart",
        subtitle: "Sales by month",
        width: 300,
        height: 200,
        metric: "total",
        dim: "month",
        data: sales
      },
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style> 
  .logo {
    width: 200px
  }
</style>
