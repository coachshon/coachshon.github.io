Ext.define('App.store.glance.Brands', {
    extend: 'App.store.Base',
    alias: 'store.glance-brands',
    proxy: {
        type: 'ajax',
        url: 'app/data/glance/Brands.json',
        reader:{
            type: 'json',
            root: 'd'
        }
    }   
  });
  

