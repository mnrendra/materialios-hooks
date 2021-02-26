import { useState, useEffect } from 'react'

import useWindowSize from './useWindowSize'

export const ORIENTATION = {
  PORTRAIT: 'Portrait',
  LANDSCAPE: 'Landscape'
}

export const MIN_WIDTH = {
  PORTRAIT: {
    HANDSET: { MEDIUM: 360, LARGE: 480 },
    TABLET: { MEDIUM: 600, LARGE: 720 },
    DESKTOP: { MEDIUM: 840, LARGE: 960 }
  },
  LANDSCAPE: {
    HANDSET: { MEDIUM: 640, LARGE: 800 },
    TABLET: { MEDIUM: 960, LARGE: 1120 },
    DESKTOP: { MEDIUM: 1280, LARGE: 1440 }
  }
}

export const DEVICE_TYPE = {
  HANDSET: 'Handset',
  TABLET: 'Tablet',
  DESKTOP: 'Desktop'
}

export const SIZE_TYPE = {
  SMALL: 'Small',
  MEDIUM: 'Medium',
  LARGE: 'Large',
  EXTRA_LARGE: 'Extra-Large'
}

const getDeviceType = (width, { HANDSET, TABLET, DESKTOP }) => {
  if (width < HANDSET.MEDIUM) {
    return { device: DEVICE_TYPE.HANDSET, size: SIZE_TYPE.SMALL }
  } else if (width < HANDSET.LARGE) {
    return { device: DEVICE_TYPE.HANDSET, size: SIZE_TYPE.MEDIUM }
  } else if (width < TABLET.MEDIUM) {
    return { device: DEVICE_TYPE.HANDSET, size: SIZE_TYPE.LARGE }
  } else if (width < TABLET.LARGE) {
    return { device: DEVICE_TYPE.TABLET, size: SIZE_TYPE.MEDIUM }
  } else if (width < DESKTOP.MEDIUM) {
    return { device: DEVICE_TYPE.TABLET, size: SIZE_TYPE.LARGE }
  } else if (width < DESKTOP.LARGE) {
    return { device: DEVICE_TYPE.DESKTOP, size: SIZE_TYPE.MEDIUM }
  } else {
    return { device: DEVICE_TYPE.DESKTOP, size: SIZE_TYPE.LARGE }
  }
}

/**
 * useResponsive
 */
const useResponsive = () => {
  const { width, height } = useWindowSize()

  const [responsive, setResponsive] = useState({
    orientation: ORIENTATION.LANDSCAPE,
    device: DEVICE_TYPE.DESKTOP,
    size: SIZE_TYPE.MEDIUM,
    width,
    height,
    className: `${ORIENTATION.LANDSCAPE} ${DEVICE_TYPE.DESKTOP} ${SIZE_TYPE.MEDIUM}`
  })

  useEffect(() => {
    const orientation = width < height
      ? ORIENTATION.PORTRAIT
      : ORIENTATION.LANDSCAPE

    const { device, size } = orientation === ORIENTATION.PORTRAIT
      ? getDeviceType(width, MIN_WIDTH.PORTRAIT)
      : getDeviceType(width, MIN_WIDTH.LANDSCAPE)

    setResponsive({
      orientation,
      device,
      size,
      width,
      height,
      className: `${orientation} ${device} ${size}`
    })
  }, [width, height])

  return responsive
}

export default useResponsive
