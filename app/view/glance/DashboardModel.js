Ext.define('App.view.glance.DashboardModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.dashboard',
    data: {
        brand: null,
        level: null,
        title: null,
        datamonth: 'Activity - Aug; Sales - Sep',
        benchmarks: [],
        isBenchmarksHidden: true
    },
    stores: {
        brands: {
            type: 'glance-brands'
        }, 
        metrics: {
            type: 'glance-metrics'
        }, 
        sales: {
            type: 'glance-sales'
        }
    }
});
