/*
app.views.map = new Ext.Map({
  fullscreen: true,
  layout: 'fit',
  id: 'map',
  title: 'Map',
  mapOptions: {
    zoom: 15,
    //center: new google.maps.LatLng(52.262852,-7.115364),
  },
});
*/
app.views.map = {};

app.views.MapView = Ext.extend(Ext.Panel, {
  title: 'Map',
  iconCls: 'home',
  layout: 'fit',

  listeners: {
    pagecreate: function() {
      app.views.map = new Ext.Map({
        fullscreen: true,
        layout: 'fit',
        id: 'map',
        title: 'Map',
        mapOptions: {
          zoom: 15,
          //center: new google.maps.LatLng(52.262852,-7.115364),
        },
      });
    },
  	show: function() {
      // Update UI
  		app.views.tabPanel.tabBar.show();
      app.views.tabPanel.componentLayout.childrenChanged = true;
      app.views.tabPanel.doComponentLayout();

      // Get the users location
      Ext.dispatch({
        controller: app.controllers.map,
        action: 'getLocation'
      });
  	}
  },

  dockedItems: [
  	{
  		dock: 'top',
  		xtype: 'toolbar',
  		items: [
  			{
  				text: 'Back',
  				handler: function() {
  					app.views.tabPanel.setActiveItem(app.views.home);
  				}
  			}
  		]
  	}
  ],
  
  items: [
  	app.views.map
  ]
});