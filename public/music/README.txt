🎵  BACKGROUND MUSIC
=====================

The music toggle (bottom-right floating button) looks for a file named:

    soft-piano.mp3

...right here in this folder ( public/music/ ).

HOW TO ADD YOUR SONG
--------------------
1. Find a soft piano / lofi track you like. Great royalty-free sources:
   - https://pixabay.com/music/  (search "soft piano" or "lofi")
   - https://incompetech.com/
   - https://freemusicarchive.org/

2. Rename the downloaded file to:  soft-piano.mp3

3. Drop it into this folder.

4. Refresh the site and tap the music button. It will fade in gently,
   and swell slightly during the final celebration moment. 💖

If no file is present, the site still works perfectly — the music button
simply shows as unavailable (muted icon) instead of breaking anything.

Want a different filename? Update the path in:
    src/App.jsx  ->  useAudio('/music/soft-piano.mp3', 0.4)
