import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import { useUnlockDevices } from '../contexts/UnlockDeviceContext';
import { Check, X, Edit2, ShoppingCart } from 'lucide-react';
import styles from '../styles/Unlock.module.css';
import ProcessOrderModal from '../components/ProcessOrderModal';

const brands = [
  "Xiaomi", "Samsung", "Huawei", "Oppo", "LG", "Nokia", 
  "iPhone", "Motorola", "Vortex", "Mediatek", "Blu"
];

function Unlock() {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { devices, updateDevice } = useUnlockDevices();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<any>(null);
  const [processingDevice, setProcessingDevice] = useState<any>(null);

  const filteredDevices = devices.filter(device => {
    const matchesBrand = !selectedBrand || device.brand === selectedBrand;
    const matchesSearch = Object.values(device).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
    return matchesBrand && matchesSearch;
  });

  const startEditing = (device: any) => {
    setEditingId(device.id);
    setEditForm(device);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditForm(null);
  };

  const saveEdit = () => {
    if (editForm) {
      updateDevice(editForm);
      setEditingId(null);
      setEditForm(null);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    if (editForm) {
      setEditForm({
        ...editForm,
        [field]: field === 'googleLock' || field === 'canUnlock' 
          ? value === 'true'
          : value
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className={styles.brandButtons}>
        {brands.map((brand) => (
          <button
            key={brand}
            onClick={() => setSelectedBrand(selectedBrand === brand ? null : brand)}
            className={`${styles.brandButton} ${
              selectedBrand === brand ? styles.brandButtonActive : styles.brandButtonInactive
            }`}
          >
            {brand}
          </button>
        ))}
      </div>

      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search devices..."
      />

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead className={styles.tableHeader}>
            <tr>
              <th className={styles.tableHeaderCell}>Brand</th>
              <th className={styles.tableHeaderCell}>Model</th>
              <th className={styles.tableHeaderCell}>Version</th>
              <th className={styles.tableHeaderCell}>Security</th>
              <th className={styles.tableHeaderCell}>Baseband</th>
              <th className={styles.tableHeaderCell}>Google Lock</th>
              <th className={styles.tableHeaderCell}>Can Unlock</th>
              <th className={styles.tableHeaderCell}>Actions</th>
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {filteredDevices.map((device) => (
              <tr key={device.id} className={styles.tableRow}>
                {editingId === device.id ? (
                  <>
                    <td className={styles.tableCell}>
                      <select
                        value={editForm.brand}
                        onChange={(e) => handleInputChange('brand', e.target.value)}
                        className={styles.editInput}
                      >
                        {brands.map(brand => (
                          <option key={brand} value={brand}>{brand}</option>
                        ))}
                      </select>
                    </td>
                    <td className={styles.tableCell}>
                      <input
                        type="text"
                        value={editForm.model}
                        onChange={(e) => handleInputChange('model', e.target.value)}
                        className={styles.editInput}
                      />
                    </td>
                    <td className={styles.tableCell}>
                      <select
                        value={editForm.version}
                        onChange={(e) => handleInputChange('version', e.target.value)}
                        className={styles.editInput}
                      >
                        {editForm.versionOptions.map((version: string) => (
                          <option key={version} value={version}>{version}</option>
                        ))}
                      </select>
                    </td>
                    <td className={styles.tableCell}>
                      <select
                        value={editForm.security}
                        onChange={(e) => handleInputChange('security', e.target.value)}
                        className={styles.editInput}
                      >
                        {editForm.securityOptions.map((security: string) => (
                          <option key={security} value={security}>{security}</option>
                        ))}
                      </select>
                    </td>
                    <td className={styles.tableCell}>
                      <select
                        value={editForm.baseband}
                        onChange={(e) => handleInputChange('baseband', e.target.value)}
                        className={styles.editInput}
                      >
                        {editForm.basebandOptions.map((baseband: string) => (
                          <option key={baseband} value={baseband}>{baseband}</option>
                        ))}
                      </select>
                    </td>
                    <td className={styles.tableCell}>
                      <select
                        value={editForm.googleLock.toString()}
                        onChange={(e) => handleInputChange('googleLock', e.target.value)}
                        className={styles.editInput}
                      >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                    </td>
                    <td className={styles.tableCell}>
                      <select
                        value={editForm.canUnlock.toString()}
                        onChange={(e) => handleInputChange('canUnlock', e.target.value)}
                        className={styles.editInput}
                      >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                    </td>
                    <td className={styles.actionButtons}>
                      <button onClick={saveEdit} className={styles.saveButton}>
                        <Check className="h-5 w-5" />
                      </button>
                      <button onClick={cancelEditing} className={styles.cancelButton}>
                        <X className="h-5 w-5" />
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className={styles.tableCell}>{device.brand}</td>
                    <td className={styles.tableCell}>{device.model}</td>
                    <td className={styles.tableCell}>{device.version}</td>
                    <td className={styles.tableCell}>{device.security}</td>
                    <td className={styles.tableCell}>{device.baseband}</td>
                    <td className={styles.tableCell}>
                      <span className={`${styles.statusBadge} ${
                        device.googleLock ? styles.statusBadgeSuccess : styles.statusBadgeError
                      }`}>
                        {device.googleLock ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className={styles.tableCell}>
                      <span className={`${styles.statusBadge} ${
                        device.canUnlock ? styles.statusBadgeSuccess : styles.statusBadgeError
                      }`}>
                        {device.canUnlock ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className={styles.actionButtons}>
                      <button onClick={() => startEditing(device)} className={styles.editButton}>
                        <Edit2 className="h-5 w-5" />
                      </button>
                      <button 
                        onClick={() => setProcessingDevice(device)}
                        className={styles.processButton}
                      >
                        <ShoppingCart className="h-5 w-5" />
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ProcessOrderModal
        isOpen={!!processingDevice}
        onClose={() => setProcessingDevice(null)}
        itemDetails={processingDevice}
      />
    </div>
  );
}

export default Unlock;