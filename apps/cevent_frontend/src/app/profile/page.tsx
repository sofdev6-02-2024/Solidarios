"use client";
import AuthStatus from '@/components/AuthStatus';
import { useRoles } from '@/hooks/use-roles';

export default function ProfilePage() {
  const { hasRole, hasAnyRole, roles } = useRoles();
  return (
    <div>
      <h1>Profile</h1>
      <div>
        {hasRole("admin") ? (
          <div>Admin Account</div>
        ) : (<></>)}
      </div>
      <AuthStatus />
    </div>
  );
}