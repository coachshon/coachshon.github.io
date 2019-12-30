Ext.define('App.view.hco.filters.Panel', {
    extend: 'Ext.Panel',
    xtype: 'hco-filters-panel',
    requires: [
      'App.view.hco.filters.Tree'
    ],
    flex: 1,
    layout: 'fit',
    items: [{
        xtype: 'hco-filters-tree'
    }]
});


