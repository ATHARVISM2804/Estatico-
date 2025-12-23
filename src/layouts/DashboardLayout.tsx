import { useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Users, 
  Kanban, 
  Calendar, 
  CheckSquare, 
  Mail, 
  GitBranch, 
  BarChart3, 
  Settings,
  Search,
  Bell,
  ChevronDown,
  LogOut,
  User,
  Menu
} from 'lucide-react';
import { useStore } from '../store/useStore';
import styles from './DashboardLayout.module.css';

export default function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, notifications, sidebarCollapsed, toggleSidebar } = useStore();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const navItems = [
    { path: '/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/dashboard/leads', icon: <Users size={20} />, label: 'Leads' },
    { path: '/dashboard/pipeline', icon: <Kanban size={20} />, label: 'Pipeline' },
    { path: '/dashboard/calendar', icon: <Calendar size={20} />, label: 'Calendar' },
    { path: '/dashboard/tasks', icon: <CheckSquare size={20} />, label: 'Tasks' },
    { path: '/dashboard/emails', icon: <Mail size={20} />, label: 'Emails' },
    { path: '/dashboard/workflows', icon: <GitBranch size={20} />, label: 'Workflows' },
    { path: '/dashboard/analytics', icon: <BarChart3 size={20} />, label: 'Analytics' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className={styles.layout}>
      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${sidebarCollapsed ? styles.collapsed : ''} ${showMobileMenu ? styles.mobileOpen : ''}`}>
        <div className={styles.sidebarHeader}>
          <NavLink to="/dashboard" className={styles.logo}>
            <div className={styles.logoIcon}>
              <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="8" width="24" height="18" rx="2" stroke="url(#dashLogoGrad)" strokeWidth="2"/>
                <path d="M4 14L16 22L28 14" stroke="url(#dashLogoGrad)" strokeWidth="2"/>
                <circle cx="16" cy="6" r="3" fill="url(#dashLogoGrad)"/>
                <defs>
                  <linearGradient id="dashLogoGrad" x1="4" y1="3" x2="28" y2="26" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#00d4aa"/>
                    <stop offset="1" stopColor="#00b4d8"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            {!sidebarCollapsed && <span>Estatico</span>}
          </NavLink>
          <button className={styles.collapseBtn} onClick={toggleSidebar}>
            <Menu size={20} />
          </button>
        </div>

        <nav className={styles.nav}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/dashboard'}
              className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
              onClick={() => setShowMobileMenu(false)}
            >
              {item.icon}
              {!sidebarCollapsed && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <NavLink
            to="/dashboard/settings"
            className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
            onClick={() => setShowMobileMenu(false)}
          >
            <Settings size={20} />
            {!sidebarCollapsed && <span>Settings</span>}
          </NavLink>
        </div>
      </aside>

      {/* Mobile overlay */}
      {showMobileMenu && (
        <div className={styles.mobileOverlay} onClick={() => setShowMobileMenu(false)} />
      )}

      {/* Main Content */}
      <div className={styles.main}>
        {/* Top Bar */}
        <header className={styles.topBar}>
          <div className={styles.topBarLeft}>
            <button className={styles.mobileMenuBtn} onClick={() => setShowMobileMenu(true)}>
              <Menu size={24} />
            </button>
            <div className={styles.searchBar}>
              <Search size={18} />
              <input type="text" placeholder="Search leads, tasks, deals..." />
            </div>
          </div>

          <div className={styles.topBarRight}>
            {/* Notifications */}
            <div className={styles.notificationWrapper}>
              <button 
                className={styles.iconBtn}
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell size={20} />
                {unreadCount > 0 && <span className={styles.badge}>{unreadCount}</span>}
              </button>

              {showNotifications && (
                <div className={styles.dropdown}>
                  <div className={styles.dropdownHeader}>
                    <h3>Notifications</h3>
                    <button>Mark all read</button>
                  </div>
                  <div className={styles.notificationList}>
                    {notifications.slice(0, 5).map((n) => (
                      <div key={n.id} className={`${styles.notificationItem} ${!n.read ? styles.unread : ''}`}>
                        <div className={styles.notificationContent}>
                          <p className={styles.notificationTitle}>{n.title}</p>
                          <p className={styles.notificationMessage}>{n.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Menu */}
            <div className={styles.userWrapper}>
              <button 
                className={styles.userBtn}
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <div className={styles.avatar}>
                  {user?.firstName?.[0]}{user?.lastName?.[0]}
                </div>
                <span className={styles.userName}>{user?.firstName} {user?.lastName}</span>
                <ChevronDown size={16} />
              </button>

              {showUserMenu && (
                <div className={styles.dropdown}>
                  <NavLink to="/dashboard/settings" className={styles.dropdownItem} onClick={() => setShowUserMenu(false)}>
                    <User size={18} />
                    Profile
                  </NavLink>
                  <NavLink to="/dashboard/settings" className={styles.dropdownItem} onClick={() => setShowUserMenu(false)}>
                    <Settings size={18} />
                    Settings
                  </NavLink>
                  <div className={styles.dropdownDivider} />
                  <button className={styles.dropdownItem} onClick={handleLogout}>
                    <LogOut size={18} />
                    Log out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className={styles.content}>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Click outside to close dropdowns */}
      {(showUserMenu || showNotifications) && (
        <div 
          className={styles.clickOutside} 
          onClick={() => {
            setShowUserMenu(false);
            setShowNotifications(false);
          }} 
        />
      )}
    </div>
  );
}
