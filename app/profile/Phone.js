Ext.define('App.profile.Phone', {
    extend: 'Ext.app.Profile',

    views: {
        faq: 'App.view.widgets.FAQ',
        dashboard: 'App.view.phone.glance.Dashboard',
        hcobrowse: 'App.view.phone.hco.Browse',
        hcpbrowse: 'App.view.phone.hcp.Browse',
        home: 'App.view.phone.home.Home',
        login: 'App.view.phone.login.Login',
        main: 'App.view.phone.main.Main',
        permissionbrowse: 'App.view.phone.permission.Browse',
        uatbrowse: 'App.view.phone.uat.Browse'
    },

    isActive: function () {
        return Ext.platformTags.phone;
    },

    launch: function () {
        // Add a class to the body el to identify the phone profile so we can
        // override CSS styles easily. The framework adds x-phone so we could
        // use it but this way the app controls a class that is always present
        // when this profile isActive, regardless of the actual device type.
        Ext.getBody().addCls('phone-profile');
    }
});
