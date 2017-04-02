<html>
    <head>
        <title>File Content Manager</title>
        <style type='text/css'>
            .droppable-area {
                background: #08c;
                color: #fff;
                padding: 100px 0;
                text-align: center;
            }
            .droppable-area.dragover {
                background: #00CC71;
            }
            .tableContainer{
                overflow: scroll;
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
            th, td{
                width: 5%;
                text-align: center;
            }
        </style>
    </head>
    <body>
        <div class='droppable-area'>
            <p>Drag files here or click to upload</p>
        </div>
        <div class='output'></div>

        <br />
        <a href="#" id="save"> Save! </a>
        |
        <a href="getJson.php" id="export"> Export to JSON! </a>
        
        <!-- Start Excel Table Template -->

        <div class="tableContainer">
            <form action="" method="post" id="form">
                <table border="1" id="table" class="table table-bordered" hidden>
                    <tr id="tableHeader">
                        <th></th>
                    </tr>
                    <tr id="tableBody">
                        <td>
                            <input type="text" name="">
                        </td>
                    </tr>
                </table>
            </form>
        </div>

        <!-- End Excel Table Template -->

        <!-- Import jquery 3.2 -->
        <script src='JS/jquery.3.2.min.js'></script>
        <!-- Import excel-dragdrop-reader.js  -->
        <script src='JS/excel-dragdrop-reader.js'></script>
        <!-- Import Bootstrap Core CSS -->
        <link href="CSS/bootstrap.min.css" rel="stylesheet">
        <!-- Import custom CSS -->
        <!-- <link href="" rel="stylesheet"> -->

    </body>
</html>
