Ext.define('App.view.uat.BrowseModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.uatbrowse',

    stores: {
        uats: {
            type: 'uats'
        }
    }
});
