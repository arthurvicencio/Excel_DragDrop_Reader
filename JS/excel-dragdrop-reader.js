(function(window) {

    /* Cache DOM */
    var $tableHeaderCell = $('#tableHeader').children();
    var $tableBodyCell   = $('#tableBody').children();
    var $tableHeader     = $('#tableHeader').html('');
    var $tableBody       = $('#tableBody').html('');
    var $tableTemplate   = $('#table').html('');
    var $form            = $('#form');
    var $saveButton      = $('#save');

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

    function makeAjax(url, data, callback = null) {
        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                if (callback !== null) {                
                    callback(this.responseText);
                }
            }
        };

        xhttp.open("POST", url, true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(data);
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

    function writeResponse(response) {
        var responseJson = JSON.parse(response);
        var loopEnd = responseJson.length;
        $tableTemplate.html('');
        
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
        var $header = $tableHeader.clone();
        var loopEnd = data.length;
        for (var i = 0; i < loopEnd; i++) {
            var $cell = $tableHeaderCell.clone();
            $cell.html(data[i]);
            $header.append($cell);
        }

        return $header;

    }

    function makeBody(data, rowNumber) {
        var $header = $tableBody.clone();
        var loopEnd = data.length;
        for (var i = 0; i < loopEnd; i++) {
            var $cell = $tableBodyCell.clone();
            $cell.find('input').attr('name', 'cell' + rowNumber + '[]').val(data[i]);
            $header.append($cell);
        }

        return $header;
    }

    function saveExcel() {
        var data = $form.serialize();

        makeAjax('saveExcel.php', data, function(response) {
            window.location.href = 'getExcel.php?file=' + response;
        });

        event.preventDefault();
    }


    window.makeDroppable = makeDroppable;
    window.makeAjax = makeAjax;
    window.writeResponse = writeResponse;
    window.bindEvent = function() {
        $saveButton.click(saveExcel);
    };

})(this);

(function(window) {

    makeDroppable(window.document.querySelector('.droppable-area'), function(files) {
        var reader = new FileReader();

        reader.onload = function(e) {
            var data = 'file=' + e.target.result.match(/,(.*)$/)[1];
            makeAjax('readExcel.php', data, writeResponse);
        };

        reader.readAsDataURL(files[0]);

        var output = document.querySelector('.output');
        output.innerHTML = '';
        for(var i=0; i<files.length; i++) {
            if(files[i].type.indexOf('image/') === 0) {
                output.innerHTML += '<img width="200" src="' + URL.createObjectURL(files[i]) + '" />';
            }
            output.innerHTML += '<p>'+files[i].name+'</p>';
        }
    });

    bindEvent();

})(this);