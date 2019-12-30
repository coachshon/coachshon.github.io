<%@ Page Language="C#" %>

<script runat="server">
  
  protected void Page_Load(object sender, EventArgs e)
  {
      string login = HttpContext.Current.User.Identity.Name;
      login = login.Substring(login.IndexOf("\\") + 1).ToUpper();       

      UserNTID.Text = login;
  }
</script>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" 
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head id="Head1" runat="server">
  <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/>
    <title>UNAUTHORIZED</title>

    <link rel="icon" type="image/png" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAJcAAACXABVDEczwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAMiSURBVFiFtddbjJ1TFAfw3xraRlzahtKHuj20EqaqIh6aNBERSRWDTGgQceukLqWJ8CJ4kcyDenPrg3ghhAjBzIs0CBGhhJdWoogaISpMEB1NZraHb5/Y/eacOec7M93JTr6z9n+t/3+vvfblRErJfFpELMO5mEgpHWgcIKXUuGMRHsN3SEX/DS/htJ5j9UG+Dl/ViOv9IIYXXABW5eCdiL/H3vw9jYsWWsB7c5A/hYGMuz/bPmvZ5i0Aa7ukfTDjLsHuwn73XHEHGtTrcJfxSyPiFNynKsRW2xkR6zt6NcjA810y8DfGVMs0Wdj34yMsnW8GjusyfjyuUC3B0sI+gZdxSzunJgL2NcCW7VdV9jbPV0D0KWBPSmkKv0fE4lmjPa7/ZZgxdw20619jcY7xLM5uXAMRsU51AP3Sx+y3pZQO5+9JnF4H9LIEm/ACTsb7DcgfSSmV+LYCju3kHREbcB4uxGFswU01WHJkbfyB17Pt0xp2UrVTahE6r/vOTPAvrsmBW2v7JV7EEpyJjao6WZR9V+CVWrzrsbXOMysDEbExBzwnk29R7eFrM2QHnsFMSmkaP+ReTupgRKSIWJlSatXOJE7smgHcmmc5hSG8Ucx8e4OTcwgjGMzZ3I/bOl5GuAB3qk6tQ7gabxbk9zYgX44H8E/2/Slnc3QuAbsy+BCuwlv594wuN1r2H8DlxQSmVIW4W/Vk+0BVzGtrfs7KH59kxyvxdkF+Vw/kN+NAka2nsTyPXYzRLO5z1RvhmFLAPvyY07UZ7xTk2xqkfQ2eU7wN2mDOz1l4qBTwV0E+VpCP9EpeBHsS33TBPJ4zvaYlYER1jY4X5LP2a48CvsUTXTCjmedDRMt4XUF+R5/krSfbhi64vXnZf8b2cmAHbu+HPPs/moN2fIRidRa5SXVcD/ZF1iH4F9jVBfMg/pSv6JSaPck6tog4A+uxOiKGI+KEDtAhjKf/r+j+/pq1mdmpeFi1x2dUh9AYtmJlgZnGDUf4LtQSFGJW4R68q9rzM/gYr6mO45OOqoCamGW4Ea+qzpvxOiYy8Ki3iFiCFSmlidL+H1GHrBSQ4BFEAAAAAElFTkSuQmCC" />

   
    <link rel="stylesheet" href="../../shared/6.0.0/build/classic/theme-triton/resources/theme-triton-all-debug.css"/>
    <link rel=" stylesheet" href="../../shared/6.0.0/build/resources/css/ux-all-debug.css"/>
    <link rel="stylesheet" href="../../shared/6.0.0/build/resources/css/admin.css"/>

    <link rel="stylesheet" href="ux/bootstrap.css"/>
