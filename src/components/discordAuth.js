import React, { useEffect,useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext'; // Added AuthContext import
import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';
import { Icon } from '@iconify/react';
import Marquee from 'react-fast-marquee';
import { Alert,Space } from 'antd';

const DiscordAuth = ({ onVerified }) => {  // Corrected way to receive props
    const location = useLocation();
    const navigate = useNavigate();
    const {  verifyRole } = useContext(AuthContext);


    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const code = queryParams.get('code');
        console.log('OAuth code received:', code); 

        if (code ) {
            exchangeCodeForToken(code);
            
        }
    }, [location,onVerified]);

     // Test button to manually trigger onVerified
    

    const exchangeCodeForToken = async (code) => {
        try {
            const response = await verifyRole(code); // Replace with your token exchange logic if needed

            if (response) {
                onVerified(code); // Manually trigger onVerified
            }

            navigate('/'); // Redirect after the process
        } catch (error) {
            console.error('Error in token exchange:', error);
        }
    };

    const DISCORD_OAUTH_URL = `https://discord.com/api/oauth2/authorize?client_id=1192698504154447892&response_type=code&redirect_uri=https%3A%2F%2Fsplabs.app%2Fdiscord-auth&scope=identify+guilds`;

    const handleDiscordLogin = () => {
        window.location.href = DISCORD_OAUTH_URL;
    };

    return (
        <div align='center' className='discord-auth'>
        <Space direction="vertical" style={{ width: '100%' }}>    
        <Alert
            
            banner
            message={
            <Marquee pauseOnHover gradient={false}>
                You need SPLabs NFT and to verify in discord to access this content, you can buy it <a href='#'> here</a>.
            </Marquee>
            }
        />
        
        
        
        <Fab 
            variant="extended" 
            color="primary" 
            onClick={handleDiscordLogin}>
            <Icon icon="mingcute:discord-line" width="26" style={{margin:'10px'}}/>
            Login with Discord
        </Fab>


        </Space>
        </div>
    );
};

export default DiscordAuth;
