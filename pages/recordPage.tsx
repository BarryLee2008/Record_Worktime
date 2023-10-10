import React from 'react';
import { Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Navigation from './components/Navigation/Navigation';
import styles from '../styles/RecordPage.module.css';

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

const data: DataType[] = [
  {
    key: '1',
    date: '2023-10-10',
    time: '09:30 - 17:30',
    location: 'Richmond',
    workingHour: '8 Hours',
  },
  {
    key: '2',
    date: '2023-10-11',
    time: '09:30 - 17:30',
    location: 'Downtown',
    workingHour: '8 Hours',
  },
  {
    key: '3',
    date: '2023-10-12',
    time: '09:30 - 17:30',
    location: 'Burnaby',
    workingHour: '8 Hours',
  },
];

const RecordPage: React.FC = () => (
  <>
    <Navigation />
    <Table className={styles.tableArea} columns={columns} dataSource={data} />
  </>
);

export default RecordPage;
