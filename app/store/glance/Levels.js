/**
 *Glance navigator levels tree
 */
Ext.define('App.store.glance.Levels', {
    extend: 'Ext.data.TreeStore',
    alias: 'store.glance-levels',  
    proxy: {
        type: 'ajax',
        url: 'app/data/glance/Levels.json',
        reader:{
            type: 'json',
            root: 'd'
        }
    }   
  });
