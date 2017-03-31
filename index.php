<?php 
    echo("
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
                
                <!-- Import excel-dragdrop-reader.js  -->
                <script src='excel-dragdrop-reader.js'></script>

            </body>
        </html>
    ");
?>