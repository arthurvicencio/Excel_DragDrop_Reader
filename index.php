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
        </style>
    </head>
    <body>
        <div class='droppable-area'>
            <p>Drag files here or click to upload</p>
        </div>
        <div class='output'></div>

        <br />
        <a href="#" id="save"> Save! </a>
        
        <!-- Start Excel Table Template -->
        <form action="" method="post" id="form">
            <table border="1" id="table" hidden>
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

        <!-- End Excel Table Template -->
        <!-- Import jquery 3.2 -->
        <script src='JS/jquery.3.2.min.js'></script>
        <!-- Import excel-dragdrop-reader.js  -->
        <script src='JS/excel-dragdrop-reader.js'></script>

    </body>
</html>
