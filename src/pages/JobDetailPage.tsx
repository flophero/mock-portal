import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Job, JobAlert } from '@/types/job';
import { getStatusColor, getPriorityColor } from '@/lib/jobUtils';
import { 
  ArrowLeft, 
  Edit, 
  Save, 
  X, 
  AlertTriangle, 
  Clock, 
  User, 
  MapPin, 
  Phone, 
  Mail,
  Calendar,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface JobDetailPageProps {
  jobs: Job[];
  onJobUpdate: (updatedJob: Job) => void;
}

export default function JobDetailPage({ jobs, onJobUpdate }: JobDetailPageProps) {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedJob, setEditedJob] = useState<Job | null>(null);

  useEffect(() => {
    const foundJob = jobs.find(j => j.id === jobId);
    if (foundJob) {
      setJob(foundJob);
      setEditedJob({ ...foundJob });
    }
  }, [jobId, jobs]);

  const handleSave = () => {
    if (editedJob) {
      onJobUpdate(editedJob);
      setJob(editedJob);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedJob(job ? { ...job } : null);
    setIsEditing(false);
  };

  const addAlert = (type: JobAlert['type']) => {
    if (!editedJob) return;
    
    const newAlert: JobAlert = {
      id: `alert-${Date.now()}`,
      type,
      message: `Alert triggered for ${type.toLowerCase()} SLA`,
      timestamp: new Date(),
      acknowledged: false
    };

    const updatedJob = {
      ...editedJob,
      alerts: [...(editedJob.alerts || []), newAlert]
    };
    
    setEditedJob(updatedJob);
  };

  const acknowledgeAlert = (alertId: string) => {
    if (!editedJob) return;
    
    const updatedJob = {
      ...editedJob,
      alerts: editedJob.alerts?.map(alert => 
        alert.id === alertId ? { ...alert, acknowledged: true } : alert
      ) || []
    };
    
    setEditedJob(updatedJob);
  };

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Job Not Found</h1>
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const currentJob = isEditing ? editedJob : job;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
              className="flex items-center"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{job.jobNumber}</h1>
              <p className="text-muted-foreground">{job.description}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Job
              </Button>
            ) : (
              <>
                <Button variant="outline" onClick={handleCancel}>
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Job Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="mr-2 h-5 w-5" />
                  Job Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Customer</label>
                    {isEditing ? (
                      <Input 
                        value={currentJob?.customer || ''} 
                        onChange={(e) => setEditedJob(prev => prev ? { ...prev, customer: e.target.value } : null)}
                      />
                    ) : (
                      <p className="text-gray-900">{job.customer}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Site</label>
                    {isEditing ? (
                      <Input 
                        value={currentJob?.site || ''} 
                        onChange={(e) => setEditedJob(prev => prev ? { ...prev, site: e.target.value } : null)}
                      />
                    ) : (
                      <p className="text-gray-900">{job.site}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Engineer</label>
                    {isEditing ? (
                      <Input 
                        value={currentJob?.engineer || ''} 
                        onChange={(e) => setEditedJob(prev => prev ? { ...prev, engineer: e.target.value } : null)}
                      />
                    ) : (
                      <p className="text-gray-900">{job.engineer}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Status</label>
                    {isEditing ? (
                      <Select 
                        value={currentJob?.status || 'amber'} 
                        onValueChange={(value) => setEditedJob(prev => prev ? { ...prev, status: value as Job['status'] } : null)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="green">Green</SelectItem>
                          <SelectItem value="amber">Amber</SelectItem>
                          <SelectItem value="red">Red</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <Badge className={`${getStatusColor(job.status)} text-white`}>
                        {job.status.toUpperCase()}
                      </Badge>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Priority</label>
                    {isEditing ? (
                      <Select 
                        value={currentJob?.priority || 'Medium'} 
                        onValueChange={(value) => setEditedJob(prev => prev ? { ...prev, priority: value as Job['priority'] } : null)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Low">Low</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="High">High</SelectItem>
                          <SelectItem value="Critical">Critical</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <Badge className={`${getPriorityColor(job.priority)} text-white`}>
                        {job.priority}
                      </Badge>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Category</label>
                    {isEditing ? (
                      <Select 
                        value={currentJob?.category || 'General'} 
                        onValueChange={(value) => setEditedJob(prev => prev ? { ...prev, category: value as Job['category'] } : null)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Electrical">Electrical</SelectItem>
                          <SelectItem value="Mechanical">Mechanical</SelectItem>
                          <SelectItem value="Plumbing">Plumbing</SelectItem>
                          <SelectItem value="HVAC">HVAC</SelectItem>
                          <SelectItem value="General">General</SelectItem>
                          <SelectItem value="Fire Safety">Fire Safety</SelectItem>
                          <SelectItem value="Security Systems">Security Systems</SelectItem>
                          <SelectItem value="Painting">Painting</SelectItem>
                          <SelectItem value="Flooring">Flooring</SelectItem>
                          <SelectItem value="Roofing">Roofing</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <p className="text-gray-900">{job.category}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Description</label>
                  {isEditing ? (
                    <Textarea 
                      value={currentJob?.description || ''} 
                      onChange={(e) => setEditedJob(prev => prev ? { ...prev, description: e.target.value } : null)}
                      rows={3}
                    />
                  ) : (
                    <p className="text-gray-900">{job.description}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Phone className="mr-2 h-5 w-5" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Contact Name</label>
                    {isEditing ? (
                      <Input 
                        value={currentJob?.contact.name || ''} 
                        onChange={(e) => setEditedJob(prev => prev ? { 
                          ...prev, 
                          contact: { ...prev.contact, name: e.target.value }
                        } : null)}
                      />
                    ) : (
                      <p className="text-gray-900">{job.contact.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Phone</label>
                    {isEditing ? (
                      <Input 
                        value={currentJob?.contact.number || ''} 
                        onChange={(e) => setEditedJob(prev => prev ? { 
                          ...prev, 
                          contact: { ...prev.contact, number: e.target.value }
                        } : null)}
                      />
                    ) : (
                      <p className="text-gray-900">{job.contact.number}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    {isEditing ? (
                      <Input 
                        value={currentJob?.contact.email || ''} 
                        onChange={(e) => setEditedJob(prev => prev ? { 
                          ...prev, 
                          contact: { ...prev.contact, email: e.target.value }
                        } : null)}
                      />
                    ) : (
                      <p className="text-gray-900">{job.contact.email}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Relationship</label>
                    {isEditing ? (
                      <Input 
                        value={currentJob?.contact.relationship || ''} 
                        onChange={(e) => setEditedJob(prev => prev ? { 
                          ...prev, 
                          contact: { ...prev.contact, relationship: e.target.value }
                        } : null)}
                      />
                    ) : (
                      <p className="text-gray-900">{job.contact.relationship}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <AlertTriangle className="mr-2 h-5 w-5" />
                    Alerts
                  </div>
                  {isEditing && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => addAlert('ACCEPTED')}
                    >
                      Add Alert
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {currentJob?.alerts && currentJob.alerts.length > 0 ? (
                  <div className="space-y-3">
                    {currentJob.alerts.map((alert) => (
                      <div 
                        key={alert.id}
                        className={`p-3 rounded-lg border ${
                          alert.acknowledged 
                            ? 'bg-gray-50 border-gray-200' 
                            : 'bg-red-50 border-red-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-sm">{alert.type}</p>
                            <p className="text-xs text-gray-600">{alert.message}</p>
                            <p className="text-xs text-gray-500">
                              {alert.timestamp.toLocaleString()}
                            </p>
                          </div>
                          {!alert.acknowledged && isEditing && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => acknowledgeAlert(alert.id)}
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                          )}
                          {alert.acknowledged && (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No alerts for this job</p>
                )}
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  Timeline
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium">Job Logged</p>
                    <p className="text-xs text-gray-500">
                      {job.dateLogged.toLocaleString()}
                    </p>
                  </div>
                </div>
                {job.dateAccepted && (
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium">Job Accepted</p>
                      <p className="text-xs text-gray-500">
                        {job.dateAccepted.toLocaleString()}
                      </p>
                    </div>
                  </div>
                )}
                {job.dateOnSite && (
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium">On Site</p>
                      <p className="text-xs text-gray-500">
                        {job.dateOnSite.toLocaleString()}
                      </p>
                    </div>
                  </div>
                )}
                {job.dateCompleted && (
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium">Completed</p>
                      <p className="text-xs text-gray-500">
                        {job.dateCompleted.toLocaleString()}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}


