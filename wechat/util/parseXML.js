'use strict'

/*
node.js xml与json相互转化
官方地址：https://github.com/Leonidas-from-XIV/node-xml2js
使用：
var xml2js = require('xml2js');

// JSON->xml
var builder = new xml2js.Builder(); 
var xml = builder.buildObject(son);

//xml -> json
var parser = new xml2js.Parser(); 
var json = parser.parseString(xml);

。。。。。
*/
module.exports = function parseXML(sendData, cb) {
    let xml2js = require('xml2js')
        // JSON->XML
    let builder = new xml2js.Builder({
            'rootName': 'xml',
            'headless': true
        })
        //XML->JSON
    let parser = new xml2js.Parser({ trim: true })

    return typeof sendData == 'object' ?
        builder.buildObject(sendData, cb) : parser.parseString(sendData, cb);
    /*let xml = builder.buildObject(sendData)
    let json = parser.parseString(sendData)*/
}