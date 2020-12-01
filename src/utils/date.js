// date.js

export function formatDate(date, fmt) {
  if(/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() +'').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() +1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  // console.log(o);
  for(let k in o) {
    if(new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] +'';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  // console.log(fmt);
  return fmt;
}

function padLeftZero(str) {
  return ('00'+ str).substr(str.length)
}

export function toDate (data, str) {
  if (data[str]) {
    data[str] = formatDate(
      new Date(data[str]),
      "yyyy-MM-dd hh:mm:ss"
    );
  } else {
    delete data[str];
  }
  return data
}

export function daysToDate (days) {
  let d = new Date()
  d.setDate(d.getDate()-days)
  return formatDate(d,`yyyy-MM-dd`)
}