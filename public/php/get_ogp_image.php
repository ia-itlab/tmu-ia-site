<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$url = $_GET['url'];
$ogImage = '';

if ($url) {
    $html = @file_get_contents($url);

    if ($html !== false) {
        $doc = new DOMDocument();
        @$doc->loadHTML($html);
        $xpath = new DOMXPath($doc);
        $metaTags = $xpath->query('//meta[@property="og:image"]');

        if ($metaTags->length > 0) {
            $ogImage = $metaTags->item(0)->getAttribute('content');
        }
    }
}

echo json_encode(['ogImage' => $ogImage]);
?>
