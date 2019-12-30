Ext.define('App.view.hcp.Browse', {
    extend: 'App.view.widgets.Browse',

    requires: [
       'App.view.hcp.filters.Menu',
       'App.view.hcp.BrowseModel',
       'App.view.hcp.List',
       'App.view.hcp.Show',
       'App.view.widgets.BrowseController'
    ],
    controller: 'browse',
  
    viewModel: {
        type: 'hcpbrowse'
    },

    cls: 'hcpbrowse',
    bind: {
        store: '{hcps}'
    },
    tbar: {
        xtype: 'container',
        layout: 'vbox',
        items: [
           {
               xtype: 'browsetoolbar'
           }, {
               xtype: 'component',
               bind: {
                   hidden: '{!isFiltered}',
                   html: '{filterText}'
               },
               reference: 'filter-log',
               cls: 'filters-log',
               padding: 10,
               height: 50
           }]
    },
    rbar: {
        xtype: 'hcpbrowse-filters-menu',
        ui: 'dark slide',
        zIndex: 4
    }
});
