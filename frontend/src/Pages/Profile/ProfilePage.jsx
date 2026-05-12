import React, { useState } from "react";
import Service from "../../utils/http";
import { Avatar, Container } from "@mantine/core";
import { Loader } from '@mantine/core';
import { Stack, Text } from "@mantine/core";
import { useEffect } from "react";
export default function ProfilePage() {
    const service = new Service();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const fetchUser = async () => {
        try{
            const res=await service.get('User/me');
            setUser(res);
        }
        catch(err){
            console.error(err);
        }
        finally{
            setLoading(false);
        }
    }
    useEffect(
        () => { fetchUser() }, []
    );
    if(loading){
        return <Loader color="teal" />;
    }
     if (!user) {
        return <div>User not found</div>;
    }
return (
 <Container>
            <Stack
                h={300}
                bg="var(--mantine-color-body)"
                align="center"
                justify="center"
                gap="lg"
            >
                <Avatar src={user.avatar} size={150} radius={150} alt="it's me" />
                <Text> {user.name}</Text>
                <Text> {user.email}</Text>
                <Text> {new Date(user.createdAt).toLocaleDateString()}</Text>
            </Stack>
        </Container>
    
    )
}