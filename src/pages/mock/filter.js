const recomTargets = [
  {flag: 'fourGBill', name: '4G资费用户', checked: false, type: 'range'},
  {flag: 'fourG', name: '4g用户', checked: true, type: 'range'},
  {flag: 'video', name: '视频用户', checked: false, type: 'range'},
  {flag: 'audio', name: '影音用户', checked: false, type: 'range'}
]

const targets = [
  {flag: 'campus', name: '校园用户', checked: true, type: 'radio'},
  {flag: 'userStat', name: '用户状态', checked: true, type: 'checkbox'},
  {flag: 'arpu', name: 'ARPU', checked: true, type: 'range'},
  {flag: 'fourG', name: '4G用户', checked: true, type: 'range'},
  {flag: 'bandwidth', name: '潜在宽带用户', checked: true, type: 'range'},
  {flag: 'mou', name: 'MOU', checked: true, type: 'range'}
]

const targetMap = {
  campus: {
    flag: 'campus',
    name: '校园用户',
    desc: '精准率为92%',
    logic: 'and',
    type: 'radio',
    detail: {
      checked: true
    }
  },
  userStat: {
    flag: 'userStat',
    name: '用户状态',
    desc: '精准率为93%',
    logic: 'or',
    type: 'checkbox',
    detail: [
      {value: '1',valueName: '停机',checked: true},
      {value: '2',valueName: '保卡',checked: false},
      {value: '3',valueName: '正常',checked: true},
      {value: '4',valueName: '非正常',checked: true}
    ]
  },
  arpu: {
    flag: 'arpu',
    name: 'ARPU',
    desc: '精准率为95%',
    logic: 'or',
    type: 'range',
    detail: {
      min: 0,
      max: 200,
      from: 13,
      to: 150,
      unit: '万'
    }
  },
  fourG: {
    flag: 'fourG',
    name: '4G用户',
    desc: '精准率为95%',
    logic: 'and',
    type: 'range',
    detail: {
      min: 0,
      max: 200,
      from: 70,
      to: 160,
      unit: '万'
    }
  },
  bandwidth: {
    flag: 'bandwidth',
    name: '潜在宽带用户',
    desc: '精准率为95%',
    logic: 'and',
    type: 'range',
    detail: {
      min: 0,
      max: 256,
      from: 75,
      to: 180,
      unit: '万'
    }
  },
  mou: {
    flag: 'mou',
    name: 'MOU',
    desc: '精准率为95%',
    logic: 'and',
    type: 'range',
    detail: {
      min: 0,
      max: 200,
      from: 70,
      to: 160,
      unit: 'MB'
    }
  },
  fourGBill: {
    flag: 'fourGBill',
    name: '4G资费用户',
    desc: '精准率为95%',
    logic: 'and',
    type: 'range',
    detail: {
      min: 0,
      max: 200,
      from: 70,
      to: 160,
      unit: 'MB'
    }
  },
  video: {
    flag: 'video',
    name: '视频用户',
    desc: '精准率为95%',
    logic: 'and',
    type: 'range',
    detail: {
      min: 0,
      max: 200,
      from: 70,
      to: 160,
      unit: 'MB'
    }
  },
  audio: {
    flag: 'audio',
    name: '音频用户',
    desc: '精准率为95%',
    logic: 'and',
    type: 'range',
    detail: {
      min: 0,
      max: 200,
      from: 70,
      to: 160,
      unit: 'MB'
    }
  }
}

export {
  targets,
  recomTargets,
  targetMap
}