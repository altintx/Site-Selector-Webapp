Ext.define("SiteSelector.view.BodyList", {
    extend: 'Ext.Panel',
	alias: "widget.BodyList",
	requires: ["Ext.Img", "Ext.ActionSheet"],
	stores: ['Sites'],
    
    config: {
		iconCls: "user",
		layout: "fit",
		store: null,
		sites: [],
		alias: ""
	},
	
	constructor: function(config) {
		var $this = this;
		var resolution = 480;
		
		config.bodyImgId = Ext.id("bodymap");
		if (Ext.Viewport.windowHeight > 1024) {
			resolution = "4k";
		} else if (Ext.Viewport.windowHeight > 480) {
			resolution = "1k";
		}
		
		var imgSrc = config.alias == "front"?
			("resources/images/body/" + resolution + "/front.png"): 
			("resources/images/body/" + resolution + "/back.png");
		config.items = [
			{
				xtype: "titlebar",
				docked: "top",
				title: config.title,
				items: [
					{
						text: "Add Pump",
						align: "left",
						action: "add",
						type: "pump",
						side: config.alias
					},
					{
						text: "Add Sensor",
						align: "right",
						action: "add",
						type: "cgm",
						side: config.alias
					}
				]
			},
			{
				xtype: "image",
				src: imgSrc,
				style: "background-size:100% 100%;",
				layout: "fit"
			}
		];
		
		config.sites = [];
		config.scaleState = 1;
		
		this.store = config.store;
		this.sites = config.sites;
		this.alias = config.alias;
		
		this.callParent(arguments);
	},
	
	initialize: function() {
		var $this = this;
		var humanBodyMap = $this.down("img");
		
		var fn = function(store, records, index) {
			if ($this.bodyElement) {
				records.filter(function(r) { return r.data.side == $this.alias; }).forEach(function(r) { $this.drawSite(r); });
			} else {
				$this.getStore().un("addrecords", fn);
				// through rotating display we can hold a reference to a BodyList that ceases to exist
				// so we remove the listener on it if we can detect that happened
			}
		};
		
		humanBodyMap.element.on("longpress", function(event, target) {
			var placeHolder = Ext.DomHelper.append(target, {
				tag: "div"
			}, true);
			placeHolder.setStyle({
				position: "absolute"
			});
			var site = new Ext.Button({
				cls: "circle",
				baseCls: "site",
				style: {
					opacity: 1,
					'background-image': '-webkit-linear-gradient(bottom, #8f0508 52%, #c51e0f 76%)'
				},
				text: "+",
				renderTo: placeHolder
			});
			placeHolder.setSize("0.25in", "0.25in");;
			placeHolder.setXY(event.pageX - placeHolder.getWidth() / 2, event.pageY - placeHolder.getHeight() / 2)
			site.show();
			
			$this.actions = Ext.Viewport.add({
				xtype: "actionsheet",
				items: [
					{
						xtype: "button",
						text: "Pump",
						handler: $this.actionMenuClick(event)
					},
					{
						xtype: "button",
						text: "CGM",
						handler: $this.actionMenuClick(event)
					},
					{
						xtype: "button",
						text: "Cancel",
						ui: "decline",
						handler: $this.actionMenuClick(event)
					}
				],
				listeners: {
					hide: function() {
						site.destroy();
						placeHolder.destroy();
					}
				}
			});
			$this.actions.show();
		});
		
		$this.getStore().on("addrecords", fn);
			
		window.setTimeout(function() {
			$this.drawSites();
		}, 40);
	},
	
	actionMenuClick: function(event) {
		var $this = this;
		var humanBodyMap = $this.down("img");
		return function() {
			switch (this.getText()) {
				case "Pump":
				case "CGM":
					var w = humanBodyMap.element.getWidth(),
					    h = humanBodyMap.element.getHeight(),
					    x = event.pageX - event.target.offsetParent.offsetParent.offsetLeft,
					    y = event.pageY - event.target.offsetParent.offsetTop,
					    store = $this.getStore();
					var usage = store.add({
				        kind: this.getText() == "Pump"? "pump": "cgm",
						when: new Date(),
						x: x / w,
						y: y / h,
						side: $this.alias,
						location: new SiteSelector.model.BodyRegion().regionName(100 * x/w, 100 * y/h, $this.alias)
					});
					store.sync();
				
			}
			$this.actions.hide();
			delete $this.actions;
		}
	},

	drawSites: function() {
		var $this = this;
		$this.getStore().each(function(r) {
			if (r.data.side == $this.alias) {
				try {
					$this.drawSite(r);
				} 
				catch (e) {
					// incomplete record
				}
			}
		});
	},

	drawSite: function(record) {
		var $this = this;
		var day = 1000 * 60 * 60 * 24;
		var regenerate_time = record.decays() * day;
		var time_left = (record.get("when").getTime() + regenerate_time) - Date.now();
		if (time_left > 0) { 
			var placeHolder = Ext.DomHelper.append(this.bodyElement.dom.childNodes[0], {
				tag: "div"
			}, true);
			placeHolder.setStyle({
				position: "absolute"
			});
			placeHolder.setSize("0.25in", "0.25in");;
			if (placeHolder.getWidth() > 0) {
				var site = new Ext.Button({
					cls: "circle",
					baseCls: "site",
					style: {
						opacity: time_left / regenerate_time,
						backgroundColor: (record.data.kind == "pump"? "#C000CC": "#F87431"),
						'background-image': (record.data.kind == "pump"? 
							'-webkit-linear-gradient(bottom, #4A094A 52%, #8C4FA6 76%)':
							'-webkit-linear-gradient(top, #D18023 52%, #8F4411 76%)'
						)
					},
					text: "+",
					renderTo: placeHolder,
					handler: function(button) {
						$this.fireEvent("editsite", {
							record: record,
							button: button
						});
					}
				});
				site.show();
				var s = placeHolder.getWidth() / 2;
				placeHolder.setXY([
					$this.down("img").element.getX() + (($this.down("img").element.getWidth() * record.data.x) - s), 
					$this.down("img").element.getY() + (($this.down("img").element.getHeight() * record.data.y) - s)
				]);
			
				$this.sites.push(placeHolder)
			}
		}
	},

	clearSites: function() {
		this.sites.forEach(function(site) { site.destroy(); });
	},
	
	getStore: function () {
		return this.store;
	}
});