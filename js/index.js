/*
 * @Author: your yao
 * @Date: 2020-06-15 16:09:13
 * @LastEditTime: 2020-06-17 13:14:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \immo\js\index.js
 */

$(function () {
  //标记图表
  var num = 0;
  // 警务通图
  function jwtChart(data, area) {
    var option = {
      color: ["#24afa1", "#2ed3bc"],
      radar: {
        radius: "60%",
        name: {
          formatter: (value, indicator) => {
            return "{a|" + indicator.value + "}\n{b|" + value + "}";
          },
          rich: {
            a: {
              fontSize: 26,
              fontFamily: "led",
              color: "#1df4a5",
            },
            b: {
              fontSize: 14,
              color: "#fff",
            },
          },
        },
        nameGap: 5,
        indicator: [],
        splitArea: {
          // 坐标轴在 grid 区域中的分隔区域，默认不显示。
          show: true,
          areaStyle: {
            // 分隔区域的样式设置。
            color: ["rgba(255,255,255,0)", "rgba(255,255,255,0)"], // 分隔区域颜色。分隔区域会按数组中颜色的顺序依次循环设置颜色。默认是一个深浅的间隔色。
          },
        },
        axisLine: {
          // 指向外圈文本的分隔线样式
          lineStyle: {
            color: "#1a88a0",
          },
        },
        splitLine: {
          lineStyle: {
            color: "#0f4f6a", // 分隔线颜色
            width: 1, // 分隔线线宽
          },
        },
      },
      series: [
        {
          type: "radar",
          symbolSize: 0,
          data: [
            {
              value: [],
              name: "",
              itemStyle: {
                normal: {
                  lineStyle: {
                    color: "#27a9d6",
                  },
                },
              },
              areaStyle: {
                normal: {
                  // 单项区域填充样式
                  color: {
                    type: "linear",
                    x: 0, // 右
                    y: 0, // 下
                    x2: 0, // 左
                    y2: 1, // 上
                    colorStops: [
                      {
                        offset: 0,
                        color: "rgba(191, 222, 153, .7)",
                      },
                      {
                        offset: 1,
                        color: "rgba(49, 211, 211, .7)",
                      },
                    ],
                    globalCoord: false,
                  },
                  opacity: 1, // 区域透明度
                },
              },
            },
          ],
        },
      ],
    };
    option.radar.indicator = data;
    data.forEach((item) => {
      option.series[0].data[0].value.push(item.value);
    });
    var place = document.getElementById(area);
    var myChart = echarts.init(place);
    myChart.setOption(option);
    $(window).resize(() => {
      myChart.resize();
    });
  }
  //   库存情况
  function kcqkChart(data, area) {
    var option = {
      tooltip: {
        trigger: "axis",
        backgroundColor: "rgba(1, 59, 83, .84)",
        borderColor: "#157082",
        borderWidth: 1,
        padding: [10, 5],
        formatter: (params) => {
          let $index = params[0].dataIndex;
          let newHtml =
            '<div><span class="B106_name">' +
            data[$index].name +
            '</span><span class="B106_number">' +
            data[$index].total +
            '</span><span class="B106_unit">' +
            data[$index].unit +
            "</span></div>";
          return newHtml;
        },
      },
      xAxis: {
        data: [],
        axisTick: {
          show: false,
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: "#1d7f81",
          },
        },
        axisLabel: {
          textStyle: {
            color: "#fff",
          },
          formatter: (val) => {
            if (val.length > 4) {
              return val.substring(0, 3) + "...";
            } else {
              return val;
            }
          },
          interval: 0,
          margin: 10, // 刻度标签与轴线之间的距离。
        },
      },
      yAxis: [
        {
          name: "条",
          nameLocation: "start",
          nameTextStyle: {
            color: "#fff",
          },
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#1d7f81",
            },
          },
          axisLabel: {
            textStyle: {
              color: "#fff",
            },
          },
        },
        {
          name: "人",
          nameLocation: "start",
          nameTextStyle: {
            color: "#fff",
          },
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#1d7f81",
            },
          },
          axisLabel: {
            textStyle: {
              color: "#fff",
            },
          },
        },
      ],
      series: [
        {
          // 三个最低下的圆片
          name: "",
          type: "pictorialBar",
          symbolSize: [30, 11],
          symbolOffset: [0, 0],
          itemStyle: {
            normal: {
              color: "#00d1c4",
            },
          },
          z: 12,
          data: [],
        },

        // 下半截柱状图
        {
          name: "2020",
          type: "bar",
          yAxisIndex: 0,
          barWidth: 30,
          barGap: "-100%",
          itemStyle: {
            // lenged文本
            color: "rgba(4, 228, 212, .8)",
          },
          data: [],
        },

        {
          // 替代柱状图 默认不显示颜色，是最下方柱图的value值 - 20
          type: "bar",
          barWidth: 30,
          yAxisIndex: 1,
          barGap: "-100%",
          stack: "",
          itemStyle: {
            color: "transparent",
          },
          data: [],
        },

        {
          name: "", // 头部
          type: "pictorialBar",
          symbolSize: [30, 11],
          symbolOffset: [0, -5],
          symbolPosition: "end",
          itemStyle: {
            normal: {
              color: "#7990f2",
            },
          },
          z: 12,
          data: [],
        },

        {
          name: "",
          type: "pictorialBar",
          symbolSize: [30, 11],
          symbolOffset: [0, -5],
          symbolPosition: "end",
          itemStyle: {
            normal: {
              color: "#0ef6ed",
            },
          },
          z: 12,
          data: [],
        },

        {
          name: "2019",
          type: "bar",
          barWidth: 30,
          barGap: "-100%",
          stack: "",
          itemStyle: {
            // barBorderRadius: 20,
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: "#5e7ad2",
                },
                {
                  offset: 1,
                  color: "#2ac5e3",
                },
              ],
              false
            ),
          },
          label: {
            show: true,
            position: "top",
            fontFamily: "led",
            fontSize: 22,
            color: "#fff",
          },
          // 上班截开始
          data: [],
        },
      ],
    };
    data.forEach((item) => {
      option.series[0].data.push(item.value);
      option.series[1].data.push(item.value);
      option.series[2].data.push(item.value);
      option.series[3].data.push(item.total);
      option.series[4].data.push(item.value);
      option.series[5].data.push(item.total);
      option.xAxis.data.push(item.name);
    });
    var place = document.getElementById(area);
    var myChart = echarts.init(place);
    myChart.setOption(option);
    $(window).resize(() => {
      myChart.resize();
    });
  }
  //   数字证书等三个图
  function pieChart(data, area) {
    var option = {
      title: {
        x: "center",
        y: "30%",
        itemGap: 0,
        padding: 3,
        textStyle: {
          color: "#fff",
          fontSize: 24,
          fontWeight: "normal",
          fontFamily: "DS-DIGI",
        },
        subtextStyle: {
          color: "#fff",
          fontSize: 14,
          fontWeight: "normal",
        },
      },
      calculable: true,
      series: [
        {
          name: "",
          type: "pie",
          radius: ["55%", "75%"],
          center: ["50%", "50%"],
          data: [
            {
              value: 34,
              name: "",
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  {
                    offset: 0,
                    color: data.color[0] || "#f6e3a1",
                  },
                  {
                    offset: 1,
                    color: data.color[1] || "#ff4236",
                  },
                ]),
              },
              label: {
                color: "rgba(255,255,255,.45)",
                fontSize: 14,
                formatter: "{a|{c}}\n{b|{b}}",
                rich: {
                  a: {
                    color: "#00ff90",
                    fontFamily: "DS-DIGI",
                    fontSize: 28,
                    lineHeight: 30,
                  },
                  b: {
                    color: "#ffffff",
                    fontSize: 14,
                  },
                },
              },
              labelLine: {
                length: 3,
                length2: 6,
                lineStyle: {
                  type: "dashed",
                  color: "#15deff",
                },
              },
            },
            {
              value: 52,
              name: "",
              itemStyle: {
                color: "transparent",
              },
            },
          ],
        },
        {
          name: "",
          type: "pie",
          radius: ["60%", "70%"],
          center: ["50%", "50%"],
          data: [
            {
              value: 34,
              name: "",
              itemStyle: {
                color: "transparent",
              },
            },
            {
              value: 52,
              name: "",
              itemStyle: {
                color: "#004559",
              },
              label: {
                color: "rgba(255,255,255,.45)",
                fontSize: 14,
                formatter: "{a|{c}}\n{b|{b}}",
                rich: {
                  a: {
                    color: "#00ff90",
                    fontFamily: "DS-DIGI",
                    fontSize: 28,
                    lineHeight: 30,
                  },
                  b: {
                    color: "#ffffff",
                    fontSize: 14,
                  },
                },
              },
              labelLine: {
                length: 3,
                length2: 6,
                lineStyle: {
                  type: "dashed",
                  color: "#15deff",
                },
              },
            },
          ],
        },
      ],
    };
    data.data.forEach((item, index) => {
      option.series[0].data[index].value = item.value;
      option.series[0].data[index].name = item.name;
      option.series[1].data[index].value = item.value;
      option.series[1].data[index].name = item.name;
    });
    var place = document.getElementById(area);
    var myChart = echarts.init(place);
    myChart.setOption(option);
    $(window).resize(() => {
      myChart.resize();
    });
  }
  //   机房设备
  function jfsbChart(data, area) {
    var option = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#ffb739",
          },
        },
      },
      grid: {
        top: "5%",
        left: "5%",
        right: "10%",
        bottom: "5%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          axisLine: {
            show: true,
            lineStyle: {
              color: "#055f8d", // 颜色
              width: 1, // 粗细
            },
          },
          splitArea: {
            show: false,
            color: "#f00",
            lineStyle: {
              color: "#ffffff",
            },
          },
          axisLabel: {
            color: "#fff",
          },
          splitLine: {
            show: false,
          },
          boundaryGap: false,
          data: data.names,
        },
      ],

      yAxis: [
        {
          type: "value",
          min: 0,
          // max: 140,
          splitNumber: 4,
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgba(255,255,255,0.1)",
            },
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            show: true,
            margin: 8,
            textStyle: {
              fontSize: 10,
              color: "#ffffff",
            },
          },
          axisTick: {
            show: false,
          },
        },
      ],
      series: [
        {
          name: "注册总量",
          type: "line",
          // smooth: true, //是否平滑
          showAllSymbol: true,
          // symbol: 'image://./static/images/guang-circle.png',
          symbol: "circle",
          symbolSize: 10,
          lineStyle: {
            normal: {
              color: "#ffb739",
              shadowBlur: 0,
            },
          },
          label: {
            show: false,
            position: "top",
            textStyle: {
              color: "#6c50f3",
            },
          },
          itemStyle: {
            color: "#ffb739",
            borderColor: "#fff",
            borderWidth: 1,
            shadowColor: "rgba(0, 0, 0, .3)",
            shadowBlur: 0,
            shadowOffsetY: 2,
            shadowOffsetX: 2,
          },
          tooltip: {
            show: false,
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: "rgba(163,201,57,1)",
                  },
                  {
                    offset: 1,
                    color: "rgba(163,201,57,0.1)",
                  },
                ],
                false
              ),
            },
          },
          data: data.data,
        },
      ],
    };
    var place = document.getElementById(area);
    var myChart = echarts.init(place);
    myChart.setOption(option);
    $(window).resize(() => {
      myChart.resize();
    });
  }
  //  进度条
  function jdChart(area, data, color = []) {
    let option = {
      xAxis: {
        max: 100,
        splitLine: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        axisTick: {
          show: false,
        },
      },
      grid: {
        left: -10,
        top: 60, // 设置条形图的边距
      },
      yAxis: [
        {
          type: "category",
          inverse: false,
          data: [data],
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
        },
      ],
      series: [
        {
          // 内
          type: "bar",
          barWidth: 30,
          legendHoverLink: false,
          silent: true,
          itemStyle: {
            normal: {
              color: function (params) {
                return {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 1,
                  y2: 0,
                  colorStops: [
                    {
                      offset: 0,
                      color: color[0], // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: color[1], // 100% 处的颜色
                    },
                  ],
                };
              },
              barBorderRadius: 40,
              backgroundColor: "#ffffff",
              shadowBlur: {
                shadowColor: "rgba(0, 0, 0, 0.9)",
                shadowBlur: 10,
              },
              showBackground: true,
            },
          },
          label: {
            normal: {
              show: true,
              position: "left",
              formatter: "{b}",
              textStyle: {
                color: "#3474de",
                fontSize: 14,
              },
            },
          },
          data: [data],
          z: 1,
          animationEasing: "elasticOut",
        },
        {
          // 分隔
          type: "pictorialBar",
          itemStyle: {
            normal: {
              color: "#ffffff",
            },
          },
          symbolRepeat: "fixed",
          symbolMargin: 6,
          symbol: "rect",
          symbolClip: true,
          symbolSize: [0, 0],
          symbolPosition: "start",
          symbolOffset: [0, 0],
          symbolBoundingData: this.total,
          data: [data],
          z: 2,
          animationEasing: "elasticOut",
        },
      ],
    };
    var place = document.getElementById(area);
    var myChart = echarts.init(place);
    myChart.setOption(option);
    $(window).resize(() => {
      myChart.resize();
    });
  }
  //   执法仪
  function zfyChart(area, data) {
    var myChart = {};
    var option = {
      chart: {
        type: "pie",
        options3d: {
          enabled: true,
          alpha: 70,
          beta: 0,
        },
        backgroundColor: "transparent",
      },

      colors: ["#1bb6fe", "#ff6681"],
      title: {
        text: "",
      },
      tooltip: {
        pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
      },
      credits: {
        enabled: false,
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          depth: 15,
          dataLabels: {
            enabled: true,
            padding: 0,
            distance: 1,
            format: "{point.y}",
            style: {
              color: "#43ffb6",
              fontSize: 20,
              fontFamily: "led",
              fill: "none",
              textOutline: "none",
            },
          },
        },
      },
      series: [
        {
          type: "pie",
          startAngle: 120,
          center: ["50%", "30%"],
          colors: ["#0fffbb", "#5192ff", "#fc9274"],
          name: "竞赛组警情",
          data: [],
        },
      ],
    };
    option.series[0].data = data.data;
    option.series[0].center = ["50%"];
    myChart = Highcharts.chart(area, option);
    $(window).resize(() => {
      if (myChart) {
        myChart.reflow();
      }
    });
  }
  //   圈圈统计
  function qqChart(area, color, name, data) {
    var option1 = {
      title: {
        show: true,
        text: data[0],
        subtext: name,
        x: "center",
        y: "25%",
        textStyle: {
          fontWeight: "100",
          color: "#ffffff",
          fontSize: "30",
          fontFamily: "led",
        },
        subtextStyle: {
          color: color[0],
        },
      },
      color: ["#025a6b"],
      legend: {
        show: false,
        itemGap: 12,
        data: ["01", "02"],
      },
      series: [
        {
          name: "Line 1",
          type: "pie",
          clockWise: true,
          radius: ["90%", "100%"],
          itemStyle: {
            normal: {
              label: {
                show: false,
              },
              labelLine: {
                show: false,
              },
            },
          },
          hoverAnimation: false,
          data: [
            {
              value: data[1],
              name: "01",
              itemStyle: {
                normal: {
                  color: {
                    // 完成的圆环的颜色
                    colorStops: [
                      {
                        offset: 0,
                        color: color[0], // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: color[0], // 100% 处的颜色
                      },
                    ],
                  },
                  label: {
                    show: false,
                  },
                  labelLine: {
                    show: false,
                  },
                },
              },
            },
            {
              name: "02",
              value: data[2],
            },
          ],
        },
      ],
    }; // 总数环状百分比
    var myChart = echarts.init(document.getElementById(area));
    myChart.setOption(option1);
    $(window).resize(() => {
      myChart.resize();
    });
  }
  //   按年份统计图
  function anjChart(data, area) {
    var option = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#ffb739",
          },
        },
      },
      grid: {
        left: "5%",
        right: "10%",
        bottom: "10%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          axisLine: {
            show: true,
            lineStyle: {
              color: "#055f8d", // 颜色
              width: 1, // 粗细
            },
          },
          splitArea: {
            show: false,
            color: "#f00",
            lineStyle: {
              color: "#ffffff",
            },
          },
          axisLabel: {
            color: "#fff",
          },
          splitLine: {
            show: false,
          },
          boundaryGap: false,
          data: data.names,
        },
      ],

      yAxis: [
        {
          type: "value",
          min: 0,
          // max: 140,
          splitNumber: 4,
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgba(255,255,255,0.1)",
            },
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            show: true,
            margin: 8,
            textStyle: {
              fontSize: 10,
              color: "#ffffff",
            },
          },
          axisTick: {
            show: false,
          },
        },
      ],
      series: [
        {
          name: "注册总量",
          type: "line",
          // smooth: true, //是否平滑
          showAllSymbol: true,
          // symbol: 'image://./static/images/guang-circle.png',
          symbol: "circle",
          symbolSize: 10,
          lineStyle: {
            normal: {
              color: "#d680fd",
              shadowBlur: 0,
            },
          },
          label: {
            show: true,
            position: "top",
            textStyle: {
              color: "#ffffff",
              fontFamily: "led",
            },
            fontSize: 20,
          },
          itemStyle: {
            color: "#d680fd",
            borderColor: "#fff",
            borderWidth: 1,
            shadowColor: "rgba(0, 0, 0, .3)",
            shadowBlur: 0,
            shadowOffsetY: 2,
            shadowOffsetX: 2,
          },
          tooltip: {
            show: false,
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: "rgba(214,128,253,1)",
                  },
                  {
                    offset: 1,
                    color: "rgba(214,128,253,0.1)",
                  },
                ],
                false
              ),
            },
          },
          data: data.data,
        },
      ],
    };
    var place = document.getElementById(area);
    var myChart = echarts.init(place);
    myChart.setOption(option);
    $(window).resize(() => {
      myChart.resize();
    });
  }
  //   警务通数据
  var jwtData = [
    {
      text: "2020年",
      max: 2000,
      value: 1900,
    },
    {
      text: "2019年",
      max: 2000,
      value: 1200,
    },
    {
      text: "2018年",
      max: 2000,
      value: 1100,
    },
    {
      text: "2017年",
      max: 2000,
      value: 1000,
    },
    {
      text: "2016年",
      max: 2000,
      value: 900,
    },
    {
      text: "2015年",
      max: 2000,
      value: 1400,
    },
    {
      text: "2014年",
      max: 2000,
      value: 1300,
    },
    {
      text: "2013年",
      max: 2000,
      value: 400,
    },
  ];
  var jwtData2 = [
    {
      text: "2020年",
      max: 2000,
      value: 1300,
    },
    {
      text: "2019年",
      max: 2000,
      value: 1200,
    },
    {
      text: "2018年",
      max: 2000,
      value: 1500,
    },
    {
      text: "2017年",
      max: 2000,
      value: 1000,
    },
    {
      text: "2016年",
      max: 2000,
      value: 900,
    },
    {
      text: "2015年",
      max: 2000,
      value: 1800,
    },
    {
      text: "2014年",
      max: 2000,
      value: 1300,
    },
    {
      text: "2013年",
      max: 2000,
      value: 460,
    },
  ];
  //   库存情况数据
  var kcqkData = [
    {
      name: "涉稳",
      total: 6,
      unit: "条",
    },
    {
      name: "侵财关注",
      total: 4,
      unit: "条",
    },
    {
      name: "侵财管控",
      total: 8,
      unit: "条",
    },
    {
      name: "打击处理",
      total: 2,
      unit: "条",
    },
    {
      name: "涉黑恶",
      total: 2,
      unit: "条",
    },
    {
      name: "肇事肇祸精神病",
      total: 8,
      unit: "条",
    },
  ];
  //   数字证书数据
  var szzsData = {
    color: ["#05fbe4", "#17d0fd"],
    total: 0,
    data: [
      {
        name: "民警",
        value: "70",
      },
      {
        name: "辅警",
        value: "100",
      },
    ],
  };
  //   电台数据
  var dtData = {
    color: ["#ffce6e", "#ff9644"],
    total: 0,
    data: [
      {
        name: "基地台",
        value: "70",
      },
      {
        name: "手台",
        value: "100",
      },
    ],
  };
  //   办公电脑数据
  var bgdnData = {
    color: ["#a67fff", "#e980fc"],
    total: 0,
    data: [
      {
        name: "台式机",
        value: "70",
      },
      {
        name: "笔记本",
        value: "100",
      },
    ],
  };
  //   机房设备数据
  var jfsbData = {
    names: ["服务器", "交换设备", "安全设备", "存储设备"],
    data: [502.84, 205.97, 332.79, 281.55],
  };
  //   执法仪数据
  var pie3DData = {
    name: "中华园所",
    top: "25%",
    data: [
      ["4G执法仪", 67],
      ["普通执法仪", 40],
    ],
  };
  //   年份数据
  var jfsbData = {
    names: ["2012", "2013", "2014", "2015", "2016", "2017"],
    data: [100, 120, 80, 70, 140, 110],
  };
  // 电信
  jdChart("line_chart1", 20, ["#1c9ff9", "#3fe2ad"]);
  // 移动
  jdChart("line_chart2", 20, ["#7676ed", "#a78dff"]);
  // 联通
  jdChart("line_chart3", 20, ["#57ffd0", "#b3ff62"]);
  jwtChart(jwtData, "jwt_chart");
  kcqkChart(kcqkData, "kcqk_chart");
  pieChart(szzsData, "pie_chart1");
  pieChart(dtData, "pie_chart2");
  pieChart(bgdnData, "pie_chart3");
  jfsbChart(jfsbData, "jfsb_chart");
  zfyChart("I124_3D_chart", pie3DData);
  qqChart("I124_circle_chart1", ["#0de4b4"], "联想", [3000, 100, 100]);
  qqChart("I124_circle_chart2", ["#baec49"], "组装机", [3000, 100, 100]);
  qqChart("I124_circle_chart3", ["#b45af9"], "戴尔", [3000, 100, 100]);
  qqChart("I124_circle_chart4", ["#26daf5"], "惠普", [3000, 100, 100]);
  anjChart(jfsbData, "anf_chart");
  $(".I124_jwt_bar").on("click", function () {
    $(".I124_jwt_bar").removeClass("I124_jwt_bar_active");
    $(this).addClass("I124_jwt_bar_active");
    console.log($(this).text());
    if ($(this).text() === "按品牌") {
      jwtChart(jwtData, "jwt_chart");
    } else {
      jwtChart(jwtData2, "jwt_chart");
    }
  });
});
