Ext.define('App.view.hco.filters.Menu', {
    extend: 'App.view.widgets.Sidebar',
    xtype: 'hcobrowse-filters-menu',
    requires: [
    'App.view.hco.filters.Panel'
    ],
    layout: 'vbox',
   
    classCls: 'sidebar-filters-right',
    weighted: true,

    items: {     
        benchmark: { 
            xtype: 'hco-filters-panel',
            weight: 10
        }
    }

});
