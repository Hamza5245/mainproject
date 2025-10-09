module.exports = {
  // HOST: "makanapis.makkaan.com.pk",
  // HOST: "apis.yumhubb.com",
  HOST: "localhost",
  PORT: "8000",
  // USER: "yumhubbc_apis",
  USER: "root",
  // PASSWORD: "yumhubbc_apis",
  PASSWORD: "",
  // DB: "yumhubbc_apis",
  DB: "almumtaz",
  dialect: "mysql",
  KEY_NAME: "cpAdhi099",
  // EMAIL:'newsletter@makkaan.com',
  // PASS:'Newsletter@__123', 
  EMAIL:'yumhubb@gmail.com', 
    PASS:'akytbxcrayiggzxl',
    url : 'mongodb://127.0.0.1/almumtaz',
  // mainUrl: "https://apis.yumhubb.com/",
  // mainUrl: 'http://192.168.139.50:8000/',
  mainUrl: 'http://10.24.140.50:8000/',

  pool: {
    max: 5,
    min: 0,
    idle: 10000,
    acquire: 30000
  }
}