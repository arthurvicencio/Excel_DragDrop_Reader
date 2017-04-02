<?php

header('Content-Description: File Transfer');
header('Content-Disposition: attachment; filename="JSON.json"');
header('Expires: 0');
header('Cache-Control: must-revalidate');
header('Pragma: public');

function columnName($n) {
    $ordA = ord('A');
    $ordZ = ord('Z');
    $len = $ordZ - $ordA + 1;
  
    $s = "";
    while($n >= 0) {
        $s = chr($n % $len + $ordA) . $s;
        $n = floor($n / $len) - 1;
    }
    return $s;
}

$rowArray = current($_POST);
$rowKeys = array();

# Make Keys
foreach ($rowArray as $index => $row) {
    $rowKeys[] = columnName($index);
}

$json = array();
foreach ($_POST as $row) {
    $json[] = array_combine($rowKeys, $row);
}

echo json_encode($json, JSON_PRETTY_PRINT);
