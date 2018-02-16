/*
* @Author: tobi
* @Date:   2018-02-16 12:26:51
* @Last Modified by:   tobi
* @Last Modified time: 2018-02-16 13:33:26
*/

const NodeHelper = require("node_helper");
const fs= require("fs");
const path = require('path');


module.exports = NodeHelper.create({
//here comes the part of the nodehelper after the 3 dots as posted above

    socketNotificationReceived: function(notification, payload) {
        if(notification === "LOAD_THEME"){
            this.config = payload;
            this.readData();
        }
    },

    readData: function(){
        //to read a file to do the following
        //
        var theme = './themes/' + this.config.theme + '.json';
        theme = path.resolve(__dirname, theme)
        if (fs.existsSync(theme)) {
            fs.readFile(theme, "utf8", (err, data) => {
                if (err) throw err;
                var d = JSON.parse(data);
                this.sendSocketNotification("GET_THEME", d);
            });
        } else {
            console.log("file not found: " + theme)
        }
    }
});