#!/bin/bash
# Rebuilds video/public/sfx/lib (≈140 MB, not in git) from the CC0 collection
# github.com/lavenderdotpet/CC0-Public-Domain-Sounds (CC0 1.0; includes Kenney CC0 packs).
set -e
TMP=${TMPDIR:-/tmp}/cc0-sounds
O="$(cd "$(dirname "$0")/.." && pwd)/public/sfx/lib"
[ -d "$TMP" ] || git clone -q --depth 1 https://github.com/lavenderdotpet/CC0-Public-Domain-Sounds.git "$TMP"
cd "$TMP"; mkdir -p "$O"
conv(){ mkdir -p "$O/$1"; n=$(echo "$2" | sed 's#.*/##; s/\.[^.]*$//; s/[^A-Za-z0-9]\+/_/g' | tr 'A-Z' 'a-z'); ffmpeg -nostdin -v error -y -i "$2" -ar 48000 -ac 2 "$O/$1/$n.wav"; }
for f in "Micro Pack - Organic Wooshes"/*.wav; do conv whoosh "$f"; done
for f in kenney_interfacesounds/Audio/{click,confirmation,drop,glass,select,switch,toggle,tick,pluck,scroll}_*.ogg kenney_uiaudio/Audio/*.ogg; do [ -f "$f" ] && conv ui "$f"; done
for f in 100-CC0-wood-metal-SFX/*.ogg; do case "$f" in *wood*|*door*|*knock*|*plank*) conv wood "$f";; esac; done
for f in kenney_impactsounds/Audio/impact{Soft,Wood,Plank}*.ogg; do [ -f "$f" ] && conv impact "$f"; done
for f in 100-CC0-SFX/door_*.ogg 100-cc0-sfx-2/sfx100v2_door_*.ogg; do conv door "$f"; done
for f in 40-cc0-water-splash-slime-sfx/*; do case "$f" in *water*|*splash*|*drip*|*pour*) conv water "$f";; esac; done
for f in "bb - Books, Paper, Writing (Jan 2021)"/*.wav; do conv paper "$f"; done
for f in Maximiliano-Stradex-Ambient/*; do case "$f" in *.wav|*.ogg|*.mp3) conv ambient "$f";; esac; done
echo "SFX library ready: $O"
