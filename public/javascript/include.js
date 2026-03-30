async function loadIncludeIntoElement(element) {
    let includePath = element.dataset.include;

    if (!includePath) {
        return;
    }

    let response = await fetch(includePath, {
        method: 'GET'
    });

    if (!response.ok) {
        throw new Error('Failed to load include: ' + includePath);
    }

    element.innerHTML = await response.text();
    element.removeAttribute('data-include');

    await loadIncludes(element);
}

async function loadIncludes(root) {
    let includeTargets = Array.from(root.querySelectorAll('[data-include]'));

    for (let includeTarget of includeTargets) {
        await loadIncludeIntoElement(includeTarget);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    loadIncludes(document)
        .then(function () {
            if (typeof window.updateCurrentMenuState === 'function') {
                window.updateCurrentMenuState();
            }

            if (typeof window.initLanguage === 'function') {
                window.initLanguage();
            }

            document.dispatchEvent(new CustomEvent('ia:includes-loaded'));
        })
        .catch(function (error) {
            console.error('Include load failed:', error);
        });
});