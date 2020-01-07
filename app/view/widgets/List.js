
Ext.define('App.view.widgets.List', {
    extend: 'Ext.dataview.List',   
    infinite: true,  
    striped: true,
    ui: 'listing',
    grouped: false,
    indexBar: false,

    selectable: {
        disabled: true
    },        
    itemConfig: {
        xtype: 'listitem',
        defaults: {
            xtype: 'button',
            handler: 'onListIconTap',
        },
        items: [{          
            iconCls: 'x-fa fa-map-marker',
            userCls: 'x-item-no-tap',
            docked: 'right',
            ui: 'flat'
        }, {
            iconCls: 'x-fa fa-phone',
            userCls: 'x-item-no-tap',
            docked: 'right',
            ui: 'flat'
        }]
    },        
    listeners: {
        childtap: 'onChildActivate'
    }

});
