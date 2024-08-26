import { db } from '~/server/db';
import { userRoles } from '../schema';
import { User } from '@supabase/supabase-js';

export async function getUsers() {
  const results = await db.query.users.findMany({
    with: {
      roles: {
        with: {
          role: true
        }
      },
      projects: {
        with: {
          project: true
        }
      },
      events: {
        with: {
          event: true
        }
      }
    }
  });

  return results.map(user => ({
    id: user.id,
    email: user.email,
    metadata: user.raw_user_meta_data,
    roles: user.roles.map(ur => ur.role),
    projects: user.projects.map(up => up.project),
    points: user.events.reduce((acc, event) => acc + (event.event?.points || 0), 0),
  }));
}