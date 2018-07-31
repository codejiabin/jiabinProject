// pages/form/form.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [{
        name: 'USA',
        value: '美国'
      },
      {
        name: 'CHN',
        value: '中国',
        checked: 'true'
      },
      {
        name: 'BRA',
        value: '巴西'
      },
      {
        name: 'JPN',
        value: '日本'
      },
      {
        name: 'ENG',
        value: '英国'
      },
      {
        name: 'TUR',
        value: '法国'
      },
    ]
  },
  switch1Change: function(e) {
    console.log('switch1发生change事件，值为:', e.detail.value);
  },
  switch2Change: function(e) {
    console.log('switch2 发生 change 事件，携带值为', e.detail.value)
  },
  slider1Change: function(e) {
    console.log('slider1 发生的change事件，携带的值为', e.detail.value);
  },
  checkboxChange: function(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);
  },
  formSubmit: function(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  formReset: function(e) {
    console.log('form发生了reset事件')
  }
})