Ext.define('App.view.glance.benchmark.Menu', {
    extend: 'App.view.widgets.Sidebar',
    xtype: 'glance-benchmark-menu',
    requires: [
    'App.view.glance.benchmark.BenchmarkController',
    'App.view.glance.benchmark.Panel'
    ],
    controller: 'glance-benchmark',
    layout: 'vbox',
   
    classCls: 'sidebar-glance-right',
    weighted: true,

    items: {     
        benchmark: { 
            xtype: 'glance-benchmark-panel',
            weight: 10
        }
    }

});
