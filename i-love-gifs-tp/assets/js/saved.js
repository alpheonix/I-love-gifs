async function removeGIFFromFavorite(event) {
    const likeButton = event.currentTarget;
    const gifId = likeButton.dataset.gifId;

    const gifElement = document.getElementById(gifId);
    const gifVideoUrl = gifElement.querySelector('source').src;
    const gifImageUrl = gifElement.querySelector('img').src;

    const db = window.db;

    await db.gifs.where('id').equals(gifId)
    .delete();

    // Remove GIF element
    const articlesContainerElement = document.getElementById("gifs");
    articlesContainerElement.removeChild(gifElement);

}

function buildGIFCard(gifItem) {
    // Create GIF Card element
    const newGifElement = document.createElement("article");
    newGifElement.classList.add("gif-card");
    newGifElement.id = gifItem.id;

    // Append image to card
    const gifImageElement = document.createElement('video');
    gifImageElement.autoplay = true;
    gifImageElement.loop = true;
    gifImageElement.muted = true;
    gifImageElement.setAttribute('playsinline', true);

    const videoSourceElement = document.createElement('source');
    videoSourceElement.src = gifItem.videoUrl;
    videoSourceElement.type = 'video/mp4';
    gifImageElement.appendChild(videoSourceElement);

    const imageSourceElement = document.createElement('img');
    imageSourceElement.classList.add('lazyload');
    imageSourceElement.dataset.src = gifItem.images;
    imageSourceElement.alt = `${gifItem.title} image`;
    gifImageElement.appendChild(imageSourceElement);

    newGifElement.appendChild(gifImageElement);

    // Append metadata to card
    const gifMetaContainerElement = document.createElement("div");
    newGifElement.appendChild(gifMetaContainerElement);

    // Append title to card metadata
    const gifTitleElement = document.createElement("h3");
    const gifTitleNode = document.createTextNode(gifItem.title || 'No title');
    gifTitleElement.appendChild(gifTitleNode);
    gifMetaContainerElement.appendChild(gifTitleElement);

    // Append remove button to card metadata
    const removeButtonElement = document.createElement("button");
    removeButtonElement.setAttribute('aria-label', `Remove ${gifItem.title}`);
    removeButtonElement.classList.add("button");
    removeButtonElement.dataset.gifId = gifItem.id;
    removeButtonElement.onclick = removeGIFFromFavorite;
    const removeIconElement = document.createElement("i");
    removeIconElement.classList.add("fas", "fa-times");
    removeButtonElement.appendChild(removeIconElement);
    gifMetaContainerElement.appendChild(removeButtonElement);

    // Append GIF Card to DOM
    const articlesContainerElement = document.getElementById("gifs");
    articlesContainerElement.appendChild(newGifElement);
}

window.addEventListener("DOMContentLoaded", async function () {
    const db = window.db;

    // TODO: 5a - Open IndexedDB's database

    // TODO: 5b - Fetch saved GIFs from local database and display them (use function buildGIFCard)
    const GIFs = await db.gifs
        .toArray();
        console.log(GIFs)
        GIFs.forEach(GIF => {
            buildGIFCard(GIF)
        });
        
});
