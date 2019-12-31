/**
 * Summary metrics
 */
Ext.define('App.store.glance.Metrics', {
  extend: 'Ext.data.Store', 
  alias: 'store.glance-metrics',
  model: 'App.model.hco.Account',
  proxy: {
      type: 'ajax',
      url: 'app/data/glance/Metrics.json',
      reader:{
          type: 'json',
          root: 'd'
      }
  }   
});