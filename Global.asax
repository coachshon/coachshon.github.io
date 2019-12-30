<%@ Application Language="C#" %>
<%@ Import Namespace="BusinessLayer.Helpers" %>
<%@ Import Namespace="System.IO" %>

<script runat="server">

    void Application_Start(object sender, EventArgs e) 
    {
        // Code that runs on application startup
        // Get the absolute path to the error log file

         GlobalHelper.Err_Log = HttpContext.Current.Server.MapPath("~/Errors/Log_" + ConfigurationManager.AppSettings["Environment"] + ".txt");

        
  
    }
    void Session_Start(object sender, EventArgs e)
    {
        // Code that runs when a new session is started    
        //event will not be hit again whilst running the application unless the web development server is stopped and restarted

    }
      
    void Application_End(object sender, EventArgs e) 
    {
        //  Code that runs on application shutdown
        

    }
        
    void Application_Error(object sender, EventArgs e) 
    {
        // Code that runs when an unhandled error occurs

        // Get the exception object.
        Exception exc = Server.GetLastError();

        // Handle HTTP errors
        if (exc.GetType() == typeof(HttpException))
        {
            //Redirect HTTP errors to HttpError page
            Server.Transfer("Errors/Oops.aspx");
        }
        else
        {
            // For other kinds of errors give the user some information
            Response.Write("<!DOCTYPE html>");
            Response.Write("<head>");
            Response.Write("<title>ERROR</title>");
            Response.Write("</head>");
            Response.Write("<body>");
            Response.Write("<h2>Global Error</h2>\n");
            Response.Write(
                "<p>" + exc.Message + "</p>" + "<p>" + exc.InnerException + "</p>\n");
            Response.Write("Note: Ops Team has been notified.");
            Response.Write("Return to the <a href='Default.aspx'>" +
                "Default Page</a>\n");
            Response.Write("</body>");
            Response.Write("</html>");
        }
        // Log the exception and notify system operators      
    ExceptionUtility.NotifySystemOps(exc.Message.ToString());

        // Clear the error from the server
        Server.ClearError();      
    }


    void Session_End(object sender, EventArgs e) 
    {
        // Code that runs when a session ends. 
        // Note: The Session_End event is raised only when the sessionstate mode
        // is set to InProc in the Web.config file. If session mode is set to StateServer 
        // or SQLServer, the event is not raised.       
      

    }
       
</script>
