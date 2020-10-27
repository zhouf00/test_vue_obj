const globalVar = {
    roleList:[
      {value:1, label: "超级管理员"},
      {value:2, label: "分级管理员"},
    ],
    projectTypeList: [
      {value:1, label: "风电"},
      {value:2, label: "火电"},
      {value:3, label: "水泥"},
      {value:4, label: "轨道"},
    ],
    areaList: [
      {value:1, label: "一区"},
      {value:2, label: "二区"},
    ],
    projectStatusList: [
      { value: 1, label: "安装" },
      { value: 2, label: "调试" },
      { value: 3, label: "转诊" },
      { value: 4, label: "验收" },
      { value: 5, label: "售后" }
    ],
    workingEnvList: [
      {value:1, label: "海上"},
      {value:2, label: "陆上"},
      {value:3, label: "无人区"},
      {value:4, label: "其它"},
    ]
}

export { globalVar };