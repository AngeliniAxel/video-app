'use client';
import dynamic from 'next/dynamic';

const VideoPlayer = dynamic(() => import('./components/VideoPlayer'), {
    ssr: false,
});

export default function Home() {
    return (
        <div>
            <main>
                <h1>Hi</h1>
                <VideoPlayer />
            </main>
        </div>
    );
}
