Ext.define('App.view.hcp.filters.Panel', {
    extend: 'Ext.Panel',
    xtype: 'hcp-filters-panel',
    requires: [
      'App.view.hcp.filters.Tree'
    ],
    flex: 1,
    layout: 'fit',
    items: [{
        xtype: 'hcp-filters-tree'
    }]
});


