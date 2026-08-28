import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export interface AuditLogEntry {
  action: string;
  entityType: string;
  entityId?: string;
  details?: Record<string, unknown>;
}

export const logAdminActivity = async (entry: AuditLogEntry): Promise<boolean> => {
  if (!isSupabaseConfigured()) {
    return true; // Local dev preview silent pass
  }

  try {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData?.user) return false;

    const { error } = await supabase.from('admin_activity_logs').insert({
      admin_id: userData.user.id,
      action: entry.action,
      entity_type: entry.entityType,
      entity_id: entry.entityId || null,
      details_json: entry.details || {},
    });

    if (error) {
      console.warn('Audit log write error:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Audit log exception:', err);
    return false;
  }
};
