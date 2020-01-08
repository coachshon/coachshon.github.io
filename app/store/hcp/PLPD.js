Ext.define('App.store.hcp.PLPD', {
  extend: 'Ext.data.Store', 
  alias: 'store.hcp-plpd',
  proxy: {
      type: 'ajax',
      url: 'app/data/hcp/PLPD.json',
      reader:{
          type: 'json',
          rootProperty: 'd'
      }
  }   
});