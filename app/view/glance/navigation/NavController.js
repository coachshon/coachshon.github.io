Ext.define('App.view.glance.navigation.NavController', {
    extend: 'App.view.main.MenuController',
    alias: 'controller.glance-navigation',

    //set the navigation viewmodel data from the carousel card data set in dashboard controller
    init: function (cmp) {
        var me = this,
           vm = me.getViewModel(),
           store = vm.getStore('navlist'),
          params = { level: App.app.loggedInUser.HIER_LEVEL_JOIN };

        // used as display in 'glance-navigation-tabpanel-log' and to validate value change to trigger reload or renavigate
        vm.set({
            brand: cmp.mybrand,
            level: cmp.mylevel,
            title: cmp.mytitle
        });
        //load navigation brands
        store.load({
            params: params
        })
    },



    // reload the carousel if level selection has changed
    // navigate to the brand if brand has changed
    ontapMenuDone: function (button) {
        var me = this,
            vm = me.getViewModel(),
            menu = button.up('glance-navigation-menu'),
            tabpanel = menu.down('glance-navigation-tabpanel'),
            tree = tabpanel.down('glance-navigation-tree'),
            selectionLevel = tree.getSelection(),
            list = tabpanel.down('glance-navigation-list'),
            selectionBrand = list.getSelection(),
            level, title, brand;

       
        if(selectionLevel){
            level = selectionLevel.get('code');
            title = selectionLevel.get('text');
        }else{
            selectionLevel = tree.getStore().findRecord('text', vm.get('selectionTree'));
            if (selectionLevel) {
                level = selectionLevel.get('code');
                title = selectionLevel.get('text');
            }
        }
     
        if(selectionBrand){
            brand = selectionBrand.get('BRAND_CODE');
        } else {
            selectionBrand = list.getStore().findRecord('BRAND_CODE', vm.get('selectionList'));
            if (selectionBrand) {
                brand = selectionBrand.get('BRAND_CODE');
            }
        }
        
        // apply selections
        me.fireEvent('menudone', title, level, brand);  // caught in dashboard controller

    },

    // load the navigation brands based on selected level
    onTreeNodeSelectionChange: function (tree, node) {
        if (node) {
            var me = this,
                view = me.getView(),
                tabpanel = view.down('glance-navigation-tabpanel'),
                list = tabpanel.down('glance-navigation-list'),
                vm = me.getViewModel(),
                store = vm.getStore('navlist'),
                code = node.data.code,
                params = {
                    level: code
                },
               brand = (list.getSelection()) ? list.getSelection().data.BRAND_CODE : vm.get('brand'),
               button = view.lookupReference('btn-navigation-glance');

            button.setDisabled(true);// prevent navigation until the new brand list is back
            store.getProxy().abort(); //stop any previous calls           
            // load nav brand store based on selected level
            store.load({
                callback: function () {
                    // ensure new brands contain the current vm brand
                    var record = store.findRecord('BRAND_CODE', brand);
                    if (!record) {
                        // set the brand binding to the new brand list item
                        list.select(0);
                    } else {
                        list.select(record);
                    }

                    button.setDisabled(false);
                },
                params: params
            });
        }
    },

    //set togle arrows to the right
    onTreePainted: function (tree) {
        tree.setExpanderFirst(false);  // set right hand toggle
    }
});
