import React, { createContext, useContext, useState } from 'react';
import { UnlockDevice } from '../types';

interface UnlockDeviceContextType {
  devices: UnlockDevice[];
  addDevice: (device: Omit<UnlockDevice, 'id'>) => void;
  updateDevice: (device: UnlockDevice) => void;
}

const UnlockDeviceContext = createContext<UnlockDeviceContextType | undefined>(undefined);

export function UnlockDeviceProvider({ children }: { children: React.ReactNode }) {
  const [devices, setDevices] = useState<UnlockDevice[]>([
    {
      id: 1,
      brand: "Samsung",
      model: "A12",
      version: "12.0",
      security: "January 2024",
      baseband: "1.0",
      googleLock: true,
      canUnlock: true,
      versionOptions: ["11.0", "12.0", "13.0"],
      securityOptions: ["January 2024", "February 2024"],
      basebandOptions: ["1.0", "2.0", "3.0"],
    },
    {
      id: 2,
      brand: "Motorola",
      model: "G Power",
      version: "13.0",
      security: "February 2024",
      baseband: "2.0",
      googleLock: true,
      canUnlock: false,
      versionOptions: ["12.0", "13.0", "14.0"],
      securityOptions: ["February 2024", "March 2024"],
      basebandOptions: ["2.0", "3.0", "4.0"],
    }
  ]);

  const addDevice = (device: Omit<UnlockDevice, 'id'>) => {
    setDevices(prev => [...prev, { ...device, id: prev.length + 1 }]);
  };

  const updateDevice = (updatedDevice: UnlockDevice) => {
    setDevices(prev => prev.map(device => 
      device.id === updatedDevice.id ? updatedDevice : device
    ));
  };

  return (
    <UnlockDeviceContext.Provider value={{ devices, addDevice, updateDevice }}>
      {children}
    </UnlockDeviceContext.Provider>
  );
}

export function useUnlockDevices() {
  const context = useContext(UnlockDeviceContext);
  if (context === undefined) {
    throw new Error('useUnlockDevices must be used within an UnlockDeviceProvider');
  }
  return context;
}