import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1a4fa3',
          color: 'white',
          fontSize: 28,
          fontWeight: 900,
          fontFamily: 'Impact, Arial Black, sans-serif',
          letterSpacing: '-3px',
          textShadow: '0 0 2px white, 1px 0 0 white, -1px 0 0 white, 0 1px 0 white, 0 -1px 0 white',
          paddingRight: '3px',
        }}
      >
        V
      </div>
    ),
    {
      ...size,
    }
  )
}