</head>
<body>
  <form id="form1" runat="server">
  <div>
   
   
    
   
    <div class="x-window error-page-container x-layer x-window-default x-border-box x-window-maximized x-resizable x-window-resizable x-window-default-resizable" role="dialog" aria-hidden="false" aria-disabled="false" aria-labelledby="pageserror404window-1014_header-title-textEl" id="pageserror404window-1014" tabindex="-1" style="right: auto; left: 0px; top: 0px; z-index: 19000; width: 1600px; height: 281px;"><div id="pageserror404window-1014-tabGuardBeforeEl" data-ref="tabGuardBeforeEl" role="button" data-tabguardposition="before" aria-busy="true" style="height:0" class="x-hidden-clip" tabindex="0"></div><div class="x-window-header x-header x-docked x-unselectable x-window-header-default x-horizontal x-window-header-horizontal x-window-header-default-horizontal x-top x-window-header-top x-window-header-default-top x-box-layout-ct" role="presentation" id="pageserror404window-1014_header" style="right: auto; left: 0px; top: 0px; width: 1600px;"><div id="pageserror404window-1014_header-innerCt" data-ref="innerCt" role="presentation" class="x-box-inner" style="width: 1568px; height: 20px;"><div id="pageserror404window-1014_header-targetEl" data-ref="targetEl" class="x-box-target" role="presentation" style="width: 1568px;"><div class="x-title x-window-header-title x-window-header-title-default x-box-item x-title-default x-title-rotate-none x-title-align-center" role="presentation" unselectable="on" id="pageserror404window-1014_header-title" style="right: auto; left: 0px; top: 0px; margin: 0px; width: 1568px;">
        <div id="pageserror403window-1014_header-title-textEl" data-ref="textEl" class="x-title-text x-title-text-default x-title-item" unselectable="on" role="presentation">
        UNAUTHORIZED</div></div></div></div></div>
    <div id="pageserror403window-1014-body" data-ref="body" class="x-window-body x-window-body-default x-box-layout-ct x-window-body-default x-noborder-trbl x-resizable x-window-body-resizable x-window-body-default-resizable" role="presentation" style="width: 1600px; height: 237px; left: 0px; top: 44px;"><div id="pageserror404window-1014-innerCt" data-ref="innerCt" role="presentation" class="x-box-inner" style="height: 237px; width: 1600px;"><div id="pageserror404window-1014-targetEl" data-ref="targetEl" class="x-box-target" role="presentation" style="width: 1600px;"><div class="x-container error-page-inner-container x-box-item x-window-item x-container-default x-box-layout-ct" style="width: 400px; right: auto; left: 600px; top: -5.5px; margin: 0px;" role="presentation" id="container-1015">
        <div id="container-1015-innerCt" data-ref="innerCt" role="presentation" class="x-box-inner" style="height: 400px; width: 400px;">
        <div id="container-1015-targetEl" data-ref="targetEl" class="x-box-target" role="presentation" style="width: 400px;">
          <label class="x-component error-page-top-text x-box-item x-component-default" id="label-1016" for="" style="right: auto; left: 71px; top: 0px; margin: 0px;">
            403</label>
           <label class="x-component error-page-desc x-box-item x-component-default" id="label-1017" for="" style="right: auto; left: 62px; top: 150px; margin: 0px;">
        <div>Seems you've hit a wall!</div> 
        <div><span> <asp:Label ID="UserNTID" runat="server" /></span> does not have access.</div> 
        <div> Please contact <a id="mailtolink" href="mailto:shauna.hogan@pfizer.com?subject=Access Request: MetaData Tool&body=Please grant me access to the MetaData Tool. NTID: ">TOOL OWNER</a> for access.</div>
         </label><div class="x-toolbar-spacer x-box-item x-toolbar-spacer-default" role="presentation" id="tbspacer-1018" style="right: auto; left: 199px; top: 198px; margin: 0px;"></div></div></div></div></div></div></div><div id="pageserror404window-1014-tabGuardAfterEl" data-ref="tabGuardAfterEl" role="button" data-tabguardposition="after" aria-busy="true" style="height:0" class="x-hidden-clip" tabindex="0"></div><div id="pageserror404window-1014-north-handle" class="x-resizable-handle x-resizable-handle-north x-window-handle x-window-handle-north x-window-handle-north-br x-unselectable" unselectable="on" role="presentation"></div><div id="pageserror404window-1014-south-handle" class="x-resizable-handle x-resizable-handle-south x-window-handle x-window-handle-south x-window-handle-south-br x-unselectable" unselectable="on" role="presentation"></div><div id="pageserror404window-1014-east-handle" class="x-resizable-handle x-resizable-handle-east x-window-handle x-window-handle-east x-window-handle-east-br x-unselectable" unselectable="on" role="presentation"></div><div id="pageserror404window-1014-west-handle" class="x-resizable-handle x-resizable-handle-west x-window-handle x-window-handle-west x-window-handle-west-br x-unselectable" unselectable="on" role="presentation"></div><div id="pageserror404window-1014-northeast-handle" class="x-resizable-handle x-resizable-handle-northeast x-window-handle x-window-handle-northeast x-window-handle-northeast-br x-unselectable" unselectable="on" role="presentation"></div><div id="pageserror404window-1014-northwest-handle" class="x-resizable-handle x-resizable-handle-northwest x-window-handle x-window-handle-northwest x-window-handle-northwest-br x-unselectable" unselectable="on" role="presentation"></div><div id="pageserror404window-1014-southeast-handle" class="x-resizable-handle x-resizable-handle-southeast x-window-handle x-window-handle-southeast x-window-handle-southeast-br x-unselectable" unselectable="on" role="presentation"></div><div id="pageserror404window-1014-southwest-handle" class="x-resizable-handle x-resizable-handle-southwest x-window-handle x-window-handle-southwest x-window-handle-southwest-br x-unselectable" unselectable="on" role="presentation"></div></div>

  </div>
        <script language="javascript">
            var myMailTo = "mailto:shauna.hogan@pfizer.com?subject=Access Request: MetaData Tool&body=Please grant me access to the MetaData Tool. NTID: " + document.getElementById("UserNTID").innerHTML + "&cc=psiops@pfizer.com";

            document.getElementById("mailtolink").href = myMailTo;

</script>
  </form>
</body>
    
</html>