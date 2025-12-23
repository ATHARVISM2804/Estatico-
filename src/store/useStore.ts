import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Types
export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'new' | 'contacted' | 'qualified' | 'showing' | 'offer' | 'contract' | 'closed' | 'lost';
  source: string;
  propertyInterest: string;
  budget?: string;
  notes: string;
  tags: string[];
  createdAt: string;
  lastContact: string;
  assignedTo?: string;
  dealValue: number;
  avatar?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'completed' | 'overdue';
  type: 'call' | 'email' | 'meeting' | 'showing' | 'follow-up' | 'other';
  leadId?: string;
  createdAt: string;
}

export interface Email {
  id: string;
  subject: string;
  body: string;
  to: string;
  from: string;
  status: 'draft' | 'sent' | 'scheduled';
  sentAt?: string;
  leadId?: string;
  templateId?: string;
  createdAt: string;
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  category: 'welcome' | 'follow-up' | 'closing' | 'review' | 'custom';
}

export interface Appointment {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  type: 'showing' | 'meeting' | 'closing' | 'call' | 'other';
  leadId?: string;
  location?: string;
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  trigger: 'new_lead' | 'status_change' | 'date_reached';
  triggerValue?: string;
  actions: WorkflowAction[];
  isActive: boolean;
  createdAt: string;
}

export interface WorkflowAction {
  id: string;
  type: 'send_email' | 'create_task' | 'wait' | 'update_status' | 'condition';
  config: Record<string, unknown>;
  order: number;
}

export interface Activity {
  id: string;
  type: 'lead_created' | 'email_sent' | 'task_completed' | 'status_changed' | 'call_made' | 'note_added';
  description: string;
  leadId?: string;
  createdAt: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  role: 'agent' | 'admin' | 'team_lead';
  plan: 'starter' | 'professional' | 'team';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
}

// Store Interface
interface AppState {
  // User
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  
  // Leads
  leads: Lead[];
  addLead: (lead: Omit<Lead, 'id' | 'createdAt'>) => void;
  updateLead: (id: string, updates: Partial<Lead>) => void;
  deleteLead: (id: string) => void;
  
  // Tasks
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  
  // Emails
  emails: Email[];
  emailTemplates: EmailTemplate[];
  addEmail: (email: Omit<Email, 'id' | 'createdAt'>) => void;
  addEmailTemplate: (template: Omit<EmailTemplate, 'id'>) => void;
  updateEmailTemplate: (id: string, updates: Partial<EmailTemplate>) => void;
  deleteEmailTemplate: (id: string) => void;
  
  // Appointments
  appointments: Appointment[];
  addAppointment: (appointment: Omit<Appointment, 'id'>) => void;
  updateAppointment: (id: string, updates: Partial<Appointment>) => void;
  deleteAppointment: (id: string) => void;
  
  // Workflows
  workflows: Workflow[];
  addWorkflow: (workflow: Omit<Workflow, 'id' | 'createdAt'>) => void;
  updateWorkflow: (id: string, updates: Partial<Workflow>) => void;
  deleteWorkflow: (id: string) => void;
  
  // Activities
  activities: Activity[];
  addActivity: (activity: Omit<Activity, 'id' | 'createdAt'>) => void;
  
  // Notifications
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) => void;
  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;
  
  // UI State
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
}

// Generate unique IDs
const generateId = () => Math.random().toString(36).substring(2, 15);

