# FeedHenry Sencha Tutorial - v1

## Overview

For this part of the tutorial we will create a view with access to the camera. The FeedHenry Camera API, $fh.cam, is used to do this.

![](https://github.com/feedhenry/Training-Demo-App/raw/v1/docs/cameraView.png)

## Step 1

First we need to create our Camera.js controller file in controllers. This will contain a call to the $fh.cam() API call. You can read more about the camera API <a href="http://docs.feedhenry.com/api-reference/camera/">here.</a> The following code is used to create our camera controller.

	app.controllers.camera = new Ext.Controller({

	  /*
	   * Open up the native camera app
	   * On success we set the view to be our app.views.Camera view.
	   * After we set the view we update the image container to hold the taken picture.
	   */
	  openCamera: function() {
	    $fh.cam({
	      act: 'picture',
	      uri: true
	    }, function (res) {
	      if (res.uri) {
	        // Store the filepath to the image
	        var pathToImage = res.uri;

	        // Change the view
	        app.views.viewport.setActiveItem(app.views.camera);
	        
	        // Update the view
	        Ext.getCmp("camera_image").update({
	          image: pathToImage
	        });
	      }
	    })
	  }

	});

## Step 2

Because we want to take a picture before displaying it within the app we must now update Home.js to handle a press on the camera icon. On a press of the camera icon we call our camera controller's 'openCamera' function to instantly start the native camera app on device. The code to do this is provided below.

	new Ext.Panel({
  		height: 100,

  		layout: {
	      type: 'hbox',
	      pack: 'center',  
	    },
	    items: [
	    	{
		  		xtype: 'spacer'
		  	},
		  	{
		  		xtype: 'button',
		  		cls:  'paymentIcon',
		  		width:  100,
		  		height: 100,
		  		handler: function() {
		  			app.views.viewport.setActiveItem(app.views.payment, {type: 'slide', direction: 'left'});
		  		}
		  	},
		  	{
		  		xtype: 'spacer'
		  	},
		  	{
		  		xtype: 'button',
		  		cls: 'cameraIcon',
		  		width:  100,
		  		height: 100,
		  		handler: function() {
		  		  Ext.dispatch({
			        controller: app.controllers.camera,
			        action: 'openCamera'
			      });
		  		}
		  	},
		  	{
		  		xtype: 'spacer'
		  	}
	    ]
  	}),

## Task - Create the app.views.Camera view.

Try to create the view that will be populated with our captured image. It should have the same basic structure as previous views. Remember, the camera controller is expecting a component with the 'camera_image' id. Once you have made an attempt scroll down to see a solution.

	  app.views.Camera = Ext.extend(Ext.Panel, {
	  title: 'Camera',
	  iconCls: 'home',
	  layout: 'fit',

	  dockedItems: [
	    {
	      dock: 'top',
	      xtype: 'toolbar',
	      title: '<img class="logo logoOffset" src="app/images/logo.png" />',
	      items: [
	        {
	          text: 'Back',
	          ui: 'back',
	          handler: function() {
	            app.views.viewport.setActiveItem(app.views.home, {type: 'slide', direction: 'right'});
	          }
	        }
	      ]
	    },
	    {
	      dock: 'bottom',
	      items: [
	        {
	          xtype: 'button',
	          text: 'Upload Image',
	          handler: function() {
	            Ext.Msg.alert('Upload', 'Upload Image Handler.', Ext.emptyFn);
	          }
	        }
	      ]
	    }
	  ],
	  
	  items: [
	    {
	      id: 'camera_image',
	      tpl: '<img src="{image}" width="100%" height="100%"/>'
	    },
	    
	  ]
	});

## Step 3

Now that we have our code completed we need to update index.html to include our new files. Add the following line under <!-- Views --> making sure that it is after Viewport.js.

	<script type="text/javascript" src="app/views/Camera.js"></script>

Also add the following line under <!-- Controllers --> 

	<script type="text/javascript" src="app/controllers/Camera.js"></script>