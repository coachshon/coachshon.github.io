Ext.define('App.view.hco.ShowModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.hcoshow',
    stores: {   
        brands: {
            type: 'hco-brands'
        },
        affiliates: {
            type: 'hco-affiliates'
        },
        sales: {
            type: 'hco-sales'
        }
    }
});
