Ext.define('App.view.widgets.Brand', {
    extend: 'Ext.Panel',
    iconCls: 'x-fa fa-medkit',
    header: {
        items: [{
            xtype: 'button',
            userCls: 'x-item-no-tap',
            ui: 'block'
        }]
    }
});
