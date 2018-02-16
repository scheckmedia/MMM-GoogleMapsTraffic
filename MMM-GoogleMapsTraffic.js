/* global Module */

/* Magic Mirror
 * Module: MMM-GoogleMapsTraffic
 *
 * By Victor Mora
 * MIT Licensed.
 */

Module.register("MMM-GoogleMapsTraffic", {
	// Module config defaults
	defaults : {
		lat: '',
		lng: '',
		height: '300px',
		width: '300px',
		zoom: 10,
        mapTypeId: 'roadmap',
		disableDefaultUI: true,
        theme: 'dark'
	},

    start: function(){
        this.sendSocketNotification("LOAD_THEME", this.config);
    },

    socketNotificationReceived: function(notification, payload) {
        if(notification === "GET_THEME" && payload !== null){
            this.config.theme_data = payload;
            //this.updateDom();
            this.map.setOptions({styles: payload})
        }
    },

	getDom: function() {
        var lat = this.config.lat;
        var lng = this.config.lng;

	    var wrapper = document.createElement("div");
        wrapper.setAttribute("id", "map");

        wrapper.style.height = this.config.height;
        wrapper.style.width = this.config.width;

        var script = document.createElement("script");
        script.setAttribute('id', 'MMM-GoogleMapsTraffic');
        script.type = "text/javascript";
        script.src = "https://maps.googleapis.com/maps/api/js?key=" + this.config.key;
        document.body.appendChild(script);
	    var self = this;

        script.onload = function () {
            self.map = new google.maps.Map(document.getElementById("map"), {
            	zoom: self.config.zoom,
                mapTypeId: self.config.mapTypeId,
            	center: {
            		lat: self.config.lat,
            		lng: self.config.lng
            	},
                styles: self.config.theme_data,
		        disableDefaultUI: self.config.disableDefaultUI
            });

            var trafficLayer = new google.maps.TrafficLayer();
            trafficLayer.setMap(self.map);
        };

		return wrapper;
	}

});
