
Ext.define('App.view.glance.sales.Sales', {
    extend: 'Ext.Panel',
    xtype: 'glance-sales-sales',
    requires: [
    'App.view.glance.sales.Chart'
    ],
    ui: 'block summary',
    height: 430,
    margin: 5,
    items: [{
        xtype: 'glance-sales-chart'
    }]
        
});
