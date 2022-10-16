<?php

if (!defined("API"))
	exit();

// api/Login
if (!isset($_GET["action"]) || $_GET["action"] != "Login")
    return;

// Username and password...
$email = "user@bedrift5.d3-101.usn";
$password = "123";

// POST
if ($_SERVER["REQUEST_METHOD"] == "GET")
{

    $result["Email"] = $email;
    $result["Password"] = $password;
    
}

// POST
if ($_SERVER["REQUEST_METHOD"] == "POST")
{

    if ($data->Email != $email)
        return;

    if ($data->Password != $password)
        return;

    setcookie("IsLoggedIn", "true", time() + 3600);
    
}