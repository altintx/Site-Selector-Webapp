Ext.define("SiteSelector.model.BodyRegion", {
	regionName: function (x, y, side) {
		var bodyparts = {
			front: [
				{
					display: "Left Side of Chest",
					container: [
						new Triangle([49,19], [31, 29], [49, 32])
					]
				},
				{
					display: "Right Side of Chest",
					container: [
						new Triangle([49,18],[49,31],[66,28])
					]
				},
				{
					display: "Right Side of Ribs",
					container: [
						new Triangle([48,32],[67,28],[64,41])
					]
				},
				{
					display: "Left Side of Ribs",
					container: [
						new Triangle([32,29],[33,41],[48,32])
					]
				},
				{
					display: "Northwest Abs",
					container: [
						new Triangle([48,33],[33,42],[49,43])
					]
				},
				{
					display: "Northeast Abs",
					container: [
						new Triangle([49,43],[48,33],[64,41])
					]
				},
				{
					display: "Southwest Abs",
					container: [
						new Triangle([49,43],[49,54],[33,42])
					]
				},
				{
					display: "Southeast Abs",
					container: [
						new Triangle([50,43],[64,41],[49,54])
					]
				},
				{
					display: "Front Right Hip",
					container: [
						new Triangle([49,54],[63,41],[68,49]),
						new Triangle([49,54],[69,59],[69,49])
					]
				},
				{
					display: "Front Left Hip",
					container: [
						new Triangle([33,42],[49,54],[30,50]),
						new Triangle([30,60],[49,54],[29,50])
					]
				},
				{
					display: "Front Right Thigh",
					container: [
						new Triangle([49,54],[70,59],[66,72]),
						new Triangle([53,77],[49,55],[65,71])
					]
				},
				{
					display: "Front Left Thigh",
					container: [
						new Triangle([34,76],[28,61],[49,54]),
						new Triangle([49,54],[46,76],[35,76])
					]
				},
				{
					display: "Left Shin",
					container: [
						new Triangle([38,86],[33,76],[47,76]),
						new Triangle([48,89],[47,77],[38,85]),
						new Triangle([40,94],[38,85],[48,90])
					]
				},
				{
					display: "Right Shin",
					container: [
						new Triangle([54,77],[65,71],[64,82]),
						new Triangle([65,82],[52,89],[52,77]),
						new Triangle([50,89],[61,94],[61,84])
					]
				},
				{
					display: "Front Left Foot",
					container: [
						new Triangle([33,96],[47,90],[48,97])
					]
				},
				{
					display: "Front Right Foot",
					container: [
						new Triangle([50,90],[51,97],[64,96])
					]
				},
				{
					display: "Front Left Shoulder",
					container: [
						new Triangle([25,20],[48,19],[31,29])
					]
				},
				{
					display: "Front Right Shoulder",
					container: [
						new Triangle([50,18],[67,29],[71,21])
					]
				},
				{
					display: "Front Left Arm",
					container: [
						new Triangle([31,28],[25,21],[21,37]),
						new Triangle([21,37],[32,29],[29,44])
					]
				},
				{
					display: "Front Right Arm",
					container: [
						new Triangle([67,30],[70,42],[77,37]),
						new Triangle([67,30],[78,38],[72,20])
					]
				},
				{
					display: "Front Left Forearm",
					container: [
						new Triangle([23,52],[30,45],[21,37]),
						new Triangle([21,37],[22,52],[15,50])
					]
				},
				{
					display: "Front Right Forearm",
					container: [
						new Triangle([70,42],[77,51],[78,36]),
						new Triangle([78,38],[77,50],[84,50])
					]
				},
				{
					display: "Left Palm",
					container: [
						new Triangle([18,61],[7,56],[14,51]),
						new Triangle([15,51],[22,52],[18,61])
					]
				},
				{
					display: "Right Palm",
					container: [
						new Triangle([79,60],[86,60],[84,50]),
						new Triangle([78,51],[79,60],[84,50]),
						new Triangle([84,50],[87,60],[92,55])
					],
				},
				{
					display: "Front of Head",
					container: [
						new Triangle([49,9],[45,18],[55,18]),
						new Triangle([49,9],[61,9],[55,19]),
						new Triangle([38,10],[49,9],[45,18]),
						new Triangle([49,9],[57,2],[61,9]),
						new Triangle([42,2],[56,2],[49,9]),
						new Triangle([38,9],[43,2],[49,9]),
					]
				}
			],
			back: [
				{
					display: "Right Glute",
					container: [
						new Triangle([49,54],[63,41],[68,49]),
						new Triangle([49,54],[69,59],[69,49])
					]
				},
				{
					display: "Left Glute",
					container: [
						new Triangle([33,42],[49,54],[30,50]),
						new Triangle([30,60],[49,54],[29,50])
					]
				},
				{
					display: "Back Right Thigh",
					container: [
						new Triangle([49,54],[70,59],[66,72]),
						new Triangle([53,77],[49,55],[65,71])
					]
				},
				{
					display: "Back Left Thigh",
					container: [
						new Triangle([34,76],[28,61],[49,54]),
						new Triangle([49,54],[46,76],[35,76])
					]
				},
				{
					display: "Back Left Foot",
					container: [
						new Triangle([33,96],[47,90],[48,97])
					]
				},
				{
					display: "Back Right Foot",
					container: [
						new Triangle([50,90],[51,97],[64,96])
					]
				},
				{
					display: "Back Left Shoulder",
					container: [
						new Triangle([25,20],[48,19],[31,29])
					]
				},
				{
					display: "Back Right Shoulder",
					container: [
						new Triangle([50,18],[67,29],[71,21])
					]
				},
				{
					display: "Back Left Arm",
					container: [
						new Triangle([31,28],[25,21],[21,37]),
						new Triangle([21,37],[32,29],[29,44])
					]
				},
				{
					display: "Back Right Arm",
					container: [
						new Triangle([67,30],[70,42],[77,37]),
						new Triangle([67,30],[78,38],[72,20])
					]
				},
				{
					display: "Back Left Forearm",
					container: [
						new Triangle([23,52],[30,45],[21,37]),
						new Triangle([21,37],[22,52],[15,50])
					]
				},
				{
					display: "Back Right Forearm",
					container: [
						new Triangle([70,42],[77,51],[78,36]),
						new Triangle([78,38],[77,50],[84,50])
					]
				},
				{
					display: "Back of Left Hand",
					container: [
						new Triangle([18,61],[7,56],[14,51]),
						new Triangle([15,51],[22,52],[18,61])
					]
				},
				{
					display: "Back of Right Hand",
					container: [
						new Triangle([79,60],[86,60],[84,50]),
						new Triangle([78,51],[79,60],[84,50]),
						new Triangle([84,50],[87,60],[92,55])
					],
				},
				{
					display: "Back of Head",
					container: [
						new Triangle([49,9],[45,18],[55,18]),
						new Triangle([49,9],[55,19],[61,9]),
						new Triangle([38,10],[45,18],[49,9]),
						new Triangle([49,9],[61,9],[57,2]),
						new Triangle([49,9],[56,2],[42,2]),
						new Triangle([38,9],[43,2],[49,9]),
					]
				},
				{
					display: "Upper Left Back",
					container: [
						new Triangle([33,28],[34,41],[49,18]),
						new Triangle([49,42],[32,45],[50,18])
					]
				},
				{
					display: "Upper Right Back",
					container: [
						new Triangle([49,18],[65,41],[67,28]),
						new Triangle([69,47],[50,18],[50,42]),
					]
				},
				{
					display: "Lower Left Back",
					container: [
						new Triangle([49,54],[31,46],[50,43])
					]
				},
				{
					display: "Lower Right Back",
					container: [
						new Triangle([50,42],[50,55],[69,47])
					]
				},
				{
					display: "Left Calf",
					container: [
						new Triangle([38,85],[33,76],[47,77]),
						new Triangle([48,89],[47,77],[38,85]),
						new Triangle([40,94],[38,85],[48,89])
					]
				},
				{
					display: "Right Calf",
					container: [
						new Triangle([54,77],[65,71],[64,82]),
						new Triangle([65,82],[52,89],[52,77]),
						new Triangle([52,89],[60,95],[61,84])
					]
				}
			]
		};
		var regions = bodyparts[side];
		var name = "unknown";
		regions.forEach(function(region) { 
			region.container.forEach(function(triangle) {
				if (triangle.contains(x, y)) {
					name = region.display;
				}
			})
		});
		return name;
	}
});