"use server"

import { db } from "~/server/db";
import { projects, userProjects, projectSkills, users } from "~/server/db/schema";
import { eq, desc, sql} from "drizzle-orm";
import { createClient } from "~/utils/supabase/server";


export async function getPendingProjects() {
  const pendingProjects = await db.query.projects.findMany({
    where: eq(projects.status, "pending"),
    orderBy: [desc(projects.createdAt)],
    with: {
      projectSkills: true,
      userProjects: true,
    },
  });

  const supabase = createClient();

  const projectsWithUserData = await Promise.all(
    pendingProjects.map(async (project) => {
      const users = await Promise.all(
        project.userProjects.map(async (pu) => {
          const { data: userData } = await supabase.auth.admin.getUserById(pu.userId);
          return userData?.user ? {
            id: userData.user.id,
            email: userData.user.email,
            fullName: `${userData.user.user_metadata.firstName || ''} ${userData.user.user_metadata.lastName || ''}`.trim(),
            memberType: userData.user.user_metadata.memberType,
            role: pu.role,
          } : null;
        })
      );

      return {
        ...project,
        users: users.filter(Boolean),
        skills: project.projectSkills.map(ps => ps.skillName),
      };
    })
  );

  return projectsWithUserData;
}

export async function getProjectById(projectId: string) {
  const project = await db.query.projects.findFirst({
    where: eq(projects.id, projectId),
    with: {
      projectSkills: true,
      userProjects: {
        with: {
          user: true,
        }
      },
    },
  });

  if (!project) return null;

  project.userProjects = project.userProjects.map(up => up.user);

  console.log("project", project);

  return project;
}

export async function getApprovedProjects() {
  const approvedProjects = await db.query.projects.findMany({
    where: eq(projects.status, "approved"),
    orderBy: [desc(projects.createdAt)],
    with: {
      projectSkills: true,
      userProjects: true,
    },
  });

  const supabase = createClient();

  const projectsWithUserData = await Promise.all(
    approvedProjects.map(async (project) => {
      const users = await Promise.all(
        project.userProjects.map(async (pu) => {
          const { data: userData } = await supabase.auth.admin.getUserById(pu.userId);
          return userData?.user ? {
            id: userData.user.id,
            email: userData.user.email,
            fullName: `${userData.user.user_metadata.firstName || ''} ${userData.user.user_metadata.lastName || ''}`.trim(),
            memberType: userData.user.user_metadata.memberType,
            role: pu.role,
          } : null;
        })
      );

      return {
        ...project,
        users: users.filter(Boolean),
        skills: project.projectSkills.map(ps => ps.skillName),
      };
    })
  );

  return projectsWithUserData;
}

export async function getAllProjects() {
  const projectsData = await db.query.projects.findMany({
    orderBy: [desc(projects.createdAt)],
    with: {
      projectSkills: true,
      userProjects: {
        with: {
          user: true,
        },
      },
    },
  });

  const supabase = createClient();

  const enhancedProjects = await Promise.all(projectsData.map(async (project) => {
    const users = await Promise.all(project.userProjects.map(async (up) => {
      const { data: userData } = await supabase.auth.admin.getUserById(up.userId);
      return {
        id: up.userId,
        fullName: userData?.user?.user_metadata?.fullName || 'Unknown',
        role: up.role,
      };
    }));

    return {
      ...project,
      skills: project.projectSkills.map(ps => ps.skillName),
      users,
    };
  }));

  return enhancedProjects;
}


export async function getTopApprovedProjects(limit: number = 3) {
  const approvedProjects = await db.query.projects.findMany({
    where: eq(projects.status, "approved"),
    orderBy: [desc(projects.createdAt)],
    limit: limit,
    with: {
      projectSkills: true,
      userProjects: true,
    },
  });

  const supabase = createClient();

  const projectsWithUserData = await Promise.all(
    approvedProjects.map(async (project) => {
      const users = await Promise.all(
        project.userProjects.map(async (pu) => {
          const { data: userData } = await supabase.auth.admin.getUserById(pu.userId);
          return userData?.user ? {
            id: userData.user.id,
            email: userData.user.email,
            fullName: `${userData.user.user_metadata.firstName || ''} ${userData.user.user_metadata.lastName || ''}`.trim(),
            memberType: userData.user.user_metadata.memberType,
            role: pu.role,
          } : null;
        })
      );

      return {
        ...project,
        users: users.filter(Boolean),
        skills: project.projectSkills.map(ps => ps.skillName),
      };
    })
  );

  return projectsWithUserData;
}
