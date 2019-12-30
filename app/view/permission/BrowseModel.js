Ext.define('App.view.permission.BrowseModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.permissionbrowse',

    stores: {
        permissions: {
            type: 'permissions'
        }
    }
});
