Ext.define('App.view.hcp.ShowTools', {
    extend: 'Ext.Container',
    xtype: 'hcpshowtools',

    mixins: [
          'Ext.mixin.Responsive'
    ],

    cls: 'show-tools',

    layout: {
        type: 'box',
        align: 'center'
    },

    responsiveConfig: {
        'width < 600': {
            layout: {
                vertical: true
            }
        },
        'width > 599': {
            layout: {
                vertical: false
            }
        }
    },

    items: [{
        xtype: 'toolbar',  
        defaults: {
            handler: 'onToolIconTap'
        },
        items: [{
            iconCls: 'x-fa fa-phone',
            ui: 'action-phone'
        }, {
            iconCls: 'x-fa fa-map-marker',
            ui: 'action-map'
        },{
            iconCls: 'x-fa fa-hospital-o',
            ui: 'action-account'
        }]
    }]
});
