Ext.define('App.view.hcp.filters.Menu', {
    extend: 'App.view.widgets.Sidebar',
    xtype: 'hcpbrowse-filters-menu',
    requires: [
    'App.view.hcp.filters.Panel'
    ],
    layout: 'vbox',
   
    classCls: 'sidebar-filters-right',
    weighted: true,

    items: {     
        benchmark: { 
            xtype: 'hcp-filters-panel',
            weight: 10
        }
    }

});
