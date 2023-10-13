import React, { useEffect, useState } from 'react';
import { List, Spin } from 'antd';
import getAuth from 'services/getAuth';
import { NextPage } from 'next';
import getWorkList from 'services/getWorkList';
import styles from 'styles/AdminManagePage.module.css';

interface DataType {
  id: string;
  name: string;
}

const AdminManagePage: NextPage = () => {
  const [loadingPage, setLoadingPage] = useState(true);
  const [data, setData] = useState<DataType[]>([]);

  useEffect(() => {
    getAuth().catch(() => window.location.href='/');
    getWorkList().then((records) => {
      setData(records || []);
      setLoadingPage(false);
    })
  }, []);

  const routeToAdminRecordPage = () => window.location.href='/adminRecordPage';

  const onEmployeeClick = (employee: DataType) =>{
    localStorage.setItem('employeeID', employee.id);
    localStorage.setItem('employeeName', employee.name);
    routeToAdminRecordPage();
  }

  return (
    <div className={styles.wrapper}>
      {loadingPage && <Spin size="large" />}
      {loadingPage || <List
        className={styles.layout}
        size="large"
        header={<div>Employees</div>}
        footer={<div></div>}
        bordered
        dataSource={data}
        renderItem={(item) => <List.Item><div className={styles.link} onClick={() => onEmployeeClick(item)}>{item.name}</div></List.Item>}
      />}
      
    </div>
  );
};

export default AdminManagePage;
