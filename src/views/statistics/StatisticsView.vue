<template>
  <div>
    <el-card class="box-card">
      <div>
        <span>快捷入口</span>
        <div style="margin-left: 20%;">

          <el-col :span="5">
            <button class="btn-shine"  @click="admin1">
              <span>用户管理</span>
            </button>
          </el-col>

          <el-col :span="5">
            <button class="btn-shine" @click="admins">
              <span>员工管理</span>
            </button>
          </el-col>

          <el-col :span="5">
            <button class="btn-shine" @click="goods">
              <span>商品列表</span>
            </button>
          </el-col>

          <el-col :span="5">
            <button class="btn-shine" @click="purchase">
              <span>进货库存</span>
            </button>
          </el-col>
        </div>
      </div>
    </el-card>

    <el-card class="box-card1" style="margin-top:30px">
      <div>
        <span>进货统计</span>
      </div>
      <div>
        <el-col :span="12">
          <div id="main" style="width: 500px;height: 400px"></div>
        </el-col>

        <el-col :span="12">
          <div id="pie" style="width: 500px;height: 400px"></div>
        </el-col>
      </div>
    </el-card>

    <el-card class="box-card1" style="margin-top:30px">
      <div>
        <span>财务报表</span>
      </div>
      <div>
        <el-col :span="12">
          <div id="bar" style="width: 500px;height: 400px"></div>
        </el-col>

        <el-col :span="12">
          <div id="arr" style="width: 500px;height: 400px"></div>
        </el-col>
      </div>
    </el-card>


  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  name: "StatisticsView",
  data(){
    return{

    }
  },
  methods:{
    admin1(){
      this.$router.push('/admin1');
    },
    admins(){
      this.$router.push('/admins');
    },
    goods(){
      this.$router.push('/goods');
    },
    purchase(){
      this.$router.push('/purchase');
    }
  },
  mounted() {//
    //柱形图
    let option = {
      xAxis: {
        type: 'category',
        data: []
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [],
          type: 'line'
        },
        {
          data: [],
          type: 'bar'
        },
      ]
    };
    const chartDom = document.getElementById('main');
    const myChart = echarts.init(chartDom);
    //获取后端数据
    this.axios.get("http://localhost:9091/echarts/example").then(res=>{
      console.log("res:"+res.data)
      option.xAxis.data=res.data.x;
      option.series[0].data=res.data.y;
      option.series[1].data=res.data.y;
      myChart.setOption(option)
    })
    myChart.setOption(option);
    // 饼图
    const pieOption = {
      title: {
        text: '商品类别占比',
        subtext: 'Fake Data',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data: [
            {value: 1048, name: 'Search Engine'},
            {value: 735, name: 'Direct'},
            {value: 580, name: 'Email'},
            {value: 484, name: 'Union Ads'},
            {value: 300, name: 'Video Ads'}
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    const pietDom = document.getElementById('pie');
    const pieChart = echarts.init(pietDom);
    pieChart.setOption(pieOption)

    //测柱图
    const barOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // Use axis to trigger tooltip
          type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
        }
      },
      legend: {},
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value'
      },
      yAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      series: [
        {
          name: 'Direct',
          type: 'bar',
          stack: 'total',
          label: {
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          data: [320, 302, 301, 334, 390, 330, 320]
        },
        {
          name: 'Mail Ad',
          type: 'bar',
          stack: 'total',
          label: {
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: 'Affiliate Ad',
          type: 'bar',
          stack: 'total',
          label: {
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: 'Video Ad',
          type: 'bar',
          stack: 'total',
          label: {
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          data: [150, 212, 201, 154, 190, 330, 410]
        },
        {
          name: 'Search Engine',
          type: 'bar',
          stack: 'total',
          label: {
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          data: [820, 832, 901, 934, 1290, 1330, 1320]
        }
      ]
    };
    const barDom = document.getElementById('bar');
    const barChart = echarts.init(barDom);
    barChart.setOption(barOption)

    //年度财报
    const arrOption = {
      legend: {},
      tooltip: {},
      dataset: {
        dimensions: ['product', '2020', '2021', '2022'],
        source: [
          {product: 'Matcha Latte', 2020: 43.3, 2021: 85.8, 2022: 93.7},
          {product: 'Milk Tea', 2020: 83.1, 2021: 73.4, 2022: 55.1},
          {product: 'Cheese Cocoa', 2020: 86.4, 2021: 65.2, 2022: 82.5},
          {product: 'Walnut Brownie', 2020: 72.4, 2021: 53.9, 2022: 39.1}
        ]
      },
      xAxis: {type: 'category'},
      yAxis: {},

      series: [{type: 'bar'}, {type: 'bar'}, {type: 'bar'}]
    };
    const arrDom = document.getElementById('arr');
    const arrChart = echarts.init(arrDom);
    arrChart.setOption(arrOption);

  },

}
</script>

<style scoped>
.box-card {
  width: 100%;
  height: 150px;
}
.box-card1 {
  width: 100%;
  height: 450px;
}

button {
  position: relative;
  margin: 0;
  padding: 17px 35px;
  outline: none;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  text-transform: uppercase;
  background-color: #fff;
  border: 1px solid rgba(22, 76, 167, 0.6);
  border-radius: 10px;
  color: #1d89ff;
  font-weight: 400;
  font-family: inherit;
  z-index: 0;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.02, 0.01, 0.47, 1);
}

button span {
  color: #164ca7;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.7px;
}

button:hover {
  animation: rotate624 0.7s ease-in-out both;
}

button:hover span {
  animation: storm1261 0.7s ease-in-out both;
  animation-delay: 0.06s;
}

@keyframes rotate624 {
  0% {
    transform: rotate(0deg) translate3d(0, 0, 0);
  }

  25% {
    transform: rotate(3deg) translate3d(0, 0, 0);
  }

  50% {
    transform: rotate(-3deg) translate3d(0, 0, 0);
  }

  75% {
    transform: rotate(1deg) translate3d(0, 0, 0);
  }

  100% {
    transform: rotate(0deg) translate3d(0, 0, 0);
  }
}

@keyframes storm1261 {
  0% {
    transform: translate3d(0, 0, 0) translateZ(0);
  }

  25% {
    transform: translate3d(4px, 0, 0) translateZ(0);
  }

  50% {
    transform: translate3d(-3px, 0, 0) translateZ(0);
  }

  75% {
    transform: translate3d(2px, 0, 0) translateZ(0);
  }

  100% {
    transform: translate3d(0, 0, 0) translateZ(0);
  }
}

.btn-shine {
  border: 1px solid;
  overflow: hidden;
  position: relative;
}

.btn-shine span {
  z-index: 20;
}

.btn-shine:after {
  background: #38ef7d;
  content: "";
  height: 155px;
  left: -75px;
  opacity: 0.4;
  position: absolute;
  top: -50px;
  transform: rotate(35deg);
  transition: all 550ms cubic-bezier(0.19, 1, 0.22, 1);
  width: 50px;
  z-index: -10;
}

.btn-shine:hover:after {
  left: 120%;
  transition: all 550ms cubic-bezier(0.19, 1, 0.22, 1);
}

</style>