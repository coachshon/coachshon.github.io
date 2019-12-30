Ext.define('App.view.glance.Dashboard', {
    extend: 'Ext.Panel',
    requires: [       
       'App.view.glance.DashboardController',
       'App.view.glance.DashboardModel',
       'App.view.glance.DashboardToolbar',
       'App.view.glance.Carousel',
       'App.view.glance.Glance',
       'App.view.glance.benchmark.Menu',
       'App.view.glance.navigation.Menu'
    ],
    controller: 'dashboard',
    viewModel: 'dashboard',
    layout: 'fit',
    items: []

});
