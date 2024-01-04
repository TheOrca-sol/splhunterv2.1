import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Spin, Tag, Switch, ConfigProvider } from 'antd';
import { ShareAltOutlined, LoadingOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import { deepPurple, amber } from '@mui/material/colors';
import { Avatar } from 'antd';
import { paginationClasses } from '@mui/material';



const TokenTable = ({ darkMode, setDarkMode }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mintView, setMintView] = useState(null);
  const [forceUpdate, forceRender] = React.useState(0);
  const [refresh, setRefresh] = useState(true);
  const [bottom] = useState('bottomCenter');


  

  const theme2 = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: deepPurple[500],
      },
      secondary: {
        main: amber[500],
      },
    },
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleSwitchChange = (checked) => {
    setRefresh(checked);
  };

  // Move handleMoreDetails function here
  const handleMoreDetails = async (record) => {
    try {
      let loadingView = <Spin indicator={<LoadingOutlined style={{ fontSize: '24px' }} />} />;
      setMintView(loadingView);
      forceRender((prev) => prev + 1); // Force re-render

      const rcResponse = await axios.get(`http://localhost:5000/checkmint/${record.address}`);
      const mintData = rcResponse.data.mint;

      let updatedView = mintData ? <UnlockOutlined style={{ fontSize: '32px' }}/> : <LockOutlined style={{ fontSize: '32px' }} />;
      setMintView(updatedView);
      forceRender((prev) => prev + 1); // Force re-render

      Modal.info({
        title: 'Details',
        content: (
          <div>
            {/* Customize the content inside the Modal based on the record */}
            <p>Name: {record.name}</p>
            <p>Symbol: {record.symbol}</p>
            <p>Address: {record.address}</p>
            <p>Liquidity: {record.liquidity}</p>
            <p>Supply: {rcResponse.data.supply}</p>
            <p>Freeze: {rcResponse.data.freeze}</p>
            <p>Mint authority: {mintView}</p>
            <p>Decimals: {record.decimals}</p>
            <p>Source:{record.source}</p>

            <iframe src={record.rugcheck_url} width="100%" height="400"></iframe>
          </div>
        ),
        onOk() {},
      });
    } catch (error) {
      console.error('Error fetching supply:', error);
    }
  };

  const columns = [
    {
      title: 'icon',
      dataIndex: 'icon',
      key: 'icon',
      sorter: false,
      width: '10%',
      render: (url) => <Avatar size={{ xs: 24, sm: 32, md: 40, lg: 64,  xxl: 64 }}  src={url} alt="icon"/>,
    },
    {
      title: 'name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'symbols',
      dataIndex: 'symbol',
      key: 'symbol',
      sorter: false,
    },
    {
      title: 'Liquidity',
      dataIndex: 'liquidity',
      key: 'liquidity',
      sorter: true,
      render: (liquidity) => {
        let color = liquidity > 1000 ? 'green' : 'red';
        if (liquidity != 'None'){
          return <Tag style={{ fontSize: 'medium' }} color={color}>{liquidity +' $'} </Tag>;
        }
        else
          return <Tag style={{ fontSize: 'medium' }} color='geekblue'>{liquidity}</Tag>
      }
    },
    {
      title: 'Links',
      dataIndex: 'birdeye_url',
      key: 'birdeye_url',
      render: (url, record) => {
         let raydium_url = `https://raydium.io/swap?inputCurrency=sol&outputCurrency=${record.address}&fixed=in`;

         return <div>
                  <a className='link' href={record.birdeye_url} target="_blank" rel="noopener noreferrer">
                    <Avatar size={{ xs: 24, sm: 32, xxl: 40 }} src={process.env.PUBLIC_URL+'./birdeye.png'} alt="Birdeye" />
                  </a>
                  <a className='link'href={raydium_url} target="_blank" rel="noopener noreferrer">
                    <Avatar size={{ xs: 24, sm: 32, xxl: 40 }} src={process.env.PUBLIC_URL+'./raydium.png'} alt="Raydium" />
                  </a>
                </div>}

    },
    {
      title: 'More details',
      dataIndex: 'more_details',
      key: 'more_details',
      render: (_, record) => (
        <Button style={{backgroundColor:'#3f3c3c', color:'white'}} onClick={() => handleMoreDetails(record)}>View Details</Button>
      ),
    },

    {
      title: 'creation date',
      dataIndex: 'createdat',
      key: 'createdat',
    },
    {
      title:'burnedlp',
      dataIndex:'burnedlp',
      key:'burnedlp',
      render: (burnedlp) => (
        <div>
          {burnedlp.titles_list.map((title, index) => (
            <div key={index}>
              <p>Title: {title}</p>
              {/* Render other properties from the burnedLp data as needed */}
            </div>
          ))}
        </div>
      ),
    }
  ];

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/index');
      const newData = response.data.rugcheck_urls.map((url, index) => ({
        key: index,
        symbol: response.data.all_symbols[index],
        rugcheck_url: url,
        birdeye_url: response.data.birdeye_urls[index],
        icon: response.data.iconlist[index],
        liquidity: response.data.liquidity[index],
        createdat: response.data.createdAt[index],
        name: response.data.name[index],
        address: response.data.address[index],
        source: response.data.source[index],
        decimals: response.data.decimals[index],
        burnedlp: response.data.burnedlp,
      }));
      setData(newData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    const intervalId = setInterval(() => {
      if(refresh){
        fetchData();
      }
    }, 60000);

    // Clear the interval on unmount
    return () => clearInterval(intervalId);
  }, [refresh]);

  console.log('Table Data:', data);
  
  const paginationStyles = {
    color: 'white', // Set the text color to white
  };

  return (
        <div className='App'>
           <Switch
           label="Refresh :"
          checkedChildren="Play"
          unCheckedChildren="Pause"
          defaultChecked
          onChange={handleSwitchChange}
        /><br/>
          <Table
            className='table'
            columns={columns}
            dataSource={data}
            loading={loading}
            pagination={{
              position: [bottom],
              itemBg: 'white',
              style: paginationStyles, // Apply custom styles to the pagination
            }}            
            />
        </div>
        
  );
};


export default TokenTable