// Sample Data
const sampleLeads: Lead[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '(555) 123-4567',
    status: 'qualified',
    source: 'Zillow',
    propertyInterest: '3BR House in Downtown',
    budget: '$450,000 - $550,000',
    notes: 'Looking to close within 3 months. Pre-approved.',
    tags: ['pre-approved', 'hot-lead'],
    createdAt: '2024-12-01T10:00:00Z',
    lastContact: '2024-12-15T14:30:00Z',
    dealValue: 495000,
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.chen@email.com',
    phone: '(555) 234-5678',
    status: 'showing',
    source: 'Referral',
    propertyInterest: 'Luxury Condo',
    budget: '$800,000 - $1,200,000',
    notes: 'High-net-worth client. Interested in waterfront properties.',
    tags: ['luxury', 'investor'],
    createdAt: '2024-12-05T09:00:00Z',
    lastContact: '2024-12-18T11:00:00Z',
    dealValue: 950000,
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily.r@email.com',
    phone: '(555) 345-6789',
    status: 'new',
    source: 'Website',
    propertyInterest: 'First-time buyer',
    budget: '$250,000 - $350,000',
    notes: 'Needs guidance on mortgage options.',
    tags: ['first-time-buyer'],
    createdAt: '2024-12-18T08:00:00Z',
    lastContact: '2024-12-18T08:00:00Z',
    dealValue: 300000,
  },
  {
    id: '4',
    name: 'David Williams',
    email: 'david.w@email.com',
    phone: '(555) 456-7890',
    status: 'offer',
    source: 'Facebook Ads',
    propertyInterest: 'Investment Property',
    budget: '$600,000 - $800,000',
    notes: 'Cash buyer. Looking for rental income properties.',
    tags: ['investor', 'cash-buyer'],
    createdAt: '2024-11-20T12:00:00Z',
    lastContact: '2024-12-17T16:00:00Z',
    dealValue: 725000,
  },
  {
    id: '5',
    name: 'Jennifer Smith',
    email: 'jen.smith@email.com',
    phone: '(555) 567-8901',
    status: 'contract',
    source: 'Open House',
    propertyInterest: 'Family Home',
    budget: '$500,000 - $650,000',
    notes: 'Contract signed. Closing scheduled for Dec 28.',
    tags: ['closing-soon'],
    createdAt: '2024-11-15T10:00:00Z',
    lastContact: '2024-12-16T09:00:00Z',
    dealValue: 585000,
  },
  {
    id: '6',
    name: 'Robert Taylor',
    email: 'r.taylor@email.com',
    phone: '(555) 678-9012',
    status: 'contacted',
    source: 'Google Ads',
    propertyInterest: 'Downsizing',
    budget: '$300,000 - $400,000',
    notes: 'Empty nesters looking to downsize from 4BR to 2BR.',
    tags: ['downsizing'],
    createdAt: '2024-12-10T14:00:00Z',
    lastContact: '2024-12-14T10:00:00Z',
    dealValue: 350000,
  },
];

const sampleTasks: Task[] = [
  {
    id: '1',
    title: 'Follow up with Sarah Johnson',
    description: 'Discuss property options and schedule showing',
    dueDate: '2024-12-19',
    priority: 'high',
    status: 'pending',
    type: 'call',
    leadId: '1',
    createdAt: '2024-12-15T10:00:00Z',
  },
  {
    id: '2',
    title: 'Prepare CMA for Michael Chen',
    description: 'Comparative market analysis for luxury condo listings',
    dueDate: '2024-12-20',
    priority: 'high',
    status: 'pending',
    type: 'other',
    leadId: '2',
    createdAt: '2024-12-16T09:00:00Z',
  },
  {
    id: '3',
    title: 'Send welcome email to Emily',
    description: 'First-time buyer welcome package',
    dueDate: '2024-12-19',
    priority: 'medium',
    status: 'pending',
    type: 'email',
    leadId: '3',
    createdAt: '2024-12-18T08:30:00Z',
  },
  {
    id: '4',
    title: 'Closing prep for Jennifer Smith',
    description: 'Final walkthrough and document preparation',
    dueDate: '2024-12-27',
    priority: 'high',
    status: 'pending',
    type: 'meeting',
    leadId: '5',
    createdAt: '2024-12-16T11:00:00Z',
  },
  {
    id: '5',
    title: 'Review David Williams offer',
    description: 'Analyze counter-offer terms',
    dueDate: '2024-12-18',
    priority: 'high',
    status: 'completed',
    type: 'other',
    leadId: '4',
    createdAt: '2024-12-17T14:00:00Z',
  },
];

const sampleAppointments: Appointment[] = [
  {
    id: '1',
    title: 'Property Showing - Sarah Johnson',
    description: 'Tour of 3BR house at 123 Main St',
    date: '2024-12-20',
    startTime: '10:00',
    endTime: '11:30',
    type: 'showing',
    leadId: '1',
    location: '123 Main St, Downtown',
  },
  {
    id: '2',
    title: 'Luxury Condo Tour - Michael Chen',
    description: 'Private viewing of waterfront condos',
    date: '2024-12-21',
    startTime: '14:00',
    endTime: '16:00',
    type: 'showing',
    leadId: '2',
    location: 'Marina Bay Towers',
  },
  {
    id: '3',
    title: 'Closing Meeting - Jennifer Smith',
    description: 'Final closing at title company',
    date: '2024-12-28',
    startTime: '09:00',
    endTime: '11:00',
    type: 'closing',
    leadId: '5',
    location: 'First Title Company',
  },
];

