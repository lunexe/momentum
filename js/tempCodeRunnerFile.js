const timeOfDay = getTimeOfDay();
async function getLinkToImage() {
    const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${timeOfDay}&client_id=Sl75EIZWddYqFlCJ5OUzHX_xHtT5-3niYjbMB7OcRuo`;
    const res = await fetch(url);
    const data = await res.json();

    body.style.backgroundImage = `url('${data.urls.full}')`;
}