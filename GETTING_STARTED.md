# Device Return System - Getting Started

## Quick Start Guide

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Start Development Server
```bash
npm start
```

### 3. Access the Application
Open your browser and go to: `http://localhost:3000`

### 4. Login
Use the demo credentials:
- **Email**: demo@example.com
- **Password**: demo123

Or create your own account by registering.

## 🎯 Common Tasks

### Record a Device Return
1. Click "Record Return" or "New Device Return" button
2. Fill in device details (name, type, serial number)
3. Enter user information
4. Select return date and status
5. Click "Record Return"

### View All Devices
1. Go to "Devices" page
2. See all recorded device returns in table format
3. Use search to find specific devices
4. Use filter to view by status

### Update Device Status
1. Go to "Devices" page
2. Click on the status dropdown for any device
3. Select new status
4. Status updates automatically

### View Analytics
1. Go to "Dashboard"
2. View KPI cards and charts
3. See distribution of devices by type and condition
4. Check recent returns

## 📊 Data Storage

All data is stored in your browser's localStorage:
- Data persists across sessions
- No server required
- Works offline
- Private and local

## 🔍 Troubleshooting

### Data Not Saving?
- Check if localStorage is enabled in your browser
- Clear browser cache if needed
- Try incognito/private mode

### Forgot Password?
- Create a new account with different email
- Or clear browser cache and cookies to reset

### Need to Export Data?
Open browser developer console (F12) and run:
```javascript
const data = JSON.parse(localStorage.getItem('deviceReturns'));
console.table(data);
```

## 📞 Need Help?

Visit the GitHub repository for more information or create an issue.

---

Happy device tracking! 📱💻
