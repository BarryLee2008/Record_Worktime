import React, { useEffect, useState } from 'react';
import { Spin, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Navigation from './components/Navigation/Navigation';
import styles from '../styles/RecordPage.module.css';
import { useRouter } from 'next/router';
import getAuth from 'services/getAuth';
import getUserRecords from 'services/getUserRecords';
import { NextPage } from 'next';

interface DataType {
  key: string;
  date: string;
  time: string;
  location: string;
  workingHour: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    render: (text) => <a>{text}</a>,
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
];

const RecordPage: NextPage = () => {
  const router = useRouter();
  getAuth().catch(() => router.push('/'));

  const [loadingPage, setLoadingPage] = useState(true);
  const [data, setData] = useState<DataType[]>([]);
  useEffect(() => {
    getUserRecords().then((records) => {
      setData(records || []);
      setLoadingPage(false);
    });
  }, []);
  
  return (
    <div className={styles.wrapper}>
      {loadingPage && <Spin size="large" />}
      {loadingPage || (
        <div className={styles.layout}>
          <Navigation />
          <Table
            className={styles.tableArea}
            columns={columns}
            dataSource={data}
            pagination={{ pageSize: 10 }}
            scroll={{ y: '70vh' }}
          />
        </div>
      )}
    </div>
  );
};

export default RecordPage;
