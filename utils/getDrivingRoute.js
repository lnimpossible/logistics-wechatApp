import Service from '../service'
var amapFile = require('../common/amap-wx.js');
const AMAP_KEY = Service.AMAP_KEY;
const myAmapFun = new amapFile.AMapWX({key: AMAP_KEY});
function getDrivingRoute(origin,destination){
	return new Promise((resolve, reject)=>{
		myAmapFun.getDrivingRoute({
		  origin: origin,
		  destination: destination,
		  success: function(data){
			let points = [];
			if(data.paths && data.paths[0] && data.paths[0].steps){
			  var steps = data.paths[0].steps;
			  for(var i = 0; i < steps.length; i++){
				var poLen = steps[i].polyline.split(';');
				for(var j = 0;j < poLen.length; j++){
				  points.push({
					longitude: parseFloat(poLen[j].split(',')[0]),
					latitude: parseFloat(poLen[j].split(',')[1])
				  })
				} 
			  }
			  resolve(points)
			}
				// if(data.paths[0] && data.paths[0].distance){
				// distance = data.paths[0].distance + '米'
				//     }
		  },
		})
	})
}

export default getDrivingRoute