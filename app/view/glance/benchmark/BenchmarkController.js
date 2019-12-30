Ext.define('App.view.glance.benchmark.BenchmarkController', {
    extend: 'App.view.main.MenuController',
    alias: 'controller.glance-benchmark',
    


    //manages tree selection
    onCheckChange: function (cell, index, checked) {
        var tree = cell.up('tree'),
            store = tree.getStore(),
            node = store.getAt(index),
           isLeaf = node.get('leaf');
        

       // node.set('checked', checked);

       if (!isLeaf) {
            if (checked) {
                node.expand();
            } else {
                if(node.get('code') !== 'NATIONAL'){                    
                    node.collapse();
                }
            }
            node.cascadeBy(function (child) {
                child.set('checked', checked);
            });
        } else {
            if (!checked) {
                    node.parentNode.set('checked', checked);
            }
        }
       
    },
    
    
    // add the benchmark summaries 
    ontapAddDone: function (button) {      
        var me = this,
            menu = button.up('glance-benchmark-menu'),
            panel = menu.down('glance-benchmark-panel'),
            tree = panel.down('glance-benchmark-tree'),
            store = tree.getStore(),
            benchmarks = [];

          panel.mask({ xtype: 'loadmask' });
          Ext.defer(function () {
              //find all the selected records
              store.filterBy(function (node) {
                  if (node.get('checked')) {
                      //reset node checked value
                      node.set('checked', false);
                      if ((node.get('leaf'))) {
                          //add node to benchmark summary array
                          benchmarks.push(node);
                      }
                  }
                  return true;
              });
              store.clearFilter(false);
              //reset tree
              store.getRoot().firstChild.expand(false);  // false to recursive
              panel.unmask();
              //create benchmark summaries
              me.fireEvent('adddone', benchmarks);  // caught in dashboard controller
                  }, 100);
    }
});
