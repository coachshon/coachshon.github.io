Ext.define('App.view.hco.BrowseModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.hcobrowse',
    data: {
        level: null,
        isFiltered: false,
        filterText: null
    },
    stores: {
        hcos: {
            type: 'accounts',
            autoLoad: false
        }
    }
});