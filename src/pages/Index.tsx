import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Job, Customer, JobAlert } from '@/types/job';
import { mockJobs, mockCustomers, mockEngineers } from '@/lib/jobUtils';
import MasterDashboard from '@/components/MasterDashboard';
import CustomerDashboard from '@/components/CustomerDashboard';
import CustomerAlertsPortal from '@/components/CustomerAlertsPortal';
import JobLogWizard from '@/components/JobLogWizard';
import JobEditModal from '@/components/JobEditModal';
import JobDetailPage from './JobDetailPage';

type View = 'master' | 'customer' | 'alerts' | 'wizard';

export default function Index() {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [customers] = useState<Customer[]>(mockCustomers);
  const [currentView, setCurrentView] = useState<View>('master');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleJobCreate = (newJob: Omit<Job, 'id'>) => {
    const jobWithId: Job = {
      ...newJob,
      id: `job-${Date.now()}`
    };
    setJobs(prev => [jobWithId, ...prev]);
    setCurrentView('master');
  };

  const handleJobClick = (job: Job) => {
    navigate(`/job/${job.id}`);
  };

  const handleJobSave = (updatedJob: Job) => {
    setJobs(prev => prev.map(job => 
      job.id === updatedJob.id ? updatedJob : job
    ));
    setSelectedJob(null);
  };

  const handleCustomerSelect = (customer: Customer) => {
    setSelectedCustomer(customer);
    setCurrentView('customer');
  };

  // If we're on a job detail page, show the JobDetailPage
  if (jobId) {
    return (
      <JobDetailPage 
        jobs={jobs} 
        onJobUpdate={handleJobSave}
      />
    );
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case 'master':
        return (
          <MasterDashboard
            jobs={jobs}
            customers={customers}
            onJobCreate={() => setCurrentView('wizard')}
            onJobClick={handleJobClick}
            onCustomerSelect={handleCustomerSelect}
          />
        );
      
      case 'customer':
        return selectedCustomer ? (
          <CustomerDashboard
            customer={selectedCustomer}
            jobs={jobs}
            engineers={mockEngineers}
            onBack={() => setCurrentView('master')}
            onJobClick={handleJobClick}
            onAlertsPortal={() => setCurrentView('alerts')}
          />
        ) : null;
      
      case 'alerts':
        return selectedCustomer ? (
          <CustomerAlertsPortal
            customer={selectedCustomer}
            jobs={jobs}
            onBack={() => setCurrentView('customer')}
            onJobUpdate={handleJobSave}
          />
        ) : null;
      
      case 'wizard':
        return (
          <JobLogWizard
            customers={customers}
            onJobCreate={handleJobCreate}
            onCancel={() => setCurrentView('master')}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-6">
        {renderCurrentView()}
      </div>
      
      <JobEditModal
        job={selectedJob}
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedJob(null);
        }}
        onSave={handleJobSave}
      />
    </div>
  );
}
