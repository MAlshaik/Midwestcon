"use server"

import { db } from "~/server/db";

export async function getRoles(userId: string) {
  const roles = await db.query.userRoles.findMany({
    where: (model, { eq }) => eq(model.userId, userId),
    with: {
        role: true
    }
  })
  return roles.map(role => role.role.name);
}