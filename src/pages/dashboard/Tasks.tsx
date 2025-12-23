import { useState } from 'react';
import { 
  Search, 
  Plus, 
  CheckCircle2,
  Circle,
  Calendar,
  User,
  AlertCircle,
  Trash2
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import styles from './Tasks.module.css';

type FilterType = 'all' | 'today' | 'overdue' | 'completed';

export default function Tasks() {
  const { tasks, leads, updateTask, deleteTask, addTask } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const today = new Date().toISOString().split('T')[0];

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesFilter = true;
    switch (filter) {
      case 'today':
        matchesFilter = task.dueDate === today && task.status !== 'completed';
        break;
      case 'overdue':
        matchesFilter = task.dueDate < today && task.status !== 'completed';
        break;
      case 'completed':
        matchesFilter = task.status === 'completed';
        break;
    }
    
    return matchesSearch && matchesFilter;
  });

  const toggleTask = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      updateTask(taskId, { 
        status: task.status === 'completed' ? 'pending' : 'completed' 
      });
    }
  };

  const getLeadName = (leadId?: string) => {
    if (!leadId) return null;
    const lead = leads.find(l => l.id === leadId);
    return lead?.name;
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertCircle size={16} className={styles.highPriority} />;
      case 'medium':
        return <AlertCircle size={16} className={styles.mediumPriority} />;
      default:
        return null;
    }
  };

  const handleAddTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    addTask({
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      dueDate: formData.get('dueDate') as string,
      priority: formData.get('priority') as 'low' | 'medium' | 'high',
      status: 'pending',
      type: (formData.get('type') as 'call' | 'email' | 'meeting' | 'showing' | 'other') || 'other',
      leadId: formData.get('leadId') as string || undefined,
    });
    setShowAddModal(false);
  };

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'completed').length,
    overdue: tasks.filter(t => t.dueDate < today && t.status !== 'completed').length,
    today: tasks.filter(t => t.dueDate === today && t.status !== 'completed').length,
  };

  return (
    <div className={styles.tasks}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1>Tasks</h1>
          <p>{stats.completed} of {stats.total} completed</p>
        </div>
        <button className={styles.addBtn} onClick={() => setShowAddModal(true)}>
          <Plus size={20} />
          Add Task
        </button>
      </div>

      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        <button 
          className={`${styles.statCard} ${filter === 'all' ? styles.active : ''}`}
          onClick={() => setFilter('all')}
        >
          <span className={styles.statValue}>{stats.total}</span>
          <span className={styles.statLabel}>All Tasks</span>
        </button>
        <button 
          className={`${styles.statCard} ${filter === 'today' ? styles.active : ''}`}
          onClick={() => setFilter('today')}
        >
          <span className={`${styles.statValue} ${styles.cyan}`}>{stats.today}</span>
          <span className={styles.statLabel}>Due Today</span>
        </button>
        <button 
          className={`${styles.statCard} ${filter === 'overdue' ? styles.active : ''}`}
          onClick={() => setFilter('overdue')}
        >
          <span className={`${styles.statValue} ${styles.red}`}>{stats.overdue}</span>
          <span className={styles.statLabel}>Overdue</span>
        </button>
        <button 
          className={`${styles.statCard} ${filter === 'completed' ? styles.active : ''}`}
          onClick={() => setFilter('completed')}
        >
          <span className={`${styles.statValue} ${styles.green}`}>{stats.completed}</span>
          <span className={styles.statLabel}>Completed</span>
        </button>
      </div>

      {/* Search */}
      <div className={styles.searchBox}>
        <Search size={20} />
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Task List */}
      <div className={styles.taskList}>
        {filteredTasks.map((task) => (
          <div 
            key={task.id} 
            className={`${styles.taskItem} ${task.status === 'completed' ? styles.completed : ''}`}
          >
            <button 
              className={styles.checkbox}
              onClick={() => toggleTask(task.id)}
            >
              {task.status === 'completed' ? (
                <CheckCircle2 size={22} />
              ) : (
                <Circle size={22} />
              )}
            </button>

            <div className={styles.taskContent}>
              <div className={styles.taskHeader}>
                <h3>{task.title}</h3>
                {getPriorityIcon(task.priority)}
              </div>
              {task.description && (
                <p className={styles.taskDescription}>{task.description}</p>
              )}
              <div className={styles.taskMeta}>
                <span className={`${styles.dueDate} ${task.dueDate < today && task.status !== 'completed' ? styles.overdue : ''}`}>
                  <Calendar size={14} />
                  {task.dueDate}
                </span>
                {getLeadName(task.leadId) && (
                  <span className={styles.lead}>
                    <User size={14} />
                    {getLeadName(task.leadId)}
                  </span>
                )}
                <span className={`${styles.priorityBadge} ${styles[task.priority]}`}>
                  {task.priority}
                </span>
              </div>
            </div>

            <button 
              className={styles.deleteBtn}
              onClick={() => deleteTask(task.id)}
              title="Delete task"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}

        {filteredTasks.length === 0 && (
          <div className={styles.empty}>
            <CheckCircle2 size={48} />
            <h3>No tasks found</h3>
            <p>
              {filter === 'completed' 
                ? 'No completed tasks yet' 
                : filter === 'overdue'
                ? 'Great job! No overdue tasks'
                : 'Create a task to get started'}
            </p>
          </div>
        )}
      </div>

      {/* Add Task Modal */}
      {showAddModal && (
        <div className={styles.modalOverlay} onClick={() => setShowAddModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2>Add New Task</h2>
            <form onSubmit={handleAddTask}>
              <div className={styles.formGroup}>
                <label>Task Title</label>
                <input 
                  type="text" 
                  name="title" 
                  required 
                  placeholder="e.g., Follow up with client" 
                />
              </div>
              <div className={styles.formGroup}>
                <label>Description</label>
                <textarea 
                  name="description" 
                  rows={3}
                  placeholder="Add details about this task..." 
                />
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Due Date</label>
                  <input 
                    type="date" 
                    name="dueDate" 
                    required 
                    defaultValue={today}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Priority</label>
                  <select name="priority" defaultValue="medium">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
              <div className={styles.formGroup}>
                <label>Link to Lead (optional)</label>
                <select name="leadId">
                  <option value="">Select a lead...</option>
                  {leads.map(lead => (
                    <option key={lead.id} value={lead.id}>{lead.name}</option>
                  ))}
                </select>
              </div>
              <div className={styles.modalActions}>
                <button type="button" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button type="submit" className={styles.submitBtn}>Add Task</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
