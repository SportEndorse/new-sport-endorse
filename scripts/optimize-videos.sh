#!/bin/bash

# Video Optimization Script for Sport Endorse
# Run this script to convert your existing videos to optimized WebM format

echo "🎥 Starting video optimization for Sport Endorse..."

# Create output directory if it doesn't exist
mkdir -p public/videos/optimized
mkdir -p public/images/posters

# Check if FFmpeg is installed
if ! command -v ffmpeg &> /dev/null; then
    echo "❌ FFmpeg not found. Please install FFmpeg first:"
    echo "   - Windows: https://ffmpeg.org/download.html"
    echo "   - Mac: brew install ffmpeg"
    echo "   - Linux: sudo apt install ffmpeg"
    exit 1
fi

echo "✅ FFmpeg found, starting conversions..."

# Desktop video (4:3 aspect ratio)
if [ -f "public/videos/4_3 aspect ratio (wide) .MOV" ]; then
    echo "🖥️  Converting desktop video..."
    ffmpeg -i "public/videos/4_3 aspect ratio (wide) .MOV" \
        -c:v libvpx-vp9 -crf 30 -b:v 2M -c:a libopus -b:a 128k \
        -vf "scale=1920:1440" \
        public/videos/4_3_aspect_ratio_wide.webm -y
    
    # Extract poster
    ffmpeg -i "public/videos/4_3 aspect ratio (wide) .MOV" \
        -ss 00:00:01 -vframes 1 -q:v 2 \
        public/images/video-poster-wide.jpg -y
    
    echo "✅ Desktop video optimized"
else
    echo "⚠️  Desktop video not found: public/videos/4_3 aspect ratio (wide) .MOV"
fi

# Tablet video (3:4 aspect ratio)
if [ -f "public/videos/3_4 aspect ratio (in between).MOV" ]; then
    echo "📱 Converting tablet video..."
    ffmpeg -i "public/videos/3_4 aspect ratio (in between).MOV" \
        -c:v libvpx-vp9 -crf 32 -b:v 1.5M -c:a libopus -b:a 96k \
        -vf "scale=768:1024" \
        public/videos/3_4_aspect_ratio_tablet.webm -y
    
    # Extract poster
    ffmpeg -i "public/videos/3_4 aspect ratio (in between).MOV" \
        -ss 00:00:01 -vframes 1 -q:v 2 \
        public/images/video-poster-tablet.jpg -y
    
    echo "✅ Tablet video optimized"
else
    echo "⚠️  Tablet video not found: public/videos/3_4 aspect ratio (in between).MOV"
fi

# Mobile video (9:16 aspect ratio)
if [ -f "public/videos/9_16 aspect ratio (mobile_reel_tiktok).MOV" ]; then
    echo "📱 Converting mobile video..."
    ffmpeg -i "public/videos/9_16 aspect ratio (mobile_reel_tiktok).MOV" \
        -c:v libvpx-vp9 -crf 35 -b:v 1M -c:a libopus -b:a 64k \
        -vf "scale=480:854" \
        public/videos/9_16_aspect_ratio_mobile.webm -y
    
    # Extract poster
    ffmpeg -i "public/videos/9_16 aspect ratio (mobile_reel_tiktok).MOV" \
        -ss 00:00:01 -vframes 1 -q:v 2 \
        public/images/video-poster-mobile.jpg -y
    
    echo "✅ Mobile video optimized"
else
    echo "⚠️  Mobile video not found: public/videos/9_16 aspect ratio (mobile_reel_tiktok).MOV"
fi

echo ""
echo "🎉 Video optimization complete!"
echo ""
echo "📊 File size comparison:"
echo "Before:"
du -h "public/videos"/*.MOV 2>/dev/null || echo "Original MOV files not found"
echo ""
echo "After:"
du -h "public/videos"/*.webm 2>/dev/null || echo "No WebM files created"
echo ""
echo "📋 Next steps:"
echo "1. Test your website to ensure videos load correctly"
echo "2. Monitor Core Web Vitals for performance improvements"
echo "3. Consider removing original MOV files after testing"
echo ""
echo "🚀 Your videos should now load lightning fast!"