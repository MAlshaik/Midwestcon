"use server"

import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { events, userEvents } from "../schema";


export const getEvents = () => {
  return db.query.events.findMany();
}

export const getEventById = async (id: string | undefined) => {
    if (!id) {
        return null;
    }

    const event = await db.query.events.findFirst({
        where: eq(events.id, id),
    });

    return event;
};

export const getUserPoints = async (userId: string | undefined) => {
    if (!userId) {
        return 0;
    }

    const userEvent = await db.query.userEvents.findMany({
        where: eq(userEvents.userId, userId),
        with: {
            event: true
        }
    })

    console.log("userEvent", userEvent);
};