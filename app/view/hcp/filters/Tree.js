Ext.define('App.view.hcp.filters.Tree', {
    extend: 'Ext.list.Tree',
    xtype: 'hcp-filters-tree',
    store: 'hcp.Filters',
    //minHeight: 300,
    scrollable: true,
    rootVisible: true,
    listeners: {        
        selectionchange: 'onTreeNodeSelectionChange'
    },
    initialize: function () {
        var me = this,
            store= me.getStore();

        if (store.count() == 0) {
            //load tree store..then expand first node
            store.load({
                params: { level: App.app.loggedInUser.HIER_LEVEL_JOIN },
                callback: function () {
                    try {
                        var root = store.getRoot(),
                            first = root.firstChild;

                        first.expand(false);  // false to recursive
                    } catch (e) {
                        // console.log(e)
                    }
                }
            });
        }
       

        me.callParent(arguments);
    }

});
