<template>
  <div>
    <el-row style="margin: 20px 10px"
      :gutter="20">
      <el-col :span="14">
        <el-card shadow="hover">
          <div style="padding-bottom: 20px">
            <div class="map-index">
              <span class="area-item"
                @click="changeMapIndexCode(-1)">中国</span>
              <template v-for="(item, key) in mapIndex">
                <span :key="item.code + 'right'"><span class="el-icon-arrow-right"></span></span>
                <span :key="item.code"
                  class="area-item"
                  @click="changeMapIndexCode(key)">{{ item.name }}</span>
              </template>
            </div>
          </div>

          <div id="chinaMap" />
        </el-card>
      </el-col>
      <el-col :span="5">
        <el-card shadow="hover"
          style="margin-bottom: 20px">
          <div class="echarts_header">发货情况</div>
          <div id="delivery-the-pie-chart"></div>
        </el-card>

      </el-col>
      <el-col :span="5">
        <el-card shadow="hover" style="margin-bottom: 20px">
          <div class="echarts_header">项目状态</div>
          <div id="project-the-pie-chart"></div>
        </el-card>
      </el-col>
      <el-col :span="10">
        <el-card shadow="hover"
          style="">
          <div class="echarts_header">实时数据</div>
          <el-table :data="realTimeTableData"
            style="width: 100%; margin-top: 20px"
            height="478"
            :header-cell-style="{ background: '#F3F6FC' }">
            <el-table-column type="index"> </el-table-column>
            <el-table-column prop="name"
              label="项目名称"
              align="center">
            </el-table-column>
            <el-table-column label="情况"
              align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.state === 1">11状态</span>
                <span v-if="scope.row.state === 2">22状态</span>
                <span v-if="scope.row.state === 3">33状态</span>
                <span v-if="scope.row.state === 4">44状态</span>
                <span v-if="scope.row.number">{{`发货${scope.row.number}套`}}</span>
              </template></el-table-column>
            <el-table-column prop="update"
              label="更新时间"
              align="center">
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import echarts from "echarts/lib/echarts";
require("@/static/china");
export default {
  name: "generalViewOfTheSite",
  data() {
    return {
      // 区域，图例的颜色
      areaColorArray: [
        "#ffc069",
        "#13c2c2",
        "#409eff",
        "rgba(159,202,70,1)",
        "rgba(225,131,46,1)"
      ],
      areaPieces: [],
      outData: [],
      // 发货情况饼图的数据
      deliveryStatusArray: [
        { value: 0, name: "未发" },
        { value: 0, name: "[1%~33%]" },
        { value: 0, name: "[34%~66%]" },
        { value: 0, name: "[67%~99%]" },
        { value: 0, name: "完毕" }
      ],
      // 发货情况图例
      deliveryStatusLegend: [
        "未发",
        "[1%~33%]",
        "[34%~66%]",
        "[67%~99%]",
        "完毕"
      ],
      // 项目情况饼图的数据
      projectStatusList: [
        { value: 0, name: "11状态" },
        { value: 0, name: "22状态" },
        { value: 0, name: "33状态" },
        { value: 0, name: "44状态" }
      ],
      // 项目情况图例
      projectStatusLegend: ["11状态", "22状态", "33状态", "44状态"],
      // 实时数据表格
      realTimeTableData: [],
      mapIndex: [],
      mapIndexCode: "",
      myChart: {},
      areaMapping: {
        安徽: {
          code: "anhui"
        },
        澳门: {
          code: "aomen"
        },
        北京: {
          code: "beijing"
        },
        重庆: {
          code: "chongqing"
        },
        福建: {
          code: "fujian"
        },
        甘肃: {
          code: "gansu"
        },
        广东: {
          code: "guangdong"
        },
        广西: {
          code: "guangxi"
        },
        贵州: {
          code: "guizhou"
        },
        海南: {
          code: "hainan"
        },
        南海诸岛: {
          code: "hainan"
        },
        河北: {
          code: "hebei"
        },
        黑龙江: {
          code: "heilongjiang"
        },
        河南: {
          code: "henan"
        },
        湖北: {
          code: "hubei"
        },
        湖南: {
          code: "hunan"
        },
        江苏: {
          code: "jiangsu"
        },
        江西: {
          code: "jiangxi"
        },
        吉林: {
          code: "jilin"
        },
        辽宁: {
          code: "liaoning"
        },
        内蒙古: {
          code: "neimenggu"
        },
        宁夏: {
          code: "ningxia"
        },
        青海: {
          code: "qinghai"
        },
        山东: {
          code: "shandong"
        },
        上海: {
          code: "shanghai"
        },
        山西: {
          code: "shanxi"
        },
        陕西: {
          code: "shanxi1"
        },
        四川: {
          code: "sichuan"
        },
        台湾: {
          code: "taiwan"
        },
        天津: {
          code: "tianjin"
        },
        香港: {
          code: "xianggang"
        },
        新疆: {
          code: "xinjiang"
        },
        西藏: {
          code: "xizang"
        },
        云南: {
          code: "yunnan"
        },
        浙江: {
          code: "zhejiang"
        }
      },
      mapSeriesOption: {},
      mapSeriesOptionGeoIndex: {
        name: "theMap",
        type: "map",
        map: "china",
        geoIndex: 0
      },
      publicMapSeriesOption: {
        type: "map",
        z: 2,
        // 自定义扩展图表类型
        mapType: "China",
        // 区域块上的label
        label: {
          show: true,
          color: "#303133",
          formatter: param => {
            return param.name;
          }
        },
        itemStyle: {
          normal: {
            areaColor: "#69c0ff",
            borderColor: "#fff"
            // borderWidth: 1,
          },
          emphasis: {
            areaColor: "#1890ff"
            // color:'white'
          }
        },
        // itemStyle: {
        //   normal: {
        //     areaColor: "rgb(19, 91, 153)",
        //     borderColor: "rgb(9, 54, 95)"
        //   },
        //   emphasis: {
        //     areaColor: "rgb(10, 105, 187)"
        //     // color:'white'
        //   }
        // },
        // itemStyle: {
        //   areaColor: "#007691",
        // },
        // itemStyle: {
        //   normal: {
        //     borderColor: "rgba(147, 235, 248, 1)",
        //     borderWidth: 0.5,
        //     areaColor: {
        //       type: "radial",
        //       x: 0.5,
        //       y: 0.5,
        //       r: 0.8,
        //       colorStops: [
        //         {
        //           offset: 0,
        //           color: "rgba(147, 235, 248, 0)" // 0% 处的颜色
        //         },
        //         {
        //           offset: 1,
        //           color: "rgba(147, 235, 248, .08)" // 100% 处的颜色
        //         }
        //       ],
        //       globalCoord: false // 缺省为 false
        //     }
        //   },
        //   emphasis: {
        //     areaColor: "#389BB7",
        //     borderWidth: 0
        //   }
        // },
        layoutCenter: ["50%", "50%"]
      }
    };
  },
  computed: {
    mapOption() {
      return {
        xAxis: {
          show: false,
          type: "value"
        },
        yAxis: {
          show: false,
          type: "value"
        },
        // 漫步-开启缩放和拖动
        roam: true,
        // zoom: 1.5,
        // 滚轮缩放控制
        scaleLimit: {
          min: 0.5,
          max: 10
        },
        visualMap: {
          seriesIndex: 0,
          type: "piecewise",
          left: "15",
          bottom: "15",
          itemWidth: 27,
          itemHeight: 15,
          textStyle: {
            color: "#333333",
            fontSize: 14
          },
          pieces: this.areaPieces,
          // 图例在的时候的颜色
          inRange: {
            color: this.areaColorArray
          },
          // 取消图例后的颜色
          outOfRange: {
            color: ["#ff7a45"]
          }
        },
        tooltip: {
          trigger: "item",
          formatter: e => {
            if (e.seriesName === "theMap") {
              return e.name;
            } else if (e.seriesName === "thePin") {
              // console.log(e);
              return e.data.deviceName;
            }
          }
        },
        geo: this.mapSeriesOption,
        series: [
          this.mapSeriesOptionGeoIndex,
          {
            name: "thePin",
            type: "scatter",
            coordinateSystem: "geo",
            symbol: "pin",
            symbolSize: [18, 18],
            label: {
              normal: {
                show: false,
                textStyle: {
                  color: "#fff",
                  fontSize: 9
                },
                formatter(value) {
                  return value.data.value[2];
                }
              }
            },
            itemStyle: {
              normal: {
                color: function(params) {
                  const sds = ["red", "green"];
                  var a = params.dataIndex;
                  return sds[a];
                }
              },
              emphasis: {
                borderWidth: 2,
                borderColor: "white"
              }
            },
            data: [
              {
                value: [116.405285, 39.904989],
                deviceName: "北京发电厂",
                deviceData: [120, 50, 14]
              },
              {
                value: [103.9526, 30.7617],
                deviceName: "成都发电厂",
                deviceData: [140, 540, 24]
              }
            ],
            showEffectOn: "render",
            rippleEffect: {
              brushType: "stroke"
            },
            hoverAnimation: true,
            zlevel: 1
          },
          {
            hoverAnimation: false,
            symbolSize: 5,
            itemStyle: {
              normal: {
                color: "#fff"
              }
            },
            name: "light",
            type: "scatter",
            coordinateSystem: "geo",
            data: [
              { value: [116.405285, 39.904989] },
              { value: [103.9526, 30.7617] }
            ]
          }
        ]
      };
    }
  },
  created() {
    // 接口获取一区二区的数据之后进行遍历
    // 地图的图例也需要自定义
    // 模拟接口数据
    const outName = [
      {
        name: "一区",
        area: ["浙江", "江苏", "上海", "安徽", "湖北", "江西 ", "福建", "广东"]
      },
      { name: "二区", area: ["青海", "新疆", "西藏"] },
      {
        name: "三区",
        area: ["内蒙古", "黑龙江", "辽宁", "河北", "北京", "天津"]
      }
    ];
    if (outName.length > 0) {
      outName.forEach((item, index) => {
        item.area.forEach(areaItem => {
          this.outData.push({
            name: areaItem,
            value: index
          });
        });

        this.areaPieces.push({
          label: item.name,
          value: index,
          color: this.areaColorArray[index % this.areaColorArray.length]
        });
      });
    }

    // 发货情况和项目状态的数据，type等于1 为发货情况数据，type等于2位项目情况数据
    // 发货情况的数据 name，名称，发货数量，number；判断类型type 1or2 ；设备总量：total；更新时间update
    // 项目状态的数据 name，名称，判断类型type；项目状态：state: 1,2,3,4,；更新时间update
    const blendedData = [
      {
        type: 1,
        name: "西安风电场项目",
        number: 20,
        total: 200,
        update: "2020-09-04"
      },
      {
        type: 1,
        name: "福建风电场项目",
        number: 50,
        total: 600,
        update: "2020-09-06"
      },
      {
        type: 1,
        name: "新疆风电场项目",
        number: 100,
        total: 100,
        update: "2020-09-07"
      },
      {
        name: "新疆风电场项目",
        type: 2,
        state: 1,
        update: "2020-09-07"
      },
      {
        name: "西安风电场项目",
        type: 2,
        state: 2,
        update: "2020-09-05"
      },
      {
        name: "西藏风电场项目",
        type: 2,
        state: 3,
        update: "2020-09-06"
      },
      {
        name: "浙江风电场项目",
        type: 2,
        state: 4,
        update: "2020-09-08"
      },
      {
        type: 1,
        name: "西藏风电场项目",
        number: 34,
        total: 600,
        update: "2020-09-06"
      },
      {
        type: 1,
        name: "浙江风电场项目",
        number: 50,
        total: 100,
        update: "2020-09-07"
      }
    ];
    // 发货情况饼图的数据
    let deliverySimulated = [];
    // 项目情况饼图数据
    let projectStatusArray = [];
    // 把type为1和2的分开
    if (blendedData.length > 0) {
      blendedData.forEach(item => {
        if (item.type === 1) {
          deliverySimulated.push(item);
        } else {
          projectStatusArray.push(item);
        }
      });
    }
    // 针对实时数据把数据进行时间排序
    deliverySimulated = deliverySimulated.sort((a, b) => {
      return new Date(a.update).getTime() - new Date(b.update).getTime();
    });
    projectStatusArray = projectStatusArray.sort((a, b) => {
      return new Date(a.update).getTime() - new Date(b.update).getTime();
    });
    // 发货情况的数据
    // deliveryStatusArray
    deliverySimulated.forEach(item => {
      const num = ((item.total - item.number) / item.total) * 100;
      console.log(item);
      if (num === 0) {
        // 未发
        this.deliveryStatusArray[0].value++;
      } else if (0 < num && num <= 33) {
        this.deliveryStatusArray[1].value++;
      } else if (33 < num && num <= 66) {
        this.deliveryStatusArray[2].value++;
      } else if (66 < num && num < 100) {
        this.deliveryStatusArray[3].value++;
      } else if (num === 100) {
        this.deliveryStatusArray[4].value++;
        // 完毕
      }
      // 实时数据表格
      // realTimeTableData
      this.realTimeTableData.push({
        name: item.name,
        update: item.update,
        number: item.number
      });
    });

    // 项目情况饼图数据
    //     projectStatusArray: [],
    projectStatusArray.forEach(item => {
      if (item.state === 1) {
        this.projectStatusList[0].value++;
      } else if (item.state === 2) {
        this.projectStatusList[1].value++;
      } else if (item.state === 3) {
        this.projectStatusList[2].value++;
      } else if (item.state === 4) {
        this.projectStatusList[3].value++;
      }
      // 实时数据表格
      // realTimeTableData
      this.realTimeTableData.push({
        name: item.name,
        update: item.update,
        state: item.state
      });
    });

    // 实时数据表格
  },
  mounted() {
    this.drawChinaMap([]);
    this.drawDeliveryPieChart();
    this.drawProjectPieChart();
    // this.drawProvinceMap();
  },
  methods: {
    // 画中国地图的方法
    drawChinaMap(provData) {
      this.mapIndex = [];
      this.mapIndexCode = -1;
      // 如果存在则先销毁
      // 清空原地图，避免点击事件累加
      if (this.myChart.id !== undefined) {
        this.myChart.dispose();
      }
      this.myChart = echarts.init(document.getElementById("chinaMap"));
      // 这里依据屏幕大小配置
      const clientWidth = document.body.clientWidth;
      let layoutSize = "110%";
      const specialMapSeriesOption = {
        // 这里决定了地图使用china.js
        map: "china",
        // 需要设置layoutCenter，layoutSize才会有效
        layoutSize: layoutSize,
        data: this.outData
      };
      this.mapSeriesOption = Object.assign(
        specialMapSeriesOption,
        this.publicMapSeriesOption
      );
      this.mapSeriesOptionGeoIndex = Object.assign(
        this.mapSeriesOptionGeoIndex,
        specialMapSeriesOption,
        this.publicMapSeriesOption
      );
      console.log(this.mapOption);
      this.myChart.setOption(this.mapOption);
      // 注册点击事件
      this.myChart.on("click", params => {
        if (params.seriesName === "theMap") {
          this.drawProvinceMap(params.name, []);
        } else if (params.seriesName === "thePin") {
          console.log(params);
          this.mapIndexCode = -2;
          const theName = params.data.deviceName;
          this.mapIndex.push({
            name: theName,
            code: theName
          });
        }
      });

      window.addEventListener("resize", () => {
        this.myChart.resize();
      });
    },

    // 画省级地图的方法
    drawProvinceMap(provinceName, cityData) {
      const provinceCode = this.areaMapping[provinceName].code;
      this.mapIndex = [];
      this.mapIndex.push({
        name: provinceName,
        code: provinceCode
      });
      this.mapIndexCode = 0;
      // 如果存在则先销毁
      // 清空原地图，避免点击事件累加
      if (this.myChart.id !== undefined) {
        this.myChart.dispose();
      }
      const url = require(`@/static/map/province/${provinceCode}.json`);
      this.myChart = echarts.init(document.getElementById("chinaMap"));
      // 这里更换省级地图json
      echarts.registerMap("China", url);
      const specialMapSeriesOption = {
        map: "China",
        // 需要设置layoutCenter，layoutSize才会有效
        layoutSize: "95%",
        data: cityData
      };
      this.mapSeriesOption = Object.assign(
        specialMapSeriesOption,
        this.publicMapSeriesOption
      );
      this.mapSeriesOptionGeoIndex = Object.assign(
        this.mapSeriesOptionGeoIndex,
        specialMapSeriesOption,
        this.publicMapSeriesOption
      );

      this.myChart.setOption(this.mapOption);
      // 调整mapIndex
      this.$emit("changeMapIndex", 0, provinceName, provinceCode);
      window.addEventListener("resize", () => {
        this.myChart.resize();
      });
      // 获取json
      // this.$http.get(url)
      //   .then(res => {
      //     this.myChart = echarts.init(document.getElementById('chinaMap'))
      //     // 这里更换省级地图json
      //     echarts.registerMap('China', res.data)
      //     const specialMapSeriesOption = {
      //       // 需要设置layoutCenter，layoutSize才会有效
      //       layoutSize: '95%',
      //       data: cityData
      //     }
      //     this.mapSeriesOption = Object.assign(
      //       specialMapSeriesOption,
      //       this.publicMapSeriesOption
      //     )
      //     this.myChart.setOption(this.mapOption)
      //     // 调整mapIndex
      //     this.$emit('changeMapIndex', 0, provinceName, provinceCode)
      //     // 注册点击事件
      //     this.myChart.on('click', params => {
      //       // 先确认是否有地图，有地图继续请求
      //       if (this.areaMapping[provinceName].children &&
      //         this.areaMapping[provinceName].children[params.name] &&
      //         this.areaMapping[provinceName].children[params.name].code !== undefined) {
      //         this.drawCityMap(provinceCode, this.areaMapping[provinceName].children[params.name].code, [], params.name)
      //       }
      //     })
      //   })
      //   .catch(error => {
      //     console.log(error)
      //   })
    },

    changeMapIndexCode(index) {
      console.log(this.mapIndexCode);
      // if (index === this.mapIndexCode) return;
      switch (index) {
        case -1:
          this.$nextTick(() => {
            this.drawChinaMap();
          });
          break;
        case 0:
          this.drawProvinceMap(this.mapIndex[0].name);
          break;
        default:
          console.log("???");
      }
    },
    drawDeliveryPieChart() {
      const pieChart = echarts.init(
        document.getElementById("delivery-the-pie-chart")
      );
      const option = {
        tooltip: {
          trigger: "item",
          formatter: "{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "5%",
          y: "center",
          data: this.deliveryStatusLegend
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["65%", "85%"],
            center: ["70%", "50%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center"
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "16",
                fontWeight: "bold"
              }
            },
            labelLine: {
              show: false
            },
            data: this.deliveryStatusArray
          }
        ]
      };
      pieChart.setOption(option);

      window.addEventListener("resize", () => {
        pieChart.resize();
      });
    },

    drawProjectPieChart() {
      const pieChart = echarts.init(
        document.getElementById("project-the-pie-chart")
      );
      const option = {
        tooltip: {
          trigger: "item",
          formatter: "{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "5%",
          y: "center",
          data: this.projectStatusLegend
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["65%", "85%"],
            center: ["70%", "50%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center"
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "16",
                fontWeight: "bold"
              }
            },
            labelLine: {
              show: false
            },
            data: this.projectStatusList
          }
        ]
      };
      pieChart.setOption(option);

      window.addEventListener("resize", () => {
        pieChart.resize();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/.el-table td,
.el-table th {
  padding: 7px 0;
}
.map-index {
  padding: 15px;
  margin: -20px -20px 0 -20px;
  border-bottom: 1px solid #ecf1f1;
  font-weight: bold;
  display: flex;
  font-size: 18px;
  justify-content: flex-start;
  align-items: center;
}
.map-index > .area-item {
  cursor: pointer;
  border-bottom: 1px solid rgba(0, 0, 0, 0);
  padding: 0 3px;
}
.map-index > .svg-icon {
  width: 15px;
  height: 15px;
}
.picturesContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px 20px 20px;
  img {
    width: 85%;
  }
}

.wideContainer {
  height: 100%;
  position: relative;
  bottom: 81px;
  padding: 81px 20px 20px;
  box-sizing: border-box;
  .outerContainer {
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    height: 100%;
    flex-wrap: wrap;
    -ms-overflow-style: none;
    overflow: -moz-scrollbars-none;
    overflow-x: hidden;
    overflow-y: auto;
    .innerContainerRight {
      width: 35%;
      padding-left: 10px;
      box-sizing: border-box;
      height: 100%;
      .innerContainerRightInnerTop {
        height: 30%;
        width: 100%;
        box-sizing: border-box;
        display: flex;
        .innerContainerRightInnerTopTable {
          font-size: 1.1rem;
          color: #fff;
          height: 100%;
          width: 45%;
          padding-right: 3px;
          box-sizing: border-box;
          padding-bottom: 6px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          .innerContainerRightInnerTopTableTr,
          .innerContainerRightInnerTopTableThead {
            background-color: rgba(255, 255, 255, 0.1);
            height: 15%;
            width: 100%;
          }
          .innerContainerRightInnerTopTableTr {
            display: flex;
            align-items: center;
            .copyTable {
              width: 50%;
              display: flex;
              justify-content: center;
            }
          }
          .innerContainerRightInnerTopTableThead {
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
        .innerContainerRightInnerTopEchart {
          height: 100%;
          width: 55%;
          padding-left: 3px;
          box-sizing: border-box;
          padding-bottom: 6px;
          display: inline-block;
        }
      }
      .innerContainerRightInnerBottom {
        height: 70%;
        box-sizing: border-box;
        width: 100%;
        // padding-top: 10px;
        .innerContainerRightInnerBottomBody {
          height: 100%;
          background-color: rgba(255, 255, 255, 0.1);
          width: 100%;
        }
      }
    }
  }
}

#chinaMap {
  height: 750px;
  width: 100%;
  box-sizing: border-box;
}
#delivery-the-pie-chart {
  height: 160px;
  width: 100%;
  box-sizing: border-box;
  margin-top: 20px;
}
#project-the-pie-chart {
  height: 160px;
  width: 100%;
  box-sizing: border-box;
  margin-top: 20px;
}
.systemCoverageBox {
  display: flex;
  background-color: rgba(255, 255, 255, 0.1);
  flex-flow: column;
  align-items: center;
  color: white;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  height: 100%;
  .systemCoverageBoxTitle {
    font-size: 1.2rem;
  }
  p {
    margin-top: 5px;
    margin-bottom: 5px;
  }
}
.echarts_header {
  padding: 15px;
  font-size: 18px;
  font-weight: bold;
  margin: -20px -20px 0 -20px;
  border-bottom: 1px solid #ecf1f1;
}


</style>