Ext.define('App.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',

    routes: {
        'profile': 'handleProfileRoute',
        ':type(/:args)?': {
            action: 'handleNavigationRoute',
            conditions: {
                // NOTE: how to build this list automatically from the Menu store?
                ':type': '(home|contacts|accounts|dashboard|glance|permissions|faq|uats)',
                ':args': '(.*)'
            }
        },                                                                                                                                                                                                                  
        ':type/:id(/:args)?': {
            action: 'handleDataRoute',
            conditions: {
                ':type': '(hco|hcp|account|contact|permission|uat)',   // wizards; affiliated account; affiliated hcps
                ':id': '([0-9]+|create|edit|affiliate|wizard)',
                ':args': '(.*)'
            }
        }
    },

    listen: {
        component: {
           
        },
        global: {            
            togglemainmenu: 'onToggleMainMenu',
            navigationback: 'onNavigationBack'
        }
    },


    /**
     * @param {String} ref Component reference, MUST be valid.
     * @protected
     */
    activate: function (ref) {
        var view = ref.isComponent? ref : this.lookup(ref),
            child = view,
            parent;

        while (parent = child.getParent()) {
            parent.setActiveItem(child);
            child = parent;
        }
        return view;
    },

    getContainerForViewId: function () {       
        return this.getView();
    },

    ensureView: function (id, config, route) {
        var container = this.getContainerForViewId(id),
            item = container.child('component[viewId=' + id + ']'),
            reset = !!item;
    
        if (!item) {
            item = container.add(Ext.apply({ viewId: id }, config));
        }
        if (Ext.isDefined(item.config.route)) {
            item.setRoute(route);
        }

        // Reset the component (form?) only if previously instantiated (i.e. with outdated data).
        if (reset && Ext.isFunction(item.reset)) {
            item.reset();
        }
        return item;
    },
    
    handleDataRoute: function (type, id, args) {
       
        var me = this,
            args = Ext.Array.clean((args || '').split('/')),
            action, xtype, view, viewmodel, activeItem, activeXtype, store, record, model;

        // determine the requested action for the given "type":
        // - #{type}/create: create a new "type"
        // - #{type}/{id}: show record with "id"
        // - #{type}/{id}/edit: edit record with "id"
    
        if (id == 'create') {
            action = 'create';
            id = null;           
        } else if (args[0] == 'edit') {
            action = 'edit';
            args.shift();
        } else if (id == 'wizard') {
            action = 'wizard';
        } else {
            action = 'show';
        }
       
        xtype = type + action;
    
        // leave a developer message in case of new types addition
        if (!Ext.ClassManager.getNameByAlias('widget.' + xtype)) {
            Ext.log.error('Invalid route: no view for xtype: ' + xtype);
            return false;
        }
        
       
        activeItem = Ext.Viewport.getActiveItem().getActiveItem().getActiveItem(); //// gets the current view in the container: viewport/main/card panel  
       
    
        Ext.Viewport.setMasked({ xtype: 'loadmask' });

        activeXtype = activeItem.xtype.toLowerCase();
        view = me.ensureView(xtype, { xtype: xtype });      
        viewmodel = view.getViewModel();

        if (id == null) {
             switch (type) {
                case 'permission':
                    model = 'permission.Permission';
                    break;
                case 'uat':
                    model = 'uat.UAT';
                    break;
            }
         
            view.setRecord(Ext.create('App.model.' + model));
        }

        if (activeXtype.indexOf('browse') !== -1 || activeXtype.indexOf('list') !== -1) {
            //item click from browse
            store = activeItem.getStore(); // get the active view's store...
            me.handleDataRouteLoad(action, view, viewmodel, store, id);
        } else {
            // either a back action or a load associates action...             
            if (args.length > 0) {
                if (args[0] == 'affiliate') {
                    // link associate...
                    switch (type) {
                        case 'account':  //from contact show
                            store = Ext.create('App.store.hco.Accounts');
                            break;
                        case 'contact':  //from account show
                            store = Ext.create('App.store.hcp.Contacts');
                            break;
                    }
                    if (store) {
                        store.load({
                            params: { key: id },
                            callback: function () {
                                me.handleDataRouteLoad(action, view, viewmodel, store, id);
                            }
                        });
                    }
                }
            } else {  // a back action
               // record = viewmodel.get('record');
               // if (record) {  // back action
                   // debugger;
                   // store = record.store;
                  //  me.handleDataRouteLoad(action, view, viewmodel, store, id);
                //  }

                    me.activate(view);
                    Ext.Viewport.setMasked(false);
            }
        }
       
    },

    handleDataRouteLoad: function (action, view, viewmodel, store, id) {       
        var me = this;        
        switch (action) {
            case 'create':
            case 'wizard':
                if (store) {
                    viewmodel.set({
                        store: store
                    });
                }
                break;
            case 'edit':
            case 'show':
                // ...get the record from the store & load to show
                var record = store.getById(id);
                if (record) {
                    viewmodel.set('record', record);
                    view.setRecord(record);
                }
                break;
        }
  
        me.activate(view);
        Ext.Viewport.setMasked(false);
    },

    handleNavigationRoute: function (type, args) {
    
        var me = this,
            menu = me.lookup('mainmenu'),
            store = menu.child('#navigator').getStore(),
            entry = store.getById(type);
      
       
        if (!entry) {
            return null;
        }
       
        menu.setSelection(entry);
        me.activate(
            me.ensureView(type, {
                xtype: entry.get('xtype'),
                title: entry.get('text')  // set the title bar for this view
            }, args));
        
    },

   
    onToggleMainMenu: function(expand) {
        var menu = this.lookup('mainmenu');
        if (expand === undefined) {
            expand = !menu.getExpanded();
        }

        menu.setExpanded(expand);
    },

    onNavigationBack: function () {

        var view = Ext.Viewport.getActiveItem().getActiveItem().getActiveItem(),
            vm = (view) ? view.getViewModel(): null,
            record= (vm) ? vm.get('record') : null; //// gets the current view in the container: viewport/main/card panel  

        if (record) {
            record.reject();
            vm.set('record', null);  // set record to null else the next record modifies the first...i dunno why
        }

        Ext.util.History.back();
    }

});
