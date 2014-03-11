var data = require("sdk/self").data;
var widgets = require("sdk/widget");
var tabs = require("sdk/tabs");
var pageMod = require("sdk/page-mod");

var widget = widgets.Widget({
  id: "OpenSpritz",
  label: "OpenSpritz this!",
  contentURL: data.url("icon.png"),
  //contentURL: "http://www.mozilla.org/favicon.ico",
  onClick: function() {
    var url = tabs.activeTab.url;

    var pm = pageMod.PageMod({
      include: url,
      attachTo: ["existing", "top"],
      contentStyleFile: data.url("style.css"),
      contentScriptFile: data.url("spritz.js"),
      onAttach: function(worker) {
        var html_data = data.load("spritz.html");
        worker.port.emit("createSpritz", html_data);

        worker.port.on("hideIt", function(){
          pm.destroy();
        });
      }
    });

  }
});
