Ext.define('App.store.hco.Affiliates', {
  extend: 'Ext.data.Store', 
  alias: 'store.hco-affiliates',
  proxy: {
      type: 'ajax',
      url: 'app/data/hco/Affiliates.json',
      reader:{
          type: 'json',
          rootProperty: 'd'
      }
  }   
});