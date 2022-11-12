const stream_mount = "/KCMR/IP";
const status_url = "URICECASTSERVER/status-json.xsl";
const nowplaying = document.getElementById('streamtitle');

function poll() {
    fetch(status_url)
    .then(data => data.json())
    .then(j_data => {
        console.log(j_data.source);
        console.log(j_data);
        if (Array.isArray(j_data.icestats.source) == true) {
            //console.log(j_data.icestats.source[0].title);
            j_data.icestats.source.forEach(src => {
                console.log(src);
                if (src.listenurl.includes(stream_mount) == true) {
                    nowplaying.innerText = src.title;
                }
            });
        } else {
            if (j_data.icestats.source.listenurl.includes(stream_mount) == true) {
                nowplaying.innerText = j_data.icestats.source.title;
            }
        }
    });
}

poll();

setInterval(poll, 5000);
