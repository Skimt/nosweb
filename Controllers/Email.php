<?php

if (!defined("API"))
    exit();

// api/Home
if (!isset($_GET["action"]) || $_GET["action"] != "Email")
    return;

// GET
if ($_SERVER["REQUEST_METHOD"] == "GET")
{

    $result = array(
        array("Sender"  => "a@b.c", "Title" => "Test1"),
        array("Sender"  => "a@b.c", "Title" => "Test2"),
        array("Sender"  => "a@b.c", "Title" => "Test3"),
        array("Sender"  => "a@b.c", "Title" => "Test4")
    );

    //imap_open();
    
}

// POST
if ($_SERVER["REQUEST_METHOD"] == "POST")
{

    $to      = $data->To;
    $subject = $data->Title;
    $message = $data->Content;
    $headers =  'From: ' . $data->From . "\r\n" .
                'Reply-To: ' . $data->From . "\r\n" .
                'X-Mailer: PHP/' . phpversion();

    if (mail($to, $subject, $message, $headers))
    {
        http_response_code(200);
    }
    else
    {
        http_response_code(503);
    }
    
}