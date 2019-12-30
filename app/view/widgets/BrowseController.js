Ext.define('App.view.widgets.BrowseController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.browse',
    sheet: null,
    control: {
        '#': {
            storechange: 'onStoreChange'
        }
    },

    initViewModel: function (vm) {
        vm.bind(
            { bindTo: '{filters.search}' },  //this attaches listeners to the field events of fields binded to {filters.search};  xtype: 'textfield', bind: '{filters.search}',
            Ext.Function.createBuffered(function () {
                if (!this.destroyed) {
                    // The view might have been destroyed (e.g. user deauthentication)
                    this.updateFilters();
                }
            }, 500, this, {}));
    },

    // tap on browse list item
    onChildActivate: function (dataview, location) {
        var me = this,
            record = location.record;
        if (record) {
            this.redirectTo(record);
        }
    },


    // tap on browse icon
    onListIconTap: function (button, event) {
        var me = this,
            action = button.initialConfig.iconCls,
            view = me.getView(),
            list = view.down('list'),
            record = list.mapToRecord(event);
    
        if (record) {
            me.fireEvent('actionexec', action.substring(action.lastIndexOf(' ') + 1), record);
        }
    },

    onListIconTapInfo: function (button, event) {
        var me = this,
            view = me.getView(),
            list = view.down('list'),
            record = list.mapToRecord(event),
            search = record.get('NAME_DISPLAY') + ',' + record.get('CITY') + ',' + record.get('PROVINCE');

       var sheet = Ext.create({
            xtype: 'sheet',
            side: 'right',           
            width: '100%',
            height: '90%',
            items: [{
                xtype: 'titlebar',
                docked: 'top',
                items: [{
                    xtype: 'button',
                    align: 'right',
                    iconCls: 'x-fa fa-times',
                    handler: function () {
                        this.up('sheet').close();
                    }
                }]
            }, {
                xtype: 'iframe-container',
                responsiveConfig: {
                    'width < 400': {
                        tpl: [
                        '<iframe src="https://www.google.com/search?igu=1&ei=&q={search}" width="100%" height="540" scrolling="yes"></iframe>'
                        ]
                    },
                    'width > 400': {
                        tpl: [
                        '<iframe src="https://www.google.com/search?igu=1&ei=&q={search}" width="100%" height="540" scrolling="yes"></iframe>'
                        ]
                    },
                    'width > 600': {
                        tpl: [
                        '<iframe src="https://www.google.com/search?igu=1&ei=&q={search}" width="100%" height="275" scrolling="yes"></iframe>'
                        ]
                    }
                }
            }]
        });
     
        sheet.down('#ifrm').updateData({ search: search });       
        sheet.show();      

    },
 
    // triggered on changing browse list
    onStoreChange: function () {
        var me = this,
            store = me.getView().getStore(),
            params = { level: App.app.loggedInUser.HIER_LEVEL_JOIN };

        if (store && store.getCount() < 2) {  // store might be one from an contact to account link
            store.load({
                params: params
            });
        }
    },


    // load list based on selected filter
    onTreeNodeSelectionChange: function (tree, node) {         
        if (node && node.isLeaf()) {
            var me = this,
                vm = me.getViewModel(),
                view = me.getView(),
                store = view.getStore(),
                xtype = view.xtype + '-filters-menu',
                menu = view.down(xtype),
                toolbar = view.down('browsetoolbar'),
                button = toolbar.lookupReference('btn-filters'),
                data = node.data,
                level = data.code,
                parent = data.node,
                rule = data.rule,
                title = data.text,
                params = {
                    level: level,
                    parent: parent,
                    rule: rule
                };                       

           
            if (store) {
                //set filter display
                vm.set({
                    filterText: parent + ': ' + title,
                    isFiltered: true
                });
           
                // load store based on selected level, node, rule
                store.load({
                    params: params,
                    callback: function () {
                        // :( list will be corrupt  if (store.getCount() === 0), 
                        // :( :( and doLayout does not accomodate for new height required for {OUTPUT_LABEL} {OUTPUT_VALUE}
                        // recreate list...
                        var list = view.down('list');
                        xtype = list.xtype;
                        view.remove(list);
                        list = Ext.create('App.view.' + xtype);
                        list.setStore(store);
                        view.add(list);

                    }
                });
            }

            //reset button, hide menu
            menu.setExpanded(false);
            button.setIconCls('x-fa fa-filter');
            button.removeCls('x-pressed');

        }
    },

    // free text search trigger
    updateFilters: function (reload) {
        var me = this,
           view = me.getView(),
           store = view.getStore();
       
        if (store) {
            store.clearFilter(false);  // true to supress "datachanged" and "refresh" events fired on the store
            
            var collection = store && store.getFilters(),
                filters = me.getViewModel().get('filters'),  
                fields = view.getFields(),
                dirty = !!reload,
                item, value;
           
            if (!collection) {
                return;
            }
      
            Ext.Object.each(fields, function (key, field) {  
                value = filters[key];
                if (value && value.isModel) {
                    value = value.get('value');
                }
                if (!value) {
                    return;
                }

                switch (key) {
                    case 'search':
                        // SEARCH using WYSIWYG
                        var list = view.down('list'),
                            xtype = list.xtype,
                            tpl = list.getItemTpl().html,
                            rege = new RegExp(value, 'i'),
                            flds = [],  // an array to collect the strings found between curlys in the itemTpl...not using store.model.getFields();
                            rxp = /{([^}]+)}/g,
                            curMatch;
                            //field tpl fields
                            while (curMatch = rxp.exec(tpl)) {
                                flds.push(curMatch[1]);
                            }
                    
                        store.filterBy(function (record) {
                            recRet = false;
                            flds.forEach(function (fld) {
                                if (fld.indexOf("NAME_DISPLAY") != -1) {  // just search name filed
                                    if (rege.test(record.get(fld))) {
                                        recRet = true;
                                    }
                                }
                            });
                            return recRet;
                        });
                        
                        if (store.getCount() < 1) {  // store might be one from an contact to account link
                            //*** HACK! HACK! HACK! *** 
                            // when store search returns null clearfilters does not trigger rebuilding of list items 1-buffer size
                            // ...instead it starts at some arbitratry index and breaks all the fun!
                            // ...list will be corrupt on clearfilters; so, get rid of it and start again
                            view.remove(list);
                            list = Ext.create('App.view.' + xtype);
                            list.setStore(store);
                            view.add(list);
                        }

                      //  debugger;
                        break;
                }


            });
        }
    }
});




