<html>
    <head>
        <title>File Content Manager</title>
        <style type='text/css'>
            .droppable-area {
                background: #08c;
                color: #fff;
                padding: 100px 0;
                text-align: center;
                height: 10vh;
                border: 5px dashed;
            }
            .droppable-area.dragover {
                background: #00CC71;
            }
            .titleBar {
                background: #3CB371;
                color: #fff;
                padding: 12px 0;
                display: inline-block;
                width: 100%;
            }
            .output{
                float: left;
                padding: 0 0 0 20px;
            }
            .controlsContainer{
                float: right;
                padding: 0 20px 0 0;
                visibility: hidden;
            }
            button{
                padding: 0 10px 0 0;
            }
            .tableContainer{
                overflow: auto;
                width: 100%;
                height: 400px;
                margin: 0 auto;
            }
            #table{
                width: 100%;
            }
            input[type='text']{
                width: 20vh;
                outline: none;
            }
            .tableHeader th{
                text-align: center;
            }
            th, td{
                width: 5%;
                text-align: center;
            }
        </style>
    </head>
    <body>
        <div class="titleBar">
            <div class="output"></div>
            <div class="controlsContainer">
                <button id="save" class="btn btn-default"><span class="glyphicon glyphicon-floppy-disk"></span> Save</button>
                <button id="export" class="btn btn-default"><span class="glyphicon glyphicon-floppy-save"></span> Export to JSON</button>
                <button id="addColumn" class="btn btn-default"><span class="glyphicon glyphicon-plus"></span> Add Column</button>
                <button id="addRow" class="btn btn-default"><span class="glyphicon glyphicon-plus"></span> Add Row</button>
            </div>
        </div>


        <br />
        
        <!-- Start Excel Table Template -->

        <div class="tableContainer">
            <form action="exportJson.php" method="post" id="form">
                <table border="1" id="table" class="table table-bordered" hidden>
                    <thead>
                        <tr class="tableHeader">
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="tableBody">
                            <td>
                                <input type="text" name="">
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>

        <!-- End Excel Table Template -->


        <div class='droppable-area'>
            <p>Drag files here or click to upload</p>
        </div>
        
        <br />
        <!--<a href="#" id="save"> Save! </a>-->
        
        <!-- Import jquery 3.2 -->
        <script src='js/jquery.3.2.min.js'></script>
        <!-- Import excel-dragdrop-reader.js  -->
        <script src='js/excel-dragdrop-reader.js'></script>
        <!-- Import Bootstrap Core CSS -->
        <link href="css/bootstrap.min.css" rel="stylesheet">
        <!-- Import custom CSS -->
        <!-- <link href="" rel="stylesheet"> -->

    </body>
</html>
