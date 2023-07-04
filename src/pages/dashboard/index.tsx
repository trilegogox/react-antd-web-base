import { apiGetSailor, apiSearchSailor } from '@/api/sailor/sailor.getting.api';
import { CONTRACT_END_TYPE, CONTRACT_TYPE, SAILOR_POSITION, SAILOR_STATUS } from '@/utils/enums';
import { FC, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './index.less';
import Overview from './overview';
import SalePercent from './salePercent';
import TimeLine from './timeLine';

const DashBoardPage: FC = () => {
  const [loading, setLoading] = useState(true);
  const { logged, locale, device, noticeCount, avatar, displayName } = useSelector(state => state.user);

  // mock timer to mimic dashboard data loading
  useEffect(async () => {
    // const sailor = await apiGetSailor('Y429igJI9bHskoRJa5ml');
    const sailors = await apiSearchSailor(SAILOR_STATUS.ONGOGING, SAILOR_POSITION.CAPTAINT, "ABC", CONTRACT_TYPE.ONE_YEARL, CONTRACT_END_TYPE.TWO_MONTH);

    console.log(sailors);
    
    const timer = setTimeout(() => {
      setLoading(undefined as any);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div>
      <Overview loading={loading} />
      <SalePercent loading={loading} />
      <TimeLine loading={loading} />
    </div>
  );
};

export default DashBoardPage;
