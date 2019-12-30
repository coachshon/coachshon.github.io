Ext.define('App.view.glance.navigation.Menu', {
    extend: 'App.view.widgets.Sidebar',
    xtype: 'glance-navigation-menu',
    requires: [
    'App.view.glance.navigation.NavController',
    'App.view.glance.navigation.NavModel',
    'App.view.glance.navigation.TabPanel'
    ],
    controller: 'glance-navigation',
    viewModel: 'glance-navigation',
    layout: 'vbox',
   
    classCls: 'sidebar-glance-left',
    weighted: true,

    items: {     
        navigation: { 
            xtype: 'glance-navigation-tabpanel',
            weight: 10
        }
    }

});
