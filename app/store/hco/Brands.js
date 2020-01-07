Ext.define('App.store.hco.Brands', {
  extend: 'Ext.data.Store', 
  alias: 'store.hco-brands',
  proxy: {
      type: 'ajax',
      url: 'app/data/hco/Brands.json',
      reader:{
          type: 'json',
          rootProperty: 'd'
      }
  }   
});