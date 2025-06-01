import React from 'react';
import VideoCard from '../VideoCard/VideoCard';
import { Video } from '@/app/interfaces/video';

interface VideoListProps {
    videos: Video[] | null;
}

const VideoList = ({ videos }: VideoListProps) => {
    return (
        <div className='w-full flex flex-col flex-wrap lg:flex-row items-center gap-8 lg:w-[380px] h-auto lg:h-[100vh] lg:overflow-y-auto py-1 overflow-hidden scrollbar'>
            {videos?.map((video: Video) => (
                <VideoCard key={video.id} video={video} />
            ))}
        </div>
    );
};

export default VideoList;
