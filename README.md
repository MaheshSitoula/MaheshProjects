# Device Return Management System

A modern web application to track and manage device returns from users. Perfect for managing laptops, mobile phones, and accessories.

## ✨ Features

### 🔐 Authentication
- User registration and login
- Session management
- Demo user for quick testing
- Password validation and security

### 📝 Device Recording
- Record device returns with comprehensive details
- Device types: Laptop, Mobile Phone, Accessories
- Track device condition (Good, Fair, Poor)
- Serial number and user information
- Return status tracking
- Additional notes field

### 📊 Dashboard & Analytics
- **KPI Cards**: Total, Returned, Pending, Damaged, Missing devices
- **Charts**:
  - Status distribution (Pie Chart)
  - Devices by type (Bar Chart)
  - Device condition distribution
- **Recent Returns**: View last 5 device returns
- Real-time statistics

### 📋 Device Management
- View all device returns in table format
- Filter by status (All, Pending, Returned, Damaged, Missing)
- Update device status on the fly
- Delete device records
- Search functionality

### 💾 Data Storage
- Uses **localStorage** for data persistence
- Works like an Excel spreadsheet
- No server backend required
- Data stored locally in browser
- Persistent across sessions

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/MaheshSitoula/MaheshProjects.git
cd MaheshProjects
```

2. **Navigate to frontend directory**
```bash
cd frontend
```

3. **Install dependencies**
```bash
npm install
```

4. **Start the development server**
```bash
npm start
```

5. **Open in browser**
```
http://localhost:3000
```

## 🔑 Demo Credentials

For quick testing, use these credentials:
- **Email**: demo@example.com
- **Password**: demo123

Or register a new account with your own details.

## 📁 Project Structure

```
frontend/
├── src/
│   ├── pages/
│   │   ├── Login.js           # Authentication page
│   │   ├── Dashboard.js       # Analytics and overview
│   │   ├── DeviceList.js      # View and manage devices
│   │   └── DeviceForm.js      # Record new returns
│   ├── App.js                 # Main app with routing
│   ├── index.js               # React entry point
│   ├── index.css              # Tailwind styles
│   └── ...
├── public/
│   └── index.html             # HTML template
├── package.json               # Dependencies
├── tailwind.config.js         # Tailwind configuration
└── postcss.config.js          # PostCSS configuration
```

## 🎯 How to Use

### Record a Device Return
1. Click "New Return" in the navigation
2. Fill in device details (name, type, serial number)
3. Enter user information
4. Select return date and status
5. Add any notes
6. Click "Record Return"

### View All Devices
1. Click "Devices" in the navigation
2. See all recorded device returns
3. Use filters to view by status
4. Update status or delete records as needed

### View Analytics
1. Click "Dashboard" in the navigation
2. View KPI metrics
3. See charts and statistics
4. Check recent returns

### Update Device Status
1. Go to Devices page
2. Click status dropdown on any device
3. Select new status
4. Status updates automatically

## 🛠️ Technologies Used

- **React 18**: UI framework
- **React Router**: Navigation and routing
- **Tailwind CSS**: Styling
- **Recharts**: Data visualization and charts
- **localStorage**: Data persistence
- **JavaScript ES6+**: Modern JavaScript

## 📊 Data Model

### Device Record
```javascript
{
  id: timestamp,
  deviceName: string,
  deviceType: 'laptop' | 'mobile_phone' | 'accessories',
  serialNumber: string,
  condition: 'good' | 'fair' | 'poor',
  userName: string,
  userEmail: string,
  returnDate: date,
  returnStatus: 'pending' | 'returned' | 'damaged' | 'missing',
  notes: string,
  createdAt: timestamp
}
```

### User Record
```javascript
{
  email: string,
  name: string,
  password: string
}
```

## 🔍 Features in Detail

### Status Tracking
- **Pending**: Device return in progress
- **Returned**: Device successfully returned
- **Damaged**: Device has damage
- **Missing**: Device is missing

### Device Conditions
- **Good**: Device is in good condition
- **Fair**: Device has minor issues
- **Poor**: Device has significant issues

## 💡 Tips & Tricks

### Export Your Data
Open browser console (F12) and run:
```javascript
const data = JSON.parse(localStorage.getItem('deviceReturns'));
console.table(data);
```

### Clear All Data
To start fresh, run in browser console:
```javascript
localStorage.clear();
location.reload();
```

### Backup Data
```javascript
const backup = localStorage.getItem('deviceReturns');
console.log(backup); // Copy and save
```

## 🐛 Troubleshooting

### Data Not Saving?
- Check if localStorage is enabled
- Try clearing browser cache
- Try incognito/private mode

### Changes Not Showing?
- Refresh the page (F5)
- Clear browser cache
- Check browser console for errors

### Can't Login?
- Make sure you registered first
- Check email and password carefully
- Try demo account

## 🚀 Future Enhancements

- Export data to Excel/CSV
- Print device reports
- Email notifications
- Advanced filtering
- Device image uploads
- Barcode scanning
- API backend integration
- Mobile app

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

**Mahesh Sitoula**
- GitHub: [@MaheshSitoula](https://github.com/MaheshSitoula)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📞 Support

For support, email: Mah.sitoula@gmail.com or create an issue on GitHub.

---

**Happy Device Tracking!** 📱💻
