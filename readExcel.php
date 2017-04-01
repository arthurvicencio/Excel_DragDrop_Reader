<?php

require_once 'PHP Excel/PHPExcel.php';

$time = time();
$file = $time . '.xlsx';

// $postdata = file_get_contents("php://input");
file_put_contents($file, base64_decode(str_replace(' ', '+', $_POST['file'])));
$objPHPExcel = PHPExcel_IOFactory::load($file);
unlink($file);

$sheetData = $objPHPExcel->getActiveSheet()->toArray(null,true,true,true);

$letters = array_keys($sheetData[1]);
$values = array_map('array_values', $sheetData);
$sheetData = array_merge([$letters], $values);

echo json_encode($sheetData);
