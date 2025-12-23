import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Mail, 
  Phone,
  Calendar,
  Edit3,
  Trash2,
  DollarSign,
  Tag,
  Clock,
  MessageSquare,
  CheckCircle2,
  Plus
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import styles from './ContactProfile.module.css';

export default function ContactProfile() {
  const { id } = useParams<{ id: string }>();
  const { leads, tasks, appointments, activities } = useStore();

  const lead = leads.find(l => l.id === id);

  if (!lead) {
    return (
      <div className={styles.notFound}>
        <h2>Contact Not Found</h2>
        <p>The contact you're looking for doesn't exist.</p>
        <Link to="/dashboard/leads" className={styles.backBtn}>
          <ArrowLeft size={20} />
          Back to Leads
        </Link>
      </div>
    );
  }

  const leadTasks = tasks.filter(t => t.leadId === id);
  const leadAppointments = appointments.filter(a => a.leadId === id);
  const leadActivities = activities.filter(a => a.leadId === id);

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

  return (
    <div className={styles.profile}>
      {/* Header */}
      <div className={styles.header}>
        <Link to="/dashboard/leads" className={styles.backLink}>
          <ArrowLeft size={20} />
          Back to Leads
        </Link>
        <div className={styles.headerActions}>
          <button className={styles.editBtn}>
            <Edit3 size={18} />
            Edit
          </button>
          <button className={styles.deleteBtn}>
            <Trash2 size={18} />
            Delete
          </button>
        </div>
      </div>

      <div className={styles.layout}>
        {/* Main Info */}
        <div className={styles.mainSection}>
          {/* Contact Card */}
          <div className={styles.contactCard}>
            <div className={styles.avatar}>
              {lead.name.charAt(0).toUpperCase()}
            </div>
            <div className={styles.contactInfo}>
              <h1>{lead.name}</h1>
              <span 
                className={styles.status}
                style={{ 
                  background: `${getStatusColor(lead.status)}20`,
                  color: getStatusColor(lead.status)
                }}
              >
                {lead.status}
              </span>
              <div className={styles.contactDetails}>
                <a href={`mailto:${lead.email}`}>
                  <Mail size={16} />
                  {lead.email}
                </a>
                <a href={`tel:${lead.phone}`}>
                  <Phone size={16} />
                  {lead.phone}
                </a>
              </div>
            </div>
            <div className={styles.quickActions}>
              <button className={styles.actionBtn}>
                <Mail size={18} />
                Email
              </button>
              <button className={styles.actionBtn}>
                <Phone size={18} />
                Call
              </button>
              <button className={styles.actionBtn}>
                <Calendar size={18} />
                Schedule
              </button>
              <button className={styles.actionBtn}>
                <MessageSquare size={18} />
                SMS
              </button>
            </div>
          </div>

          {/* Activity Timeline */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2>Activity Timeline</h2>
              <button className={styles.addBtn}>
                <Plus size={16} />
                Add Note
              </button>
            </div>
            <div className={styles.timeline}>
              {leadActivities.length > 0 ? (
                leadActivities.map((activity, index) => (
                  <div key={activity.id} className={styles.timelineItem}>
                    <div className={styles.timelineDot} />
                    {index < leadActivities.length - 1 && <div className={styles.timelineLine} />}
                    <div className={styles.timelineContent}>
                      <p>{activity.description}</p>
                      <span className={styles.timelineDate}>
                        <Clock size={12} />
                        {new Date(activity.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className={styles.emptyTimeline}>
                  <p>No activity yet</p>
                </div>
              )}
            </div>
          </div>

          {/* Tasks */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2>Tasks</h2>
              <button className={styles.addBtn}>
                <Plus size={16} />
                Add Task
              </button>
            </div>
            <div className={styles.taskList}>
              {leadTasks.length > 0 ? (
                leadTasks.map((task) => (
                  <div key={task.id} className={styles.taskItem}>
                    <button className={styles.taskCheck}>
                      <CheckCircle2 size={20} />
                    </button>
                    <div className={styles.taskContent}>
                      <p>{task.title}</p>
                      <span className={styles.taskDue}>
                        <Calendar size={12} />
                        Due {task.dueDate}
                      </span>
                    </div>
                    <span className={`${styles.taskPriority} ${styles[task.priority]}`}>
                      {task.priority}
                    </span>
                  </div>
                ))
              ) : (
                <p className={styles.emptyList}>No tasks for this contact</p>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className={styles.sidebar}>
          {/* Lead Details */}
          <div className={styles.sidebarCard}>
            <h3>Lead Details</h3>
            <div className={styles.detailList}>
              <div className={styles.detailItem}>
                <label>Source</label>
                <span>{lead.source.replace('_', ' ')}</span>
              </div>
              <div className={styles.detailItem}>
                <label>Deal Value</label>
                <span className={styles.dealValue}>
                  <DollarSign size={16} />
                  {(lead.dealValue || 0).toLocaleString()}
                </span>
              </div>
              <div className={styles.detailItem}>
                <label>Property Interest</label>
                <span>{lead.propertyInterest || 'Not specified'}</span>
              </div>
              <div className={styles.detailItem}>
                <label>Created</label>
                <span>{new Date(lead.createdAt).toLocaleDateString()}</span>
              </div>
              <div className={styles.detailItem}>
                <label>Last Contact</label>
                <span>{new Date(lead.lastContact).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className={styles.sidebarCard}>
            <h3>Tags</h3>
            <div className={styles.tags}>
              {lead.tags && lead.tags.length > 0 ? (
                lead.tags.map((tag, index) => (
                  <span key={index} className={styles.tag}>
                    <Tag size={12} />
                    {tag}
                  </span>
                ))
              ) : (
                <button className={styles.addTagBtn}>
                  <Plus size={14} />
                  Add Tag
                </button>
              )}
            </div>
          </div>

          {/* Upcoming Appointments */}
          <div className={styles.sidebarCard}>
            <h3>Appointments</h3>
            <div className={styles.appointmentList}>
              {leadAppointments.length > 0 ? (
                leadAppointments.map((apt) => (
                  <div key={apt.id} className={styles.appointmentItem}>
                    <div className={styles.aptIcon}>
                      <Calendar size={16} />
                    </div>
                    <div>
                      <p>{apt.title}</p>
                      <span>{apt.date} • {apt.startTime}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className={styles.emptyList}>No appointments scheduled</p>
              )}
            </div>
          </div>

          {/* Notes */}
          <div className={styles.sidebarCard}>
            <h3>Notes</h3>
            <p className={styles.notes}>
              {lead.notes || 'No notes added yet.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