const sampleEmailTemplates: EmailTemplate[] = [
  {
    id: '1',
    name: 'Welcome Email',
    subject: 'Welcome to {{agent_name}} Real Estate!',
    body: `Hi {{first_name}},

Thank you for reaching out! I'm excited to help you find your perfect property.

I'd love to learn more about what you're looking for. When would be a good time for a quick call?

Best regards,
{{agent_name}}`,
    category: 'welcome',
  },
  {
    id: '2',
    name: 'Follow-up After Showing',
    subject: 'Great seeing you today, {{first_name}}!',
    body: `Hi {{first_name}},

It was wonderful meeting you today at {{property_address}}. I hope you found the property interesting!

What did you think? I'd love to hear your thoughts and answer any questions.

Talk soon,
{{agent_name}}`,
    category: 'follow-up',
  },
  {
    id: '3',
    name: 'Closing Congratulations',
    subject: 'Congratulations on your new home! 🏠',
    body: `Dear {{first_name}},

Congratulations on closing on your new home at {{property_address}}!

It's been an absolute pleasure working with you. Please don't hesitate to reach out if you need anything.

Welcome home!
{{agent_name}}`,
    category: 'closing',
  },
  {
    id: '4',
    name: 'Review Request',
    subject: 'How was your experience?',
    body: `Hi {{first_name}},

Now that you've settled into your new home, I'd love to hear about your experience working together.

Would you mind leaving a quick review? It helps others find great service too!

[Leave Review Link]

Thank you so much!
{{agent_name}}`,
    category: 'review',
  },
];

const sampleWorkflows: Workflow[] = [
  {
    id: '1',
    name: 'New Buyer Lead',
    description: 'Automated sequence for new buyer leads',
    trigger: 'new_lead',
    isActive: true,
    createdAt: '2024-11-01T00:00:00Z',
    actions: [
      { id: '1', type: 'send_email', config: { templateId: '1' }, order: 1 },
      { id: '2', type: 'wait', config: { days: 1 }, order: 2 },
      { id: '3', type: 'create_task', config: { title: 'Follow up call', type: 'call' }, order: 3 },
    ],
  },
  {
    id: '2',
    name: 'Post-Showing Follow-up',
    description: 'Follow up after property showings',
    trigger: 'status_change',
    triggerValue: 'showing',
    isActive: true,
    createdAt: '2024-11-15T00:00:00Z',
    actions: [
      { id: '1', type: 'wait', config: { hours: 2 }, order: 1 },
      { id: '2', type: 'send_email', config: { templateId: '2' }, order: 2 },
    ],
  },
  {
    id: '3',
    name: 'Closing Process',
    description: 'Tasks and reminders for closing',
    trigger: 'status_change',
    triggerValue: 'contract',
    isActive: true,
    createdAt: '2024-11-20T00:00:00Z',
    actions: [
      { id: '1', type: 'create_task', config: { title: 'Schedule final walkthrough', type: 'showing' }, order: 1 },
      { id: '2', type: 'create_task', config: { title: 'Prepare closing documents', type: 'other' }, order: 2 },
    ],
  },
];

const sampleActivities: Activity[] = [
  { id: '1', type: 'lead_created', description: 'New lead Emily Rodriguez added', leadId: '3', createdAt: '2024-12-18T08:00:00Z' },
  { id: '2', type: 'email_sent', description: 'Welcome email sent to Emily Rodriguez', leadId: '3', createdAt: '2024-12-18T08:05:00Z' },
  { id: '3', type: 'task_completed', description: 'Reviewed offer for David Williams', leadId: '4', createdAt: '2024-12-17T16:00:00Z' },
  { id: '4', type: 'status_changed', description: 'David Williams moved to Offer stage', leadId: '4', createdAt: '2024-12-17T14:00:00Z' },
  { id: '5', type: 'call_made', description: 'Called Sarah Johnson about scheduling', leadId: '1', createdAt: '2024-12-15T14:30:00Z' },
];

const sampleUser: User = {
  id: '1',
  firstName: 'Alex',
  lastName: 'Morgan',
  email: 'alex.morgan@realestate.com',
  role: 'agent',
  plan: 'professional',
};

