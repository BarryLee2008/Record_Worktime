import React, { useEffect, useState } from 'react';
import { Space, Spin, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useRouter } from 'next/router';
import getAuth from 'services/getAuth';
import styles from '../styles/AdminRecordPage.module.css';
import { NextPage } from 'next';

interface DataType {
  key: string;
  name: string;
  date: string;
  time: string;
  location: string;
  workingHour: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => text,
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

const data: DataType[] = [
  {
    key: '1',
    name: 'Tom',
    date: '2023-10-10',
    time: '09:30 - 17:30',
    location: 'Richmond',
    workingHour: '8 Hours',
  },
  {
    key: '2',
    name: 'Jerry',
    date: '2023-10-11',
    time: '09:30 - 17:30',
    location: 'Downtown',
    workingHour: '8 Hours',
  },
  {
    key: '3',
    name: 'Lee',
    date: '2023-10-12',
    time: '09:30 - 17:30',
    location: 'Burnaby',
    workingHour: '8 Hours',
  },
];

const RecordPage: NextPage = () => {
  const router = useRouter();
  getAuth().catch(() => router.push('/'));

  const [loadingPage, setLoadingPage] = useState(true);
  useEffect(() => setLoadingPage(false), []);

  return (
    <div className={styles.wrapper}>
      {loadingPage && <Spin size="large" />}
      {loadingPage || (
        <div className={styles.layout}>
          <Table columns={columns} dataSource={data} />
        </div>
      )}
    </div>
  );
};

export default RecordPage;
