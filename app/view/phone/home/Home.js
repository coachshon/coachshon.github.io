Ext.define('App.view.phone.home.Home', {
    extend: 'App.view.home.Home',
    xtype: 'home',
    cls: 'home',
    items: {
        greeting: {
            weight: 10,
            xtype: 'homeheader'
        }
    }
});

