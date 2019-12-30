Ext.define('App.view.glance.navigation.TabPanel', {
    extend: 'Ext.TabPanel',
    xtype: 'glance-navigation-tabpanel',
    requires: [
      'App.view.glance.navigation.List'
    ],
    flex: 1,
    activeTab: 0,
    items: [{
        title: 'Level',
        iconCls: 'x-fa fa-sitemap',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        scrollable: 'y',
        border: false,
        items: [{
            xtype: 'glance-navigation-tree'
        }]
    }, {
        title: 'Brand',
        ui: 'flat',
        flex: 1,
        scrollable: 'y',
        border: false,
        items: [{
            xtype: 'glance-navigation-list'
        }]
    }, {
        xtype: 'toolbar',
        docked: 'bottom',
        border: false,
        items: [{
            xtype: 'component',
            reference: 'glance-navigation-tabpanel-log',
            cls: 'treelist-log',
            padding: 10,
            height: 50,
            width: '80%',
            bind: {
                html: '{selectionTree} > {selectionList}'
            }
        }, '->', {
            xtype: 'button',
            text: 'Done',
            reference: 'btn-navigation-glance',
            handler: 'ontapMenuDone',
            ui: 'ok'
        }]
    }]
});


