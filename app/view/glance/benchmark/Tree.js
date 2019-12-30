Ext.define('App.view.glance.benchmark.Tree', {
    extend: 'Ext.grid.Tree',
    xtype: 'glance-benchmark-tree',
    rootVisible: false,
    store: 'glance.Levels',
    minHeight: 350,
    flex: 1,
    columns: [
        {
            xtype: 'treecolumn', //this is so we know which column will show the tree
            //  text: 'Level',
            dataIndex: 'text',
            flex: 2
        }, {
            xtype: 'checkcolumn',
            // text: 'Add',
            dataIndex: 'checked',
            listeners: {
                checkChange: 'onCheckChange'
            }
        }],
    initialize: function () {
        var me = this,
            store = me.getStore();

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
