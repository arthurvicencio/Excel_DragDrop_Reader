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
$col = count($letters);

$return = '<table border="1"><tr>';

foreach ($letters as $letter)
	$return.= '<td>' . $letter . '</td>';

$return.= '</tr>';

foreach ($sheetData as $value) {
	$return.= '<tr>';
	foreach ($value as $cell) {
		$return.= '<td>' . $cell . '</td>';
	}
	$return.= '</tr>';
}

$return.= '</table>';


echo $return;