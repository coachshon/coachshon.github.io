Ext.define('App.store.hcp.Brands', {
  extend: 'Ext.data.Store', 
  alias: 'store.hcp-brands',
  proxy: {
      type: 'ajax',
      url: 'app/data/hcp/Brands.json',
      reader:{
          type: 'json',
          rootProperty: 'd'
      }
  }   
});