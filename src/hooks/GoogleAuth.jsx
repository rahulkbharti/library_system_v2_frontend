 const googleAuth = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await axios.post('http://localhost:3000/auth/google-login', {
          access_token: tokenResponse.access_token,
        });

        console.log('User Info:', res.data);
        alert(`Welcome ${res.data.name}`);
      } catch (error) {
        console.error('Error sending token to backend:', error);
      }
    },
    onError: () => {
      console.error('Google Login Failed');
    },
    scope: 'openid email profile',
  });