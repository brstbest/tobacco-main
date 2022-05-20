const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  nname: state => state.user.nname,
  category: state => state.user.category,
  phone: state => state.user.phone,
  device: state => state.device.device
}
export default getters
