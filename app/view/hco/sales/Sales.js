
Ext.define('App.view.hco.sales.Sales', {
    extend: 'Ext.Panel',
    xtype: 'hco-sales',
    requires: [
    'App.view.hco.sales.Chart'
    ],
    iconCls: 'x-fa fa-line-chart',
    ui: 'block summary',
    minHeight: 150,
   // margin: 5,   
    
    initialize: function () {
    var me = this;

    me.setTitle(App.locale.Language.accounts.sales.title[App.app.currentLocale]);
        // me.setItems([{ xtype: 'hco-sales-chart'}]); // dynamically createed in controller

    me.callParent(arguments);
   }
});
