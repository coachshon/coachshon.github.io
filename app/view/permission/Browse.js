Ext.define('App.view.permission.Browse', {
    extend: 'App.view.widgets.Browse',

    requires: [
       'App.view.permission.BrowseController',
       'App.view.permission.BrowseModel',
       'App.view.permission.Wizard'
    ],
    
    controller: 'permissionbrowse',
    viewModel: {
        type: 'permissionbrowse'
    },

    cls: 'permissionbrowse',
    bind: {
        store: '{permissions}'
    }
});
