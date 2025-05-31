'use client';

import { Video } from '../../interfaces/video';
import axios from 'axios';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';

const VideoPlayer = dynamic(() => import('../../components/VideoPlayer'), {
    ssr: false,
});

interface Props {
    params: Promise<{ id: string }>;
}

const Page = ({ params }: Props) => {
    const { id } = React.use(params);
    const [video, setVideo] = useState<Video | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get('http://localhost:3000/videos.json');
            const selectedVideo: Video = res.data.find((video: Video) => video.id === id);
            setVideo(selectedVideo);
        };
        fetchData();
    }, [id]);

    return <div>{video && <VideoPlayer src={video.videoUrl} />}</div>;
};

export default Page;
