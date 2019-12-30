Ext.define('App.view.hco.Browse', {
    extend: 'App.view.widgets.Browse',

    requires: [
       'App.view.hco.BrowseModel',
       'App.view.hco.filters.Menu',
       'App.view.hco.List',
       'App.view.hco.Show',
       'App.view.widgets.BrowseController'
    ],
    controller: 'browse',
  
    viewModel: {
        type: 'hcobrowse'
    },

    cls: 'hcobrowse',
    bind: {
        store: '{hcos}'
    },
    tbar: {
        xtype: 'container',
        layout: 'vbox',
        items: [
           { xtype: 'browsetoolbar'
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
        xtype: 'hcobrowse-filters-menu',
        ui: 'dark slide',
        zIndex: 4
    }
});
