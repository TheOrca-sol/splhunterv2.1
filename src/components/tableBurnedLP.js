import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Switch, message,Avatar, Modal, Button,  Divider, Typography,List ,Tag} from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ShareAltOutlined, LoadingOutlined, LockOutlined, UnlockOutlined,CopyOutlined } from '@ant-design/icons';

const TableBurnedLP = (top_holders) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const [bottom] = useState('bottomCenter');
  const [currentDate, setCurrentDate] = useState('');
  const { Title, Paragraph, Text, Link } = Typography;


  const handleSwitchChange = (checked) => {
    setRefresh(checked);
  };
  
  const handleCopyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
        .then(() => {
        message.success('Address copied to clipboard');
        })
        .catch((error) => {
        console.error('Error copying to clipboard:', error);
        message.error('Failed to copy address');
        });
    };

    

      const handleMoreDetails = async (top_holders, description,total_percentage,pool_id) => {
        try {
          const halfLength = Math.ceil(top_holders.length / 2);
          const firstHalf = top_holders.slice(0, halfLength);
          const secondHalf = top_holders.slice(halfLength);
          const customTitle = (
            <div level={3} style={{ color: 'white' }}>Description</div> // Custom title with inline styling
          );
          Modal.info({
            
            title: customTitle,
            className: 'dark-modal ',
            maskClosable: true,
            content: (
              <div>
                <Typography>
                  
                  <Paragraph style={{ color: 'white' }}>{description}</Paragraph>
                </Typography>
                <Divider />

                <Typography>
                  
                  <Paragraph style={{ color: 'white' }}>{pool_id}</Paragraph>
                </Typography>
                <Divider />

                <Typography >
                  <Title style={{ color: 'white' }}level={5}>Top Holders: {parseFloat(total_percentage).toFixed(2)}%</Title>
                </Typography>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <List
                    style={{ flex: 1, marginRight: '10px',color:'white' }}
                    itemLayout="horizontal"
                    dataSource={firstHalf}
                    renderItem={(item) => (
                        <a href={item.link}>
                        <List.Item>
                          <List.Item.Meta
                           avatar={<Avatar size={{ xs: 24 }} src={process.env.PUBLIC_URL+'./solscan.png'} />}
                           title={<span style={{ color: 'white' }}>{item.percentage}%</span>}
                           description={<span style={{ color: 'white' }}>{item.holder_name}</span>}
                           />
                        </List.Item>
                        </a>
                      )}
                  />
                  <List
                    style={{ flex: 1 ,color:'white'}}
                    itemLayout="horizontal"
                    dataSource={secondHalf}
                    renderItem={(item) => (
                        <a href={item.link}>
                        <List.Item >
                          <List.Item.Meta
                          
                           avatar={<Avatar size={{ xs: 24 }} src={process.env.PUBLIC_URL+'./solscan.png'} />}
                           title={<span style={{ color: 'white' }}>{item.percentage}%</span>}
                           description={<span style={{ color: 'white' }}>{item.holder_name}</span>}
                          />
                        </List.Item>
                        </a>
                      )}
                  />
                </div>
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
        title: 'Icon',
        dataIndex: 'icon',
        key: 'icon',
        sorter: false,
        render: (icon) => <Avatar size={{ xs: 24, sm: 32, md: 40, lg: 64,  xxl: 64 }}  src={icon} alt="icon" />,
        },
        {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: false,
        render: (name) =>(<div className='token-name' >{name}</div>)
        },
        {
        title: 'LP Burn%',
        dataIndex: 'pool_percentage',
        key: 'pool_percentage',
        sorter: false,
        },
        {
        title: 'LP',
        dataIndex: 'lp_burned',
        key: 'lp_burned',
        sorter: false,
        render: () =>(<p >🟢</p>)
        },
        {
        title: 'Mint',
        dataIndex: 'minting',
        key: 'minting',
        sorter: false,
        render: (minting) =>{
            if(minting == ':white_check_mark:'){
                return <p>🟢</p>
            }
            else
                return <p>🔴</p>
        }
        },
        {
        title: 'Freeze',
        dataIndex: 'freeze',
        key: 'freeze',
        sorter: false,
        render: (freeze) =>{
            if(freeze == ':white_check_mark:'){
                return <p>🟢</p>
            }
            else
                return <p>🔴</p>
        }
        },
        {
        title: 'Address',
        dataIndex: 'mint_address',
        key: 'mint_address',
        sorter: false,
        render: (address) => {
        const truncatedAddress = address.slice(0, 4) + "...." + address.slice(-4);
        return (
            <CopyToClipboard
            className= 'copy-input'
            text={address}
            onCopy={() => handleCopyToClipboard(address)}
            >
            <span style={{ cursor: 'pointer', textDecoration: 'underline' }}><CopyOutlined style={{ marginRight: 8 }} />
          {truncatedAddress}</span>
            </CopyToClipboard>
        );
        },
        },
        {
        title: 'Pool id',
        dataIndex: 'pool_id',
        key: 'pool_id',
        sorter: false,
        render: (pool_id) => {
            const truncatedPoolId = pool_id.slice(0, 4) + "...." + pool_id.slice(-4);
            return (
                <CopyToClipboard
                className= 'copy-input'
                text={pool_id}
                onCopy={() => handleCopyToClipboard(pool_id)}
                >
                <span style={{ cursor: 'pointer', textDecoration: 'underline' }}><CopyOutlined style={{ marginRight: 8 }} />
              {truncatedPoolId}</span>
                </CopyToClipboard>
            );},
        },
        {
        title: 'Start Time',
        dataIndex: 'trade_startTime',
        key: 'trade_startTime',
        sorter: false,
        render: (trade_startTime) =>{
            if (trade_startTime){
                return trade_startTime
            }
            else
                return 'None'

        }
        },
        {
        title: 'Top Holders',
        dataIndex: 'top_holders',
        key: 'top_holders',
        sorter: false,
        render: (_, record) => {
          let color = record.total_percentage < 50 ? 'green' : 'red';
          if (record.total_percentage > 50){
            return <>
                <div align='center'>
              
                <Tag style={{ fontSize: 'medium' }} color={color}>{parseFloat(record.total_percentage).toFixed(2)}%</Tag><br/>
                
                <Button style={{backgroundColor:'#3f3c3c', color:'white'}} onClick={() => handleMoreDetails(record.top_holders, record.description, record.total_percentage)}>View Details</Button>
              </div></>
          }
          else
            return <>
            <div align='center'>
          
            <Tag style={{ fontSize: 'medium' }} color={color}>{parseFloat(record.total_percentage).toFixed(2)}%</Tag><br/>
            
            <Button style={{backgroundColor:'#3f3c3c', color:'white'}} onClick={() => handleMoreDetails(record.top_holders, record.description, record.total_percentage)}>View Details</Button>
          </div></>
          }
          
        
          
          
        },
        {
        title: 'Links',
        dataIndex: 'links',
        key: 'links',
        sorter: false,
        render: (address, record,links) => {
            let raydium_url = `https://raydium.io/swap?inputCurrency=sol&outputCurrency=${record.address}&fixed=in`;
            let birdeye_url = `https://birdeye.so/token/${record.address}?chain=solana`;
            let dexscreener_url = 'https://dexscreener.com/solana/'+record.address
            let rugcheck_url='https://rugcheck.xyz/tokens/'+record.address
            return <div className='useful_link' >
                     <a  href={birdeye_url} target="_blank" rel="noopener noreferrer">
                       <Avatar size={{ xs: 24, sm: 32, xxl: 40 }} src={process.env.PUBLIC_URL+'./birdeye.png'} alt="Birdeye" />
                     </a>
                     <a href={raydium_url} target="_blank" rel="noopener noreferrer">
                       <Avatar size={{ xs: 24, sm: 32, xxl: 40 }} src={process.env.PUBLIC_URL+'./raydium.png'} alt="Raydium" />
                     </a>
                     <a href={dexscreener_url} target="_blank" rel="noopener noreferrer">
                       <Avatar size={{ xs: 24, sm: 32, xxl: 40 }} src={process.env.PUBLIC_URL+'./dexscreener.png'} alt="Raydium" />
                     </a>
                     <a href={rugcheck_url} target="_blank" rel="noopener noreferrer">
                       <Avatar size={{ xs: 24, sm: 32, xxl: 40 }} src={process.env.PUBLIC_URL+'./rugcheck.jpg'} alt="Raydium" />
                     </a>
                     <a href={record.links} target="_blank" rel="noopener noreferrer">
                       <Avatar size={{ xs: 24, sm: 32, xxl: 40 }} src={process.env.PUBLIC_URL+'./solscan.png'} alt="Raydium" />
                     </a>
                     
                   </div>}
   
        },
        {
        title: 'Pool Date',
        dataIndex: 'pool_date',
        key: 'pool_date',
        sorter: false,
        },
        {
        title: 'Source',
        dataIndex: 'pool_name',
        key: 'pool_name',
        sorter: false,
        },
        
       
       
        ];

  
  
    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:5000');
        
            const newData = response.data.mintAddress_list.map((address, index) => ({
                key: index,
                mint_address: response.data.mintAddress_list[index],
                address:address,
                name: response.data.name_list[index],
                description: response.data.description_list[index],
                minting: response.data.minting_list[index],
                freeze: response.data.freeze_account_list[index],
                pool_id: response.data.pool_id_list[index],
                trade_startTime:response.data.trade_startTime_list[index],
                top_holders:response.data.top_holders_list[index],
                links:response.data.links_list[index],
                icon:response.data.thumbnail_list[index],
                pool_date:response.data.footer_list[index],
                pool_name:response.data.pool_name_list[index],
                pool_percentage:response.data.pool_percentage_list[index],
                total_percentage:response.data.total_percentage_list[index],




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
        if (refresh) {
          fetchData();
        }
      }, 60000);
  
      // Clear the interval on unmount
      return () => clearInterval(intervalId);
    }, [refresh]);

    
   
  
    const paginationStyles = {
      color: 'white', // Set the text color to white
    };
  
    return (
      <div className='App'>
        <div className='auto-refresh' align='center'>
          <label style={{marginRight:'10px'}}>Auto refresh:</label>
        <Switch
          label="Refresh :"
          checkedChildren="Play"
          unCheckedChildren="Pause"
          defaultChecked
          onChange={handleSwitchChange}
        />
        </div>
        
        <br />
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
  
  export default TableBurnedLP;