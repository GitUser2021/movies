<?php

define("URL_API", "http://www.omdbapi.com/?");
define("API_KEY", "apikey=xxx");

$titulo = $_GET['pelicula'];

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, URL_API . API_KEY . '&s=' . $titulo);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLINFO_HEADER_OUT, true);
$result = curl_exec($ch);
$info = curl_getinfo($ch);
if ($info["http_code"] == 200) {
    echo($result);
    $movie = json_decode($result, true);
}
curl_close($ch);
