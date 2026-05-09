import React, { useState, useEffect } from 'react';
import { deviceAPI } from '../services/api';
import { Link } from 'react-router-dom';

export default function DeviceList() {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    try {
      const response = await deviceAPI.getAll();
      setDevices(response.data);
    } catch (err) {
      setError('Failed to fetch devices');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this device?')) {
      try {
        await deviceAPI.delete(id);
        setDevices(devices.filter(d => d._id !== id));
      } catch (err) {
        setError('Failed to delete device');
      }
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const response = await deviceAPI.update(id, { returnStatus: newStatus });
      setDevices(devices.map(d => d._id === id ? response.data : d));
    } catch (err) {
      setError('Failed to update device');
    }
  };

  const filteredDevices = filter === 'all' 
    ? devices 
    : devices.filter(d => d.returnStatus === filter);

  const getStatusColor = (status) => {
    switch(status) {
      case 'returned': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'damaged': return 'bg-red-100 text-red-800';
      case 'missing': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Device Returns</h1>
          <p className="text-gray-600">Manage all device returns</p>
        </div>
        <Link
          to="/devices/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          + New Device Return
        </Link>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="mb-6">
        <label className="mr-4">Filter by Status:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="returned">Returned</option>
          <option value="damaged">Damaged</option>
          <option value="missing">Missing</option>
        </select>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left font-semibold">Device Name</th>
              <th className="px-6 py-3 text-left font-semibold">Type</th>
              <th className="px-6 py-3 text-left font-semibold">User</th>
              <th className="px-6 py-3 text-left font-semibold">Status</th>
              <th className="px-6 py-3 text-left font-semibold">Condition</th>
              <th className="px-6 py-3 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDevices.length > 0 ? (
              filteredDevices.map(device => (
                <tr key={device._id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-3">{device.deviceName}</td>
                  <td className="px-6 py-3 capitalize">{device.deviceType.replace('_', ' ')}</td>
                  <td className="px-6 py-3">{device.userId?.name || 'N/A'}</td>
                  <td className="px-6 py-3">
                    <select
                      value={device.returnStatus}
                      onChange={(e) => handleStatusUpdate(device._id, e.target.value)}
                      className={`px-3 py-1 rounded font-semibold text-sm ${getStatusColor(device.returnStatus)}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="returned">Returned</option>
                      <option value="damaged">Damaged</option>
                      <option value="missing">Missing</option>
                    </select>
                  </td>
                  <td className="px-6 py-3 capitalize">{device.condition}</td>
                  <td className="px-6 py-3">
                    <button
                      onClick={() => handleDelete(device._id)}
                      className="text-red-600 hover:text-red-800 font-semibold text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-3 text-center text-gray-500">
                  No devices found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
