<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

define('OGP_FETCH_CONNECT_TIMEOUT_MS', 2000);
define('OGP_FETCH_TIMEOUT_MS', 8000);

function create_absolute_url($baseUrl, $candidateUrl)
{
    if ($candidateUrl === '') {
        return '';
    }

    if (preg_match('/^https?:\/\//i', $candidateUrl)) {
        return $candidateUrl;
    }

    if (strpos($candidateUrl, '//') === 0) {
        $baseParts = parse_url($baseUrl);
        $scheme = isset($baseParts['scheme']) ? $baseParts['scheme'] : 'https';
        return $scheme . ':' . $candidateUrl;
    }

    if (strpos($candidateUrl, 'data:') === 0) {
        return $candidateUrl;
    }

    $baseParts = parse_url($baseUrl);
    if ($baseParts === false || !isset($baseParts['scheme']) || !isset($baseParts['host'])) {
        return $candidateUrl;
    }

    $scheme = $baseParts['scheme'];
    $host = $baseParts['host'];
    $port = isset($baseParts['port']) ? ':' . $baseParts['port'] : '';
    $origin = $scheme . '://' . $host . $port;

    if (strpos($candidateUrl, '/') === 0) {
        return $origin . $candidateUrl;
    }

    $basePath = isset($baseParts['path']) ? $baseParts['path'] : '/';
    $baseDir = preg_replace('/\/[^\/]*$/', '/', $basePath);

    return $origin . $baseDir . $candidateUrl;
}

function fetch_html($url)
{
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT_MS, OGP_FETCH_CONNECT_TIMEOUT_MS);
    curl_setopt($ch, CURLOPT_TIMEOUT_MS, OGP_FETCH_TIMEOUT_MS);
    curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (compatible; TMU-IA-Site/1.0; +https://industrial-art.sd.tmu.ac.jp/)');
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language: ja,en-US;q=0.9,en;q=0.8'
    ));
    curl_setopt($ch, CURLOPT_ENCODING, '');

    $html = curl_exec($ch);
    $statusCode = curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
    $effectiveUrl = curl_getinfo($ch, CURLINFO_EFFECTIVE_URL);
    curl_close($ch);

    if ($html === false || $statusCode >= 400) {
        return array('', $url);
    }

    return array($html, $effectiveUrl ?: $url);
}

function find_first_image_candidate($xpath, $effectiveUrl)
{
    $queries = array(
        '//meta[@property="og:image"]/@content',
        '//meta[@property="og:image:secure_url"]/@content',
        '//meta[@name="twitter:image"]/@content',
        '//meta[@name="twitter:image:src"]/@content',
        '//article//img/@src',
        '//*[contains(@class, "article")]//img/@src',
        '//*[contains(@class, "main")]//img/@src',
        '//img/@src'
    );

    foreach ($queries as $query) {
        $nodes = $xpath->query($query);
        if (!$nodes) {
            continue;
        }

        foreach ($nodes as $node) {
            $value = trim($node->nodeValue);
            if ($value === '') {
                continue;
            }

            return create_absolute_url($effectiveUrl, $value);
        }
    }

    return '';
}

$url = isset($_GET['url']) ? trim($_GET['url']) : '';
$ogImage = '';

if ($url !== '' && filter_var($url, FILTER_VALIDATE_URL)) {
    list($html, $effectiveUrl) = fetch_html($url);

    if ($html !== '') {
        $doc = new DOMDocument();
        libxml_use_internal_errors(true);
        $doc->loadHTML($html);
        libxml_clear_errors();

        $xpath = new DOMXPath($doc);
        $ogImage = find_first_image_candidate($xpath, $effectiveUrl);
    }
}

echo json_encode(array('ogImage' => $ogImage));
?>
