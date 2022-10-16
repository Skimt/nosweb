<?php

if (!defined("API"))
    exit();

// api/Home
if (!isset($_GET["action"]) || $_GET["action"] != "Home")
    return;

// GET
if ($_SERVER["REQUEST_METHOD"] == "GET")
{
    
    $result = "Hello, this is the home page!";

}

// POST
if ($_SERVER["REQUEST_METHOD"] == "POST")
{
    
}

// PUT
if ($_SERVER["REQUEST_METHOD"] == "PUT")
{
    
}

// POST
if ($_SERVER["REQUEST_METHOD"] == "DELETE")
{
    
}