import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Job, Customer, Engineer } from '@/types/job';
import { mockJobs, mockCustomers, mockEngineers } from '@/lib/jobUtils';
import { 
  FileText, 
  ArrowLeft, 
  Download, 
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle,
  User,
  Building2,
  Briefcase,
  TrendingUp,
  BarChart3
} from 'lucide-react';

interface EndOfShiftReportProps {
  onBack: () => void;
}

export default function EndOfShiftReport({ onBack }: EndOfShiftReportProps) {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedEngineer, setSelectedEngineer] = useState<string>('all');
  const [shiftNotes, setShiftNotes] = useState('');

  // Filter jobs for the selected date
  const getJobsForDate = (date: string) => {
    const targetDate = new Date(date);
    return mockJobs.filter(job => {
      const jobDate = new Date(job.dateLogged);
      return jobDate.toDateString() === targetDate.toDateString();
    });
  };

  const jobsForDate = getJobsForDate(selectedDate);
  const filteredJobs = selectedEngineer === 'all' 
    ? jobsForDate 
    : jobsForDate.filter(job => job.engineer === selectedEngineer);

  // Calculate statistics
  const stats = {
    totalJobs: filteredJobs.length,
    completed: filteredJobs.filter(job => job.status === 'green').length,
    inProgress: filteredJobs.filter(job => job.status === 'amber').length,
    issues: filteredJobs.filter(job => job.status === 'red').length,
    totalCustomers: new Set(filteredJobs.map(job => job.customer)).size,
    totalSites: new Set(filteredJobs.map(job => job.site)).size,
  };

  // Calculate completion rate
  const completionRate = stats.totalJobs > 0 ? (stats.completed / stats.totalJobs) * 100 : 0;

  // Get engineer performance
  const engineerStats = mockEngineers.map(engineer => {
    const engineerJobs = filteredJobs.filter(job => job.engineer === engineer.name);
    return {
      name: engineer.name,
      totalJobs: engineerJobs.length,
      completed: engineerJobs.filter(job => job.status === 'green').length,
      inProgress: engineerJobs.filter(job => job.status === 'amber').length,
      issues: engineerJobs.filter(job => job.status === 'red').length,
      completionRate: engineerJobs.length > 0 ? (engineerJobs.filter(job => job.status === 'green').length / engineerJobs.length) * 100 : 0
    };
  }).filter(eng => eng.totalJobs > 0);

  // Get customer breakdown
  const customerStats = mockCustomers.map(customer => {
    const customerJobs = filteredJobs.filter(job => job.customer === customer.name);
    return {
      name: customer.name,
      totalJobs: customerJobs.length,
      completed: customerJobs.filter(job => job.status === 'green').length,
      inProgress: customerJobs.filter(job => job.status === 'amber').length,
      issues: customerJobs.filter(job => job.status === 'red').length,
    };
  }).filter(cust => cust.totalJobs > 0);

  const handleGenerateReport = () => {
    // In a real application, this would generate and download a PDF report
    console.log('Generating report for:', selectedDate, selectedEngineer, shiftNotes);
    alert('Report generated successfully! (This would download a PDF in a real application)');
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">End of Shift Report</h1>
          <p className="text-muted-foreground mt-2">
            Generate comprehensive reports for completed shifts
          </p>
        </div>
        <Button onClick={onBack} variant="outline" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>

      {/* Report Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Report Configuration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Report Date</label>
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Engineer</label>
              <Select value={selectedEngineer} onValueChange={setSelectedEngineer}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Engineer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Engineers</SelectItem>
                  {mockEngineers.map(engineer => (
                    <SelectItem key={engineer.name} value={engineer.name}>
                      {engineer.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button onClick={handleGenerateReport} className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Shift Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">Total Jobs</CardTitle>
            <Briefcase className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{stats.totalJobs}</div>
            <p className="text-xs text-blue-700">Jobs processed</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">{stats.completed}</div>
            <p className="text-xs text-green-700">{completionRate.toFixed(1)}% completion rate</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-amber-800">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-900">{stats.inProgress}</div>
            <p className="text-xs text-amber-700">Ongoing work</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-red-800">Issues</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-900">{stats.issues}</div>
            <p className="text-xs text-red-700">Require attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Engineer Performance */}
      {engineerStats.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Engineer Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {engineerStats.map(engineer => (
                <div key={engineer.name} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div>
                      <h3 className="font-semibold">{engineer.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {engineer.totalJobs} jobs • {engineer.completionRate.toFixed(1)}% completion
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="default" className="bg-green-600">
                      {engineer.completed} completed
                    </Badge>
                    {engineer.inProgress > 0 && (
                      <Badge variant="secondary">
                        {engineer.inProgress} in progress
                      </Badge>
                    )}
                    {engineer.issues > 0 && (
                      <Badge variant="destructive">
                        {engineer.issues} issues
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Customer Breakdown */}
      {customerStats.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Customer Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {customerStats.map(customer => (
                <div key={customer.name} className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">{customer.name}</h3>
                  <div className="flex items-center gap-2">
                    <Badge variant="default" className="bg-green-600">
                      {customer.completed} completed
                    </Badge>
                    {customer.inProgress > 0 && (
                      <Badge variant="secondary">
                        {customer.inProgress} in progress
                      </Badge>
                    )}
                    {customer.issues > 0 && (
                      <Badge variant="destructive">
                        {customer.issues} issues
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Job Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Job Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredJobs.length > 0 ? (
              filteredJobs.map(job => (
                <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div>
                      <h3 className="font-semibold">{job.jobNumber}</h3>
                      <p className="text-sm text-muted-foreground">
                        {job.customer} • {job.site}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {job.engineer} • {formatTime(job.dateLogged)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={job.status === 'green' ? 'default' : job.status === 'amber' ? 'secondary' : 'destructive'}>
                      {job.status}
                    </Badge>
                    <Badge variant="outline">
                      {job.priority}
                    </Badge>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-2 text-sm font-semibold text-gray-900">No jobs found</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  No jobs were processed on the selected date.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Shift Notes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Shift Notes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Add any notes about the shift, issues encountered, or important observations..."
            value={shiftNotes}
            onChange={(e) => setShiftNotes(e.target.value)}
            rows={4}
          />
        </CardContent>
      </Card>
    </div>
  );
}
