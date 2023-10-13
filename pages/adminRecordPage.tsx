import React, { useEffect, useState } from 'react';
import { Button, Select, Spin, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import getAuth from 'services/getAuth';
import styles from '../styles/AdminRecordPage.module.css';
import { NextPage } from 'next';
import getSingleUserRecord from 'services/getSingleUserRecord';

interface DataType {
  key: string;
  name: string;
  date: string;
  time: string;
  location: string;
  workingHour: string;
}

const RecordPage: NextPage = () => {
  const date = new Date()

  const [loadingPage, setLoadingPage] = useState(true);
  const [data, setData] = useState<DataType[]>([]);
  const [month, setMonth] = useState(date.getMonth() + 1);
  const [employeeName, setEmployeeName] = useState('');

  useEffect(() => {
    getAuth().catch(() => window.location.href='/');
    setEmployeeName(localStorage.getItem('employeeName') || '');
    getSingleUserRecord({userID: localStorage.getItem('employeeID') || '3', month}).then((records) => {
      setData(records || []);
      setLoadingPage(false);
    })
  }, [month]);

  const handleMonthChange = (value: string) => {
    setMonth(Number.parseInt(value));
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: () => employeeName,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (text) => text,
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Last Location',
      dataIndex: 'location',
      key: 'location',
      render: (location) => (
        <Tag color="green" key={location}>
          {location.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Working Hour',
      dataIndex: 'workingHour',
      key: 'workingHour',
    },
    // {
    //   title: 'Action',
    //   key: 'action',
    //   render: () => (
    //     <Space className={styles.actionSpace} size="middle">
    //       <a>Edit</a>
    //       <a>Delete</a>
    //     </Space>
    //   ),
    // },
  ];

  const MONTHES = [
    { value: '1', label: 'January' },
    { value: '2', label: 'Febuary' },
    { value: '3', label: 'March' },
    { value: '4', label: 'April' },
    { value: '5', label: 'May' },
    { value: '6', label: 'June' },
    { value: '7', label: 'July' },
    { value: '8', label: 'Augest' },
    { value: '9', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' },
  ]

  return (
    <div className={styles.wrapper}>
      {loadingPage && <Spin size="large" />}
      {loadingPage || (
        <div className={styles.layout}>
          <div>
            <Button type='primary' className={styles.button} onClick={() => window.location.href = '/adminManagePage'}>Back</Button>
            <Select 
              defaultValue={MONTHES[month - 1]?.label}
              style={{ width: 120 }}
              onChange={handleMonthChange}
              options={MONTHES}/>
          </div>
          
          <Table columns={columns} dataSource={data} />
        </div>
      )}
    </div>
  );
};

export default RecordPage;
