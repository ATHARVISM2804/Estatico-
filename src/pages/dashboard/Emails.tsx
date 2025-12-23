import { useState } from 'react';
import { 
  Search, 
  Plus, 
  Mail,
  Edit3,
  Trash2,
  Copy,
  Send,
  Eye
} from 'lucide-react';
import { useStore, type EmailTemplate } from '../../store/useStore';
import styles from './Emails.module.css';

export default function Emails() {
  const { emailTemplates, addEmailTemplate, updateEmailTemplate, deleteEmailTemplate } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(null);

  const filteredTemplates = emailTemplates.filter(template =>
    template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateTemplate = () => {
    setEditingTemplate(null);
    setShowEditor(true);
  };

  const handleEditTemplate = (template: EmailTemplate) => {
    setEditingTemplate(template);
    setShowEditor(true);
  };

  const handleSaveTemplate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    if (editingTemplate) {
      updateEmailTemplate(editingTemplate.id, {
        name: formData.get('name') as string,
        subject: formData.get('subject') as string,
        body: formData.get('body') as string,
        category: formData.get('category') as EmailTemplate['category'],
      });
    } else {
      addEmailTemplate({
        name: formData.get('name') as string,
        subject: formData.get('subject') as string,
        body: formData.get('body') as string,
        category: formData.get('category') as EmailTemplate['category'],
      });
    }
    setShowEditor(false);
    setEditingTemplate(null);
  };

  const handleDuplicate = (template: EmailTemplate) => {
    addEmailTemplate({
      name: `${template.name} (Copy)`,
      subject: template.subject,
      body: template.body,
      category: template.category,
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'welcome': '#00b4d8',
      'follow-up': '#00d4aa',
      'closing': '#10b981',
      'review': '#7c3aed',
      'custom': '#64748b',
    };
    return colors[category] || '#64748b';
  };

  return (
    <div className={styles.emails}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1>Email Templates</h1>
          <p>{emailTemplates.length} templates available</p>
        </div>
        <button className={styles.addBtn} onClick={handleCreateTemplate}>
          <Plus size={20} />
          New Template
        </button>
      </div>

      {/* Search */}
      <div className={styles.searchBox}>
        <Search size={20} />
        <input
          type="text"
          placeholder="Search templates..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Templates Grid */}
      <div className={styles.grid}>
        {filteredTemplates.map((template) => (
          <div key={template.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <span 
                className={styles.category}
                style={{ 
                  background: `${getCategoryColor(template.category)}20`,
                  color: getCategoryColor(template.category)
                }}
              >
                {template.category.replace('-', ' ')}
              </span>
              <div className={styles.cardActions}>
                <button 
                  title="Preview"
                  onClick={() => setSelectedTemplate(template)}
                >
                  <Eye size={16} />
                </button>
                <button 
                  title="Edit"
                  onClick={() => handleEditTemplate(template)}
                >
                  <Edit3 size={16} />
                </button>
                <button 
                  title="Duplicate"
                  onClick={() => handleDuplicate(template)}
                >
                  <Copy size={16} />
                </button>
                <button 
                  title="Delete"
                  onClick={() => deleteEmailTemplate(template.id)}
                  className={styles.deleteBtn}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            
            <h3>{template.name}</h3>
            <p className={styles.subject}>
              <Mail size={14} />
              {template.subject}
            </p>
            <p className={styles.preview}>
              {template.body.substring(0, 120)}...
            </p>

            <div className={styles.cardFooter}>
              <button className={styles.useBtn}>
                <Send size={14} />
                Use Template
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className={styles.empty}>
          <Mail size={48} />
          <h3>No templates found</h3>
          <p>Create your first email template to get started</p>
          <button onClick={handleCreateTemplate}>
            <Plus size={20} />
            Create Template
          </button>
        </div>
      )}

      {/* Preview Modal */}
      {selectedTemplate && (
        <div className={styles.modalOverlay} onClick={() => setSelectedTemplate(null)}>
          <div className={styles.previewModal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.previewHeader}>
              <div>
                <h2>{selectedTemplate.name}</h2>
                <span 
                  className={styles.category}
                  style={{ 
                    background: `${getCategoryColor(selectedTemplate.category)}20`,
                    color: getCategoryColor(selectedTemplate.category)
                  }}
                >
                  {selectedTemplate.category.replace('-', ' ')}
                </span>
              </div>
              <button onClick={() => setSelectedTemplate(null)}>×</button>
            </div>
            <div className={styles.previewContent}>
              <div className={styles.emailField}>
                <label>Subject</label>
                <p>{selectedTemplate.subject}</p>
              </div>
              <div className={styles.emailField}>
                <label>Body</label>
                <div className={styles.emailBody}>
                  {selectedTemplate.body.split('\n').map((line, i) => (
                    <p key={i}>{line || <br />}</p>
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.previewActions}>
              <button onClick={() => handleEditTemplate(selectedTemplate)}>
                <Edit3 size={18} />
                Edit Template
              </button>
              <button className={styles.primaryBtn}>
                <Send size={18} />
                Use This Template
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Editor Modal */}
      {showEditor && (
        <div className={styles.modalOverlay} onClick={() => setShowEditor(false)}>
          <div className={styles.editorModal} onClick={(e) => e.stopPropagation()}>
            <h2>{editingTemplate ? 'Edit Template' : 'Create New Template'}</h2>
            <form onSubmit={handleSaveTemplate}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Template Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    required 
                    placeholder="e.g., Initial Follow-up"
                    defaultValue={editingTemplate?.name}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Category</label>
                  <select 
                    name="category" 
                    defaultValue={editingTemplate?.category || 'follow-up'}
                  >
                    <option value="welcome">Welcome</option>
                    <option value="follow-up">Follow-up</option>
                    <option value="closing">Closing</option>
                    <option value="review">Review</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>
              </div>
              <div className={styles.formGroup}>
                <label>Subject Line</label>
                <input 
                  type="text" 
                  name="subject" 
                  required 
                  placeholder="e.g., Great meeting you, {{first_name}}!"
                  defaultValue={editingTemplate?.subject}
                />
                <span className={styles.hint}>
                  Use {'{{first_name}}'}, {'{{property}}'}, {'{{agent_name}}'} for personalization
                </span>
              </div>
              <div className={styles.formGroup}>
                <label>Email Body</label>
                <textarea 
                  name="body" 
                  rows={12}
                  required
                  placeholder="Write your email content here..."
                  defaultValue={editingTemplate?.body}
                />
              </div>
              <div className={styles.modalActions}>
                <button type="button" onClick={() => setShowEditor(false)}>Cancel</button>
                <button type="submit" className={styles.submitBtn}>
                  {editingTemplate ? 'Save Changes' : 'Create Template'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
