import { useState } from 'react';
import { 
  Plus, 
  Play,
  Pause,
  Zap,
  Mail,
  Clock,
  MessageSquare,
  CheckCircle2,
  Users,
  ArrowRight,
  Edit3,
  Trash2,
  Copy
} from 'lucide-react';
import { useStore, type Workflow } from '../../store/useStore';
import styles from './Workflows.module.css';

const triggerIcons: Record<string, React.ReactNode> = {
  new_lead: <Users size={18} />,
  status_change: <ArrowRight size={18} />,
  date_reached: <Clock size={18} />,
};

const actionIcons: Record<string, React.ReactNode> = {
  send_email: <Mail size={18} />,
  create_task: <CheckCircle2 size={18} />,
  wait: <Clock size={18} />,
  update_status: <ArrowRight size={18} />,
  condition: <MessageSquare size={18} />,
};

export default function Workflows() {
  const { workflows, updateWorkflow, deleteWorkflow, addWorkflow } = useStore();
  const [showCreateModal, setShowCreateModal] = useState(false);

  const toggleWorkflow = (id: string) => {
    const workflow = workflows.find(w => w.id === id);
    if (workflow) {
      updateWorkflow(id, { isActive: !workflow.isActive });
    }
  };

  const handleDuplicate = (workflow: Workflow) => {
    addWorkflow({
      name: `${workflow.name} (Copy)`,
      description: workflow.description,
      trigger: workflow.trigger,
      triggerValue: workflow.triggerValue,
      actions: [...workflow.actions],
      isActive: false,
    });
  };

  const handleCreateWorkflow = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    addWorkflow({
      name: formData.get('name') as string,
      description: formData.get('description') as string || '',
      trigger: formData.get('triggerType') as Workflow['trigger'],
      actions: [
        {
          id: Date.now().toString(),
          type: 'send_email',
          config: { templateId: '' },
          order: 1,
        }
      ],
      isActive: false,
    });
    setShowCreateModal(false);
  };

  const templates = [
    {
      name: 'New Lead Welcome',
      description: 'Automatically welcome new leads with a personalized email',
      trigger: 'new_lead',
      actions: ['send_email', 'create_task'],
    },
    {
      name: 'Follow-up Sequence',
      description: 'Send a series of follow-up emails over 7 days',
      trigger: 'new_lead',
      actions: ['send_email', 'wait', 'send_email', 'wait', 'send_email'],
    },
    {
      name: 'Showing Reminder',
      description: 'Remind leads about upcoming property showings',
      trigger: 'date_reached',
      actions: ['send_email', 'create_task'],
    },
  ];

  return (
    <div className={styles.workflows}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1>Workflows</h1>
          <p>Automate your lead nurturing and follow-ups</p>
        </div>
        <button className={styles.addBtn} onClick={() => setShowCreateModal(true)}>
          <Plus size={20} />
          Create Workflow
        </button>
      </div>

      {/* Stats */}
      <div className={styles.stats}>
        <div className={styles.stat}>
          <Zap size={24} className={styles.statIcon} />
          <div>
            <span className={styles.statValue}>{workflows.length}</span>
            <span className={styles.statLabel}>Total Workflows</span>
          </div>
        </div>
        <div className={styles.stat}>
          <Play size={24} className={styles.statIconActive} />
          <div>
            <span className={styles.statValue}>
              {workflows.filter(w => w.isActive).length}
            </span>
            <span className={styles.statLabel}>Active</span>
          </div>
        </div>
        <div className={styles.stat}>
          <Pause size={24} className={styles.statIconPaused} />
          <div>
            <span className={styles.statValue}>
              {workflows.filter(w => !w.isActive).length}
            </span>
            <span className={styles.statLabel}>Paused</span>
          </div>
        </div>
      </div>

      {/* Workflows List */}
      <div className={styles.section}>
        <h2>Your Workflows</h2>
        <div className={styles.workflowList}>
          {workflows.map((workflow) => (
            <div key={workflow.id} className={styles.workflowCard}>
              <div className={styles.workflowHeader}>
                <div className={styles.workflowInfo}>
                  <div className={styles.triggerIcon}>
                    {triggerIcons[workflow.trigger]}
                  </div>
                  <div>
                    <h3>{workflow.name}</h3>
                    <p>{workflow.description}</p>
                  </div>
                </div>
                <div className={styles.workflowActions}>
                  <button 
                    className={`${styles.toggleBtn} ${workflow.isActive ? styles.active : ''}`}
                    onClick={() => toggleWorkflow(workflow.id)}
                  >
                    {workflow.isActive ? <Pause size={16} /> : <Play size={16} />}
                    {workflow.isActive ? 'Pause' : 'Start'}
                  </button>
                  <button className={styles.iconBtn} onClick={() => handleDuplicate(workflow)}>
                    <Copy size={16} />
                  </button>
                  <button className={styles.iconBtn}>
                    <Edit3 size={16} />
                  </button>
                  <button 
                    className={`${styles.iconBtn} ${styles.deleteBtn}`}
                    onClick={() => deleteWorkflow(workflow.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className={styles.workflowFlow}>
                <div className={styles.flowTrigger}>
                  <span className={styles.flowLabel}>Trigger</span>
                  <div className={styles.flowNode}>
                    {triggerIcons[workflow.trigger]}
                    <span>{workflow.trigger.replace('_', ' ')}</span>
                  </div>
                </div>

                <div className={styles.flowArrow}>
                  <ArrowRight size={20} />
                </div>

                <div className={styles.flowActions}>
                  <span className={styles.flowLabel}>Actions</span>
                  <div className={styles.flowNodes}>
                    {workflow.actions.map((action, index) => (
                      <div key={index} className={styles.flowNode}>
                        {actionIcons[action.type]}
                        <span>{action.type.replace('_', ' ')}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className={styles.workflowMeta}>
                <span className={`${styles.status} ${workflow.isActive ? styles.active : ''}`}>
                  {workflow.isActive ? 'Active' : 'Paused'}
                </span>
                <span className={styles.date}>
                  Created {new Date(workflow.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}

          {workflows.length === 0 && (
            <div className={styles.empty}>
              <Zap size={48} />
              <h3>No workflows yet</h3>
              <p>Create your first workflow to automate your tasks</p>
            </div>
          )}
        </div>
      </div>

      {/* Templates */}
      <div className={styles.section}>
        <h2>Quick Start Templates</h2>
        <div className={styles.templates}>
          {templates.map((template, index) => (
            <div key={index} className={styles.templateCard}>
              <div className={styles.templateHeader}>
                <div className={styles.triggerIcon}>
                  {triggerIcons[template.trigger]}
                </div>
                <h3>{template.name}</h3>
              </div>
              <p>{template.description}</p>
              <div className={styles.templateActions}>
                {template.actions.map((action, i) => (
                  <span key={i} className={styles.actionBadge}>
                    {actionIcons[action]}
                  </span>
                ))}
              </div>
              <button className={styles.useTemplateBtn}>
                Use Template
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className={styles.modalOverlay} onClick={() => setShowCreateModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2>Create New Workflow</h2>
            <form onSubmit={handleCreateWorkflow}>
              <div className={styles.formGroup}>
                <label>Workflow Name</label>
                <input 
                  type="text" 
                  name="name" 
                  required 
                  placeholder="e.g., New Lead Welcome Sequence"
                />
              </div>
              <div className={styles.formGroup}>
                <label>Description</label>
                <textarea 
                  name="description" 
                  rows={3}
                  placeholder="Describe what this workflow does..."
                />
              </div>
              <div className={styles.formGroup}>
                <label>Trigger</label>
                <select name="triggerType" required>
                  <option value="new_lead">New Lead Added</option>
                  <option value="status_change">Lead Status Changes</option>
                  <option value="date_reached">Date Reached</option>
                </select>
              </div>
              <div className={styles.modalActions}>
                <button type="button" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </button>
                <button type="submit" className={styles.submitBtn}>
                  Create Workflow
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
