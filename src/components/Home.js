import React from 'react'
import { Carousel } from 'antd';
import Paper from '@mui/material/Paper';
import { ClockCircleOutlined } from '@ant-design/icons';
import { Timeline } from 'antd';
import { Card, Space, Avatar,Divider } from 'antd';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { Icon } from '@iconify/react';
import Fab from '@mui/material/Fab';
import { useLocation, useNavigate } from 'react-router-dom';




const contentStyle = {
  height: '160px',
  width: '80px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const { Meta } = Card;

const chartData = [
    { name: 'Team', value: 10 },
    { name: 'Marketing', value: 40 },
    { name: 'Treasury', value: 50 },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#9e2219'];
  
const customMetaStyle = {
    titleStyle: { color: 'white' }, // Custom style for the title
    descriptionStyle: { color: 'white' } // Custom style for the description
};
const customCardStyle = {
    color: 'white', // This sets the text color of the entire card content to white
  };


const Home = () => {
    const navigate = useNavigate();

      
  return (
    <div className='home'>
         <div id="carouselExampleDark" class="carousel carousel-dark slide">
           
            <div class="carousel-inner">
                <div class="carousel-item active" data-bs-interval="10000">
                <img src={process.env.PUBLIC_URL+'./splabs-cover2.png'} class="d-block w-100" alt="..."/>
                <div class="carousel-caption d-none d-md-block" >
                <Paper className='carousel-placeholder' square={false} elevation={24} variant="outlined">
                    <h3 >Your Gateway to Advanced SPL Tokens Insights and Trading Edge!</h3>
                    
                    </Paper>
                </div>
                </div>
                
                
            </div>
            
        </div><br/>
        <p align='center'> Our goal is to arm you with the most comprehensive and real-time information about SPL tokens, 
                        especially those that have undergone LP token burn.</p><br/>
            <div align='center'>
            <Avatar className='app-icon' size={{xs: 150, sm: 150, md: 150, lg: 150,xl:150, xxl: 150 }} src={process.env.PUBLIC_URL+'./splabslogo2.png'}/> <br/><br/>

            <Fab 
            variant="extended" 
            color="warning" 
            
            >
            <Icon icon="mingcute:radar-line" width="26" style={{margin:'10px'}}/>
            SPL-Hunter
        </Fab>
        </div>
        <Divider />
        <h4 align='center' color='orange'>Why SPLabs ?</h4><br/><br/><br/><br/>
        <div align='center' >
        <Card className='why-card' hoverable align='left' style={{width: '80%',display: 'flex'}}
            cover={<Avatar style={{marginLeft: 10,marginTop:10}} size={{xs: 150, sm: 150, md: 150, lg: 150, xxl: 150 }} src={process.env.PUBLIC_URL+'./card1.png'}/>}
            >
                <h5>In-depth SPL Tokens Data</h5>
                <p>Gain instant access to essential details on newly created 
            SPL tokens. SPLabs simplifies and accelerates the process of discovering and analyzing these tokens, giving you a seamless experience.
            </p>
           
        </Card>
        </div><br/>
        
        <div  align='center' >
        <Card className='why-card' hoverable align="left" style={{width:'80%',display: 'flex'}}
            cover={<Avatar style={{marginLeft: 10,marginTop:10}} size={{xs: 150, sm: 150, md: 150, lg: 150, xxl: 150 }} src={process.env.PUBLIC_URL+'./card2.png'}/>}
        >   <h5>Early Discovery Advantage</h5>
            <p>Our NFT holders will enjoy the privilege of getting ahead in the trading game. 
            SPLabs offers the unique advantage of discovering new SPL tokens before the wider market, providing a significant edge in your 
            trading strategies.</p>
           
        </Card>
        </div><br/>
        <div align='center'  >
        <Card className='why-card' hoverable align="left" style={{width:'80%',display: 'flex'}}
            cover={<Avatar style={{marginLeft: 10,marginTop:10}} size={{xs: 150, sm: 150, md: 150, lg: 150, xxl: 150 }} src={process.env.PUBLIC_URL+'./card3.png'}/>}
        >
            <h5>Ongoing Utility Expansion</h5>
            <p>SPLabs is not just about current offerings. We are committed to continuously expanding our utility spectrum. Stay 
            tuned for more revelations about future utilities.</p>
          
        </Card>
        </div><br/><br/>

            

            <Divider/>
            <div align='center' >
            <h4>Tokenomics</h4>
            <PieChart align='center' width={400} height={400} >
                <Pie
                data={chartData}
                cx={200}
                cy={200}
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                >
                {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
            </div><br/><br/>
       

 
    <Divider/>
    <h4 align='center'>Roadmap</h4><br/><br/><br/><br/>
    
    <Timeline mode="alternate">
        <Timeline.Item color='green' style={{ color: 'orange' }}>SPL-Hunter</Timeline.Item>
        <Timeline.Item style={{ color: 'orange' }}>Raid2Earn Service</Timeline.Item>
        <Timeline.Item style={{ color: 'orange' }}>
        Services Marketplace
        </Timeline.Item>
        <Timeline.Item style={{ color: 'orange' }}>SPL Tokens Launchpad</Timeline.Item>
    </Timeline>


    </div>
  )
}

export default Home
