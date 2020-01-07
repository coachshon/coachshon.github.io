Ext.define('App.Application', {
    extend: 'Ext.app.Application',
    name: 'App',
  
    requires: [
       // 'App.*',    // require all application classes (App.*) and avoid redundant 'requires' in each files.  
        'App.overrides.route.Route',
        'App.overrides.chart.legend.SpriteLegend',
        'App.util.State',
        'App.locale.Language',        
        'App.view.viewport.ViewportController',
        'App.view.viewport.ViewportModel',        
        'App.view.glance.navigation.Tree'
    ],

    profiles: [
        'Phone',  //classes in profile are called w/o requires
        'Tablet'
    ],

    controllers: [
        'Action'    // creates one global instance of the controller
    ],

    stores: [
       'Base', 'navigator.Menu',
       'glance.Brands', 'glance.Levels', 'glance.Metrics', 'glance.Sales', 
       'hco.Accounts', 'hco.Affiliates', 'hco.Brands', 'hco.Filters', 'hco.Sales',
       'hcp.Brands', 'hcp.Contacts', 'hcp.Filters', 'hcp.PLPD', 
       'lov.login.Languages','lov.permission.Groups', 'permission.Permissions','lov.uat.Status'
    ],

    models: [
        'login.Session', 'filter.Filter'     // creates one global instance of the model
    ],

    viewport: {
        controller: 'viewport',
        viewModel: 'viewport'
    },

    defaultToken: 'home',

    launch: function (profile) {

        App.app.currentLocale = 'en';  // future to do based on user data in login

        //function for randomn messages in HomeController
        Array.prototype.getRandomVal = function () {
            return this[Math.floor(Math.random() * this.length)];
        };

        //function to return unique array
        //SO ES6
        Array.prototype.unique = function(key){
            var results = [];
            const map = new Map();
           
            for (const item of this) {
                if(!map.has(item[key])){
                            map.set(item[key], true);    // set any value to Map
                    results.push(item);
                }
            }
                 return results;
        };
        //EO ES6 


        // The viewport controller requires xtype defined by profiles, so let's perform extra
        // initialization when the application and its dependencies are fully accessible.
        Ext.Viewport.getController().onLaunch();
        Ext.getBody().removeCls('launching');
       
        this.callParent([profile]);

    },
    
/*
   getTranslation: function (textId) {  /// translation function
        var store = Ext.getStore('locale.Languages'),
            rec = store.findRecord('TextId', textId);
       
        return rec ? rec.get(App.app.currentLocale) : textId;
    },
    */
   

  

    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
