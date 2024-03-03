const stream_mount = "stream";
const status_url = "URICECASTSERVER/status-json.xsl";
const nowplaying = document.getElementById('streamtitle');

async function poll() {
    try {
        const response = await fetch(status_url);
        if (!response.ok) {
            throw new Error('Failed to fetch status');
        }
        const j_data = await response.json();
        const source = Array.isArray(j_data.icestats.source) ? j_data.icestats.source : [j_data.icestats.source];

        const playingSource = source.find(src => src.listenurl.includes(stream_mount));
        if (playingSource) {
            nowplaying.innerText = playingSource.title;
        }
    } catch (error) {
        console.error('Error fetching status:', error);
    }
}

poll();
setInterval(poll, 5000);
