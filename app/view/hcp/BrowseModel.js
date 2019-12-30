Ext.define('App.view.hcp.BrowseModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.hcpbrowse',
    data: {
        level: null,
        isFiltered: false,
        filterText: null
    },
    stores: {
        hcps: {
            type: 'contacts'
        }
    }
});
