var card_data = [];
var rendered_card_count = 0;
var msnry_topics = null;
var load_more_observer = null;

const INITIAL_CARD_COUNT = 5;
const LOAD_MORE_COUNT = 5;
const SCRAPE_REQUEST_TIMEOUT_MS = 10000;
const SCRAPE_UPSTREAM_TIMEOUT_MS = 8000;
const SD_NEWS_REQUEST_TIMEOUT_MS = 10000;
const SD_NEWS_UPSTREAM_TIMEOUT_MS = 8000;
const FALLBACK_CARD_IMAGE_URL = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675"><rect width="1200" height="675" fill="#eceae4"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#5f5b52" font-family="sans-serif" font-size="48">No image available</text></svg>');

function showTopicsLoading() {
    removeTopicsLoading();

    let topics = document.getElementById('topics');
    let loading = document.createElement('div');
    loading.id = 'topics-loading';
    loading.classList.add('topics-loading', 'fadeIn');
    loading.innerHTML = `
        <div class="topics-loading__panel">
            <div class="topics-loading__icon" aria-hidden="true">
                <span class="topics-loading__dot"></span>
                <span class="topics-loading__dot"></span>
                <span class="topics-loading__dot"></span>
            </div>
            <p class="topics-loading__title">Loading topics</p>
            <p class="topics-loading__caption">最新の話題を集めています</p>
        </div>
    `;
    topics.appendChild(loading);
}

function removeTopicsLoading() {
    let loading = document.getElementById('topics-loading');
    if (loading) {
        loading.remove();
    }
}

function requestText(url, timeoutMs) {
    return new Promise(function (resolve, reject) {
        let requestTimeoutMs = typeof timeoutMs === 'number' ? timeoutMs : SCRAPE_REQUEST_TIMEOUT_MS;
        let controller = new AbortController();
        let timeoutId = window.setTimeout(function () {
            controller.abort();
        }, requestTimeoutMs);

        fetch(url, {
            method: 'GET',
            signal: controller.signal
        })
            .then(function (response) {
                window.clearTimeout(timeoutId);

                if (!response.ok) {
                    throw new Error('Request failed: ' + response.status + ' ' + url);
                }

                return response.text();
            })
            .then(function (text) {
                resolve(text);
            })
            .catch(function (error) {
                window.clearTimeout(timeoutId);

                if (error.name === 'AbortError') {
                    reject(new Error('Request timed out after ' + requestTimeoutMs + 'ms: ' + url));
                    return;
                }

                if (error.message && error.message.indexOf('Request failed:') === 0) {
                    reject(error);
                    return;
                }

                reject(new Error('Network error: ' + url));
            });
    });
}

function buildScrapeUrl(url, regexp, timeoutMs) {
    let params = new URLSearchParams({
        regexp: regexp,
        url: url
    });

    if (typeof timeoutMs === 'number') {
        params.set('timeout_ms', timeoutMs.toString());
    }

    return './php/scrape.php?' + params.toString();
}

function requestScrapedText(url, regexp, options) {
    let requestOptions = options || {};
    let requestTimeoutMs = typeof requestOptions.requestTimeoutMs === 'number'
        ? requestOptions.requestTimeoutMs
        : SCRAPE_REQUEST_TIMEOUT_MS;
    let upstreamTimeoutMs = typeof requestOptions.upstreamTimeoutMs === 'number'
        ? requestOptions.upstreamTimeoutMs
        : SCRAPE_UPSTREAM_TIMEOUT_MS;

    return requestText(buildScrapeUrl(url, regexp, upstreamTimeoutMs), requestTimeoutMs);
}

