// //////////////////////////////
// ///// Framework Code ///////
// //////////////////////////////

// var documentApi;
// var myDoc;
// var myDocId;

// function watchDocument(docref, OnUpdate) {
//     documentApi.watch(docref, function(updatedDocRef) {
//         if (docref != myDocId) {
//             console.log("Wrong document!!");
//         } else {
//             documentApi.get(docref, OnUpdate);
//         }
//     }, function(result) {
//         var timestamp = result.Expires;
//         var expires = timestamp - new Date().getTime();
//         var timeout = 0.8 * expires;
//         setTimeout(function() {
//             watchDocument(docref, OnUpdate);
//         }, timeout);
//     }, Error);
// }

// function initDocument() {
//     if (Omlet.isInstalled()) {
//         documentApi = Omlet.document;
//         _loadDocument();
//   } else {
//     var yjclient = YeouijuClient.getInstance();
//     yjclient.setPipelineProcessors();
//     documentApi = yjclient.document;
//     yjclient.ensureRegistration(function() {
//       yjclient.syncRealtime();
//       _loadDocument();
//     }, Error);
//   }
// }

// function hasDocument() {
//     var docIdParam = window.location.hash.indexOf("/docId/");
//     return (docIdParam != -1);
// }

// function getDocumentReference() {
//     var docIdParam = window.location.hash.indexOf("/docId/");
//     if (docIdParam == -1) return false;
//     var docId = window.location.hash.substring(docIdParam+7);
//     var end = docId.indexOf("/");
//     if (end != -1)
//         docId = docId.substring(0, end);
//     return docId;
// }

// function _loadDocument() {
//     if (hasDocument()) {
//         myDocId = getDocumentReference();
//         documentApi.get(myDocId, ReceiveUpdate);
//         watchDocument(myDocId, ReceiveUpdate);
//     } else {
//         documentApi.create(function(d) {
//             myDocId = d.Document;
//             location.hash = "#/docId/" + myDocId;
//             documentApi.update(myDocId, Initialize, InitialDocument(), function() {
//                 documentApi.get(myDocId, DocumentCreated);
//             }, function(e) {
//                 alert("error: " + JSON.stringify(e));
//             });
//             watchDocument(myDocId, ReceiveUpdate);
//         }, function(e) {
//             alert("error: " + JSON.stringify(e));
//         });
//     }
// }

// //////////////////////////////
// ///// Application Code ///////
// //////////////////////////////

// var share = function() {
//     var rdl = Omlet.createRDL({
//         noun: "list",
//         displayTitle: "My List",
//         displayThumbnailUrl: "http://web.stanford.edu/~emmas2/LARKLE/pics/toDo.jpg",
//         displayText: "Here is My List! Please add to it if you want!",
//         callback: encodeURI(window.location.href)
//     });
//     Omlet.exit(rdl);
// }

// function update() {
//     var val = [];
//     for (var i = 1; i <= 7; i++) {
//         var numlist = "#list" + i;
//         console.log($(numlist).text())
//         val.push($(numlist).text());
//     }
//     console.log(val);
//     return val;
// }

// // function Update(old, params) {
// //     for (int i = 0; i < 7; i++) {
// //         var numlist = "list" + i;
// //         console.log(numlist);
// //         console.log($(numlist.text));
// //         parmas[list[i]] = $(numlist).text;

// //     }
// // }

// Omlet.ready(function() {
//     if (hasDocument()) {
//       initDocument();
//     }
// });


//////////////////////////////
///// Framework Code ///////
//////////////////////////////

var documentApi;
var myDoc;
var myDocId;

function watchDocument(docref, OnUpdate) {
    documentApi.watch(docref, function(updatedDocRef) {
        if (docref != myDocId) {
            console.log("Wrong document!!");
        } else {
            documentApi.get(docref, OnUpdate);
        }
    }, function(result) {
        var timestamp = result.Expires;
        var expires = timestamp - new Date().getTime();
        var timeout = 0.8 * expires;
        setTimeout(function() {
            watchDocument(docref, OnUpdate);
        }, timeout);
    }, Error);
}

function initDocument() {
    if (Omlet.isInstalled()) {
        documentApi = Omlet.document;
        _loadDocument();
  } else {
    var yjclient = YeouijuClient.getInstance();
    yjclient.setPipelineProcessors();
    documentApi = yjclient.document;
    yjclient.ensureRegistration(function() {
      yjclient.syncRealtime();
      _loadDocument();
    }, Error);
  }
}

function hasDocument() {
    var docIdParam = window.location.hash.indexOf("/docId/");
    return (docIdParam != -1);
}

function getDocumentReference() {
    var docIdParam = window.location.hash.indexOf("/docId/");
    if (docIdParam == -1) return false;
    var docId = window.location.hash.substring(docIdParam+7);
    var end = docId.indexOf("/");
    if (end != -1)
        docId = docId.substring(0, end);
    return docId;
}

