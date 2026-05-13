import React, { useEffect } from 'react'
import { Stack, TextInput } from '@mantine/core';
import { Button } from '@mantine/core';
import Service from '../../utils/http';
import { useState } from 'react';


const UrlShortner = () => {
    const service = new Service();
    const [data, setData] = useState("");  
    const [shorturl, setShorturl] = useState("");
    const handlesubmit = async () => {
        try {
            const response = await service.post("s", data);
            setShorturl(`https://url-shortener-bootcamp.onrender.com/api/s/${response.shortCode}`);
            console.log('Response:', response);
        } catch (error) {
            console.error('Error occured during URL shortening:', error);
        }
    }
      useEffect(() => {
    console.log(shorturl);
  }, [shorturl])
  return (
    <>
    {shorturl && shorturl.length ? <p>{shorturl}</p> :
    <Stack>
      <TextInput
      label="Original URL"
      withAsterisk
      placeholder="Input placeholder"
      onChange={(event) => setData({...data, originalUrl: event.target.value})}
    />
    <TextInput
      label="Custom name"
      placeholder="Input placeholder"
      onChange={(event) => setData({...data, shortCode: event.target.value})}
    />
    <TextInput
      label="Title"
      placeholder="Input placeholder"
      onChange={(event) => setData({...data, title: event.target.value})}
    />
    <Button onClick={handlesubmit} variant="outline">Button</Button>
    </Stack>}
    </>
  )
}
export default UrlShortner