function parseTopicCardData(lis) {
    if (lis.length === 5) {
        return {
            title: lis[0].querySelector('div').innerHTML.trimStart(),
            image: lis[1].querySelector('div').querySelector('a').href,
            abstract: lis[2].querySelector('div').innerHTML.trimStart(),
            date: lis[3].querySelector('div').innerHTML.trimStart(),
            link: lis[4].querySelector('div').querySelector('a').href
        };
    }

    if (lis.length === 4) {
        return {
            title: lis[0].querySelector('div').innerHTML.trimStart(),
            image: 'noimage',
            abstract: lis[1].querySelector('div').innerHTML.trimStart(),
            date: lis[2].querySelector('div').innerHTML.trimStart(),
            link: lis[3].querySelector('div').querySelector('a').href
        };
    }

    return null;
}

function parseTopicCardsFromHtml(html) {
    let container = document.createElement('div');
    container.innerHTML = html;
    let parsedCards = [];
    var ols = container.querySelectorAll('ol.fix-media-list-overlap');

    for (ol of ols) {
        let lis = ol.querySelectorAll('li');
        let parsedCard = parseTopicCardData(lis);
        if (parsedCard) {
            parsedCards.push(parsedCard);
        }
    }

    return parsedCards;
}

function parseSdNewsCardsFromHtml(html) {
    let container = document.createElement('div');
    container.innerHTML = html;
    let parsedCards = [];
    var lists = container.querySelectorAll('li');

    for (list of lists) {
        let desc = list.querySelector('p.desc');
        let headline = list.querySelector('h3 a');
        let date = list.querySelector('div.head span.date');

        if (!desc || !headline || !date) {
            continue;
        }

        if (desc.innerHTML.indexOf('インダストリアルアート') >= 0) {
            parsedCards.push({
                title: headline.innerHTML.trimStart(),
                image: 'noimage',
                abstract: headline.innerHTML.trimStart() + ' ' + desc.innerHTML,
                link: headline.href.replace(/http.*news/u, 'https://www.sd.tmu.ac.jp/news'),
                date: date.innerHTML.trimStart()
            });
        }
    }

    return parsedCards;
}

function extractPlainText(html) {
    let container = document.createElement('div');
    container.innerHTML = html;
    return (container.textContent || '').trim();
}

function copyTextToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
        return navigator.clipboard.writeText(text);
    }

    return new Promise(function (resolve, reject) {
        let textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();

        try {
            document.execCommand('copy');
            resolve();
        }
        catch (error) {
            reject(error);
        }
        finally {
            textarea.remove();
        }
    });
}

function openShareWindow(url) {
    window.open(url, '_blank', 'noopener,noreferrer');
}

function createShareButton(className, label, svgMarkup, onClick) {
    let button = document.createElement('button');
    button.type = 'button';
    button.className = 'topic-share-button ' + className;
    button.setAttribute('aria-label', label);
    button.title = label;
    button.innerHTML = svgMarkup;
    button.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        onClick();
    });
    return button;
}

function createCardLink(link, title) {
    let a_link = document.createElement('a');
    a_link.href = link;
    a_link.target = '_blank';
    a_link.rel = 'noopener noreferrer';
    a_link.classList.add('stretched-link', 'topic-card-link');
    a_link.setAttribute('aria-label', title);
    return a_link;
}

function createXShareButton(shareText, link) {
    return createShareButton(
        'topic-share-button-x',
        'Xで共有',
        `<svg width="1em" height="1em" viewBox="0 0 1200 1227" fill="currentColor" class="bi bi-twitter" xmlns="http://www.w3.org/2000/svg">
            <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" />
        </svg>`,
        function () {
            openShareWindow('https://twitter.com/intent/tweet?text=' + encodeURIComponent(shareText) + '&url=' + encodeURIComponent(link));
        }
    );
}

function createGeneralShareButton(title, shareText, link) {
    return createShareButton(
        'topic-share-button-general',
        '共有',
        `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" class="bi bi-share" viewBox="0 0 16 16">
            <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M11 2.5a2.5 2.5 0 1 1 .628 1.651l-6.34 3.168a2.5 2.5 0 0 1 0 1.362l6.34 3.168a2.5 2.5 0 1 1-.447.894l-6.34-3.168a2.5 2.5 0 1 1 0-3.15l6.34-3.168A2.5 2.5 0 0 1 11 2.5"/>
        </svg>`,
        async function () {
            try {
                if (navigator.share) {
                    await navigator.share({
                        title: title,
                        text: shareText,
                        url: link
                    });
                    return;
                }

                await copyTextToClipboard(link);
                window.alert('このブラウザでは共有項目を開けないため、リンクをコピーしました。必要な共有先に貼り付けてください。');
            }
            catch (error) {
                if (error && error.name === 'AbortError') {
                    return;
                }

                console.error('Share failed:', error);
            }
        }
    );
}

