<?php

define("API", 1);

header("Content-type: application/json; charset=UTF-8");

$data = json_decode(file_get_contents('php://input'));
$result = array();

require_once("Controllers/Home.php");
require_once("Controllers/Email.php");
require_once("Controllers/Login.php");

print(json_encode($result));