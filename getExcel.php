<?php

header('Content-Description: File Transfer');
header('Content-Disposition: attachment; filename="'.basename($_GET['file']).'"');
header('Expires: 0');
header('Cache-Control: must-revalidate');
header('Pragma: public');
header('Content-Length: ' . filesize($_GET['file']));
readfile($_GET['file']);
unlink($_GET['file']);