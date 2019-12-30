Ext.define('App.view.phone.main.MainController', {
    extend: 'App.view.main.MainController',
    alias: 'controller.phone-main',

    getContainerForViewId: function (id) {
        var regex = /^(contact|hcp|account|hco|affiliate|permission|uat)(create|edit|show|wizard)$/;
  
       return this.lookup(id.match(regex) ? 'navigation' : 'views');   //show the navigaton back button or the views menu bar as defined in xtype: 'main', -- set by profile
    }
});
