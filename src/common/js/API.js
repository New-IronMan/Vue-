var baseUrl = '/api';
// var baseUrl = '';



//用户登陆接口
var login = baseUrl + '/login'
//添加管理员
var admin = baseUrl + '/addManage'
//查询管理员
var controller = baseUrl + '/findManage'
//更新管理员
var updateMagange = baseUrl + '/updateManage'
//删除管理员
var delManage = baseUrl + '/delManage'
//删除用户
var delUser = baseUrl + '/delUser'
//用户更新
var updateUser = baseUrl + '/updateUser'
//查询用户
var findUser = baseUrl + '/findUser'
//添加用户
var addUser = baseUrl + '/addUser'
//查询通知
var findNews = baseUrl + '/findNews'
//添加通知
var addNews = baseUrl + '/addNews'
//更新通知
var updateNews = baseUrl + '/updateNews'
//删除通知
var delNews = baseUrl + '/delNews'
//查询设备
var findDevice = baseUrl + '/findDevice'
//添加设备
var addDevice = baseUrl + '/addDevice'
//更新设备
var updateDevice = baseUrl + '/updateDevice'
//删除设备
var delDevice = baseUrl + '/delDevice'
//购买设备
var updateDevice = baseUrl + '/updateDevice'
//退出登录
var exit = baseUrl + '/exit'

export default {
    login,
    admin,
    controller,
    updateMagange,
    delManage,
    delUser,
    updateUser,
    findUser,
    addUser,
    findNews,
    addNews,
    updateNews,
    delNews,
    findDevice,
    addDevice,
    updateDevice,
    delDevice,
    exit

}