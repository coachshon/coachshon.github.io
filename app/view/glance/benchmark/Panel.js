Ext.define('App.view.glance.benchmark.Panel', {
    extend: 'Ext.Panel',
    xtype: 'glance-benchmark-panel',
    requires: [
      'App.view.glance.benchmark.Tree'
    ],
    flex: 1,
    layout: 'fit',
    items: [{
        xtype: 'glance-benchmark-tree'
    }, {
        xtype: 'toolbar',
        docked: 'bottom',
        border: false,
        items: ['->', {
            xtype: 'button',
            text: 'Done',
            handler: 'ontapAddDone',
            ui: 'ok'
        }]
    }]
});


