import React from 'react'
import './spinner.css'
import { Skeleton, Stack } from '@mui/material'

const LoadingSpinner = () => {
    return (
        // <div className="spinner-container">
        //     <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        // </div>
        <div className="loading-main">
            <Stack spacing={1}>
                <div 
                style={{ 
                    display: 'flex',
                    justifyContent:'initial',
                    gap:'1rem ',
                    marginLeft:'1rem'
                }}
                    >
                    <Skeleton variant="circular" width={40} height={40} sx={{ display: 'inline-block' }} />
                    <Skeleton variant="text" width={"40%"} sx={{ fontSize: '1rem', display: 'inline-block' }} />
                </div>
                <Skeleton style={{margin:'1rem auto'}} variant="rounded" width={"95%"} height={100} />
            </Stack>
            <Stack spacing={1}>
                <div 
                style={{ 
                    display: 'flex',
                    justifyContent:'initial',
                    gap:'1rem ',
                    marginLeft:'1rem'
                }}
                    >
                    <Skeleton variant="circular" width={40} height={40} sx={{ display: 'inline-block' }} />
                    <Skeleton variant="text" width={"40%"} sx={{ fontSize: '1rem', display: 'inline-block' }} />
                </div>
                <Skeleton style={{margin:'1rem auto'}} variant="rounded" width={"95%"} height={100} />
            </Stack>
            <Stack spacing={1}>
                <div 
                style={{ 
                    display: 'flex',
                    justifyContent:'initial',
                    gap:'1rem ',
                    marginLeft:'1rem'
                }}
                    >
                    <Skeleton variant="circular" width={40} height={40} sx={{ display: 'inline-block' }} />
                    <Skeleton variant="text" width={"40%"} sx={{ fontSize: '1rem', display: 'inline-block' }} />
                </div>
                <Skeleton style={{margin:'1rem auto'}} variant="rounded" width={"95%"} height={100} />
            </Stack>
        </div>
    )
}

export default LoadingSpinner
