Ext.define('App.store.hco.Accounts', {
  extend: 'Ext.data.Store', 
  alias: 'store.accounts',
  model: 'App.model.hco.Account',
  proxy: {
      type: 'ajax',
      url: 'app/data/hco/Accounts.json',
      reader:{
          type: 'json',
          rootProperty: 'd'
      }
  }   
});