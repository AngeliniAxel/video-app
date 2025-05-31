'use client';

import React, { useEffect, useRef } from 'react';
import shaka from 'shaka-player/dist/shaka-player.ui';
import 'shaka-player/dist/controls.css';
import './VideoPlayer.css';

interface VideoPlayerProps {
    src: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!videoRef.current || !containerRef.current) return;
        shaka.polyfill.installAll();

        const player = new shaka.Player(videoRef.current);
        const ui = new shaka.ui.Overlay(player, containerRef.current, videoRef.current);

        const config = {
            seekBarColors: {
                base: 'rgba(255, 255, 255, 0.20)',
                buffered: 'rgba(255,255,255,.4)',
                played: '#d44338',
            },
            controlPanelElements: [
                'play_pause',
                'rewind',
                'fast_forward',
                'mute',
                'volume',
                'spacer',
                'time_and_duration',
                'fullscreen',
                'overflow_menu',
            ],
            overflowMenuButtons: ['quality', 'playback_rate'],
        };
        ui.configure(config);

        player.load(src);
    }, []);

    return (
        <div className='w-xl h-auto' ref={containerRef}>
            <video autoPlay muted ref={videoRef} />
        </div>
    );
};

export default VideoPlayer;
