Ext.define('App.view.glance.navigation.Tree', {
    extend: 'Ext.list.Tree',
    xtype: 'glance-navigation-tree',
    reference: 'navlevel',
    defaults: {
        xtype: 'treelistitem'
    },
    store: 'glance.Levels',
    listeners: {
        painted: 'onTreePainted',
        selectionchange: 'onTreeNodeSelectionChange'
    },   

    initialize: function () {
        var me = this,
            store= me.getStore();

        if (store.count() == 0) {
            //load tree store..then expand first node
            store.load({
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
