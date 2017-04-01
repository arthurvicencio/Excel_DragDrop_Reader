(function(window) {

    /* Cache DOM Templates */
    var $tableHeaderCell = $('#tableHeader').children();
    var $tableBodyCell   = $('#tableBody').children();
    var $tableHeader     = $('#tableHeader').html('');
    var $tableBody       = $('#tableBody').html('');
    var $tableTemplate   = $('#table').html('');
    var $tableCellHeaders = genCellHeadersArray('a', 'z');

    function triggerCallback(e, callback) {
        if(!callback || typeof callback !== 'function') {
            return;
        }
        var files;
        //Eto yung event man pag drinop yung file sa .droppable-area
        if(e.dataTransfer) {
            files = e.dataTransfer.files;
        }
        //Eto naman yung event kung by browsing ang event
        else if(e.target) {
            files = e.target.files;
        }
        callback.call(null, files);
    }

    function makeAjax(data, callback) {
        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                callback(this.responseText);
            }
        };

        xhttp.open("POST", "readExcel.php", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("file="+data.match(/,(.*)$/)[1]);
    }
    //Nothing special here man, more on UI handlers lang to..
    function makeDroppable(ele, callback) {
        var input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('multiple', true);
        input.style.display = 'none';

        input.addEventListener('change', function(e) {
            triggerCallback(e, callback);
        });
        ele.appendChild(input);

        ele.addEventListener('dragover', function(e) {
            e.preventDefault();
            e.stopPropagation();
            ele.classList.add('dragover');
        });

        ele.addEventListener('dragleave', function(e) {
            e.preventDefault();
            e.stopPropagation();
            ele.classList.remove('dragover');
        });

        ele.addEventListener('drop', function(e) {
            e.preventDefault();
            e.stopPropagation();
            ele.classList.remove('dragover');
            triggerCallback(e, callback);
        });

        ele.addEventListener('click', function() {
            input.value = null;
            input.click();
        });
    }

    function genCellHeadersArray(firstChar, limitChar) {
    var letters = [], i = firstChar.charCodeAt(0), j = limitChar.charCodeAt(0);
    for (; i <= j; ++i) {
        letters.push(String.fromCharCode(i));
    }
    return letters;
}

    function writeResponse(response) {
        var responseJson = JSON.parse(response);
        var loopEnd = responseJson.length;

        for (var i = 0; i < loopEnd; i++) {
            
            if (i === 0) {
                var $row = makeHeader(responseJson[i]);
            } else {
                var $row = makeBody(responseJson[i], i);
            }

            $tableTemplate.append($row);
        }

        $tableTemplate.show();
    }

    function makeHeader(data) {
        var $theader = $tableHeader.clone();
        //var loopEnd = data.length;
        for (var i = 0; i < $tableCellHeaders.length; i++) {
            if(i == 0){
                var $cell = $tableHeaderCell.clone();
                $cell.html('&nbsp;');
                $theader.append($cell);
                console.log(data[i]);
            }

            var $cell = $tableHeaderCell.clone();
            $cell.html($tableCellHeaders[i].toUpperCase());
            $theader.append($cell);
            console.log(data[i]);
        }

        return $theader;

    }

    function makeBody(data, index) {
        var $tbody = $tableBody.clone();
        //var $saveBtn = $('<input type="submit" value="Save" />').html();
        //var loopEnd = data.length;
        for (var i = 0; i < $tableCellHeaders.length; i++) {
            var $cell = $tableBodyCell.clone();
            
            if(i == 0){
                //$cell.find('span').text(index);
                $tbody.append('<td>'+index+'</td>');
            }

            $cell.find('input').val(data[i]);
            $tbody.append($cell);
        }

        return $tbody;
    }

    window.makeDroppable = makeDroppable;
    window.makeAjax = makeAjax;
    window.writeResponse = writeResponse;

})(this);

(function(window) {

    makeDroppable(window.document.querySelector('.droppable-area'), function(files) {
        var reader = new FileReader();

        reader.onload = function(e) {
            makeAjax(e.target.result, writeResponse);
        };

        reader.readAsDataURL(files[0]);

        var output = document.querySelector('.output');
        output.innerHTML = '';
        for(var i=0; i<files.length; i++) {
            if(files[i].type.indexOf('image/') === 0) {
                output.innerHTML += '<img width="200" src="' + URL.createObjectURL(files[i]) + '" />';
            }
            output.innerHTML += '<h4>'+files[i].name+'<h4>';
        }
    });
})(this);