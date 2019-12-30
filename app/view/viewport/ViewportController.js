Ext.define('App.view.viewport.ViewportController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.viewport',

    mixins: ['Ext.mixin.Mashup'],
    listen: {
        controller: {
            '*': {  // listen to any fired event from any controller
                login: 'onLogin',
                logout: 'onLogout',
                unmatchedroute: 'handleUnmatchedRoute'
            }
        }
    },

    routes: {
        'login': 'handleLoginRoute'
    },

    onLaunch: function () {
        
        var me=this;
        me.originalRoute = App.getApplication().getDefaultToken();
       
       // this.restoreSession();
          me.redirectTo('login', {
            replace: !0
        });
        
    },
    
    showView: function (xtype) {
        var view = this.lookup(xtype),
            viewport = this.getView();

        if (!view) {
            viewport.removeAll(true);
            view = viewport.add({
                xtype: xtype,
                reference: xtype
            });
        }
      
        viewport.setActiveItem(view);
    },

    showAuth: function () {
        this.showView('login');
    },

    showMain: function () {
        this.showView('main');
    },

    // ROUTING

    handleLoginRoute: function () {
        var me = this,
            session = me.session;
       
        if (session) {
            me.redirectTo('', { replace: true });
            return;
        }

        me.showAuth();
    },

    handleUnmatchedRoute: function (route) {
      
        var me = this,
            target = App.getApplication().getDefaultToken(),
             session = me.session;

        if (!session) {
            // There is no authenticated user, let's redirect to the login page but keep track
            // of the original route to restore the requested route after user authentication.
            me.originalRoute = route;
            me.redirectTo('login', {
                replace: !0
            });
            return;
        }
        // There is an authenticated user, so let's simply redirect to the default token.   
        if (route !== target) {
            Ext.log.warn('Route unknown: ', route);        
            me.redirectTo(target, { replace: true });
        }
      
    },


    // SESSION MANAGEMENT

    restoreSession: function () {
        var data = App.util.State.get('session'),
            session = data ? App.model.login.Session.loadData(data) : null;

        if (session && session.isValid()) {
            this.initiateSession(session);
        } else {
            this.terminateSession();
        }

        return session;
    },

    initiateSession: function (session) {
   
        this.saveSession(session);
        this.showMain()
    },

    terminateSession: function () {
        this.saveSession(null);
        this.showAuth();
    },

    saveSession: function (session) {
        App.util.State.set('session', session);
        this.getViewModel().set('user', session);
        this.session = session;
        
    },

    // AUTHENTICATION

    onLogin: function (session) {        
        if (!session) {
            return false;
        }
        this.initiateSession(session);
     // can we get the requested token?
        this.redirectTo(this.originalRoute, { replace: true });

    },

    onLogout: function () {
        var me = this,
            view = me.getView(),
            session = me.session;

        if (!session) {
            return false;
        }

        me.terminateSession();
        me.redirectTo('login', { replace: true });
    }
});

