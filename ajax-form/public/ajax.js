var container = document.getElementById('fileContainer');
var fileUpload = document.getElementById('fileUpload');
var result = document.getElementById('result');
var text = document.getElementsByClassName('text');
var messageBox = document.getElementById('messageBox');
var sub1 = document.getElementById('sub1');
var sub2 = document.getElementById('sub2');
var sub3 = document.getElementById('sub3');

//ajax snippets, copyed from http://stackoverflow.com/questions/8567114/how-to-make-an-ajax-call-without-jquery
var ajax = {};
ajax.x = function () {
    if (typeof XMLHttpRequest !== 'undefined') {
        return new XMLHttpRequest();
    }
    var versions = [
        "MSXML2.XmlHttp.6.0",
        "MSXML2.XmlHttp.5.0",
        "MSXML2.XmlHttp.4.0",
        "MSXML2.XmlHttp.3.0",
        "MSXML2.XmlHttp.2.0",
        "Microsoft.XmlHttp"
    ];

    var xhr;
    for (var i = 0; i < versions.length; i++) {
        try {
            xhr = new ActiveXObject(versions[i]);
            break;
        } catch (e) {
        }
    }
    return xhr;
};
ajax.send = function (url, callback, method, data, async) {
    if (async === undefined) {
        async = true;
    }
    var x = ajax.x();
    x.open(method, url, async);
    x.onreadystatechange = function () {
        if (x.readyState == 4) {
            if (x.status == 200)
                callback(x.responseText);
            else {
                callback(x.responseText);
                messageBox.innerHTML = "Error: " + x.status + "<br \/>";
            }
        }
    };
    if (method == 'POST') {
        x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    }
    x.send(data)
};
ajax.get = function (url, data, callback, async) {
    var query = [];
    for (var key in data) {
        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }
    ajax.send(url + (query.length ? '?' + query.join('&') : ''), callback, 'GET', null, async)
};
ajax.post = function (url, data, callback, async) {
    var query = [];
    for (var key in data) {
        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }
    ajax.send(url, callback, 'POST', query.join('&'), async)
};

function showMessage(form) {
    var message;
    if(form.elements[0].type=="text")
        message = form.elements[0].value;
    else {
        var path = form.elements[0].value;
        message = path.substring(path.lastIndexOf('\\')+1)
    };
    messageBox.innerHTML = '\"'+ message + '\"发送成功';
    messageBox.style.opacity = 1;
    messageBox.style.top = '10%';
    form.elements[0].value = '';
    form.elements[1].disabled = true;
    setTimeout('hideMessage()', 500);
};

function hideMessage() {
    messageBox.style.opacity = 0;
    messageBox.style.top = '5%';
};

var handeler = function (form) {
    var oData = form.elements[0].name == 'line'? {line: form.elements[0].value} : {tts: form.elements[0].value};
    ajax.post('', oData, function(item){
        showMessage(form);
    });
    return false;
};

var handeler2 = function(form) {
    console.log(document.forms[2]);
    console.log(form);
    var oData = new FormData(form);
    var oReq = new XMLHttpRequest();
    oReq.open("POST", "", true);
    oReq.onload = function(oEvent) {
        if (oReq.status == 200) {
            showMessage(form);
        } else {
            showMessage(form);
            messageBox.innerHTML = "Error: " + oReq.status + "<br \/>";
        }
    };
    oReq.send(oData);
    return false;
};

sub1.disabled = true;
sub2.disabled = true;
sub3.disabled = true;
container.onchange = function(){
    if(!fileUpload.value) {
        result.innerHTML = 'no file chosen';
        return;
    }
    var path = fileUpload.value;

    //get the file name to show
    if(path.indexOf('\\'))
        var fileName = path.substring(path.lastIndexOf('\\')+1);
    else if(path.indexOf('\/'))
        var fileName = path.substring(path.lastIndexOf('\/')+1);
    else
        alert('wrong input');

    //get the type of the file
    var end = path.substring(path.lastIndexOf('\.')+1);
    if(end !== 'pdf') {
        result.innerHTML = fileName;
        result.style.color = 'red';
        sub2.disabled = true;
        alert(' pdf only!!!');
        return;
    } else {
        result.innerHTML = fileName;
        result.style.color = '#999';
        sub2.disabled = false;
    }
};
text[0].oninput = function() {
    sub1.disabled = text[0].value ? false : true;
};
text[1].oninput = function() {
    sub3.disabled = text[1].value ? false : true;
};
