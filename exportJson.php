<?php

header('Content-Description: File Transfer');
header('Content-Disposition: attachment; filename="test.json"');
header('Expires: 0');
header('Cache-Control: must-revalidate');
header('Pragma: public');

$letters = 65;
parse_str($_GET['file'], $formData);
$rowArray = current($formData);
$rowKeys = array();

# Make Keys
foreach ($rowArray as $row) {
    $rowKeys[] = chr($letters++);
}

$json = array();
foreach ($formData as $row) {
    $json[] = array_combine($rowKeys, $row);
}

echo json_encode($json, JSON_PRETTY_PRINT);
