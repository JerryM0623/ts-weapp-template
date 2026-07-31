const MOBILE_CLIENT_PLATFORMS: ClientPlatformType[] = ['ios', 'android', 'ohos']
const DESKTOP_CLIENT_PLATFORMS: ClientPlatformType[] = ['windows', 'mac', 'ohos_pc']

function normalizeClientPlatform(platform: string): ClientPlatformType {
  switch (platform.toLowerCase()) {
    case 'ios':
    case 'android':
    case 'ohos':
    case 'ohos_pc':
    case 'windows':
    case 'mac':
    case 'devtools':
      return platform.toLowerCase() as ClientPlatformType
    default:
      return 'unknown'
  }
}

function resolveOperatingSystem(platform: ClientPlatformType): OperatingSystemType {
  switch (platform) {
    case 'ios':
      return 'ios'
    case 'android':
      return 'android'
    case 'ohos':
    case 'ohos_pc':
      return 'harmonyos'
    case 'windows':
      return 'windows'
    case 'mac':
      return 'macos'
    case 'devtools':
      return 'devtools'
    default:
      return 'unknown'
  }
}

function resolveDeviceClass(platform: ClientPlatformType): HardwareDeviceClassType {
  if (MOBILE_CLIENT_PLATFORMS.includes(platform)) {
    return 'mobile'
  }

  if (DESKTOP_CLIENT_PLATFORMS.includes(platform)) {
    return 'desktop'
  }

  return platform === 'devtools' ? 'devtools' : 'unknown'
}

export function getPlatformInfo(): PlatformInfoType {
  const deviceInfo = wx.getDeviceInfo()
  const appBaseInfo = wx.getAppBaseInfo()
  const rawClientPlatform = deviceInfo.platform || ''
  const clientPlatform = normalizeClientPlatform(rawClientPlatform)
  const deviceClass = resolveDeviceClass(clientPlatform)

  return {
    hardware: {
      deviceClass,
      brand: deviceInfo.brand || '',
      model: deviceInfo.model || '',
      abi: deviceInfo.abi || '',
      deviceAbi: deviceInfo.deviceAbi || '',
      cpuType: deviceInfo.cpuType || '',
      memorySize: deviceInfo.memorySize || '',
    },
    software: {
      clientPlatform,
      rawClientPlatform,
      operatingSystem: resolveOperatingSystem(clientPlatform),
      system: deviceInfo.system || '',
      wechatVersion: appBaseInfo.version || '',
      baseLibraryVersion: appBaseInfo.SDKVersion || '',
      hostAppId: appBaseInfo.host?.appId || '',
    },
    isMobile: deviceClass === 'mobile',
    isDesktop: deviceClass === 'desktop',
    isDevtools: deviceClass === 'devtools',
  }
}
