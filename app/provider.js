'use client'

import { db } from "@/configs/db";
import { Users } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import React, { useEffect } from "react";
function Provider({ children }) {

    const { user } = useUser()

    useEffect(() => {
        if (user && user.primaryEmailAddress?.emailAddress) {
            console.log('Attempting to query for email:', user.primaryEmailAddress.emailAddress);
            isNewUser();
        } else {
            console.log('No user or email available:', user);
        }
    }, [user]);
    
    const isNewUser = async () => {
        try {
            console.log('Running query...');
            const result = await db.select().from(Users)
                .where(eq(Users.email, user?.primaryEmailAddress?.emailAddress));
    
            if (result.length === 0) {
                console.log('No user found with this email');
                await db.insert(Users).values({
                    name: user.fullName,
                    email: user?.primaryEmailAddress?.emailAddress,
                    imageUrl: user?.imageUrl
                });
                console.log('New user inserted');
            } else {
                console.log('User already exists:');
            }
        } catch (error) {
            console.error('Error executing query:', error);
        }
    };
    

    return (
        <>
            {children}
        </>
    )
}

export default Provider;