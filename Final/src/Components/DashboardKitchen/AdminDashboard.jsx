import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../DashboardKitchen/DashboardStyles/KitchenDashboard.css';

function AdminDashboard() {
    const [staff, setStaff] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    const [currentTab, setCurrentTab] = useState('staff');
    const [newStaff, setNewStaff] = useState({ 
        firstName: '', 
        lastName: '', 
        email: '', 
        role: 'kitchen',
        shift: ''
    });
    const [newMenuItem, setNewMenuItem] = useState({ 
        name: '', 
        price: '', 
        description: '',
        category: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem('authToken');
    const userData = JSON.parse(localStorage.getItem('user'));

    // Role-based access
    useEffect(() => {
        if (!token || !userData || userData.role !== 'admin') {
            alert('Access denied. You must be an admin to view this page.');
            navigate('/LoginPage');
        }
    }, [token, userData, navigate]);

    // Fetch staff only on mount
    useEffect(() => {
        const fetchStaff = async () => {
            try {
                const response = await fetch('http://localhost:5000/Staff/', {
                    headers: { 'Authorization': `Bearer ${token}` },
                });
                const data = await response.json();
                if (response.ok) {
                    setStaff(Array.isArray(data.staff) ? data.staff : []);
                } else {
                    setError(`Failed to fetch staff: ${data.message || 'Unknown error'}`);
                    setStaff([]);
                }
            } catch (error) {
                setError('Error fetching staff. Please check server connection or token.');
                setStaff([]);
                console.error('Fetch staff error:', error);
            }
        };

        fetchStaff();
    }, [token]);

    // Fetch menu items function (with enhanced debugging)
    const fetchMenuItems = async () => {
        setError('');
        try {
            console.log('Fetching menu items with token:', token);
            const response = await fetch('http://localhost:5000/MenuItem/menu', {
                method: 'GET',
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });
            console.log('Response status:', response.status);
            const data = await response.json();
            console.log('Raw response data:', data);

            if (response.ok) {
                const items = Array.isArray(data) ? data : (data.data && Array.isArray(data.data) ? data.data : []);
                console.log('Processed menu items:', items);
                setMenuItems(items);
                if (items.length === 0) {
                    setError('No menu items found in the database.');
                }
            } else {
                setError(`Failed to fetch menu items: ${data.message || 'Unknown error'} (Status: ${response.status})`);
                setMenuItems([]);
            }
        } catch (error) {
            setError('Error fetching menu items. Please check server connection or token.');
            setMenuItems([]);
            console.error('Fetch menu items error:', error);
        }
    };

    // Add new staff member
    const addStaff = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (!newStaff.firstName || !newStaff.lastName || !newStaff.email) {
                setError('First name, last name, and email are required.');
                return;
            }
            if (!/\S+@\S+\.\S+/.test(newStaff.email)) {
                setError('Please enter a valid email address.');
                return;
            }
            if (newStaff.role === 'waiter' && !newStaff.shift) {
                setError('Shift is required for waiters.');
                return;
            }

            const staffData = {
                firstName: newStaff.firstName.trim(),
                lastName: newStaff.lastName.trim(),
                email: newStaff.email.trim().toLowerCase(),
                role: newStaff.role,
                ...(newStaff.role === 'waiter' && { shift: newStaff.shift })
            };

            const response = await fetch('http://localhost:5000/Staff/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(staffData),
            });
            const data = await response.json();
            if (response.ok) {
                setStaff([...staff, data.staff]);
                setNewStaff({ firstName: '', lastName: '', email: '', role: 'kitchen', shift: '' });
                alert('Staff member added successfully!');
            } else {
                setError(`Failed to add staff member: ${data.message || 'Unknown error'}`);
            }
        } catch (error) {
            setError('Error adding staff. Please try again.');
            console.error('Add staff error:', error);
        }
    };

    // Update staff member
    const updateStaff = async (staffId, updatedData) => {
        setError('');
        try {
            const payload = { ...updatedData };
            if (payload.role === 'kitchen') {
                delete payload.shift;
            }

            const response = await fetch(`http://localhost:5000/Staff/${staffId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });
            const data = await response.json();
            if (response.ok) {
                setStaff(staff.map(member =>
                    member._id === staffId ? data.staff : member
                ));
                alert('Staff member updated successfully!');
            } else {
                setError(`Failed to update staff: ${data.message || 'Unknown error'}`);
            }
        } catch (error) {
            setError('Error updating staff. Please try again.');
            console.error('Update staff error:', error);
        }
    };

    // Delete staff member
    const deleteStaff = async (staffId) => {
        setError('');
        try {
            const response = await fetch(`http://localhost:5000/Staff/${staffId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` },
            });
            if (response.ok) {
                setStaff(staff.filter(member => member._id !== staffId));
                alert('Staff member deleted successfully!');
            } else {
                const data = await response.json();
                setError(`Failed to delete staff: ${data.message || 'Unknown error'}`);
            }
        } catch (error) {
            setError('Error deleting staff. Please try again.');
            console.error('Delete staff error:', error);
        }
    };

    // Add new menu item
    const addMenuItem = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (!newMenuItem.name || !newMenuItem.price || !newMenuItem.description || !newMenuItem.category) {
                setError('All fields (name, price, description, category) are required.');
                return;
            }

            const menuData = {
                name: newMenuItem.name,
                price: parseFloat(newMenuItem.price),
                description: newMenuItem.description,
                category: newMenuItem.category
            };
            console.log('Adding menu item with data:', menuData);

            const response = await fetch('http://localhost:5000/MenuItem/AddMenu', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(menuData),
            });
            const data = await response.json();
            console.log('Add menu item response:', data);

            if (response.ok) {
                if (data && data._id) {
                    setMenuItems([...menuItems, data]);
                    setNewMenuItem({ name: '', price: '', description: '', category: '' });
                    alert('Menu item added successfully!');
                } else {
                    setError('Invalid menu item data received from server.');
                }
            } else {
                setError(`Failed to add menu item: ${data.message || 'Unknown error'}`);
            }
        } catch (error) {
            setError('Error adding menu item. Please try again.');
            console.error('Add menu item error:', error);
        }
    };

    // Remove menu item
    const removeMenuItem = async (itemId) => {
        setError('');
        try {
            console.log('Removing menu item with ID:', itemId);
            const response = await fetch(`http://localhost:5000/MenuItem/menuDelete/${itemId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await response.json();
            console.log('Remove menu item response:', data);

            if (response.ok) {
                setMenuItems(menuItems.filter(item => item._id !== itemId));
                alert('Menu item removed successfully!');
            } else {
                setError(`Failed to remove menu item: ${data.message || 'Unknown error'}`);
            }
        } catch (error) {
            setError('Error removing menu item. Please try again.');
            console.error('Remove menu item error:', error);
        }
    };

    // Update menu item
    const updateMenuItem = async (itemId, updatedData) => {
        setError('');
        try {
            console.log('Updating menu item with ID:', itemId, 'Data:', updatedData);
            const response = await fetch(`http://localhost:5000/MenuItem/menu/${itemId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(updatedData),
            });
            const data = await response.json();
            console.log('Update menu item response:', data);

            if (response.ok) {
                if (data && data._id) {
                    setMenuItems(menuItems.map(item =>
                        item._id === itemId ? data : item
                    ));
                    alert('Menu item updated successfully!');
                } else {
                    setError('Invalid menu item data received from server.');
                }
            } else {
                setError(`Failed to update menu item: ${data.message || 'Unknown error'}`);
            }
        } catch (error) {
            setError('Error updating menu item. Please try again.');
            console.error('Update menu item error:', error);
        }
    };

    return (
        <div className="kitchen-dashboard">
            <h2>Admin Dashboard</h2>
            {error && <p className="error-message">{error}</p>}
            <div className="tabs">
                <button className={currentTab === 'staff' ? 'active' : ''} onClick={() => setCurrentTab('staff')}>
                    Manage Staff
                </button>
                <button className={currentTab === 'menu' ? 'active' : ''} onClick={() => setCurrentTab('menu')}>
                    Manage Menu
                </button>
            </div>

            {/* Manage Staff Section */}
            {currentTab === 'staff' && (
                <div className="dashboard-section">
                    <h3>Manage Staff</h3>
                    <form className="add-dish-form" onSubmit={addStaff}>
                        <div className="form-group">
                            <label>First Name</label>
                            <input
                                type="text"
                                value={newStaff.firstName}
                                onChange={(e) => setNewStaff({ ...newStaff, firstName: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Last Name</label>
                            <input
                                type="text"
                                value={newStaff.lastName}
                                onChange={(e) => setNewStaff({ ...newStaff, lastName: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                value={newStaff.email}
                                onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                                required
                                placeholder="e.g., staff@example.com"
                            />
                        </div>
                        <div className="form-group">
                            <label>Role</label>
                            <select
                                value={newStaff.role}
                                onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value, shift: '' })}
                            >
                                <option value="kitchen">Kitchen</option>
                                <option value="waiter">Waiter</option>
                            </select>
                        </div>
                        {newStaff.role === 'waiter' && (
                            <div className="form-group">
                                <label>Shift</label>
                                <select
                                    value={newStaff.shift}
                                    onChange={(e) => setNewStaff({ ...newStaff, shift: e.target.value })}
                                    required
                                >
                                    <option value="">Select Shift</option>
                                    <option value="day">Day</option>
                                    <option value="evening">Evening</option>
                                </select>
                            </div>
                        )}
                        <button type="submit">Add Staff Member</button>
                    </form>
                    <div className="dishes-list">
                        <h4>Current Staff</h4>
                        {staff.length === 0 ? (
                            <p className="no-data">No staff members available.</p>
                        ) : (
                            <ul>
                                {staff.map(member => (
                                    <li key={member._id}>
                                        {member.firstName} {member.lastName} - {member.email} ({member.role}
                                        {member.role === 'waiter' && member.shift ? ` - ${member.shift}` : ''})
                                        <div>
                                            <button
                                                onClick={() => {
                                                    const updatedData = {
                                                        role: member.role === 'kitchen' ? 'waiter' : 'kitchen',
                                                        ...(member.role === 'kitchen' && { shift: 'day' })
                                                    };
                                                    updateStaff(member._id, updatedData);
                                                }}
                                            >
                                                {member.role === 'kitchen' ? 'Make Waiter' : 'Make Kitchen'}
                                            </button>
                                            <button
                                                onClick={() => {
                                                    if (member.role === 'waiter') {
                                                        updateStaff(member._id, { 
                                                            shift: member.shift === 'day' ? 'evening' : 'day' 
                                                        });
                                                    }
                                                }}
                                                disabled={member.role === 'kitchen'}
                                            >
                                                Toggle Shift
                                            </button>
                                            <button onClick={() => deleteStaff(member._id)}>Delete</button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            )}

            {/* Manage Menu Section */}
            {currentTab === 'menu' && (
                <div className="dashboard-section">
                    <h3>Manage Menu Items</h3>
                    <form className="add-dish-form" onSubmit={addMenuItem}>
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                value={newMenuItem.name}
                                onChange={(e) => setNewMenuItem({ ...newMenuItem, name: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Price ($)</label>
                            <input
                                type="number"
                                value={newMenuItem.price}
                                onChange={(e) => setNewMenuItem({ ...newMenuItem, price: e.target.value })}
                                required
                                min="0"
                                step="0.01"
                            />
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <textarea
                                value={newMenuItem.description}
                                onChange={(e) => setNewMenuItem({ ...newMenuItem, description: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Category</label>
                            <select
                                value={newMenuItem.category}
                                onChange={(e) => setNewMenuItem({ ...newMenuItem, category: e.target.value })}
                                required
                            >
                                <option value="">Select Category</option>
                                <option value="appetizer">Appetizer</option>
                                <option value="main">Main</option>
                                <option value="dessert">Dessert</option>
                                <option value="beverage">Beverage</option>
                            </select>
                        </div>
                        <button type="submit">Add Menu Item</button>
                    </form>
                    <div className="dishes-list">
                        <button onClick={fetchMenuItems}>Fetch Current Menu Items</button>
                        {menuItems.length === 0 ? (
                            <p className="no-data">No menu items fetched yet. Click the button above to load them.</p>
                        ) : (
                            <ul>
                                {menuItems.map(item => (
                                    <li key={item._id}>
                                        {item.name} - ${item.price} - {item.description} ({item.category})
                                        <div>
                                            <button
                                                onClick={() => updateMenuItem(item._id, { available: !item.available })}
                                            >
                                                {item.available ? 'Mark Unavailable' : 'Mark Available'}
                                            </button>
                                            <button onClick={() => removeMenuItem(item._id)}>Remove</button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminDashboard;