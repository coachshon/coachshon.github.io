/**
 *Filters tree
 */
Ext.define('App.store.hco.Filters', {
    extend: 'Ext.data.TreeStore',
    alias: 'store.hcofilters',
    requires: [
          'App.data.proxy.AjaxASP'
    ],
    autoLoad: false,
    root: {
        expanded: false  //Tree Stores will load regardless of autoLoad's value IF expand is set to true on the root node.
    },
    /*
 If no Model is specified, an implicit model will be created that implements Ext.data.NodeInterface. 
 The standard Tree fields will also be copied onto the Model for maintaining their state.
 */
    fields: [   // add custom fields here
         { name: 'code', type: 'string' },
         { name: 'node', type: 'string' }
    ],
    proxy: {
        type: 'ajaxASP',
        reader: {
            type: 'json',
            rootProperty: 'd',
            idProperty: 'id'
        },
        api: {
            read: 'Default.aspx/ReadAccountFilters'
        }
    }
});