function _loadDocument() {
    if (hasDocument()) {
        myDocId = getDocumentReference();
        documentApi.get(myDocId, ReceiveUpdate);
        watchDocument(myDocId, ReceiveUpdate);
    } else {
        documentApi.create(function(d) {
            myDocId = d.Document;
            location.hash = "#/docId/" + myDocId;
            documentApi.update(myDocId, Initialize, InitialDocument(), function() {
                documentApi.get(myDocId, DocumentCreated);
            }, function(e) {
                alert("error: " + JSON.stringify(e));
            });
            watchDocument(myDocId, ReceiveUpdate);
        }, function(e) {
            alert("error: " + JSON.stringify(e));
        });
    }
}

//////////////////////////////
///// Application Code ///////
//////////////////////////////

var itemCount = 7;


/*** Call back methods that get passed to Omlet update method for updating the doc ***/

/***************************************/

//Set up what the doc looks like with some default values
function InitialDocument() {
    $("#app").html("");
    $("#app").append('<div class="container">
      <h1 contenteditable="true" id="title">My 7 Item List</h1>

      <div id="table" class="table-editable">
        <table class="table">
          <tr>
            <td contenteditable="true" id="list1">Item 1</td>
          </tr>
          <tr>
            <td contenteditable="true" id="list2">Item 2</td>
          </tr>
          <tr>
            <td contenteditable="true" id="list3">Item 3</td>
          </tr>
          <tr>
            <td contenteditable="true" id="list4">Item 4</td>
          </tr>
          <tr>
            <td contenteditable="true" id="list5">Item 5</td>
          </tr>
          <tr>
            <td contenteditable="true" id="list6">Item 6</td>
          </tr>
          <tr>
            <td contenteditable="true" id="list7">Item 7</td>
          </tr>
        </table>
      </div>');
    $("#app").append('<button type="button" onclick="myFunction()">Submit</div>
        <script>
        function myFunction() {
          var val = Update();
          for (var i = 1; i < 7; i++) {
            var numlist = "#list" + i;
            $(numlist).text(val[i-1]);
          }
        <script>');
    shareList();
}

function Update() {
    var items = [];
    for (var i = 1; i <= itemCount; i++) {
        var numlist = "#list" + i;
        items.push($(numlist).text());
    }

    var title = $('#title').text();

    var initValues = {
        'creator': Omlet.getIdentity(),
        'items': items,
        'title': title,
    };
    return initValues;
}
//After the doc has been created, create a Rich Deep Link(RDL) and post it back to Omlet chat
//...unless you're in a browser.
function DocumentCreated(doc) {
    if(Omlet.isInstalled()) {
        var rdl = Omlet.createRDL({
            appName: "MyQuikList",
            noun: "list",
            displayTitle: myquiklist,
            displayThumbnailUrl: "http://web.stanford.edu/~emmas2/LARKLE/pics/toDo.jpg",
            displayText: doc.list.title,
            json: doc.items
            callback: encodeURI(window.location.href)
          });
          Omlet.exit(rdl);
        }
    else {
        ReceiveUpdate(doc);
    }

}

//Check if the user has set a question and has at least 1 response option
//Then kick off the doc creation process
function shareList() {
    var need_write_q = i18n.t("Need_write_title");
    var need_write_o = i18n.t("Need_write_list_items");
    if($('textarea#mytitle').val().length == 0) {
        alert(need_write_q);
        return;
    }

    var count = 0;
    for(var i = 0; i < itemCount; i++) {
        var item = $('input[id=answer'+i+']').val();
        if(response.length > 0) {
            count++;
        }
    }
    if(count == 0) {
    alert(need_write_o);
    return;
    }

    initDocument();
}

function ReceiveUpdate(doc) {
    myDoc = doc;

    var title = myDoc.title;
    var items = myDoc.items;

    $("#app").html("");
    $("#app").append('<div class="container">
      <h1 contenteditable="true" id="title">'+title+'</h1>

      <div id="table" class="table-editable">
        <table class="table">
          <tr>
            <td contenteditable="true" id="list1">'+items[0]+'</td>
          </tr>
          <tr>
            <td contenteditable="true" id="list2">'+items[1]+'</td>
          </tr>
          <tr>
            <td contenteditable="true" id="list3">'+items[2]+'</td>
          </tr>
          <tr>
            <td contenteditable="true" id="list4">'+items[3]+'</td>
          </tr>
          <tr>
            <td contenteditable="true" id="list5">'+items[4]+'</td>
          </tr>
          <tr>
            <td contenteditable="true" id="list6">'+items[5]+'</td>
          </tr>
          <tr>
            <td contenteditable="true" id="list7">'+items[6]+'</td>
          </tr>
        </table>
      </div>');
    $("#app").append('<button type="button" onclick="myFunction()">Submit</div>
        function myFunction() {
          var val = Update();
          for (var i = 1; i < 7; i++) {
            var numlist = "#list" + i;
            $(numlist).text(val[i-1]);
          }');
    return Update();
}


//this is the entry point to your app, and is called by Omlet when it has finished loading it's stuff
Omlet.ready(function() {
    i18n.init(function(t) {
      $('.i18n-text').i18n();
      if (hasDocument()) {
        initDocument();
      }
      else {
        ShowEmptyQuestionForm();
      }
    });
});

