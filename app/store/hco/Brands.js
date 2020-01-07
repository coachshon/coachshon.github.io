Ext.define('App.store.hco.Sales', {
  extend: 'Ext.data.Store', 
  alias: 'store.hco-sales',
  proxy: {
      type: 'ajax',
      url: 'app/data/hco/Sales.json',
      reader:{
          type: 'json',
          rootProperty: 'd'
      }
  }   
});