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
                padding: '15px 0',
            }}
             onClick={() => onClick()}>
            <div style={{
                width: '280px',
                height: '280px',
                borderRadius: '50%',
                background: '#d3d3d3',
                margin: '30px auto',
                padding: '130px 0',
                textAlign: 'center',
                fontSize: 20
            }}>get $0 with certainty</div>
            <Box sx={{ textAlign: 'center', top: '12px', position: 'relative' }}>
                <Typography variant="h4">Skip</Typography>
            </Box>
        </Box>
    </Box>
}
