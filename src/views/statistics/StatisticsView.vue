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
              <span>进货入库</span>
            </button>
          </el-col>
        </div>
      </div>
    </el-card>

    <el-card class="box-card1" style="margin-top:10px">
      <div>
        <span>财务报表</span>
      </div>
      <div>
          <div id="main" style="width: 800px ; height: 400px ;margin-left: 200px"></div>
      </div>
    </el-card>

    <el-card class="box-card1" style="margin-top:10px">
      <div style="margin-bottom:20px">
        <span>销售统计</span>
      </div>
      <div>
        <el-col :span="12">
          <div id="bar" style="width: 500px;height: 400px"></div>
        </el-col>

        <el-col :span="12">
          <div id="arr" style="width: 500px;height: 360px"></div>
        </el-col>
      </div>
    </el-card>


  </div>
</template>

<script>
// import * as echarts from 'echarts';
const echarts = require('echarts');
export default {
  name: "StatisticsView",
  data(){
    return{

    }
  },
  methods: {
    admin1() {
      this.$router.push('/admin1');
    },
    admins() {
      this.$router.push('/admins');
    },
    goods() {
      this.$router.push('/goods');
    },
    purchase() {
      this.$router.push('/purchase');
    },
    //销量统计(柱形图\折线图)
    initCharts1() {
      const setEchartWH = { //设置控制图表大小变量
        width: 1500,
        height: 400
      };
      const _this = this
      // 基于准备好的dom，初始化echarts实例
      // let myChart2 = echarts.init(this.$refs.main);
      var chartDom = document.getElementById('main');
      var myChart = echarts.init(chartDom);
      var orderCounts = [];
      var salesSums = [];
      var clickDates = [];
      //请求后台数据
      this.axios.get('http://localhost:9091/echarts/goodsSale').then(function (resp) {
        if (resp.data.code == 20000) {
          let lists = resp.data.data;
          for (var i = lists.length - 1; i >= 0; i--) {
            orderCounts.push(lists[i].orderCount);
            salesSums.push(lists[i].salesSum)
            clickDates.push(lists[i].clickDate)
          }
          console.log("日期", clickDates)
          // 绘制图表
          myChart.setOption(
              {
                grid: {

                  //与绝对定位相似，top，left，right，bottom 设定是根据上级盒子宽高来计算
                  top: "15%",
                  left: "10%",
                  right: "10%",
                  bottom: "20%"

                },
                tooltip: {
                  trigger: 'axis',
                  axisPointer: {
                    type: 'cross',
                    crossStyle: {
                      color: '#999'
                    }
                  }
                },
                toolbox: {
                  feature: {
                    dataView: {show: true, readOnly: false},
                    magicType: {show: true, type: [ 'bar','line']},
                    restore: {show: true},
                    saveAsImage: {show: true}
                  }
                },
                legend: {
                  data: ['每日销售额', '每日订单总数']
                },
                xAxis: [
                  {
                    type: 'category',
                    data: clickDates,
                    axisPointer: {
                      type: 'shadow'
                    }
                  }
                ],
                yAxis: [
                  {
                    type: 'value',
                    name: '每日销售额',
                    min: 0,
                    max: 250,
                    interval: 50,
                    axisLabel: {
                      formatter: '{value} 元'//左坐标轴
                    }
                  },
                  {
                    type: 'value',
                    name: '销量',
                    min: 0,
                    max: 25,
                    interval: 5,
                    axisLabel: {
                      formatter: '{value} 单'
                    }
                  }
                ],
                series: [
                  {
                    name: '每日销售额',
                    type: 'line',
                    tooltip: {
                      valueFormatter: function (value) {
                        return value + ' 元';
                      }
                    },
                    data: salesSums,
                  },
                  {
                    name: '每日订单总数',
                    type: 'bar',
                    barWidth: '40%',
                    yAxisIndex: 1,
                    tooltip: {
                      valueFormatter: function (value) {
                        return value + ' 单';
                      }
                    },
                    data: orderCounts,
                  }
                ]
              }
          );

        }
      })
    },
    //扇形图
    initCharts2() {
      const setEchartWH = { //设置控制图表大小变量
        width: 1500,
        height: 400
      };
      const _this = this
      // 基于准备好的dom，初始化echarts实例
      // let myChart2 = echarts.init(this.$refs.main);
      var chartDom = document.getElementById('bar');
      var myChart = echarts.init(chartDom);
      var orderCounts = [];
      var salesSums = [];
      var clickDates = [];
      //请求后台数据
      this.axios.get('http://localhost:9091/echarts/goodsSale').then(function (resp) {
        if (resp.data.code == 20000) {
          let lists = resp.data.data;
          for (var i = lists.length - 1; i >= 0; i--) {
            orderCounts.push(lists[i].orderCount);
            salesSums.push(lists[i].salesSum)
            clickDates.push(lists[i].clickDate)
          }
          console.log("日期", clickDates)
          // 绘制图表
          myChart.setOption(
              {
                title: {
                  text: '水果销售',
                  subtext: '当日销售前5名',
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
                      { value: 1048, name: '苹果' },
                      { value: 735, name: '香蕉' },
                      { value: 580, name: '菠萝' },
                      { value: 484, name: '芒果' },
                      { value: 300, name: '李子' }
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
              }
          );

        }
      })
    },
    //堆叠条形图
    initCharts3() {
      const setEchartWH = { //设置控制图表大小变量
        width: 1500,
        height: 400
      };
      const _this = this
      // 基于准备好的dom，初始化echarts实例
      // let myChart2 = echarts.init(this.$refs.main);
      var chartDom = document.getElementById('arr');
      var myChart = echarts.init(chartDom);
      var orderCounts = [];
      var salesSums = [];
      var clickDates = [];
      //请求后台数据
      this.axios.get('http://localhost:9091/echarts/goodsSale').then(function (resp) {
        if (resp.data.code == 20000) {
          let lists = resp.data.data;
          for (var i = lists.length - 1; i >= 0; i--) {
            orderCounts.push(lists[i].orderCount);
            salesSums.push(lists[i].salesSum)
            clickDates.push(lists[i].clickDate)
          }
          console.log("日期", clickDates)
          // 绘制图表
          myChart.setOption(
              {
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
                  data: ['周一', '周二', '周三', '周四', '周五', '周六', '周天']
                },
                series: [
                  {
                    name: '水果销售额',
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
                    name: '蔬菜销售额',
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
                    name: '水产销售额',
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
                    name: '家电销售额',
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
                    name: '酒水销售额',
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
              }
          );

        }
      })
    },


  },//methods方法结束
  mounted() {
    this.initCharts1();
    this.initCharts2();
    this.initCharts3();
  }
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