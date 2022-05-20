import request from '@/utils/request'

export function searchGroup(data) {
  return request({
    url: '/api/deviceGroup/showDeviceGroups',
    method: 'post',
    data
  })
}