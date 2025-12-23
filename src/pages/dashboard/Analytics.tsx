import { useState } from 'react';
import { 
  TrendingUp,
  Users,
  DollarSign,
  Target,
  Calendar,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import styles from './Analytics.module.css';

type TimeRange = '7d' | '30d' | '90d' | '12m';

export default function Analytics() {
  const { leads, tasks, appointments } = useStore();
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');

  // Calculate stats
  const totalLeads = leads.length;
  const closedDeals = leads.filter(l => l.status === 'closed').length;
  const conversionRate = totalLeads > 0 ? ((closedDeals / totalLeads) * 100).toFixed(1) : '0';
  const totalRevenue = leads
    .filter(l => l.status === 'closed')
    .reduce((sum, l) => sum + (l.dealValue || 0), 0);
  const avgDealValue = closedDeals > 0 ? totalRevenue / closedDeals : 0;

  // Lead sources breakdown
  const leadSources = leads.reduce((acc, lead) => {
    acc[lead.source] = (acc[lead.source] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const sourceData = Object.entries(leadSources)
    .map(([source, count]) => ({
      source: source.replace('_', ' '),
      count,
      percentage: ((count / totalLeads) * 100).toFixed(1),
    }))
    .sort((a, b) => b.count - a.count);

  // Pipeline stages
  const pipelineStages = [
    { stage: 'New', count: leads.filter(l => l.status === 'new').length, color: '#6366f1' },
    { stage: 'Contacted', count: leads.filter(l => l.status === 'contacted').length, color: '#8b5cf6' },
    { stage: 'Qualified', count: leads.filter(l => l.status === 'qualified').length, color: '#00d4aa' },
    { stage: 'Showing', count: leads.filter(l => l.status === 'showing').length, color: '#00b4d8' },
    { stage: 'Offer', count: leads.filter(l => l.status === 'offer').length, color: '#f59e0b' },
    { stage: 'Contract', count: leads.filter(l => l.status === 'contract').length, color: '#10b981' },
    { stage: 'Closed', count: leads.filter(l => l.status === 'closed').length, color: '#22c55e' },
  ];

  const maxStageCount = Math.max(...pipelineStages.map(s => s.count), 1);

  // Activity metrics
  const taskStats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'completed').length,
    pending: tasks.filter(t => t.status === 'pending').length,
  };

  const stats = [
    {
      title: 'Total Leads',
      value: totalLeads.toString(),
      change: '+12%',
      trend: 'up' as const,
      icon: <Users size={24} />,
    },
    {
      title: 'Conversion Rate',
      value: `${conversionRate}%`,
      change: '+3.2%',
      trend: 'up' as const,
      icon: <Target size={24} />,
    },
    {
      title: 'Total Revenue',
      value: `$${(totalRevenue / 1000).toFixed(0)}K`,
      change: '+18%',
      trend: 'up' as const,
      icon: <DollarSign size={24} />,
    },
    {
      title: 'Avg Deal Value',
      value: `$${(avgDealValue / 1000).toFixed(0)}K`,
      change: '-2%',
      trend: 'down' as const,
      icon: <TrendingUp size={24} />,
    },
  ];

  // Mock monthly data for chart
  const monthlyData = [
    { month: 'Jan', leads: 12, deals: 3, revenue: 285000 },
    { month: 'Feb', leads: 18, deals: 5, revenue: 425000 },
    { month: 'Mar', leads: 15, deals: 4, revenue: 380000 },
    { month: 'Apr', leads: 22, deals: 6, revenue: 520000 },
    { month: 'May', leads: 28, deals: 8, revenue: 680000 },
    { month: 'Jun', leads: 24, deals: 7, revenue: 595000 },
  ];

  const maxRevenue = Math.max(...monthlyData.map(d => d.revenue));

  return (
    <div className={styles.analytics}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1>Analytics</h1>
          <p>Track your performance and growth</p>
        </div>
        <div className={styles.timeRange}>
          {(['7d', '30d', '90d', '12m'] as TimeRange[]).map((range) => (
            <button
              key={range}
              className={timeRange === range ? styles.active : ''}
              onClick={() => setTimeRange(range)}
            >
              {range === '12m' ? '12 Months' : `${range.replace('d', '')} Days`}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className={styles.statsGrid}>
        {stats.map((stat, index) => (
          <div key={index} className={styles.statCard}>
            <div className={styles.statIcon}>{stat.icon}</div>
            <div className={styles.statContent}>
              <p className={styles.statTitle}>{stat.title}</p>
              <p className={styles.statValue}>{stat.value}</p>
              <div className={`${styles.statChange} ${stat.trend === 'up' ? styles.up : styles.down}`}>
                {stat.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.change} vs last period
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className={styles.chartsRow}>
        {/* Revenue Chart */}
        <div className={styles.chartCard}>
          <h2>Revenue Overview</h2>
          <div className={styles.barChart}>
            {monthlyData.map((data, index) => (
              <div key={index} className={styles.barGroup}>
                <div className={styles.barContainer}>
                  <div 
                    className={styles.bar}
                    style={{ height: `${(data.revenue / maxRevenue) * 100}%` }}
                  >
                    <span className={styles.barValue}>${(data.revenue / 1000).toFixed(0)}K</span>
                  </div>
                </div>
                <span className={styles.barLabel}>{data.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Lead Sources */}
        <div className={styles.chartCard}>
          <h2>Lead Sources</h2>
          <div className={styles.sourceList}>
            {sourceData.map((source, index) => (
              <div key={index} className={styles.sourceItem}>
                <div className={styles.sourceInfo}>
                  <span className={styles.sourceName}>{source.source}</span>
                  <span className={styles.sourceCount}>{source.count} leads</span>
                </div>
                <div className={styles.sourceBar}>
                  <div 
                    className={styles.sourceBarFill}
                    style={{ width: `${source.percentage}%` }}
                  />
                </div>
                <span className={styles.sourcePercent}>{source.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className={styles.bottomRow}>
        {/* Pipeline Funnel */}
        <div className={styles.chartCard}>
          <h2>Pipeline Funnel</h2>
          <div className={styles.funnel}>
            {pipelineStages.map((stage, index) => (
              <div key={index} className={styles.funnelStage}>
                <div className={styles.funnelInfo}>
                  <span 
                    className={styles.funnelDot}
                    style={{ background: stage.color }}
                  />
                  <span className={styles.funnelName}>{stage.stage}</span>
                </div>
                <div className={styles.funnelBar}>
                  <div 
                    className={styles.funnelBarFill}
                    style={{ 
                      width: `${(stage.count / maxStageCount) * 100}%`,
                      background: stage.color 
                    }}
                  />
                </div>
                <span className={styles.funnelCount}>{stage.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Task Completion */}
        <div className={styles.chartCard}>
          <h2>Task Completion</h2>
          <div className={styles.donutContainer}>
            <div className={styles.donut}>
              <svg viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="var(--bg-elevated)"
                  strokeWidth="12"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="var(--primary-cyan)"
                  strokeWidth="12"
                  strokeDasharray={`${(taskStats.completed / taskStats.total) * 251.2} 251.2`}
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className={styles.donutCenter}>
                <span className={styles.donutValue}>
                  {taskStats.total > 0 ? Math.round((taskStats.completed / taskStats.total) * 100) : 0}%
                </span>
                <span className={styles.donutLabel}>Complete</span>
              </div>
            </div>
            <div className={styles.donutLegend}>
              <div className={styles.legendItem}>
                <span className={styles.legendDot} style={{ background: 'var(--primary-cyan)' }} />
                <span>Completed ({taskStats.completed})</span>
              </div>
              <div className={styles.legendItem}>
                <span className={styles.legendDot} style={{ background: 'var(--bg-elevated)' }} />
                <span>Pending ({taskStats.pending})</span>
              </div>
            </div>
          </div>
        </div>

        {/* Appointments */}
        <div className={styles.chartCard}>
          <h2>Appointments This Week</h2>
          <div className={styles.appointmentStats}>
            <div className={styles.appointmentStat}>
              <Calendar size={32} />
              <div>
                <span className={styles.appointmentValue}>{appointments.length}</span>
                <span className={styles.appointmentLabel}>Total Scheduled</span>
              </div>
            </div>
            <div className={styles.appointmentBreakdown}>
              <div className={styles.breakdownItem}>
                <span className={styles.breakdownDot} style={{ background: '#00d4aa' }} />
                <span>Showings</span>
                <span>{appointments.filter(a => a.type === 'showing').length}</span>
              </div>
              <div className={styles.breakdownItem}>
                <span className={styles.breakdownDot} style={{ background: '#7c3aed' }} />
                <span>Meetings</span>
                <span>{appointments.filter(a => a.type === 'meeting').length}</span>
              </div>
              <div className={styles.breakdownItem}>
                <span className={styles.breakdownDot} style={{ background: '#00b4d8' }} />
                <span>Calls</span>
                <span>{appointments.filter(a => a.type === 'call').length}</span>
              </div>
              <div className={styles.breakdownItem}>
                <span className={styles.breakdownDot} style={{ background: '#10b981' }} />
                <span>Closings</span>
                <span>{appointments.filter(a => a.type === 'closing').length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
