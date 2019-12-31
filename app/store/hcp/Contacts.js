Ext.define('App.store.hcp.Contacts', {
  extend: 'Ext.data.Store', 
  alias: 'store.contacts',   
  model: 'App.model.hcp.Contact',
      proxy: {
          type: 'ajax',
          url: 'app/data/hcp/Contacts.json',
          reader:{
              type: 'json',
              root: 'd'
          }
      }   
    });