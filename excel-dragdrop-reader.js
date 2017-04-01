(function(window) {
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

    function makeAjax(data) {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          document.write(this.responseText);
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
    window.makeDroppable = makeDroppable;
    window.makeAjax = makeAjax;
  })(this);
  (function(window) {
    makeDroppable(window.document.querySelector('.droppable-area'), function(files) {
      var reader = new FileReader();

      reader.onload = function(e) {
        makeAjax(e.target.result);
        console.log(e.target.result);
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
  })(this);