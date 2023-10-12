import React, { useEffect, useState } from 'react';
import { Button, Space, Spin, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useRouter } from 'next/router';
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
  const router = useRouter();
  getAuth().catch(() => router.push('/'));

  const [loadingPage, setLoadingPage] = useState(true);
  const [data, setData] = useState<DataType[]>([]);
  const employeeName = localStorage.getItem('employeeName');
  useEffect(() => {
    getSingleUserRecord(localStorage.getItem('employeeID') || '3').then((records) => {
      setData(records || []);
      setLoadingPage(false);
    })
  }, []);

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
      title: 'Location',
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
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Space className={styles.actionSpace} size="middle">
          <a>Edit</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <div className={styles.wrapper}>
      {loadingPage && <Spin size="large" />}
      {loadingPage || (
        <div className={styles.layout}>
          <Button type='primary' className={styles.button} onClick={() => router.push('/adminManagePage')}>Back</Button>
          <Table columns={columns} dataSource={data} />
        </div>
      )}
    </div>
  );
};

export default RecordPage;
