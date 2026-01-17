if [ -z "$1" ]; then
    echo "Error: Debes proporcionar una URL"
    echo "Uso: $0 <url>"
    exit 1
fi
if [[ ! "$1" =~ ^https?:// ]]; then
    echo "Error: '$1' no parece una URL válida"
    exit 1
fi
yt-dlp -x --audio-format mp3 --audio-quality 0 "$1"