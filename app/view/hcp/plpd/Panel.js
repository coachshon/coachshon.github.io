
Ext.define('App.view.hcp.plpd.Panel', {
    extend: 'Ext.Panel',
    xtype: 'hcp-plpd-panel',
    ui: 'block',
    requires: [
    'App.view.hcp.plpd.Chart'
    ],
    minHeight: 150,
    layout: 'fit',
    items: [{
        xtype: 'hcp-plpd-chart'
    }]
});
