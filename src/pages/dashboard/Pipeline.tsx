import { useState } from 'react';
import { 
  Plus, 
  MoreVertical, 
  Phone, 
  Mail, 
  Calendar,
  DollarSign,
  GripVertical
} from 'lucide-react';
import { useStore, type Lead } from '../../store/useStore';
import styles from './Pipeline.module.css';

const stages = [
  { id: 'new', title: 'New', color: '#6366f1' },
  { id: 'contacted', title: 'Contacted', color: '#8b5cf6' },
  { id: 'qualified', title: 'Qualified', color: '#00d4aa' },
  { id: 'showing', title: 'Showing', color: '#00b4d8' },
  { id: 'offer', title: 'Offer', color: '#f59e0b' },
  { id: 'contract', title: 'Contract', color: '#10b981' },
] as const;

export default function Pipeline() {
  const { leads, updateLead } = useStore();
  const [draggedLead, setDraggedLead] = useState<Lead | null>(null);
  const [dragOverStage, setDragOverStage] = useState<string | null>(null);

  const getLeadsByStage = (stageId: string) => {
    return leads.filter(lead => lead.status === stageId);
  };

  const getStageValue = (stageId: string) => {
    return getLeadsByStage(stageId).reduce((sum, lead) => sum + (lead.dealValue || 0), 0);
  };

  const handleDragStart = (e: React.DragEvent, lead: Lead) => {
    setDraggedLead(lead);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setDraggedLead(null);
    setDragOverStage(null);
  };

  const handleDragOver = (e: React.DragEvent, stageId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverStage(stageId);
  };

  const handleDragLeave = () => {
    setDragOverStage(null);
  };

  const handleDrop = (e: React.DragEvent, stageId: string) => {
    e.preventDefault();
    if (draggedLead && draggedLead.status !== stageId) {
      updateLead(draggedLead.id, { status: stageId as Lead['status'] });
    }
    setDraggedLead(null);
    setDragOverStage(null);
  };

  const totalPipelineValue = leads.reduce((sum, lead) => sum + (lead.dealValue || 0), 0);

  return (
    <div className={styles.pipeline}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1>Pipeline</h1>
          <p>
            Total Value: <span className={styles.totalValue}>${totalPipelineValue.toLocaleString()}</span>
            {' • '}
            {leads.length} deals
          </p>
        </div>
        <button className={styles.addBtn}>
          <Plus size={20} />
          Add Deal
        </button>
      </div>

      {/* Kanban Board */}
      <div className={styles.board}>
        {stages.map((stage) => {
          const stageLeads = getLeadsByStage(stage.id);
          const stageValue = getStageValue(stage.id);

          return (
            <div
              key={stage.id}
              className={`${styles.column} ${dragOverStage === stage.id ? styles.dragOver : ''}`}
              onDragOver={(e) => handleDragOver(e, stage.id)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, stage.id)}
            >
              <div className={styles.columnHeader}>
                <div className={styles.columnTitle}>
                  <span 
                    className={styles.colorDot}
                    style={{ background: stage.color }}
                  />
                  <h2>{stage.title}</h2>
                  <span className={styles.count}>{stageLeads.length}</span>
                </div>
                <p className={styles.columnValue}>${stageValue.toLocaleString()}</p>
              </div>

              <div className={styles.cardList}>
                {stageLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className={`${styles.card} ${draggedLead?.id === lead.id ? styles.dragging : ''}`}
                    draggable
                    onDragStart={(e) => handleDragStart(e, lead)}
                    onDragEnd={handleDragEnd}
                  >
                    <div className={styles.cardHeader}>
                      <div className={styles.dragHandle}>
                        <GripVertical size={16} />
                      </div>
                      <div className={styles.leadInfo}>
                        <div className={styles.avatar}>
                          {lead.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h3>{lead.name}</h3>
                          {lead.propertyInterest && (
                            <p className={styles.property}>{lead.propertyInterest}</p>
                          )}
                        </div>
                      </div>
                      <button className={styles.moreBtn}>
                        <MoreVertical size={16} />
                      </button>
                    </div>

                    <div className={styles.cardValue}>
                      <DollarSign size={16} />
                      <span>${(lead.dealValue || 0).toLocaleString()}</span>
                    </div>

                    <div className={styles.cardMeta}>
                      <span className={styles.source}>{lead.source.replace('_', ' ')}</span>
                      <span className={styles.date}>
                        {new Date(lead.lastContact).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>

                    <div className={styles.cardActions}>
                      <button className={styles.actionBtn} title="Call">
                        <Phone size={14} />
                      </button>
                      <button className={styles.actionBtn} title="Email">
                        <Mail size={14} />
                      </button>
                      <button className={styles.actionBtn} title="Schedule">
                        <Calendar size={14} />
                      </button>
                    </div>
                  </div>
                ))}

                {stageLeads.length === 0 && (
                  <div className={styles.emptyColumn}>
                    <p>No deals in this stage</p>
                  </div>
                )}

                <button className={styles.addCardBtn}>
                  <Plus size={16} />
                  Add Deal
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
