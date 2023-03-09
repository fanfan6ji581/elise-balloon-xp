import { React, useState } from "react";
import { Box, Typography } from '@mui/material';

export default function BallOptionSkip() {
    const [active, setActive] = useState(false)

    const onClick = () => {
        setActive(!active);
    }

    return <Box sx={{ p: 1, }}>
        <Box className={`card ${active ? 'cardactive' : ''}`}
            style={{
                padding: '24px 0',
            }}
             onClick={() => onClick()}>
            <div style={{
                width: '300px',
                height: '300px',
                borderRadius: '50%',
                background: '#A9A9A9',
                margin: '0 auto',
                padding: '125px 0',
                textAlign: 'center',
                fontSize: 20,
                color: 'white'
            }}>get $0 with certainty</div>
            <Box sx={{ textAlign: 'center', mt: 3}}>
                <Typography variant="h5">Skip</Typography>
            </Box>
        </Box>
    </Box>
}
