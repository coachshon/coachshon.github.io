Ext.define('App.view.glance.DashboardModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.dashboard',
    data: {
        brand: null,
        level: null,
        title: null,
        datamonth: null,
        benchmarks: [],
        isBenchmarksHidden: true
    },
    stores: {
        brands: {
            type: 'glance-brands',
            listeners: {
                load: 'onLoadData'
            }
        }
    }
});