function shouldProxyImageUrl(imageUrl) {
    try {
        let parsedUrl = new URL(imageUrl, window.location.href);
        return parsedUrl.hostname === 'industrial-art.sd.tmu.ac.jp'
            || parsedUrl.hostname === 'www.sd.tmu.ac.jp'
            || parsedUrl.hostname === 'sd.tmu.ac.jp';
    }
    catch (error) {
        return false;
    }
}

function buildImageProxyUrl(imageUrl) {
    return './php/image_proxy.php?url=' + encodeURIComponent(imageUrl);
}

function getDisplayImageUrl(imageUrl) {
    if (shouldProxyImageUrl(imageUrl)) {
        return buildImageProxyUrl(imageUrl);
    }

    return imageUrl;
}

function generateCard(count_ol, _card, msnry_topics) {
    let cd = _card;
    let title = cd.title;
    let image = cd.image;
    let abstract = cd.abstract;
    let date = cd.date;
    let link = cd.link;
    let plainTitle = extractPlainText(title);
    let shareText = extractPlainText(abstract);

    var col = document.createElement('div');
    col.style.display = 'block'
    if (count_ol == 0) {
        col.classList.add('col-12', 'col-lg-8', 'mt-3', 'grid-item');
    }
    else {
        col.classList.add('col-12', 'col-md-6', 'col-lg-4', 'mt-3', 'grid-item');
    }

    // col -> card -> card-body
    document.getElementById('topics').appendChild(col);
    let card = document.createElement('div');

    card.classList.add('card', 'position-relative');
    card.style.backgroundColor = 'transparent';
    card.style.borderColor = 'black';

    //card.innerHTML = 'card';
    let card_body = document.createElement('div');
    card_body.classList.add('card-body');
    card.appendChild(card_body);

    if (cd.image === 'noimage') {
        // OGPイメージがある場合に取得
        fetchOgpImage(cd.link)
            .then(ogImage => {
                cd.image = ogImage;
                addImageToCard(cd.image, count_ol, card, card_body, msnry_topics);
            })
            .catch(error => {
                console.error('エラー:', error);
            });
    }
    else {
        addImageToCard(cd.image, count_ol, card, card_body, msnry_topics);
    }
    card.appendChild(card_body);
    col.appendChild(card);

    // console.log(lis);
    let h5_card_title = document.createElement('h5');
    h5_card_title.classList.add('card-title');
    let title_text = document.createElement('span');
    title_text.classList.add('topic-card-title-text');
    title_text.innerHTML = title;
    h5_card_title.appendChild(title_text);

    let share_actions = document.createElement('span');
    share_actions.classList.add('topic-share-actions');
    share_actions.appendChild(createXShareButton(shareText, link));
    share_actions.appendChild(createGeneralShareButton(plainTitle, shareText, link));
    h5_card_title.appendChild(share_actions);
    card_body.appendChild(h5_card_title);

    let p_card_text = document.createElement('p');
    p_card_text.classList.add('card-text');
    p_card_text.innerHTML = cd.abstract;
    card_body.appendChild(p_card_text);

    let p_card_text_date = document.createElement('p');
    p_card_text_date.classList.add('card-text', 'text-muted');
    p_card_text_date.innerHTML = cd.date;
    card_body.appendChild(p_card_text_date);

    card_body.appendChild(createCardLink(cd.link, plainTitle));

    msnry_topics.appended(col);
    count_ol++;
}

