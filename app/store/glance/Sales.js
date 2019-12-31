/**
 * Summary sales
 */
Ext.define('App.store.glance.Sales', {

    extend: 'App.store.Base',
    alias: 'store.glance-sales',
    proxy: {
        type: 'ajax',
        url: 'app/data/glance/Sales.json',
        reader:{
            type: 'json',
            root: 'd'
        }
    }   
  });

