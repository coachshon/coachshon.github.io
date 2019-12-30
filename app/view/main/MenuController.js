Ext.define('App.view.main.MenuController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.mainmenu',

    collapse: function () {
        var view = this.getView();       
        if (view) {
            view.setExpanded(false);
        }
    },

    onTriggerTap: function() {
        var view = this.getView();
        if (view) {
            view.setExpanded(!view.getExpanded());
        }
    },

    onMenuChildTap: function(menu, location) {
        var record = location.record;
        
        if (record) {
            this.redirectTo(record.getId());
            this.collapse();
        }
    },


    onLogoutTap: function () {
        if (this.fireEvent('logout')) {
            this.collapse();
        }
    }
});
