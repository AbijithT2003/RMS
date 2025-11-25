import { useAuth } from '../api/context/AuthContext';

export const useRoleAccess = () => {
  const { user } = useAuth();
  
  const hasRole = (roles) => {
    if (!user?.role) return false;
    return Array.isArray(roles) ? roles.includes(user.role) : user.role === roles;
  };

  const canCreateJobs = () => hasRole(['RECRUITER', 'ADMIN']);
  const canManageApplications = () => hasRole(['RECRUITER', 'ADMIN']);
  const canScheduleInterviews = () => hasRole(['RECRUITER', 'ADMIN']);
  const canViewAllUsers = () => hasRole(['ADMIN']);
  const canApplyToJobs = () => hasRole(['CANDIDATE', 'APPLICANT']);

  return {
    hasRole,
    canCreateJobs,
    canManageApplications,
    canScheduleInterviews,
    canViewAllUsers,
    canApplyToJobs,
    userRole: user?.role
  };
};

export default useRoleAccess;