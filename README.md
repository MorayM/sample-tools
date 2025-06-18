# WAV Loop Extractor & Preset Generator

A browser-based tool for extracting loop points from WAV files and generating sampler presets for SFZ and Decent Sampler formats.

## What it does

This tool reads WAV files that contain embedded loop point metadata (in the 'smpl' chunk) and automatically generates ready-to-use preset files for two popular sampling formats:

- **SFZ format** - A widely-supported open standard for samplers
- **Decent Sampler format** - A popular free sampler plugin

The tool intelligently maps samples across the keyboard by detecting note names in filenames and automatically assigns key ranges for each sample.

## Who it's for

- **Music producers** working with sample libraries that have embedded loop points
- **Sound designers** who need to quickly convert samples into playable instruments
- **Musicians** using SFZ-compatible samplers or Decent Sampler
- **Studio professionals** who prefer browser-based tools that don't require installation

## Key Features

- **Client-side processing** - Your samples never leave your computer
- **Drag-and-drop interface** - Simply drop WAV files into the browser
- **Automatic note detection** - Extracts root notes from filenames (e.g., "kick_C4.wav")
- **Loop point extraction** - Reads embedded SMPL chunk data for seamless loops
- **Dual format output** - Generates both SFZ and Decent Sampler presets
- **Copy/download options** - Easy export of generated preset files

## How it works

1. Drop WAV files into the browser interface
2. The tool analyzes each file to extract:
   - Sample rate, bit depth, and length
   - Root note from filename
   - Loop points from WAV metadata
3. Samples are automatically sorted by pitch and assigned key ranges
4. SFZ and Decent Sampler preset files are generated
5. Copy to clipboard or download the preset files

## Perfect for

- Sample libraries with embedded loop metadata
- Converting individual samples into playable instruments
- Quick preset generation without complex sampler software
- Studio workflows that prioritize browser-based tools

Created by [Moray Macdonald](https://moray.dev) ([@Cephid](https://cephid.world))
