import { useEffect, useRef } from 'react'
import QRCode from 'qrcode'

// Renders `value` as a QR code onto a canvas. Kept deliberately small — the
// Receive screen (Phase 2) is its first real consumer.
export default function QRDisplay({ value, size = 208 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !value) return
    QRCode.toCanvas(canvas, value, { width: size, margin: 1 }, (err) => {
      if (err) console.error('QR render failed', err)
    })
  }, [value, size])

  return (
    <div className="inline-flex rounded-2xl bg-white p-3 shadow-md">
      <canvas ref={canvasRef} className="rounded-lg" style={{ width: size, height: size }} />
    </div>
  )
}
