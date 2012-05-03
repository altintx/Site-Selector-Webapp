Ext.define("SiteSelector.model.BodyRegion", {
	regions: function(side) {
		var bodyparts = {
			front: [
				{
					display: "Right Side of Chest",
					container: [
						new Triangle([49,17], [30, 29], [49, 32])
					]
				},
				{
					display: "Left Side of Chest",
					container: [
						new Triangle([49,16.5],[49,32],[70,28])
					]
				},
				{
					display: "Left Side of Ribs",
					container: [
						new Triangle([49,32],[70,28],[68,42])
					]
				},
				{
					display: "Right Side of Ribs",
					container: [
						new Triangle([30,29],[31.5,42],[49,32])
					]
				},
				{
					display: "Northwest Abs",
					container: [
						new Triangle([49,32],[31.5,42],[49,43])
					]
				},
				{
					display: "Northeast Abs",
					container: [
						new Triangle([49,43],[49,32],[68,42])
					]
				},
				{
					display: "Southwest Abs",
					container: [
						new Triangle([49,43],[50,54.5],[31.5,42])
					]
				},
				{
					display: "Southeast Abs",
					container: [
						new Triangle([49,43],[68,42],[50,54.5])
					]
				},
				{
					display: "Front Left Hip",
					container: [
						new Triangle([50,54.5],[68,42],[72,49]),
						new Triangle([50,54.5],[72,59],[72,49])
					]
				},
				{
					display: "Front Right Hip",
					container: [
						new Triangle([31.5,42],[50,54.5],[27.5,50]),
						new Triangle([28,60],[50,54.5],[27.5,50])
					]
				},
				{
					display: "Front Left Thigh",
					container: [
						new Triangle([50,54.5],[72,59],[71,70]),
						new Triangle([54,77],[50,54.5],[71,70]),
						new Triangle([54,77],[68,74],[71,70])
					]
				},
				{
					display: "Front Right Thigh",
					container: [
						new Triangle([32,76],[28,60],[50,54.5]),
						new Triangle([32,76],[28,60],[28,67]),
						new Triangle([50,54.5],[32,76],[45.5,76]),
					]
				},
				{
					display: "Right Shin",
					container: [
						new Triangle([32,76],[45.5,76],[35,86]),
						new Triangle([35,86],[45.5,76],[47,93]),
						new Triangle([35,86],[47,93],[40,95]),
						new Triangle([32,76],[32,81],[35,86]),
					]
				},
				{
					display: "Left Shin",
					container: [
						new Triangle([54,77],[68,74],[67.5,81.5]),
						new Triangle([54,77],[67.5,81.5],[61,91.5]),
						new Triangle([53,90],[54,77],[61,91.5]),
						new Triangle([53,90],[61,91.5],[60,94]),
						new Triangle([53,90],[53,93],[60,94])
					]
				},
				{
					display: "Front Right Foot",
					container: [
						new Triangle([47,100],[47,93],[40,95]),
						new Triangle([47,100],[47,93],[49,95]),
						new Triangle([47,100],[40,95],[33,99])
					]
				},
				{
					display: "Front Left Foot",
					container: [
						new Triangle([53,90],[51,95],[53,100]),
						new Triangle([53,90],[60,94],[53,100]),
						new Triangle([66,99],[60,94],[53,100]),
					]
				},
				{
					display: "Front Right Shoulder",
					container: [
						new Triangle([23,20.5],[49,17],[30,29])
					]
				},
				{
					display: "Front Left Shoulder",
					container: [
						new Triangle([49,16.5],[70,28],[77,20.5])
					]
				},
				{
					display: "Front Right Arm",
					container: [
						new Triangle([30,29],[23,20.5],[18,37]),
						new Triangle([18,37],[31,28],[25,44.5])
					]
				},
				{
					display: "Front Left Arm",
					container: [
						new Triangle([70,28],[82.5,38],[77,20.5]),
						new Triangle([70,28],[82.5,38],[72.5,39])
					]
				},
				{
					display: "Front Right Forearm",
					container: [
						new Triangle([19,52],[25,44.5],[18,37]),
						new Triangle([18,37],[19,52],[11.5,50])
					]
				},
				{
					display: "Front Left Forearm",
					container: [
						new Triangle([74.5,43],[82.5,38],[72.5,39]),
						new Triangle([74.5,43],[82.5,38],[88,49]),
						new Triangle([80,49],[74.5,43],[88,49]),
						new Triangle([80,49],[82,54],[88,49]),
						new Triangle([89,51],[82,54],[88,49])
					]
				},
				{
					display: "Right Palm",
					container: [
						new Triangle([10,62],[0,57],[11.5,50]),
						new Triangle([11.5,50],[19,52],[14,62]),
						new Triangle([10,62],[14,62],[11.5,50])
					]
				},
				{
					display: "Left Palm",
					container: [
						new Triangle([89,51],[82,54],[85.5,61.5]),
						new Triangle([89,51],[92,62],[85.5,61.5]),
						new Triangle([89,51],[92,62],[100,57])
					],
				},
				{
					display: "Front of Head",
					container: [
						new Triangle([49,9],[45,18],[56,18]),// neck
						new Triangle([49,9],[64,8.5],[56,18]), // BR Head
						new Triangle([36,9],[49,9],[45,18]), // TL head
						new Triangle([49,9],[58.5,0.5],[64,8.5]), // TR Head
						new Triangle([41,0.5],[58.5,0.5],[49,9]), // TC head
						new Triangle([36,9],[41,0.5],[49,9]), // BL head
					]
				}
			],
			back: [
				{
					display: "Left Back",
					container: [
						new Triangle([49,17], [30, 29], [49, 32]),
						new Triangle([30,29],[31.5,42],[49,32]),
						new Triangle([49,32],[31.5,42],[49,43])

					]
				},
				{
					display: "Right Back",
					container: [
						new Triangle([49,16.5],[49,32],[70,28]),
						new Triangle([49,32],[70,28],[68,42]),
						new Triangle([49,43],[49,32],[68,42])
					]
				},
				{
					display: "Left Glutes",
					container: [
						new Triangle([49,43],[50,54.5],[31.5,42]),
						new Triangle([31.5,42],[50,54.5],[27.5,50])
					]
				},
				{
					display: "Right Glutes",
					container: [
						new Triangle([49,43],[68,42],[50,54.5]),
						new Triangle([50,54.5],[68,42],[72,49])
					]
				},
				{
					display: "Back Right Hip",
					container: [
						new Triangle([50,54.5],[72,59],[72,49])
					]
				},
				{
					display: "Back Left Hip",
					container: [
						
						new Triangle([28,60],[50,54.5],[27.5,50])
					]
				},
				{
					display: "Back Right Thigh",
					container: [
						new Triangle([50,54.5],[72,59],[71,70]),
						new Triangle([54,77],[50,54.5],[71,70]),
						new Triangle([54,77],[68,74],[71,70])
					]
				},
				{
					display: "Back Left Thigh",
					container: [
						new Triangle([32,76],[28,60],[50,54.5]),
						new Triangle([32,76],[28,60],[28,67]),
						new Triangle([50,54.5],[32,76],[45.5,76]),
					]
				},
				{
					display: "Left Calf",
					container: [
						new Triangle([32,76],[45.5,76],[35,86]),
						new Triangle([35,86],[45.5,76],[47,93]),
						new Triangle([35,86],[47,93],[40,95]),
						new Triangle([32,76],[32,81],[35,86]),
					]
				},
				{
					display: "Right Calf",
					container: [
						new Triangle([54,77],[68,74],[67.5,81.5]),
						new Triangle([54,77],[67.5,81.5],[61,91.5]),
						new Triangle([53,90],[54,77],[61,91.5]),
						new Triangle([53,90],[61,91.5],[60,94]),
						new Triangle([53,90],[53,93],[60,94])
					]
				},
				{
					display: "Back Left Foot",
					container: [
						new Triangle([47,100],[47,93],[40,95]),
						new Triangle([47,100],[47,93],[49,95]),
						new Triangle([47,100],[40,95],[33,99])
					]
				},
				{
					display: "Back Right Foot",
					container: [
						new Triangle([53,90],[51,95],[53,100]),
						new Triangle([53,90],[60,94],[53,100]),
						new Triangle([66,99],[60,94],[53,100]),
					]
				},
				{
					display: "Back Left Shoulder",
					container: [
						new Triangle([23,20.5],[49,17],[30,29])
					]
				},
				{
					display: "Back Right Shoulder",
					container: [
						new Triangle([49,16.5],[70,28],[77,20.5])
					]
				},
				{
					display: "Back Left Arm",
					container: [
						new Triangle([30,29],[23,20.5],[18,37]),
						new Triangle([18,37],[31,28],[25,44.5])
					]
				},
				{
					display: "Back Right Arm",
					container: [
						new Triangle([70,28],[82.5,38],[77,20.5]),
						new Triangle([70,28],[82.5,38],[72.5,39])
					]
				},
				{
					display: "Back Left Forearm",
					container: [
						new Triangle([19,52],[25,44.5],[18,37]),
						new Triangle([18,37],[19,52],[11.5,50])
					]
				},
				{
					display: "Back Right Forearm",
					container: [
						new Triangle([74.5,43],[82.5,38],[72.5,39]),
						new Triangle([74.5,43],[82.5,38],[88,49]),
						new Triangle([80,49],[74.5,43],[88,49]),
						new Triangle([80,49],[82,54],[88,49]),
						new Triangle([89,51],[82,54],[88,49])
					]
				},
				{
					display: "Left Hand",
					container: [
						new Triangle([10,62],[0,57],[11.5,50]),
						new Triangle([11.5,50],[19,52],[14,62]),
						new Triangle([10,62],[14,62],[11.5,50])
					]
				},
				{
					display: "Right Hand",
					container: [
						new Triangle([89,51],[82,54],[85.5,61.5]),
						new Triangle([89,51],[92,62],[85.5,61.5]),
						new Triangle([89,51],[92,62],[100,57])
					],
				},
				{
					display: "Back of Head",
					container: [
						new Triangle([49,9],[45,18],[56,18]),// neck
						new Triangle([49,9],[64,8.5],[56,18]), // BR Head
						new Triangle([36,9],[49,9],[45,18]), // TL head
						new Triangle([49,9],[58.5,0.5],[64,8.5]), // TR Head
						new Triangle([41,0.5],[58.5,0.5],[49,9]), // TC head
						new Triangle([36,9],[41,0.5],[49,9]), // BL head
					]
				}
			]
		};
		return bodyparts[side];
	},
	
	regionName: function (x, y, side) {
		var name = "unknown";
		this.regions(side).forEach(function(region) { 
			region.container.forEach(function(triangle) {
				if (triangle.contains(x, y)) {
					name = region.display;
				}
			})
		});
		return name;
	}
});