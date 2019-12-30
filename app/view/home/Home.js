Ext.define('App.view.home.Home', {
    extend: 'Ext.Panel',
   // xtype: 'home',
    requires: [
      'App.view.home.Header',
      'App.view.home.HomeController',
      'App.view.home.HomeModel'
    ],
    controller: 'home',
    viewModel:  'home',
    weighted: true,  //When this config is set to true, the items can now be supplied as an object instead of an array. The keys of the items object become the itemId of the component and the items are sorted by their weight property.
       
    cls: 'home',
    scrollable: 'y'

});

