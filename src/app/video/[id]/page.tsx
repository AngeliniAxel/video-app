'use client';

import VideoCard from '@/app/components/VideoCard/VideoCard';
import { Video } from '../../interfaces/video';
import axios from 'axios';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';

const VideoPlayer = dynamic(() => import('../../components/VideoPlayer/VideoPlayer'), {
    ssr: false,
});

interface Props {
    params: Promise<{ id: string }>;
}

const Page = ({ params }: Props) => {
    const { id } = React.use(params);
    const [video, setVideo] = useState<Video | null>(null);
    const [unselectedVideos, setUnselectedVideos] = useState<Video[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get('http://localhost:3000/videos.json');
            const selectedVideo: Video = res.data.find((video: Video) => video.id === id);
            setVideo(selectedVideo);

            setUnselectedVideos(res.data.filter((video: Video) => video.id !== id));
        };
        fetchData();
    }, [id]);

    return (
        <div className='flex flex-col items-center min-h-screen'>
            <div className='flex flex-col w-full max-w-6xl lg:flex-row lg:items-start lg:justify-center gap-8 mt-8'>
                <div className='flex-1 flex flex-col items-center'>
                    {video && (
                        <>
                            <h1 className='text-2xl font-bold mb-4 w-full text-center lg:text-left'>
                                {video.title}
                            </h1>
                            <div className='flex justify-center w-full max-w-4xl mb-8'>
                                <VideoPlayer src={video.videoUrl} />
                            </div>
                        </>
                    )}
                </div>
                <div className='w-full flex flex-col items-center gap-6 lg:w-[380px] lg:justify-start h-auto lg:h-[80vh] lg:overflow-y-auto mt-6'>
                    {unselectedVideos?.map((video: Video) => (
                        <VideoCard key={video.id} video={video} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Page;
