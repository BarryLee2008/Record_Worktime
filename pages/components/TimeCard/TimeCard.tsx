import React from 'react';
import { Card } from 'antd';
import styels from './TimeCard.module.css';

export type TimeCardProps = {
  title?: string,
  content?: string,
};

const TimeCard: React.FC<TimeCardProps> = (props: TimeCardProps) => {
  const { title, content } = props;

  return (
    <div>
      <Card className={styels.card} title={title} bordered={false}>
        {content}
      </Card>
    </div>
  );
};

export default TimeCard;
