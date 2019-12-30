Ext.define('App.view.uat.Browse', {
    extend: 'App.view.widgets.Browse',

    requires: [
       'App.view.uat.BrowseController',
       'App.view.uat.BrowseModel',
       'App.view.uat.Wizard'
    ],
    
    controller: 'uatbrowse',
    viewModel: {
        type: 'uatbrowse'
    },

    cls: 'uatbrowse',
    bind: {
        store: '{uats}'
    }
});
