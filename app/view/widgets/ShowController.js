Ext.define('App.view.widgets.ShowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.show',

    control: {
        '#': {  //view event listener
            recordchange: 'onRecordChange'
        }
    },

    getRecord: function () {       
        return this.getViewModel().get('record');
    },

    onRecordChange: function (view, record) {       
        // Scroll to the top of the view but make sure that the view is still
        // valid since the record is reset to null when the view is destroyed.
        if (!view.destroyed) {
            view.getScrollable().scrollTo(null, 0, true);

            var affiliates= view.lookupReference('affiliates'),
                gsearch = view.lookupReference('Gsearch');

            if (affiliates && !affiliates.isHidden()) {
               /* vm.getStore('affiliates').load({
                params: params
               });*/
                affiliates.hide();
            }
            
            if (gsearch && !gsearch.isHidden()) {
                //view.down('#ifrm').updateData({ search: record.get('NAME_DISPLAY') })
                gsearch.hide();
            }

        }
    },

    onToolIconTap: function (button, event) {
        var me = this,
            record = me.getRecord(),
            action = button.getIconCls();
       
        if (record) {
            me.fireEvent('actionexec', action.substring(action.lastIndexOf(' ') + 1), record, button);
        }
   
    }
});
