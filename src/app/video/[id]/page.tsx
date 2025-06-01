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
        <div className='flex flex-col items-center min-h-screen p-1'>
            <div className='flex flex-col w-full max-w-6xl lg:flex-row lg:items-start lg:justify-center gap-8 mt-8'>
                <div className='flex-1 flex flex-col items-center'>
                    {video && (
                        <div className='container p-2'>
                            <div className='flex justify-center  mb-8'>
                                <VideoPlayer src={video.videoUrl} />
                            </div>
                            <h1 className='text-2xl font-bold mb-4  lg:text-left'>{video.title}</h1>
                            <div className='flex justify-between'>
                                <div>
                                    <p
                                        className='text-xs text-gray-500 truncate'
                                        title={video.author}
                                    >
                                        {video.author}
                                    </p>
                                    <p className='text-xs text-gray-500 mt-1'>{video.subscriber}</p>
                                </div>
                                <div className='flex items-center text-xs text-gray-400 gap-2 mt-1'>
                                    <span>{video.views} views</span>
                                    <span>•</span>
                                    <span>{video.uploadTime}</span>
                                </div>
                            </div>
                            <div className='mt-4 rounded  text-sm whitespace-pre-line'>
                                {video.description}
                            </div>
                            <hr className='mt-8 lg:hidden' />
                        </div>
                    )}
                </div>
                <div className='w-full flex flex-col flex-wrap lg:flex-row items-center gap-8 lg:w-[380px] h-auto lg:h-[100vh] lg:overflow-y-auto py-1 overflow-hidden'>
                    {unselectedVideos?.map((video: Video) => (
                        <VideoCard key={video.id} video={video} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Page;
