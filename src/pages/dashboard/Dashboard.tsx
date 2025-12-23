import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  ChevronRight,
  Clock,
  Calendar as CalendarIcon,
  CheckCircle
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import styles from './Dashboard.module.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export default function Dashboard() {
  const { leads, tasks, appointments, activities } = useStore();

  const stats = [
    {
      title: 'Total Leads',
      value: leads.length.toString(),
      change: '+12%',
      trend: 'up',
      icon: <Users size={24} />,
      color: 'cyan',
    },
    {
      title: 'Pipeline Value',
      value: '$' + (leads.reduce((sum, l) => sum + (l.dealValue || 0), 0) / 1000).toFixed(0) + 'K',
      change: '+8%',
      trend: 'up',
      icon: <DollarSign size={24} />,
      color: 'blue',
    },
    {
      title: 'Close Rate',
      value: '68%',
      change: '+5%',
      trend: 'up',
      icon: <Target size={24} />,
      color: 'violet',
    },
    {
      title: 'Monthly Revenue',
      value: '$142K',
      change: '-3%',
      trend: 'down',
      icon: <TrendingUp size={24} />,
      color: 'cyan',
    },
  ];

  const todayTasks = tasks.filter(t => t.status === 'pending').slice(0, 5);
  const upcomingAppointments = appointments.slice(0, 3);
  const recentActivities = activities.slice(0, 6);

  const pipelineStats = [
    { stage: 'New', count: leads.filter(l => l.status === 'new').length, color: '#6366f1' },
    { stage: 'Contacted', count: leads.filter(l => l.status === 'contacted').length, color: '#8b5cf6' },
    { stage: 'Qualified', count: leads.filter(l => l.status === 'qualified').length, color: '#00d4aa' },
    { stage: 'Showing', count: leads.filter(l => l.status === 'showing').length, color: '#00b4d8' },
    { stage: 'Offer', count: leads.filter(l => l.status === 'offer').length, color: '#f59e0b' },
    { stage: 'Contract', count: leads.filter(l => l.status === 'contract').length, color: '#10b981' },
  ];

  return (
    <motion.div 
      className={styles.dashboard}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className={styles.header} variants={itemVariants}>
        <div>
          <h1>Welcome back, Alex! 👋</h1>
          <p>Here's what's happening with your business today.</p>
        </div>
        <Link to="/dashboard/leads" className={styles.addBtn}>
          <Plus size={20} />
          Add Lead
        </Link>
      </motion.div>

      {/* Stats Grid */}
      <motion.div className={styles.statsGrid} variants={itemVariants}>
        {stats.map((stat, index) => (
          <motion.div 
            key={index} 
            className={`${styles.statCard} ${styles[stat.color]}`}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            <div className={styles.statIcon}>{stat.icon}</div>
            <div className={styles.statContent}>
              <p className={styles.statTitle}>{stat.title}</p>
              <p className={styles.statValue}>{stat.value}</p>
              <div className={`${styles.statChange} ${stat.trend === 'up' ? styles.up : styles.down}`}>
                {stat.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.change} vs last month
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Grid */}
      <div className={styles.mainGrid}>
        {/* Today's Tasks */}
        <motion.div className={styles.card} variants={itemVariants}>
          <div className={styles.cardHeader}>
            <h2>Today's Tasks</h2>
            <Link to="/dashboard/tasks" className={styles.viewAll}>
              View all <ChevronRight size={16} />
            </Link>
          </div>
          <div className={styles.taskList}>
            {todayTasks.map((task) => (
              <div key={task.id} className={styles.taskItem}>
                <button className={styles.taskCheck}>
                  <CheckCircle size={18} />
                </button>
                <div className={styles.taskContent}>
                  <p className={styles.taskTitle}>{task.title}</p>
                  <p className={styles.taskMeta}>
                    <Clock size={12} />
                    Due {task.dueDate}
                  </p>
                </div>
                <span className={`${styles.taskPriority} ${styles[task.priority]}`}>
                  {task.priority}
                </span>
              </div>
            ))}
            {todayTasks.length === 0 && (
              <p className={styles.emptyState}>No tasks for today! 🎉</p>
            )}
          </div>
        </motion.div>

        {/* Pipeline Summary */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2>Pipeline Summary</h2>
            <Link to="/dashboard/pipeline" className={styles.viewAll}>
              View all <ChevronRight size={16} />
            </Link>
          </div>
          <div className={styles.pipelineChart}>
            {pipelineStats.map((stage, index) => (
              <div key={index} className={styles.pipelineStage}>
                <div className={styles.stageBar}>
                  <div 
                    className={styles.stageBarFill} 
                    style={{ 
                      height: `${Math.max((stage.count / Math.max(...pipelineStats.map(s => s.count))) * 100, 10)}%`,
                      background: stage.color 
                    }}
                  />
                </div>
                <div className={styles.stageInfo}>
                  <span className={styles.stageCount}>{stage.count}</span>
                  <span className={styles.stageName}>{stage.stage}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2>Upcoming Appointments</h2>
            <Link to="/dashboard/calendar" className={styles.viewAll}>
              View all <ChevronRight size={16} />
            </Link>
          </div>
          <div className={styles.appointmentList}>
            {upcomingAppointments.map((apt) => (
              <div key={apt.id} className={styles.appointmentItem}>
                <div className={styles.appointmentIcon}>
                  <CalendarIcon size={18} />
                </div>
                <div className={styles.appointmentContent}>
                  <p className={styles.appointmentTitle}>{apt.title}</p>
                  <p className={styles.appointmentMeta}>
                    {apt.date} • {apt.startTime} - {apt.endTime}
                  </p>
                  {apt.location && (
                    <p className={styles.appointmentLocation}>📍 {apt.location}</p>
                  )}
                </div>
                <span className={`${styles.appointmentType} ${styles[apt.type]}`}>
                  {apt.type}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2>Recent Activity</h2>
          </div>
          <div className={styles.activityFeed}>
            {recentActivities.map((activity, index) => (
              <div key={activity.id} className={styles.activityItem}>
                <div className={styles.activityLine}>
                  {index < recentActivities.length - 1 && <div className={styles.activityConnector} />}
                </div>
                <div className={styles.activityDot} />
                <div className={styles.activityContent}>
                  <p>{activity.description}</p>
                  <span className={styles.activityTime}>
                    {new Date(activity.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <motion.div className={styles.quickActions} variants={itemVariants}>
        <h2>Quick Actions</h2>
        <div className={styles.actionGrid}>
          <Link to="/dashboard/leads" className={styles.actionCard}>
            <Users size={24} />
            <span>Add New Lead</span>
          </Link>
          <Link to="/dashboard/emails" className={styles.actionCard}>
            <CalendarIcon size={24} />
            <span>Schedule Email</span>
          </Link>
          <Link to="/dashboard/workflows" className={styles.actionCard}>
            <Target size={24} />
            <span>Create Workflow</span>
          </Link>
          <Link to="/dashboard/analytics" className={styles.actionCard}>
            <TrendingUp size={24} />
            <span>View Reports</span>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}
