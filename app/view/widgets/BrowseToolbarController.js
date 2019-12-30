Ext.define('App.view.widgets.BrowseToolbarController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.browse-toolbar',


    //display filter panel
    ontapFilters: function (button) {
        var me = this,
             view=me.getView(),
             container = view.up().up(),
             xtype = container.xtype + '-filters-menu',
             menu = container.down(xtype),
             expand = !menu.getExpanded();
       
        if (expand) {
            button.setIconCls('x-fa fa-times');
            button.addCls('x-pressed');
        } else {
            button.setIconCls('x-fa fa-filter');
            button.removeCls('x-pressed');
        }

        menu.setExpanded(expand);       
       
    },
 
    // triggered from refresh button
    onTapFiltersClear: function (button) {       
        var me = this,
           vm = me.getViewModel(),
           container = me.getView().up().up(),
           store = container.getStore(),
           params= { level: App.app.loggedInUser.HIER_LEVEL_JOIN },
           filters = (container.xtype === 'hcobrowse') ? 'hco.Filters' : 'hcp.Filters';

        // NOT managing navigation level selections...will reset to original list...
        container.setTitle(container.initialConfig.title);
        //reset filter display
        vm.set({
            filterText: null,
            isFiltered: false
        });
        if (store) {

                store.load({
                    params: params,
                    callback: function () {
                        // recreate list...
                        var list = container.down('list'),
                            xtype = list.xtype;
                        container.remove(list);
                        list = Ext.create('App.view.' + xtype);
                        container.add(list);
                        list.setStore(store);
                       

                    }
                });
        }


        // reload filters based on default level
        var storeFilters = Ext.StoreManager.lookup(filters);
        if (storeFilters) {
            storeFilters.load({
                params: params,
                callback: function () {
                    try {
                        var root = storeFilters.getRoot(),
                            first = root.firstChild;

                        first.expand(false);  // false to recursive
                    } catch (e) {
                        // console.log(e)
                    }
                }
            });
        }
    },

    // triggered form navigation\level button
    onTabNavigator: function (button) {
        var pressed = button.isPressed();
        
         if (pressed) {
            button.setIconCls('x-fa fa-times');
        } else {
             button.setIconCls('x-fa fa-user');
        }
        
    },

    // load list based on selected level
    onTreeNodeSelectionChange: function (tree, node) {
        if (node) {
            var me = this,
                vm = me.getViewModel(),
                container = me.getView().up().up(),
                store = container.getStore(),
                code = node.data.code,
                params = {
                    level: code
                },
               button = tree.up('button'),
               menu = tree.up('menu'),
               title = node.data.text,
               filters = (container.xtype === 'hcobrowse') ? 'hco.Filters' : 'hcp.Filters';
         
            button.setIconCls('x-fa fa-user');
            button.setDisabled(false);
            button.setPressed(false);
            menu.hide();


            if (code === App.app.loggedInUser.HIER_LEVEL_JOIN) {
                title = container.initialConfig.title;
            }

            vm.set({
                filterText: null,
                isFiltered: false
            });

            if (store) {
                container.setTitle(title);
                // load store based on selected hierarchial level
                store.load({
                    params: params
                });
            }
            // reload filters based on selected level
            store = Ext.StoreManager.lookup(filters);           
            if (store) {
                store.load({
                    params: params,
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

        }
    },

    //set togle arrows to the right
    onTreePainted: function (tree) {
        tree.setExpanderFirst(false);  // set right hand toggle
    }


});




 