/**
 * Summary sales
 */
Ext.define('App.store.glance.Sales', {
    extend: 'Ext.data.Store', 
    alias: 'store.glance-sales',
    proxy: {
        type: 'ajax',
        url: 'app/data/glance/Sales.json',
        reader:{
            type: 'json',
            rootProperty: 'd'
        }
    }   
  });