// Create Store
export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // User
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      login: (email, _password) => {
        // Mock login - accept any credentials
        set({ 
          user: { ...sampleUser, email },
          isAuthenticated: true 
        });
        return true;
      },
      logout: () => set({ user: null, isAuthenticated: false }),
      
      // Leads
      leads: sampleLeads,
      addLead: (lead) => {
        const newLead: Lead = {
          ...lead,
          id: generateId(),
          createdAt: new Date().toISOString(),
        };
        set((state) => ({ leads: [...state.leads, newLead] }));
        get().addActivity({ type: 'lead_created', description: `New lead ${lead.name} added`, leadId: newLead.id });
      },
      updateLead: (id, updates) => {
        set((state) => ({
          leads: state.leads.map((lead) =>
            lead.id === id ? { ...lead, ...updates, lastContact: new Date().toISOString() } : lead
          ),
        }));
        if (updates.status) {
          const lead = get().leads.find(l => l.id === id);
          if (lead) {
            get().addActivity({ type: 'status_changed', description: `${lead.name} moved to ${updates.status}`, leadId: id });
          }
        }
      },
      deleteLead: (id) => set((state) => ({ leads: state.leads.filter((lead) => lead.id !== id) })),
      
      // Tasks
      tasks: sampleTasks,
      addTask: (task) => {
        const newTask: Task = {
          ...task,
          id: generateId(),
          createdAt: new Date().toISOString(),
        };
        set((state) => ({ tasks: [...state.tasks, newTask] }));
      },
      updateTask: (id, updates) => {
        set((state) => ({
          tasks: state.tasks.map((task) => (task.id === id ? { ...task, ...updates } : task)),
        }));
        if (updates.status === 'completed') {
          const task = get().tasks.find(t => t.id === id);
          if (task) {
            get().addActivity({ type: 'task_completed', description: `Completed: ${task.title}`, leadId: task.leadId });
          }
        }
      },
      deleteTask: (id) => set((state) => ({ tasks: state.tasks.filter((task) => task.id !== id) })),
      
      // Emails
      emails: [],
      emailTemplates: sampleEmailTemplates,
      addEmail: (email) => {
        const newEmail: Email = {
          ...email,
          id: generateId(),
          createdAt: new Date().toISOString(),
        };
        set((state) => ({ emails: [...state.emails, newEmail] }));
        if (email.status === 'sent') {
          get().addActivity({ type: 'email_sent', description: `Email sent: ${email.subject}`, leadId: email.leadId });
        }
      },
      addEmailTemplate: (template) => {
        const newTemplate: EmailTemplate = {
          ...template,
          id: generateId(),
        };
        set((state) => ({ emailTemplates: [...state.emailTemplates, newTemplate] }));
      },
      updateEmailTemplate: (id, updates) => {
        set((state) => ({
          emailTemplates: state.emailTemplates.map((t) => (t.id === id ? { ...t, ...updates } : t)),
        }));
      },
      deleteEmailTemplate: (id) => set((state) => ({ emailTemplates: state.emailTemplates.filter((t) => t.id !== id) })),
      
      // Appointments
      appointments: sampleAppointments,
      addAppointment: (appointment) => {
        const newAppointment: Appointment = {
          ...appointment,
          id: generateId(),
        };
        set((state) => ({ appointments: [...state.appointments, newAppointment] }));
      },
      updateAppointment: (id, updates) => {
        set((state) => ({
          appointments: state.appointments.map((apt) => (apt.id === id ? { ...apt, ...updates } : apt)),
        }));
      },
      deleteAppointment: (id) => set((state) => ({ appointments: state.appointments.filter((apt) => apt.id !== id) })),
      
      // Workflows
      workflows: sampleWorkflows,
      addWorkflow: (workflow) => {
        const newWorkflow: Workflow = {
          ...workflow,
          id: generateId(),
          createdAt: new Date().toISOString(),
        };
        set((state) => ({ workflows: [...state.workflows, newWorkflow] }));
      },
      updateWorkflow: (id, updates) => {
        set((state) => ({
          workflows: state.workflows.map((wf) => (wf.id === id ? { ...wf, ...updates } : wf)),
        }));
      },
      deleteWorkflow: (id) => set((state) => ({ workflows: state.workflows.filter((wf) => wf.id !== id) })),
      
      // Activities
      activities: sampleActivities,
      addActivity: (activity) => {
        const newActivity: Activity = {
          ...activity,
          id: generateId(),
          createdAt: new Date().toISOString(),
        };
        set((state) => ({ activities: [newActivity, ...state.activities].slice(0, 50) }));
      },
      
      // Notifications
      notifications: [
        { id: '1', title: 'New Lead', message: 'Emily Rodriguez just submitted an inquiry', type: 'info', read: false, createdAt: '2024-12-18T08:00:00Z' },
        { id: '2', title: 'Task Due', message: 'Follow up with Sarah Johnson is due today', type: 'warning', read: false, createdAt: '2024-12-19T07:00:00Z' },
        { id: '3', title: 'Deal Closed!', message: 'Congratulations! Jennifer Smith deal closed', type: 'success', read: true, createdAt: '2024-12-16T15:00:00Z' },
      ],
      addNotification: (notification) => {
        const newNotification: Notification = {
          ...notification,
          id: generateId(),
          read: false,
          createdAt: new Date().toISOString(),
        };
        set((state) => ({ notifications: [newNotification, ...state.notifications] }));
      },
      markNotificationRead: (id) => {
        set((state) => ({
          notifications: state.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
        }));
      },
      clearNotifications: () => set({ notifications: [] }),
      
      // UI State
      sidebarCollapsed: false,
      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
    }),
    {
      name: 'realestate-saas-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        leads: state.leads,
        tasks: state.tasks,
        emails: state.emails,
        appointments: state.appointments,
        workflows: state.workflows,
        activities: state.activities,
        notifications: state.notifications,
      }),
    }
  )
);
