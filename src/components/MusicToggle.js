import React, {useEffect, useState} from "react";
import audioMp3 from '../assets/Khaim-Somebody.mp3'
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import {Icon, Tooltip} from "@mui/material";

const useAudio = url => {
    const [audio] = useState(new Audio(url));
    const [playing, setPlaying] = useState(false);

    const toggle = () => setPlaying(!playing);

    useEffect(() => {
            playing ? audio.play() : audio.pause();
        },
        [audio, playing]
    );

    useEffect(() => {
        audio.loop = true
        // audio.addEventListener('ended', () => setPlaying(false));
        // return () => {
        //     audio.removeEventListener('ended', () => setPlaying(false));
        // };
    }, [audio]);

    return [playing, toggle];
};

const Player = () => {
    const [playing, toggle] = useAudio(audioMp3);

    return (
        <div>
            <Tooltip title={"Music by https://www.khaimmusic.com/"}>
                <Icon onClick={toggle}>{playing ? <VolumeUpIcon/> : <VolumeOffIcon/>}</Icon>
            </Tooltip>


        </div>
    );
};

export default Player;