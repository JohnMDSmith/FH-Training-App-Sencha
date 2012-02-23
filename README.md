# FeedHenry Sencha Tutorial - v4

## Overview

In this tutorial we will adding a new view for a Twitter feed page.

* Integrate an app with Twitter to pull tweets with a specified user name.

![](https://github.com/feedhenry/Training-Demo-App/raw/v4/docs/twitterView.png)

## Step 1

Begin by creating the Twitter view file in views, name it Twitter.js and add the following code.
	
	  app.views.Twitter = Ext.extend(Ext.Panel, {
	  title: 'Twitter',
	  iconCls: 'time',
	  width: '100%',
	  /*
	   * Layout vbox is used to arrnage items (tweets) stacked above one another
	   */
	  layout: {
	    type: 'vbox'
	  },

	  listeners: {
	  	show: function() {

	  	}
	  },

	  dockedItems: [
	    {
	      dock: 'top',
	      xtype: 'toolbar',
	      title: '<img class="logo logoOffset" src="app/images/logo.png" />',
	      items: [
	        {
	          text: 'Back',
	          ui: 'back',
	          hidden: app.hideBack || false,
	          handler: function() {
	            app.views.viewport.setActiveItem(app.views.home, {type: 'slide', direction: 'right'});
	          }
	        }
	      ]
	    }
	  ],
	  
	  items: [
	    {
	      xtype: 'list',
	      width: '100%',
	      store: app.stores.twitter,
	      itemTpl: '<img style="float: left; margin: 0px 8px 8px 0px;" src="{profile_image_url}" />' + 
	      '<strong>{from_user}</strong>' +
	      '{text}',
	      flex: 1,
	      plugins: [{
	        ptype: 'pullrefresh'
	      }]
	    }
	  ]
	  });

## Step 2

You will have seen from Step 1 that we added a list component to the Twitter view. This list is using a store, app.stores.twitter. We must define this store. In the models folder create a file called Twitter.js and add the following code. In the code below we define a proxy for the model. The proxy is used to control loading and saving data to the store. The proxy here relies on a FeedHenry API call fh.act. The data format is JSON and the function name is 'getTweets'. The device will use fhact to call the funtion from our cloud main.js file.
	

	/*
 	 * Here we create a model using regModel. 
 	 * The model will be used by a store as a template for it's data format.
 	 */
	app.models.Twitter = Ext.regModel('app.models.Twitter', {
	  fields: ['from_user', 'text', 'profile_image_url', 'from_user_name'],
	  proxy: {
	    type: 'fhact',
	    reader: 'json',
	    id: 'getTweets'
	  }
	});

	/*
	 * Create the Twitter store for tweets using the above model. 
	 * The store is empty, but will be populated using a function.
	 */
	app.stores.twitter = new Ext.data.Store({
	  model: 'app.models.Twitter',
	  autoLoad: true,
	});


## Step 3 

Make sure to update index.html to include the new files we have made. Add the following line under our app.js include.

	<!-- Models -->
	<script type="text/javascript" src="app/models/Twitter.js"></script> 

And add the following line under our <!-- Views --> tag.

	<script type="text/javascript" src="app/views/Twitter.js"></script>

Viewport.js now needs to be updated to include our Twitter view. Insert the following code to do this. 
	
	initComponent: function() {
	    // Put instances of cards into app.views namespace
	    Ext.apply(app.views, {
	      home:     new app.views.Home(),
	      map:      new app.views.MapView(),
	      twitter:  new app.views.Twitter()
	    });
	    //put instances of cards into viewport
	    Ext.apply(this, {
	      items: [
	        app.views.home,
	        app.views.map,
	        app.views.twitter
	      ]
	    });
	    app.views.Viewport.superclass.initComponent.apply(this, arguments);
	 }

## Step 4

Home.js also needs to be updated. If you haven't added a Twitter button do so now and add the following handler function to it. 

	handler: function() {
			  	app.views.viewport.setActiveItem(app.views.twitter, {type: 'slide', direction: 'left'});
			  }


## Step 5 

Finally to populate our store with tweets we add the following function to the main.js file in our cloud directory. The app.stores.twitter using the app.models.Twitter will invoke this call to populate the list automatically. 

	function getTweets() {
	  var username   = 'feedhenry';
	  var num_tweets = 10;
	  var url        = 'http://search.twitter.com/search.json?q=' + username;

	  var response = $fh.web({
	    url: url,
	    method: 'GET',
	    allowSelfSignedCert: true
	  });
	  return {'data': $fh.parse(response.body).results};
	}


![](https://github.com/feedhenry/Training-Demo-App/raw/v4/docs/tweets.png)

