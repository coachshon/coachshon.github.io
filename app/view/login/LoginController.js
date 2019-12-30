Ext.define('App.view.login.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',

    init: function() {
        this.callParent(arguments);
        this.update();
    },

    // set auth form values from a previous login session
    update: function () {
        var me = this,
            vm = me.getViewModel(),
            session = App.util.State.get('session'),
            ntid, password, language, map, obj;
        
        if (session) {
            ntid = session.data.NTID;
            password = session.data.password;
            language = session.data.language; 
            map= session.data.map;
            obj = {
                ntid: ntid,
                password: password,
                language: language,
                map: map
            };
            vm.set(obj);
      
            me.lookup('form').setValues(obj);
            
         //   me.onLoginTap();  // automagic login
            return;
        }
                    
    },

    // login in to LDAP
    onLoginTap: function () {
        var me = this,
            form = me.lookup('form');
        me.fireEvent('authenticate', form);  // global controller Action

    }
});
