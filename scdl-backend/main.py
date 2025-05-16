from typing import Union
from fastapi import FastAPI
from vendor.scdl.scdl.scdl import SoundCloud, SCDLArgs, download_url

app = FastAPI()

sound_cloud_client = SoundCloud(None, None)


@app.get("/healthcheck")
def health_check():
    return "OK"


@app.get("/download/{url:path}")
def download(url: str):
    args: SCDLArgs = SCDLArgs(
        l=url,
        auth_token=None,
        client_id=None,
        name_format="{title}",
        playlist_name_format="{playlist[title]}_{title}",
        debug=False,
        no_metadata=False,
        no_tags=False,
        no_album_art=False,
        no_lyrics=False,
        no_comments=False,
        no_download=False,
        add_description=False,
    )

    return download_url(sound_cloud_client, args)
