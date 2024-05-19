import React from "react";
import { useWeavy, WyMessenger } from "@weavy/uikit-react";
import axios from 'axios';

export function WeavyComponent() {
  useWeavy({
    url: "https://ec0233f4681040e6a0e5b1781baf756b.weavy.io",
    tokenFactory: async () => getToken()
  });

  return <WyMessenger className="h-screen"></WyMessenger>;
}


async function getToken() {
  try {
  
    const username = localStorage.getItem('username');
    if (!username) {
      throw new Error('Username not found in localStorage');
    }

    const response = await axios.get('http://localhost:3000/api/v1/signin/token', {
      headers: {
        'username': username
      }
    });

    // Handle the response
    if (response.status === 200) {
      const { access_token } = response.data;
      console.log('Access Token:', access_token);
      const nameUpdate = await axios.patch(`https://ec0233f4681040e6a0e5b1781baf756b.weavy.io/api/users/${username}`, 
      {
        name: (localStorage.getItem("wfname")?(localStorage.getItem("wfname")):(localStorage.getItem("hfname")))
      }, 
      {
        headers: {
          Authorization: `Bearer wys_rAfdZh6veXhf4p10T4l7kSMO0Cc1fn2C4Xio`,
          'Content-Type': 'application/json'
        }
      });
      return access_token;
    } else {
      console.error('Failed to fetch token:', response.data);
    }
  } catch (error) {
    console.error('Error fetching token:', error);
  }
}
