Ext.define('App.view.hcp.ShowModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.hcpshow',

    stores: {
        brands: {
            type: 'hcp-brands'
        },
        brandsPLPD: {
            type: 'hcp-brands'
        }
    }
});
