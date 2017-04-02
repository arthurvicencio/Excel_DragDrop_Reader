<?php

require_once 'PHP Excel/PHPExcel.php';

$base64 = base64_decode(str_replace(' ', '+', $_POST['file']));

if ($_POST['extension'] === 'json') {
	$sheetData = json_decode($base64, true);
} else if (in_array($_POST['extension'], array('xls', 'xlsx'))) {
	$time = time();
	$file = $time . $_POST['extension'];

	file_put_contents($file, $base64);
	$objPHPExcel = PHPExcel_IOFactory::load($file);
	unlink($file);

	$sheetData = $objPHPExcel->getActiveSheet()->toArray(null,true,true,true);
} else {
	echo 'Error!.';
}

$letters = array_keys($sheetData[1]);
$values = array_map('array_values', $sheetData);
$sheetData = array_merge([$letters], $values);

echo json_encode($sheetData);
