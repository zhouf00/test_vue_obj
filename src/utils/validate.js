export function isvalidUsername(str) {
  return str.trim().length >= 3
}

// 验证是整数
export function isInteger(rule, value, callback) {
  // if (!value) {
  //   return callback(new Error('输入不可以空'))
  // }
  setTimeout(() => {
    if (!Number(value)) {
      callback(new Error('请输入数字2'))
    } else {
      const re = /^[0-9]*[1-9]*[0-9]*$/;
      const rsCheck = re.test(value);
      if (!rsCheck) {
        callback(new Error('请输入数字1'))
      } else {
        callback()
      }
    }
  }, 500);
}

export function isNum(rule, value, callback) {
  const re = /^[0-9]*$/
  if (!value) {
    callback()
  } else if(!re.test(value)){
    callback(new Error('请输入数字'))
  }else {
    callback()
  }
}