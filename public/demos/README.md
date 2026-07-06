# Demo clips

Drop muted screen-recordings of specrails-desktop here, then set the slot to ready.

Conventions: both .webm (VP9) and .mp4 (H.264), ~1280px wide, no audio, 8-15s
seamless loop (last frame ≈ first). Encode, e.g.:

  ffmpeg -i in.mov -an -vf "scale=1280:-2" -c:v libx264 -crf 22 -preset slow -movflags +faststart -pix_fmt yuv420p hub-rails.mp4
  ffmpeg -i in.mov -an -vf "scale=1280:-2" -c:v libvpx-vp9 -b:v 0 -crf 32 hub-rails.webm

Expected files (referenced by the site):
  hero.{webm,mp4}                 — hero frame walkthrough
  hub-overview.{webm,mp4}         — full flow (Hub showcase centerpiece)
  hub-explore.{webm,mp4}          — talk a spec into existence (Explore)
  hub-website-to-spec.{webm,mp4}  — turn a website into a spec
  hub-analytics.{webm,mp4}        — cost analytics
  hub-jobs.{webm,mp4}             — job runs / traces

To enable: in src/components/HubShowcaseSection.tsx set VIDEOS_READY = true
(and in src/components/HeroSection.tsx the hero DemoVideo ready={true}).
