from typing import Union
from fastapi import FastAPI
from scdl.scdl import SoundCloud, SCDLArgs, download_url
from fastapi.responses import StreamingResponse, JSONResponse
import mimetypes
import io
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Add CORS middleware to allow requests from http://localhost:3000 and https://soundcloudy.nkaewam.dev
app.add_middleware(
    CORSMiddleware,
    # allow_origins=["http://localhost:3000", "https://soundcloudy.nkaewam.dev"],
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

sound_cloud_client = SoundCloud(None, None)


@app.get("/healthcheck")
async def health_check():
    return "OK"


@app.get("/download/{url:path}")
async def download(url: str):
    args: SCDLArgs = SCDLArgs(
        l=url,
        auth_token=None,
        client_id=None,
        name_format="{title}",
        playlist_name_format="{playlist[title]}_{title}",
        debug=False,
        api_mode=True,  # Enable API mode for in-memory download
    )

    result = download_url(sound_cloud_client, args)

    if not result:
        return JSONResponse(
            status_code=500, content={"error": "Unknown error occurred."}
        )
    if result.get("error"):
        status = 422 if result.get("is_unsupported_for_direct_download") else 400
        return JSONResponse(status_code=status, content={"error": result["error"]})

    # Serve the file as a download
    filename = result["filename"]
    content_type = (
        result.get("content_type")
        or mimetypes.guess_type(filename)[0]
        or "application/octet-stream"
    )
    file_bytes = result["data"]

    return StreamingResponse(
        io.BytesIO(file_bytes),
        media_type=content_type,
        headers={"Content-Disposition": f'attachment; filename="{filename}"'},
    )
