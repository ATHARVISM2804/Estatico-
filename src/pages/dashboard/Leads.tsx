import { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  Mail, 
  Phone,
  ChevronDown,
  X,
  User,
  Building,
  DollarSign,
  Calendar,
  Tag
} from 'lucide-react';
import { useStore, type Lead } from '../../store/useStore';
import styles from './Leads.module.css';

const statusOptions = ['all', 'new', 'contacted', 'qualified', 'showing', 'offer', 'contract', 'closed', 'lost'] as const;
const sourceOptions = ['all', 'zillow', 'realtor', 'referral', 'facebook', 'google', 'website', 'open_house'] as const;

export default function Leads() {
  const { leads, addLead } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery);
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    const matchesSource = sourceFilter === 'all' || lead.source === sourceFilter;
    return matchesSearch && matchesStatus && matchesSource;
  });

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      new: '#6366f1',
      contacted: '#8b5cf6',
      qualified: '#00d4aa',
      showing: '#00b4d8',
      offer: '#f59e0b',
      contract: '#10b981',
      closed: '#22c55e',
      lost: '#ef4444',
    };
    return colors[status] || '#64748b';
  };

  const handleAddLead = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newLead: Lead = {
      id: Date.now().toString(),
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      source: formData.get('source') as Lead['source'],
      status: 'new',
      propertyInterest: formData.get('propertyInterest') as string,
      dealValue: parseInt(formData.get('dealValue') as string) || 0,
      notes: formData.get('notes') as string,
      tags: [],
      createdAt: new Date().toISOString(),
      lastContact: new Date().toISOString(),
    };
    addLead(newLead);
    setShowAddModal(false);
  };

  return (
    <div className={styles.leads}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1>Leads</h1>
          <p>{filteredLeads.length} total leads</p>
        </div>
        <button className={styles.addBtn} onClick={() => setShowAddModal(true)}>
          <Plus size={20} />
          Add Lead
        </button>
      </div>

      {/* Toolbar */}
      <div className={styles.toolbar}>
        <div className={styles.searchBox}>
          <Search size={20} />
          <input
            type="text"
            placeholder="Search leads..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button 
          className={`${styles.filterBtn} ${showFilters ? styles.active : ''}`}
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter size={18} />
          Filters
          <ChevronDown size={16} />
        </button>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className={styles.filters}>
          <div className={styles.filterGroup}>
            <label>Status</label>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              {statusOptions.map(opt => (
                <option key={opt} value={opt}>{opt === 'all' ? 'All Statuses' : opt.charAt(0).toUpperCase() + opt.slice(1)}</option>
              ))}
            </select>
          </div>
          <div className={styles.filterGroup}>
            <label>Source</label>
            <select value={sourceFilter} onChange={(e) => setSourceFilter(e.target.value)}>
              {sourceOptions.map(opt => (
                <option key={opt} value={opt}>{opt === 'all' ? 'All Sources' : opt.replace('_', ' ').charAt(0).toUpperCase() + opt.replace('_', ' ').slice(1)}</option>
              ))}
            </select>
          </div>
          <button className={styles.clearFilters} onClick={() => { setStatusFilter('all'); setSourceFilter('all'); }}>
            Clear Filters
          </button>
        </div>
      )}

      {/* Leads Table */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact</th>
              <th>Status</th>
              <th>Source</th>
              <th>Deal Value</th>
              <th>Last Contact</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map((lead) => (
              <tr key={lead.id} onClick={() => setSelectedLead(lead)}>
                <td>
                  <div className={styles.leadName}>
                    <div className={styles.avatar}>
                      {lead.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p>{lead.name}</p>
                      {lead.propertyInterest && (
                        <span className={styles.property}>{lead.propertyInterest}</span>
                      )}
                    </div>
                  </div>
                </td>
                <td>
                  <div className={styles.contact}>
                    <span><Mail size={14} /> {lead.email}</span>
                    <span><Phone size={14} /> {lead.phone}</span>
                  </div>
                </td>
                <td>
                  <span 
                    className={styles.status}
                    style={{ background: `${getStatusColor(lead.status)}20`, color: getStatusColor(lead.status) }}
                  >
                    {lead.status}
                  </span>
                </td>
                <td>
                  <span className={styles.source}>{lead.source.replace('_', ' ')}</span>
                </td>
                <td>
                  <span className={styles.dealValue}>
                    ${(lead.dealValue || 0).toLocaleString()}
                  </span>
                </td>
                <td>
                  <span className={styles.date}>
                    {new Date(lead.lastContact).toLocaleDateString()}
                  </span>
                </td>
                <td>
                  <button className={styles.moreBtn} onClick={(e) => e.stopPropagation()}>
                    <MoreVertical size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredLeads.length === 0 && (
          <div className={styles.empty}>
            <User size={48} />
            <h3>No leads found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Add Lead Modal */}
      {showAddModal && (
        <div className={styles.modalOverlay} onClick={() => setShowAddModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>Add New Lead</h2>
              <button onClick={() => setShowAddModal(false)}>
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleAddLead}>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label><User size={16} /> Full Name</label>
                  <input type="text" name="name" required placeholder="John Doe" />
                </div>
                <div className={styles.formGroup}>
                  <label><Mail size={16} /> Email</label>
                  <input type="email" name="email" required placeholder="john@example.com" />
                </div>
                <div className={styles.formGroup}>
                  <label><Phone size={16} /> Phone</label>
                  <input type="tel" name="phone" required placeholder="(555) 123-4567" />
                </div>
                <div className={styles.formGroup}>
                  <label><Tag size={16} /> Source</label>
                  <select name="source" required>
                    {sourceOptions.filter(s => s !== 'all').map(opt => (
                      <option key={opt} value={opt}>{opt.replace('_', ' ')}</option>
                    ))}
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label><Building size={16} /> Property Interest</label>
                  <input type="text" name="propertyInterest" placeholder="3BR house in Downtown" />
                </div>
                <div className={styles.formGroup}>
                  <label><DollarSign size={16} /> Deal Value</label>
                  <input type="number" name="dealValue" placeholder="500000" />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label>Notes</label>
                <textarea name="notes" rows={3} placeholder="Add any notes about this lead..." />
              </div>
              <div className={styles.modalActions}>
                <button type="button" className={styles.cancelBtn} onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="submit" className={styles.submitBtn}>
                  Add Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lead Detail Panel */}
      {selectedLead && (
        <div className={styles.detailOverlay} onClick={() => setSelectedLead(null)}>
          <div className={styles.detailPanel} onClick={(e) => e.stopPropagation()}>
            <div className={styles.detailHeader}>
              <div className={styles.detailAvatar}>
                {selectedLead.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2>{selectedLead.name}</h2>
                <span 
                  className={styles.status}
                  style={{ background: `${getStatusColor(selectedLead.status)}20`, color: getStatusColor(selectedLead.status) }}
                >
                  {selectedLead.status}
                </span>
              </div>
              <button className={styles.closeBtn} onClick={() => setSelectedLead(null)}>
                <X size={24} />
              </button>
            </div>
            
            <div className={styles.detailContent}>
              <div className={styles.detailSection}>
                <h3>Contact Information</h3>
                <div className={styles.detailItem}>
                  <Mail size={18} />
                  <span>{selectedLead.email}</span>
                </div>
                <div className={styles.detailItem}>
                  <Phone size={18} />
                  <span>{selectedLead.phone}</span>
                </div>
              </div>

              <div className={styles.detailSection}>
                <h3>Lead Details</h3>
                <div className={styles.detailGrid}>
                  <div>
                    <label>Source</label>
                    <p>{selectedLead.source.replace('_', ' ')}</p>
                  </div>
                  <div>
                    <label>Deal Value</label>
                    <p>${(selectedLead.dealValue || 0).toLocaleString()}</p>
                  </div>
                  <div>
                    <label>Property Interest</label>
                    <p>{selectedLead.propertyInterest || 'Not specified'}</p>
                  </div>
                  <div>
                    <label>Created</label>
                    <p>{new Date(selectedLead.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              {selectedLead.notes && (
                <div className={styles.detailSection}>
                  <h3>Notes</h3>
                  <p className={styles.notes}>{selectedLead.notes}</p>
                </div>
              )}

              <div className={styles.detailActions}>
                <button className={styles.actionBtn}>
                  <Mail size={18} /> Send Email
                </button>
                <button className={styles.actionBtn}>
                  <Phone size={18} /> Call
                </button>
                <button className={styles.actionBtn}>
                  <Calendar size={18} /> Schedule
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
