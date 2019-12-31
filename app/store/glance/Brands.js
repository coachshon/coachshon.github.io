Ext.define('App.store.glance.Brands', {
    extend: 'Ext.data.Store', 
    alias: 'store.glance-brands',
    proxy: {
        type: 'ajax',
        url: 'app/data/glance/Brands.json',
        reader:{
            type: 'json',
            rootProperty: 'd'
        }
    }   
  });
  

