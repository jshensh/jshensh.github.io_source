function isSupportFileApi() {
    if(window.File && window.FileList && window.FileReader && window.Blob) {
        return true;
    }
    return false;
}
function checkFileApi() {
    if(isSupportFileApi()) {
        alert('支持File Api!');
        return;
    }
    alert('不支持File Api!');
}
(function() {
var html = [];
function fileSelect1(e) {
    var files = this.files;
    for(var i = 0, len = files.length; i < len; i++) {
        var f = files[i];
        html.push(
            '',
                f.name + '(' + (f.type || "n/a") + ')' + ' - ' + f.size + 'bytes',
            ''
        );
    }
    document.getElementById('list1').innerHTML = html.join('');
}
if(isSupportFileApi()) {
    document.getElementById('file1').onchange = fileSelect1;
}
})();
(function() {
var html = [];
function dropHandler(e) {
    e.stopPropagation();
    e.preventDefault();
    var files = e.dataTransfer.files;
    for(var i = 0, len = files.length; i < len; i++) {
        var f = files[i];
        html.push(
            '',
                f.name + '(' + (f.type || "n/a") + ')' + ' - ' + f.size + 'bytes',
            ''
        );
    }
    document.getElementById('list2').innerHTML = html.join('');
}
function dragOverHandler(e) {
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dragEffect = 'copy';
}
if(isSupportFileApi()) {
    var drag = document.getElementById('drag');
    drag.addEventListener('drop', dropHandler, false);
    drag.addEventListener('dragover', dragOverHandler, false);
}
})();
(function() {
    function fileSelect2(e) {
        e = e || window.event;
        var files = this.files;
        var p = document.getElementById('preview2');
        for(var i = 0, f; f = files[i]; i++) {
            var reader = new FileReader();
            reader.onload = (function(file) {
                return function(e) {
                    var span = document.createElement('span');
                    span.innerHTML = '<img style="padding: 0 10px;" width="100" src="'+ this.result +'" alt="'+ file.name +'" />';
                    p.insertBefore(span, null);
                };
            })(f);
            //读取文件内容
            reader.readAsDataURL(f);
        }
    }
    if(isSupportFileApi()) {
        document.getElementById('files2').addEventListener('change', fileSelect2, false);
    }
})();
(function() {
function encodeHTML(source) {
    return source
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/, '&quote;')
            .replace(/'/, '&#39;');
};
function fileSelect3(e) {
    e = e || window.event;
    var files = this.files;
    var p = document.getElementById('preview3');
    for(var i = 0, f; f = files[i]; i++) {
        var reader = new FileReader();
        reader.onload = (function(file) {
            return function(e) {
                var div = document.createElement('div');
                div.className = "text"
                div.innerHTML = encodeHTML(this.result);
                p.insertBefore(div, null);
            };
        })(f);
        //读取文件内容
        reader.readAsText(f);
    }
}
if(isSupportFileApi()) {
    document.getElementById('files3').addEventListener('change', fileSelect3, false);
}
})();
(function() {
var input4 = document.getElementById('file4');
var bar = document.getElementById('progress-bar');
var progress = document.getElementById('progress');
function startHandler(e) {
    bar.style.display = 'block';
}
function progressHandler(e) {
    var percentLoaded = Math.round((e.loaded / e.total) * 100);
    if (percentLoaded < 100) {
        progress.style.width = percentLoaded + '%';
        progress.textContent = percentLoaded + '%';
    }
}
function loadHandler(e) {
    progress.textContent = '100%';
    progress.style.width = '100%';
}
function fileSelect4(e) {
    var file = this.files[0];
    if(!file) {
        alert('请选择文件！');
        return false;
    }
    if(file.size > 500 * 1024 * 1024) {
        alert('文件太大，请选择500M以下文件，防止浏览器崩溃！');
        return false;
    }
    progress.style.width = '0%';
    progress.textContent = '0%';
    var reader = new FileReader();
    reader.onloadstart = startHandler;
    reader.onprogress = progressHandler;
    reader.onload = loadHandler;
    reader.readAsBinaryString(file);
}
if(isSupportFileApi()) {
    input4.onchange = fileSelect4;
}
})();
(function() {
function readBlob(start, end) {
    var files = document.getElementById('file5').files;
    if(!files.length) {
        alert('请选择文件');
        return false;
    }
    var file = files[0],
        start = parseInt(start, 10) || 0,
        end = parseInt(end, 10) || (file.size - 1);
    var r = document.getElementById('range'),
        c = document.getElementById('content');
    var reader = new FileReader();
    reader.onloadend = function(e) {
        if(this.readyState == FileReader.DONE) {
            c.textContent = this.result;
            r.textContent = "Read bytes: " + (start + 1) + " - " + (end + 1) + " of " + file.size + " bytes";
        }
    };
    var blob;
    if(file.webkitSlice) {
        blob = file.webkitSlice(start, end + 1);
    } else if(file.mozSlice) {
        blob = file.mozSlice(start, end + 1);
    } else if(file.slice) {
        blob = file.slice(start, end + 1);
    }
    reader.readAsBinaryString(blob);
};
if(isSupportFileApi()) {
    document.getElementById('file5').onchange = function() {
        readBlob(10, 100);
    }
}
})();
(function() {
var bar2 = document.getElementById('progress-bar2');
var progress2 = document.getElementById('progress2');
var input6 = document.getElementById('file6');
var block = 1 * 1024 * 1024; // 1M
var file;
var fileLoaded;
var fileSize;
function readBlob2() {
    var blob;
    if(file.webkitSlice) {
        blob = file.webkitSlice(fileLoaded, fileLoaded + block + 1);
    } else if(file.mozSlice) {
        blob = file.mozSlice(fileLoaded, fileLoaded + block + 1);
    } else if(file.slice) {
        blob = file.slice(fileLoaded, fileLoaded + block + 1);
    } else {
        alert('不支持分段读取！');
        return false;
    }
    reader.readAsBinaryString(blob);
}
function loadHandler2(e) {
   fileLoaded += e.total;
   var percent = fileLoaded / fileSize;
   if(percent < 1)  {
       // 继续读取下一块
       readBlob2();
   } else {
       // 结束
       percent = 1;
   }
   percent = Math.ceil(percent * 100) + '%';
   progress2.innerHTML = percent;
   progress2.style.width = percent;
}
function fileSelect6(e) {
    file = this.files[0];
    if(!file) {
        alert('文件不能为空！');
        return false;
    }
    fileLoaded = 0;
    fileSize = file.size;
    bar2.style.display = 'block';
    readBlob2();
}
if(isSupportFileApi()) {
    var reader = new FileReader();
    reader.onload = loadHandler2;
    input6.onchange = fileSelect6
}
})();