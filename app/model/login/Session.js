Ext.define('App.model.login.Session', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'expires', type: 'date' },
        { name: 'password', type: 'string' },
        { name: 'user', reference: 'login.Person' }
    ],

    isValid: function () {
    

        var expires = new Date(this.data.data.expires),
            current = new Date(),
            isExpired = Ext.Date.diff(expires, current, 'd') <= 0;

     
        return isExpired;
          //  && this.getUser() !== null;
    }
});
