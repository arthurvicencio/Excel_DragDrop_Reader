<?php

require_once 'PHP Excel/PHPExcel.php';

$time = time();
$file = $time . '.xlsx';

$objPHPExcel = new PHPExcel();
$dataArray = array_values($_POST);
$objPHPExcel->getActiveSheet()->fromArray($dataArray, NULL, 'A1');

$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
$objWriter->save($file);

echo $file;
