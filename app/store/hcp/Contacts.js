Ext.define('App.store.hcp.Contacts', {
  extend: 'Ext.data.Store', 
  alias: 'store.contacts',   
  model: 'App.model.hcp.Contact',
      proxy: {
          type: 'ajax',
          url: 'app/data/Contacts.json',
          reader:{
              type: 'json',
              root: 'd'
          }
      }   
    });