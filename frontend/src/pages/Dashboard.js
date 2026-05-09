import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const [devices, setDevices] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    returned: 0,
    pending: 0,
    damaged: 0,
    missing: 0
  });
  const [chartData, setChartData] = useState({
    status: [],
    deviceType: [],
    condition: []
  });

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 1000);
    return () => clearInterval(interval);
  }, []);

  const loadData = () => {
    const deviceReturns = JSON.parse(localStorage.getItem('deviceReturns') || '[]');
    setDevices(deviceReturns);

    // Calculate stats
    const stats = {
      total: deviceReturns.length,
      returned: deviceReturns.filter(d => d.returnStatus === 'returned').length,
      pending: deviceReturns.filter(d => d.returnStatus === 'pending').length,
      damaged: deviceReturns.filter(d => d.returnStatus === 'damaged').length,
      missing: deviceReturns.filter(d => d.returnStatus === 'missing').length
    };
    setStats(stats);

    // Prepare chart data
    const statusData = [
      { name: 'Returned', value: stats.returned, fill: '#10b981' },
      { name: 'Pending', value: stats.pending, fill: '#f59e0b' },
      { name: 'Damaged', value: stats.damaged, fill: '#ef4444' },
      { name: 'Missing', value: stats.missing, fill: '#6b7280' }
    ];

    const deviceTypeCount = {
      laptop: deviceReturns.filter(d => d.deviceType === 'laptop').length,
      mobile_phone: deviceReturns.filter(d => d.deviceType === 'mobile_phone').length,
      accessories: deviceReturns.filter(d => d.deviceType === 'accessories').length
    };

    const deviceTypeData = [
      { name: 'Laptop', value: deviceTypeCount.laptop, fill: '#3b82f6' },
      { name: 'Mobile Phone', value: deviceTypeCount.mobile_phone, fill: '#8b5cf6' },
      { name: 'Accessories', value: deviceTypeCount.accessories, fill: '#ec4899' }
    ];

    const conditionCount = {
      good: deviceReturns.filter(d => d.condition === 'good').length,
      fair: deviceReturns.filter(d => d.condition === 'fair').length,
      poor: deviceReturns.filter(d => d.condition === 'poor').length
    };

    const conditionData = [
      { name: 'Good', value: conditionCount.good, fill: '#10b981' },
      { name: 'Fair', value: conditionCount.fair, fill: '#f59e0b' },
      { name: 'Poor', value: conditionCount.poor, fill: '#ef4444' }
    ];

    setChartData({
      status: statusData,
      deviceType: deviceTypeData,
      condition: conditionData
    });
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'returned': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'damaged': return 'bg-red-100 text-red-800';
      case 'missing': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const recentReturns = devices.slice().sort((a, b) => b.createdAt - a.createdAt).slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Device return analytics and overview</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
            <p className="text-gray-600 text-sm font-semibold">Total Devices</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{stats.total}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <p className="text-gray-600 text-sm font-semibold">Returned</p>
            <p className="text-3xl font-bold text-green-600 mt-2">{stats.returned}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
            <p className="text-gray-600 text-sm font-semibold">Pending</p>
            <p className="text-3xl font-bold text-yellow-600 mt-2">{stats.pending}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
            <p className="text-gray-600 text-sm font-semibold">Damaged</p>
            <p className="text-3xl font-bold text-red-600 mt-2">{stats.damaged}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-gray-500">
            <p className="text-gray-600 text-sm font-semibold">Missing</p>
            <p className="text-3xl font-bold text-gray-600 mt-2">{stats.missing}</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Status Distribution */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Status Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData.status}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.status.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Device Type Distribution */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Devices by Type</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData.deviceType}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Device Condition Distribution */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Device Condition</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData.condition}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Returns */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Device Returns</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Device</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Type</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">User</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Condition</th>
                </tr>
              </thead>
              <tbody>
                {recentReturns.length > 0 ? (
                  recentReturns.map(device => (
                    <tr key={device.id} className="border-t hover:bg-gray-50">
                      <td className="px-6 py-3 text-sm text-gray-900">{device.deviceName}</td>
                      <td className="px-6 py-3 text-sm text-gray-600 capitalize">{device.deviceType.replace('_', ' ')}</td>
                      <td className="px-6 py-3 text-sm text-gray-600">{device.userName}</td>
                      <td className="px-6 py-3 text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(device.returnStatus)}`}>
                          {device.returnStatus}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-sm text-gray-600 capitalize">{device.condition}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-3 text-center text-gray-500">
                      No device returns yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
