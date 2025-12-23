import { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus,
  Clock,
  MapPin,
  User
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import styles from './Calendar.module.css';

type ViewType = 'month' | 'week' | 'day';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 
                'July', 'August', 'September', 'October', 'November', 'December'];

export default function Calendar() {
  const { appointments } = useStore();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<ViewType>('month');

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDayOfWeek = firstDay.getDay();

    const days: { date: Date; isCurrentMonth: boolean }[] = [];

    // Previous month days
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonthLastDay - i),
        isCurrentMonth: false,
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true,
      });
    }

    // Next month days
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
      });
    }

    return days;
  };

  const getAppointmentsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return appointments.filter(apt => apt.date === dateStr);
  };

  const navigateMonth = (direction: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const days = getDaysInMonth(currentDate);

  const getAppointmentTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      showing: '#00d4aa',
      meeting: '#7c3aed',
      call: '#00b4d8',
      closing: '#10b981',
    };
    return colors[type] || '#64748b';
  };

  // Get upcoming appointments
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const upcomingAppointments = appointments
    .filter(apt => new Date(apt.date) >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  return (
    <div className={styles.calendar}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1>Calendar</h1>
          <p>Manage your showings, meetings, and appointments</p>
        </div>
        <button className={styles.addBtn}>
          <Plus size={20} />
          Add Event
        </button>
      </div>

      <div className={styles.layout}>
        {/* Calendar Grid */}
        <div className={styles.calendarContainer}>
          {/* Calendar Header */}
          <div className={styles.calendarHeader}>
            <div className={styles.navigation}>
              <button onClick={() => navigateMonth(-1)}>
                <ChevronLeft size={20} />
              </button>
              <h2>{MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
              <button onClick={() => navigateMonth(1)}>
                <ChevronRight size={20} />
              </button>
            </div>
            <div className={styles.headerActions}>
              <button className={styles.todayBtn} onClick={goToToday}>
                Today
              </button>
              <div className={styles.viewToggle}>
                {(['month', 'week', 'day'] as ViewType[]).map((v) => (
                  <button
                    key={v}
                    className={view === v ? styles.active : ''}
                    onClick={() => setView(v)}
                  >
                    {v.charAt(0).toUpperCase() + v.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Days Header */}
          <div className={styles.daysHeader}>
            {DAYS.map((day) => (
              <div key={day} className={styles.dayHeader}>
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className={styles.grid}>
            {days.map((day, index) => {
              const dayAppointments = getAppointmentsForDate(day.date);
              return (
                <div
                  key={index}
                  className={`${styles.cell} ${!day.isCurrentMonth ? styles.otherMonth : ''} ${isToday(day.date) ? styles.today : ''}`}
                >
                  <span className={styles.dateNumber}>
                    {day.date.getDate()}
                  </span>
                  <div className={styles.appointments}>
                    {dayAppointments.slice(0, 2).map((apt) => (
                      <div
                        key={apt.id}
                        className={styles.appointment}
                        style={{ borderLeftColor: getAppointmentTypeColor(apt.type) }}
                      >
                        <span className={styles.aptTime}>{apt.startTime}</span>
                        <span className={styles.aptTitle}>{apt.title}</span>
                      </div>
                    ))}
                    {dayAppointments.length > 2 && (
                      <span className={styles.moreCount}>
                        +{dayAppointments.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar - Upcoming */}
        <div className={styles.sidebar}>
          <h3>Upcoming Events</h3>
          <div className={styles.upcomingList}>
            {upcomingAppointments.map((apt) => (
              <div key={apt.id} className={styles.upcomingItem}>
                <div 
                  className={styles.upcomingType}
                  style={{ background: getAppointmentTypeColor(apt.type) }}
                />
                <div className={styles.upcomingContent}>
                  <p className={styles.upcomingTitle}>{apt.title}</p>
                  <div className={styles.upcomingMeta}>
                    <span>
                      <Clock size={12} />
                      {apt.date} • {apt.startTime}
                    </span>
                    {apt.location && (
                      <span>
                        <MapPin size={12} />
                        {apt.location}
                      </span>
                    )}
                    {apt.leadId && (
                      <span>
                        <User size={12} />
                        Lead attached
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {upcomingAppointments.length === 0 && (
              <p className={styles.emptyState}>No upcoming events</p>
            )}
          </div>

          {/* Quick Stats */}
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statValue}>
                {appointments.filter(a => a.type === 'showing').length}
              </span>
              <span className={styles.statLabel}>Showings</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>
                {appointments.filter(a => a.type === 'meeting').length}
              </span>
              <span className={styles.statLabel}>Meetings</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>
                {appointments.filter(a => a.type === 'closing').length}
              </span>
              <span className={styles.statLabel}>Closings</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
