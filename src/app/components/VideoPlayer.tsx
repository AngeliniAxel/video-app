'use client';

import React, { useEffect, useRef } from 'react';
import shaka from 'shaka-player';
import 'shaka-player/dist/controls.css';

const VideoPlayer = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        const player = new shaka.Player(videoRef.current);

        player.load('https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd');
    }, []);
    return <video ref={videoRef} controls />;
};

export default VideoPlayer;