function initializeMasonry() {
    var elem_topics = document.querySelector('#topics');
    var grid_sizer = document.createElement('div');
    grid_sizer.classList.add('col-12', 'col-md-6', 'col-lg-4', 'grid-sizer');
    grid_sizer.setAttribute('aria-hidden', 'true');
    elem_topics.appendChild(grid_sizer);

    msnry_topics = new Masonry(elem_topics, {
        // options
        columnWidth: '.grid-sizer',
        itemSelector: '.grid-item',
        gutter: 0,
        percentPosition: true,
        originLeft: true,
    });
}

function renderNextCards(count) {
    removeTopicsLoading();

    if (!msnry_topics) {
        initializeMasonry();
    }

    let nextCount = Math.min(rendered_card_count + count, card_data.length);
    for (let index = rendered_card_count; index < nextCount; index++) {
        generateCard(index, card_data[index], msnry_topics);
    }

    rendered_card_count = nextCount;
    return rendered_card_count < card_data.length;
}

function removeLoadMoreSentinel() {
    let sentinel = document.getElementById('topics-load-more-sentinel');
    if (sentinel) {
        sentinel.remove();
    }
}

function setupInfiniteScroll() {
    removeLoadMoreSentinel();

    if (load_more_observer) {
        load_more_observer.disconnect();
        load_more_observer = null;
    }

    if (rendered_card_count >= card_data.length) {
        return;
    }

    let sentinel = document.createElement('div');
    sentinel.id = 'topics-load-more-sentinel';
    sentinel.style.width = '100%';
    sentinel.style.height = '1px';
    document.getElementById('contents').appendChild(sentinel);

    load_more_observer = new IntersectionObserver(function (entries) {
        if (!entries[0].isIntersecting) {
            return;
        }

        let hasMore = renderNextCards(LOAD_MORE_COUNT);
        if (!hasMore) {
            removeLoadMoreSentinel();
            load_more_observer.disconnect();
            load_more_observer = null;
        }
    }, {
        root: null,
        rootMargin: '0px 0px 200px 0px',
        threshold: 0
    });

    load_more_observer.observe(sentinel);
}

window.onload = function () {
    initLanguage();


    async function iaInfoCollection() {
        showTopicsLoading();


        // https://industrial-art.sd.tmu.ac.jp/wiki/doku.php?id=website:announce を確認して、trueならばmodalに表示する
        let result = false;
        try {
            var url = 'https://industrial-art.sd.tmu.ac.jp/wiki/doku.php?id=website:announce';
            var regexp = '@<!-- CONTENT -->(.*?)<!-- \/CONTENT -->@s';
            var replace = 'announce';
            var data = await requestScrapedText(url, regexp);
            var elem = document.getElementById(replace);
            let str = data;
            result = str.includes('show:true');

            if (str.includes('https://industrial-art.sd.tmu.ac.jp')) {
                data = data.replace(/https:\/\/industrial-art.sd.tmu.ac.jp/g, './php/image_proxy.php?url=https://industrial-art.sd.tmu.ac.jp');
            }

            elem.innerHTML += data;
        }
        catch (error) {
            console.error('announce fetch failed:', error);
        }
        {
            if (result == true) {
                setTimeout(function () {
                    let announceModal = document.getElementById('modal_announce');

                    if (!announceModal || !window.bootstrap || !window.bootstrap.Modal) {
                        return;
                    }

                    bootstrap.Modal.getOrCreateInstance(announceModal).show();
                }, 3000)
            }
        }

        let results = await Promise.allSettled([
            requestScrapedText('https://industrial-art.sd.tmu.ac.jp/wiki/doku.php?id=website:topics', '@<!-- CONTENT -->(.*?)<!-- \/CONTENT -->@s'),
            requestScrapedText('https://industrial-art.sd.tmu.ac.jp/wiki/doku.php?id=website:topics:archives', '@<!-- CONTENT -->(.*?)<!-- \/CONTENT -->@s'),
            requestScrapedText('https://www.sd.tmu.ac.jp/news.html', '@<li class="informationRow age202(?:.*?)>(.*?)</li>@s', {
                requestTimeoutMs: SD_NEWS_REQUEST_TIMEOUT_MS,
                upstreamTimeoutMs: SD_NEWS_UPSTREAM_TIMEOUT_MS
            })
        ]);

        if (results[0].status === 'fulfilled') {
            card_data = card_data.concat(parseTopicCardsFromHtml(results[0].value));
        }
        else {
            console.error('topics fetch failed:', results[0].reason);
        }

        if (results[1].status === 'fulfilled') {
            card_data = card_data.concat(parseTopicCardsFromHtml(results[1].value));
        }
        else {
            console.error('topics archives fetch failed:', results[1].reason);
        }

        if (results[2].status === 'fulfilled') {
            card_data = card_data.concat(parseSdNewsCardsFromHtml(results[2].value));
        }
        else {
            console.error('sd news fetch failed:', results[2].reason);
        }


        // ここまでで、card_dataに必要な情報がはいる
        card_data = card_data.sort(function (a, b) {
            return (a.date > b.date) ? -1 : 1;
        });

        loadFont();
        renderNextCards(INITIAL_CARD_COUNT);
        setupInfiniteScroll();

        if (card_data.length === 0) {
            removeTopicsLoading();
        }
    }


    iaInfoCollection();

    return;

}


