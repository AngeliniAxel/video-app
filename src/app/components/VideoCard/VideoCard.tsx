import { Video } from '@/app/interfaces/video';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface VideoCardProps {
    video: Video;
}

const VideoCard = ({ video }: VideoCardProps) => {
    return (
        <div className='rounded-lg shadow-md hover:scale-105  transition-transform  duration-200  w-full max-w-[500px] p-6 lg:py-0'>
            <Link href={`/video/${video.id}`}>
                <Image
                    width={320}
                    height={180}
                    className='rounded-lg object-cover w-full h-[180px]'
                    src={video.thumbnailUrl}
                    alt={video.title}
                />
            </Link>
            <div className='mt-2'>
                <h3 className='text-base font-semibold truncate' title={video.title}>
                    {video.title}
                </h3>
                <p className='text-xs text-gray-500 truncate' title={video.author}>
                    {video.author}
                </p>
                <div className='flex items-center text-xs text-gray-400 gap-2 mt-1'>
                    <span>{video.views} views</span>
                    <span>•</span>
                    <span>{video.uploadTime}</span>
                </div>
            </div>
        </div>
    );
};

export default VideoCard;
