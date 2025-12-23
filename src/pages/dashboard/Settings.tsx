import { useState } from 'react';
import { 
  User, 
  Bell, 
  Link, 
  CreditCard,
  Shield,
  Smartphone,
  Globe,
  Save,
  Camera
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import styles from './Settings.module.css';

type TabType = 'profile' | 'notifications' | 'integrations' | 'billing' | 'security';

export default function Settings() {
  const { user } = useStore();
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [saved, setSaved] = useState(false);

  const tabs = [
    { id: 'profile' as const, label: 'Profile', icon: <User size={18} /> },
    { id: 'notifications' as const, label: 'Notifications', icon: <Bell size={18} /> },
    { id: 'integrations' as const, label: 'Integrations', icon: <Link size={18} /> },
    { id: 'billing' as const, label: 'Billing', icon: <CreditCard size={18} /> },
    { id: 'security' as const, label: 'Security', icon: <Shield size={18} /> },
  ];

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const integrations = [
    { name: 'Zillow', description: 'Sync leads from Zillow', connected: true, icon: '🏠' },
    { name: 'Realtor.com', description: 'Import leads automatically', connected: false, icon: '🏡' },
    { name: 'Gmail', description: 'Send emails through Gmail', connected: true, icon: '📧' },
    { name: 'Google Calendar', description: 'Sync appointments', connected: true, icon: '📅' },
    { name: 'Twilio', description: 'Send SMS messages', connected: false, icon: '📱' },
    { name: 'Stripe', description: 'Process payments', connected: false, icon: '💳' },
  ];

  return (
    <div className={styles.settings}>
      {/* Header */}
      <div className={styles.header}>
        <h1>Settings</h1>
        <p>Manage your account preferences</p>
      </div>

      <div className={styles.layout}>
        {/* Sidebar */}
        <div className={styles.sidebar}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className={styles.content}>
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className={styles.tabContent}>
              <h2>Profile Settings</h2>
              <p className={styles.tabDescription}>
                Update your personal information and preferences
              </p>

              <div className={styles.avatarSection}>
                <div className={styles.avatar}>
                  {user?.avatar ? (
                    <img src={user.avatar} alt="Profile" />
                  ) : (
                    <span>{user?.firstName?.charAt(0) || 'A'}</span>
                  )}
                </div>
                <button className={styles.avatarBtn}>
                  <Camera size={16} />
                  Change Photo
                </button>
              </div>

              <form className={styles.form}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>First Name</label>
                    <input type="text" defaultValue="Alex" />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Last Name</label>
                    <input type="text" defaultValue="Johnson" />
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label>Email</label>
                  <input type="email" defaultValue={user?.email || 'alex@realestate.com'} />
                </div>
                <div className={styles.formGroup}>
                  <label>Phone</label>
                  <input type="tel" defaultValue="(555) 123-4567" />
                </div>
                <div className={styles.formGroup}>
                  <label>Company</label>
                  <input type="text" defaultValue="Johnson Realty Group" />
                </div>
                <div className={styles.formGroup}>
                  <label>License Number</label>
                  <input type="text" defaultValue="RE-123456" />
                </div>
                <div className={styles.formGroup}>
                  <label>Bio</label>
                  <textarea rows={4} defaultValue="Experienced real estate agent with over 10 years in the industry..." />
                </div>
              </form>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className={styles.tabContent}>
              <h2>Notification Preferences</h2>
              <p className={styles.tabDescription}>
                Choose how and when you want to be notified
              </p>

              <div className={styles.notificationSection}>
                <h3>Email Notifications</h3>
                <div className={styles.toggleList}>
                  <div className={styles.toggleItem}>
                    <div>
                      <span>New Lead Alerts</span>
                      <p>Get notified when a new lead is added</p>
                    </div>
                    <label className={styles.toggle}>
                      <input type="checkbox" defaultChecked />
                      <span className={styles.toggleSlider} />
                    </label>
                  </div>
                  <div className={styles.toggleItem}>
                    <div>
                      <span>Task Reminders</span>
                      <p>Receive reminders for upcoming tasks</p>
                    </div>
                    <label className={styles.toggle}>
                      <input type="checkbox" defaultChecked />
                      <span className={styles.toggleSlider} />
                    </label>
                  </div>
                  <div className={styles.toggleItem}>
                    <div>
                      <span>Weekly Summary</span>
                      <p>Get a weekly performance summary</p>
                    </div>
                    <label className={styles.toggle}>
                      <input type="checkbox" defaultChecked />
                      <span className={styles.toggleSlider} />
                    </label>
                  </div>
                  <div className={styles.toggleItem}>
                    <div>
                      <span>Marketing Updates</span>
                      <p>Receive product updates and tips</p>
                    </div>
                    <label className={styles.toggle}>
                      <input type="checkbox" />
                      <span className={styles.toggleSlider} />
                    </label>
                  </div>
                </div>
              </div>

              <div className={styles.notificationSection}>
                <h3>Push Notifications</h3>
                <div className={styles.toggleList}>
                  <div className={styles.toggleItem}>
                    <div>
                      <span>Appointment Reminders</span>
                      <p>Get push notifications 30 min before appointments</p>
                    </div>
                    <label className={styles.toggle}>
                      <input type="checkbox" defaultChecked />
                      <span className={styles.toggleSlider} />
                    </label>
                  </div>
                  <div className={styles.toggleItem}>
                    <div>
                      <span>Lead Responses</span>
                      <p>Notify when leads reply to your emails</p>
                    </div>
                    <label className={styles.toggle}>
                      <input type="checkbox" defaultChecked />
                      <span className={styles.toggleSlider} />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Integrations Tab */}
          {activeTab === 'integrations' && (
            <div className={styles.tabContent}>
              <h2>Integrations</h2>
              <p className={styles.tabDescription}>
                Connect your favorite tools and services
              </p>

              <div className={styles.integrationGrid}>
                {integrations.map((integration, index) => (
                  <div key={index} className={styles.integrationCard}>
                    <div className={styles.integrationIcon}>{integration.icon}</div>
                    <div className={styles.integrationInfo}>
                      <h3>{integration.name}</h3>
                      <p>{integration.description}</p>
                    </div>
                    <button 
                      className={`${styles.integrationBtn} ${integration.connected ? styles.connected : ''}`}
                    >
                      {integration.connected ? 'Connected' : 'Connect'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Billing Tab */}
          {activeTab === 'billing' && (
            <div className={styles.tabContent}>
              <h2>Billing & Subscription</h2>
              <p className={styles.tabDescription}>
                Manage your subscription and payment methods
              </p>

              <div className={styles.planCard}>
                <div className={styles.planInfo}>
                  <span className={styles.planBadge}>Current Plan</span>
                  <h3>Professional</h3>
                  <p className={styles.planPrice}>$99<span>/month</span></p>
                  <ul>
                    <li>Unlimited leads</li>
                    <li>10 active workflows</li>
                    <li>Email & SMS automation</li>
                    <li>Priority support</li>
                  </ul>
                </div>
                <div className={styles.planActions}>
                  <button className={styles.upgradeBtn}>Upgrade to Team</button>
                  <button className={styles.cancelBtn}>Cancel Subscription</button>
                </div>
              </div>

              <div className={styles.paymentSection}>
                <h3>Payment Method</h3>
                <div className={styles.paymentCard}>
                  <div className={styles.cardIcon}>💳</div>
                  <div className={styles.cardInfo}>
                    <span>Visa ending in 4242</span>
                    <span className={styles.cardExpiry}>Expires 12/25</span>
                  </div>
                  <button className={styles.updateBtn}>Update</button>
                </div>
              </div>

              <div className={styles.billingHistory}>
                <h3>Billing History</h3>
                <div className={styles.invoiceList}>
                  <div className={styles.invoice}>
                    <span>Dec 1, 2024</span>
                    <span>Professional Plan</span>
                    <span>$99.00</span>
                    <button>Download</button>
                  </div>
                  <div className={styles.invoice}>
                    <span>Nov 1, 2024</span>
                    <span>Professional Plan</span>
                    <span>$99.00</span>
                    <button>Download</button>
                  </div>
                  <div className={styles.invoice}>
                    <span>Oct 1, 2024</span>
                    <span>Professional Plan</span>
                    <span>$99.00</span>
                    <button>Download</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className={styles.tabContent}>
              <h2>Security Settings</h2>
              <p className={styles.tabDescription}>
                Protect your account with security features
              </p>

              <div className={styles.securitySection}>
                <h3>Change Password</h3>
                <form className={styles.form}>
                  <div className={styles.formGroup}>
                    <label>Current Password</label>
                    <input type="password" placeholder="Enter current password" />
                  </div>
                  <div className={styles.formGroup}>
                    <label>New Password</label>
                    <input type="password" placeholder="Enter new password" />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Confirm New Password</label>
                    <input type="password" placeholder="Confirm new password" />
                  </div>
                  <button type="button" className={styles.changePasswordBtn}>
                    Update Password
                  </button>
                </form>
              </div>

              <div className={styles.securitySection}>
                <h3>Two-Factor Authentication</h3>
                <div className={styles.twoFactor}>
                  <div className={styles.twoFactorInfo}>
                    <Smartphone size={24} />
                    <div>
                      <span>Two-factor authentication is disabled</span>
                      <p>Add an extra layer of security to your account</p>
                    </div>
                  </div>
                  <button className={styles.enableBtn}>Enable 2FA</button>
                </div>
              </div>

              <div className={styles.securitySection}>
                <h3>Active Sessions</h3>
                <div className={styles.sessionList}>
                  <div className={styles.session}>
                    <Globe size={20} />
                    <div>
                      <span>Windows • Chrome</span>
                      <p>Current session</p>
                    </div>
                    <span className={styles.activeBadge}>Active</span>
                  </div>
                  <div className={styles.session}>
                    <Smartphone size={20} />
                    <div>
                      <span>iPhone • Safari</span>
                      <p>Last active 2 hours ago</p>
                    </div>
                    <button className={styles.revokeBtn}>Revoke</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className={styles.saveBar}>
            <button className={styles.saveBtn} onClick={handleSave}>
              <Save size={18} />
              {saved ? 'Saved!' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