// function addImageToCard(imageUrl, count_ol, card, card_body, msnry_topics) {
//     let img_card = document.createElement('img');
//     img_card.classList.add('card-img-top');
//     if (count_ol === 0) {
//         img_card.classList.add('colored');
//     }
//     img_card.style.visibility = 'hidden';
//     let element_loading = createIALoadingElement();

//     img_card.onload = function () {
//         element_loading.remove();
//         img_card.style.visibility = 'visible';
//         img_card.classList.add('fadeIn');
//         msnry_topics.layout();
//     };
//     card.insertBefore(element_loading, card_body);
//     img_card.src = imageUrl;
//     card.insertBefore(img_card, card_body);
// }
function addImageToCard(imageUrl, count_ol, card, card_body, msnry_topics) {
    let img_card = document.createElement('img');
    img_card.classList.add('card-img-top');
    img_card.loading = 'lazy';
    img_card.decoding = 'async';
    if (count_ol === 0) {
        img_card.classList.add('colored');
    }
    img_card.style.visibility = 'hidden';
    let element_loading = createIALoadingElement();
    let originalImageUrl = imageUrl;
    let displayImageUrl = getDisplayImageUrl(imageUrl);

    img_card.dataset.originalUrl = originalImageUrl;
    img_card.dataset.usingProxy = displayImageUrl !== originalImageUrl ? 'true' : 'false';

    img_card.onload = function () {
        element_loading.remove();
        img_card.style.visibility = 'visible';
        img_card.classList.add('fadeIn');
        msnry_topics.layout();
    };

    img_card.onerror = function () {
        if (img_card.dataset.usingProxy !== 'true' && /^https?:/i.test(img_card.dataset.originalUrl)) {
            img_card.dataset.usingProxy = 'true';
            img_card.src = buildImageProxyUrl(img_card.dataset.originalUrl);
            return;
        }

        if (img_card.dataset.fallbackApplied !== 'true') {
            img_card.dataset.fallbackApplied = 'true';
            img_card.src = FALLBACK_CARD_IMAGE_URL;
            return;
        }

        element_loading.remove();
        img_card.remove();
        msnry_topics.layout();
    };

    card.insertBefore(element_loading, card_body);
    img_card.src = displayImageUrl;

    card.insertBefore(img_card, card_body);
}



function fetchOgpImage(url) {
    return fetch('./php/get_ogp_image.php?url=' + encodeURIComponent(url))
        .then(response => response.json())
        .then(data => {
            if (data.ogImage) {
                return data.ogImage; // OGPイメージのURLを返す
            } else {
                throw new Error('OGPイメージが見つかりませんでした。');
            }
        });
}