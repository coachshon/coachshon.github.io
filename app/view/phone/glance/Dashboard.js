Ext.define('App.view.phone.glance.Dashboard', {
    extend: 'App.view.glance.Dashboard',
    xtype: 'dashboard',
    tbar: {
        xtype: 'dashboardtoolbar'
    },
    lbar: {
        xtype: 'glance-navigation-menu',
        ui: 'dark slide',
        zIndex: 4
    },
    rbar: {
        xtype: 'glance-benchmark-menu',
        ui: 'dark slide',
        zIndex: 4
    }
});