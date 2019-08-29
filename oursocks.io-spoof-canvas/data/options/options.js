var background = (function () {
  var _tmp = {};
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    for (var id in _tmp) {
      if (_tmp[id] && (typeof _tmp[id] === "function")) {
        if (request.path === 'background-to-options') {
          if (request.method === id) _tmp[id](request.data);
        }
      }
    }
  });
  /*  */
  return {
    "receive": function (id, callback) {_tmp[id] = callback},
    "send": function (id, data) {chrome.runtime.sendMessage({"path": 'options-to-background', "method": id, "data": data})}
  }
})();

var connect = function (elem, pref) {
  var att = "value";
  if (elem) {
    if (elem.type === "checkbox") att = "checked";
    if (elem.localName === "span") att = "textContent";
    if (elem.localName === "select") att = "selectedIndex";
    /*  */
    var pref = elem.getAttribute("data-pref");
    background.send("get-storage", pref);
    elem.addEventListener("change", function () {
      background.send("change-storage", {"pref": pref, "value": this[att]});
    });
  }
  /*  */
  return {
    get value () {return elem[att]},
    set value (val) {
      if (elem.type === "file") return;
      elem[att] = val;
    }
  }
};

background.receive("set-storage", function (o) {if (window[o.pref]) window[o.pref].value = o.value});

var setFingerprintSeed = function(seed) {
  fingerprint_seed = Number(seed);

  chrome.storage.local.set({fingerprint_seed: fingerprint_seed}, function() {
    console.log('fingerprint_seed is set to: ' + fingerprint_seed);
  });

  document.querySelector("td[id='seed_value']").innerText = fingerprint_seed


  var prefs = document.querySelectorAll("*[data-pref]");
  [].forEach.call(prefs, function (elem) {
    var pref = elem.getAttribute("data-pref");
    window[pref] = connect(elem, pref);
  });
  /*  */
  window.removeEventListener("load", init, false);
} 

var init = function () {
  var url = new URL(window.location.href);
  var fingerprint_seed = url.searchParams.get("fingerprint_seed");

  if (!fingerprint_seed) {
    chrome.storage.local.get(['fingerprint_seed'], function(result) {
      fingerprint_seed = result.fingerprint_seed;

      if (!fingerprint_seed) {
        fingerprint_seed = 0.65678;
      }

      setFingerprintSeed(fingerprint_seed);
    });
  }
  else {
    setFingerprintSeed(fingerprint_seed);
  }
};

window.addEventListener("load", init, false);
