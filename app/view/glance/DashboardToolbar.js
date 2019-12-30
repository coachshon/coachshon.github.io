
Ext.define('App.view.glance.DashboardToolbar', {
    extend: 'Ext.Toolbar',
    xtype: 'dashboardtoolbar',
    cls: 'toolbar-dashboard',
    weighted: true,
    // ui: 'flat',    //transparent 
    /*
    bind: {
        title: '{title} > {brand}'
    },
    */
    items: {
        menu: {
            reference: 'btn-navigation-menu',
            iconCls: 'x-fa fa-ellipsis-h',
            ui: 'action',
            handler: 'ontapMenu'
        },
        label: {
            xtype: 'component',
            margin: 2,
            cls: 'x-center label',
            width: '80%',
            bind: {
                html: '{title} > {brand}'
            }
        }
    }
});
